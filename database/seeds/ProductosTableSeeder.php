<?php

use App\Models\Producto;
use Illuminate\Database\Seeder;

class ProductosTableSeeder extends Seeder
{
    public function run()
    {
        Producto::create([
            'nombre' => 'Laptop',
            'precio' => 1200.50,
            'descripcion' => 'Laptop de última generación',
            'img' => 'laptop.jpg',
            'categoria_id' => 1, // ID de la categoría "Electrónica"
        ]);

        Producto::create([
            'nombre' => 'Camisa',
            'precio' => 25.99,
            'descripcion' => 'Camisa de algodón',
            'img' => 'camisa.jpg',
            'categoria_id' => 2, // ID de la categoría "Ropa"
        ]);
    }
}