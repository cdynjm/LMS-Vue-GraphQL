<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Guest\HomeController;
use App\Http\Controllers\Admin\AdminManagement;

Route::middleware('guest')->group(function () {
    Route::get('/', [HomeController::class, 'index'])->name('home');
});

Route::middleware(['auth', 'admin'])->group(function () {
    
    Route::prefix('admin')->group(function () {
        Route::get('/dashboard', [DashboardController::class, 'index'])->name('admin.dashboard');

        Route::get('/admin-management', [AdminManagement::class, 'index'])->name('admin.management');
        Route::post('/admin-management/create', [AdminManagement::class, 'createAdmin'])->name('create.admin');
        Route::patch('/admin-management/update', [AdminManagement::class, 'updateAdmin'])->name('update.admin');
        Route::delete('/admin-management/delete', [AdminManagement::class, 'deleteAdmin'])->name('delete.admin');
    });
});

Route::middleware(['auth', 'user'])->group(function () {
    Route::prefix('user')->group(function () {
        Route::get('/dashboard', [DashboardController::class, 'index'])->name('user.dashboard');
    });
});


require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
