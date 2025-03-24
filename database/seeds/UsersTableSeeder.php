<?php

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UsersTableSeeder extends Seeder
{
    public function run()
    {
        User::create([
            'name' => 'Usuario',
            'email' => 'usuario@example.com',
            'password' => Hash::make('password'),
        ]);
    }
}