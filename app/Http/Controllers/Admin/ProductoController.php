<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Producto;
use App\Models\Categoria;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class ProductoController extends Controller
{
    // Obtener todos los productos
    public function index(Request $request)
    {
        $query = Producto::with('categoria');
    
        // Filtrado
        if ($request->has('search')) {
            $query->where('nombre', 'like', '%' . $request->search . '%');
        }
    
        // Paginación
        $productos = $query->paginate(10);
    
        return response()->json($productos);
    }

    // Guardar un nuevo producto
    public function store(Request $request)
    {
        $request->validate([
            'nombre' => 'required|string|max:255',
            'precio' => 'required|numeric',
            'descripcion' => 'nullable|string',
            'categoria_id' => 'required|exists:categorias,id',
        ]);
    
        // Guardar la imagen si se proporciona
        $imgPath = null;
        if ($request->hasFile('img')) {
            $imgPath = $request->file('img')->store('productos', 'public');
        }
    
        // Crear el producto
        $producto = Producto::create([
            'nombre' => $request->nombre,
            'precio' => $request->precio,
            'descripcion' => $request->descripcion,
            'categoria_id' => $request->categoria_id,
        ]);
    
        return response()->json([
            'success' => true,
            'message' => 'Producto creado correctamente.',
            'data' => $producto,
        ], 201); // Código 201: Created
    }

    // Actualizar un producto existente
    public function update(Request $request, Producto $producto)
    {
        $request->validate([
            'nombre' => 'required|string|max:255',
            'precio' => 'required|numeric',
            'descripcion' => 'nullable|string',
            'img' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048', // Validar imagen
            'categoria_id' => 'required|exists:categorias,id',
        ]);
    
        // Actualizar la imagen si se proporciona
        if ($request->hasFile('img')) {
            // Eliminar la imagen anterior si existe
            if ($producto->img) {
                Storage::disk('public')->delete($producto->img);
            }
            $imgPath = $request->file('img')->store('productos', 'public');
            $producto->img = $imgPath;
        }
    
        // Actualizar el producto
        $producto->update([
            'nombre' => $request->nombre,
            'precio' => $request->precio,
            'descripcion' => $request->descripcion,
            'categoria_id' => $request->categoria_id,
        ]);
    
        return response()->json([
            'success' => true,
            'message' => 'Producto actualizado correctamente.',
            'data' => $producto,
        ]);
    }

    // Eliminar un producto
    public function destroy(Producto $producto)
    {
        // Eliminar la imagen si existe
        if ($producto->img) {
            Storage::disk('public')->delete($producto->img);
        }
    
        $producto->delete();
    
        return response()->json([
            'success' => true,
            'message' => 'Producto eliminado correctamente.',
        ]);
    }
}