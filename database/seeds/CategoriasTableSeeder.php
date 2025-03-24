<?php

use App\Models\Categoria;
use Illuminate\Database\Seeder;

class CategoriasTableSeeder extends Seeder
{
    public function run()
    {
        Categoria::create(['nombre' => 'Electrónica']);
        Categoria::create(['nombre' => 'Ropa']);
        Categoria::create(['nombre' => 'Hogar']);
    }
}