<?php

namespace App\Http\Controllers\Admin;

use App\Models\Categories;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Http\Controllers\AESCipher;

class FileController extends Controller
{
    public function __construct(protected AESCipher $aes) {}

    public function index(Request $request)
    {
        return Inertia::render('Admin/Files', [
            'id' => $request->id,
        ]);
    }
}
