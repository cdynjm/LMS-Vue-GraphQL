<?php declare(strict_types=1);

namespace App\GraphQL\Queries\Guest;

use App\Models\Officials;
use App\Models\User;
use App\Models\Categories;
use App\Models\Files;
use Illuminate\Support\Facades\Auth;
use Illuminate\Auth\Access\AuthorizationException;
use App\Http\Controllers\AESCipher;

final readonly class Welcome
{
    /** @param  array{}  $args */
    public function __invoke(null $_, array $args)
    {
       $aes = new AESCipher();
      
        $page = $args['page'];
        $perPage = $args['first'];

        $paginator = Files::with((new Files)->relation)
            ->orderBy('created_at', 'DESC')
            ->paginate($perPage, ['*'], 'page', $page);

        return [
            'filesListPaginated' => [
                'data' => $paginator->items(),
                'paginatorInfo' => [
                    'currentPage' => $paginator->currentPage(),
                    'lastPage' => $paginator->lastPage(),
                    'perPage' => $paginator->perPage(),
                    'total' => $paginator->total(),
                    'hasMorePages' => $paginator->hasMorePages(),
                ],
            ],
        ];
    }
}
