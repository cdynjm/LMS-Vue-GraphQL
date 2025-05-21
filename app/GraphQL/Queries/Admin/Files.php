<?php declare(strict_types=1);

namespace App\GraphQL\Queries\Admin;

use App\Models\Officials;
use App\Models\User;
use App\Models\Categories;
use Illuminate\Support\Facades\Auth;
use Illuminate\Auth\Access\AuthorizationException;
use App\Http\Controllers\AESCipher;

final readonly class Files
{
    /** @param  array{}  $args */
    public function __invoke(null $_, array $args)
    {
        if (! $this->authorize()) {
            throw new AuthorizationException('You are not authorized to access fields');
        }
        $aes = new AESCipher();
        return [
            'categoryName' => Categories::where('id', $aes->decrypt($args['id']))->first(),
        ];
    }
    private function authorize(): bool
    {
        return Auth::user()->can('accessAdmin');
    }
}
