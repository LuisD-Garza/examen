<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Dotenv\Validator;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class AdminLoginController extends Controller
{
    public function showLoginForm()
    {
        return view('auth.admin_login'); 
    }
    //Login para administradores
    public function login(Request $request)
    {
        // Validar las credenciales
        $credentials = $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);
        if (Auth::guard('admin')->attempt($credentials)) {
            return response()->json([
                'success' => true,
                'redirect' => route('admin.dashboard'), 
            ]);
        }
        return response()->json([
            'success' => false,
            'message' => 'Credenciales incorrectas',
        ], 401); 
    }
    //Login para usuarios
    public function loginU(Request $request)
    {
        $credentials = $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);
        if (Auth::guard('users')->attempt($credentials)) {
            if (Auth::guard('users')->check()) {
                return response()->json([
                    'success' => true,
                    'redirect' => route('user.dashboard'),
                ]);
            } else {
                return response()->json([
                    'success' => false,
                    'message' => 'No se pudo autenticar al usuario.',
                ], 401);
            }
        }
        return response()->json([
            'success' => false,
            'message' => 'Credenciales incorrectas',
        ], 401);
    }
    // Registro de usuarios
    public function register(Request $request)
    {
        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);
        return response()->json(['success' => true, 'message' => 'User registered successfully']);
    }
    // Logout ADMIN
    public function logout()
    {
        Auth::guard('admin')->logout();
        return redirect('/');
        
    }
}