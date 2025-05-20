<?php declare(strict_types=1);

namespace App\GraphQL\Queries\Admin;

use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Auth\Access\AuthorizationException;
use App\Http\Controllers\AESCipher;

final readonly class AdminManagement
{
    /** @param  array{}  $args */
    public function __invoke(null $_, array $args)
    {
        if (! $this->authorize()) {
            throw new AuthorizationException('You are not authorized to access fields');
        }

        $aes = new AESCipher;
        
        return User::where('role', 1)
            ->orderBy('name', 'ASC')
            ->get()

            ->map(function ($data) use ($aes) {
                $array = $data->toArray();
                $array['id'] = $aes->encrypt((string) $data->id);
                return $array;
            });
    }

    private function authorize(): bool
    {
        return Auth::user()->can('accessAdmin');
    }
}
