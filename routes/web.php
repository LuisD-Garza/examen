<?php

use App\Http\Controllers\Admin\ProductoController;
use App\Http\Controllers\Auth\AdminLoginController;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;



// Rutas para usuarios normales
Auth::routes();
Route::post('/login', [AdminLoginController::class, 'login']);
Route::post('/loginU', [AdminLoginController::class, 'loginU']);
Route::post('/register', [AdminLoginController::class, 'register']);

Route::get('/', function () {
    return redirect('/login'); // Redirige al login
});
// Rutas para administradores
Route::prefix('admin')->group(function () {
    Route::get('/login', [AdminLoginController::class, 'showLoginForm'])->name('admin.login');
    Route::post('/login', [AdminLoginController::class, 'login'])->name('admin.login.submit');
    Route::post('/logout', [AdminLoginController::class, 'logout'])->name('admin.logout');
    
    Route::get('/dashboard', function () {
        return view('admin.dashboard');
    })->middleware('auth:admin')->name('admin.dashboard');
});

// Rutas protegidas para usuarios
Route::middleware(['auth:users'])->group(function () {
    Route::get('/dashboard', function () {
        if (Auth::guard('users')->check()) {
            return view('user.dashboard');
        } else {
            return redirect('/login')->withErrors(['message' => 'No estás autenticado.']);
        }
    })->name('user.dashboard');
});