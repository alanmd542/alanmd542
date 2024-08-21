// Producto.java
public class Producto {
    private String nombre;
    private double precio;
    private int cantidad;

    // Constructor, getters y setters
}

// Cliente.java
public class Cliente {
    private String nombre;
    private String email;

    // Constructor, getters y setters
}

// Orden.java
import java.util.ArrayList;
import java.util.List;

public class Orden {
    private Cliente cliente;
    private List<Producto> productos = new ArrayList<>();

    public Orden(Cliente cliente) {
        this.cliente = cliente;
    }

    public void agregarProducto(Producto producto) {
        productos.add(producto);
    }

    public double calcularTotal() {
        return productos.stream().mapToDouble(p -> p.getPrecio() * p.getCantidad()).sum();
    }

    // Getters y otros métodos
}

// TiendaController.java
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@Controller
@RequestMapping("/api")
public class TiendaController {
    private Map<String, Orden> ordenes = new HashMap<>();

    @PostMapping("/add-to-cart")
    @ResponseBody
    public String addToCart(@RequestParam String clienteId, @RequestParam String producto, @RequestParam double precio, @RequestParam int cantidad) {
        Cliente cliente = new Cliente(clienteId, clienteId + "@example.com"); // Ejemplo simple
        Producto prod = new Producto(producto, precio, cantidad);
        Orden orden = ordenes.getOrDefault(clienteId, new Orden(cliente));
        orden.agregarProducto(prod);
        ordenes.put(clienteId, orden);
        return "Producto añadido al carrito!";
    }

    @GetMapping("/cart-total")
    @ResponseBody
    public double getCartTotal(@RequestParam String clienteId) {
        Orden orden = ordenes.get(clienteId);
        return orden != null ? orden.calcularTotal() : 0.0;
    }
}

@PostMapping("/clear-cart")
@ResponseBody
public String clearCart(@RequestParam String clienteId) {
    ordenes.remove(clienteId);
    return "Carrito limpiado!";
}


function addToCart(nombreProducto, precioProducto, cantidadProducto) {
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    const existingProductIndex = carrito.findIndex(product => product.nombre === nombreProducto);

    if (existingProductIndex !== -1) {
        carrito[existingProductIndex].cantidad += cantidadProducto;
    } else {
        carrito.push({ nombre: nombreProducto, precio: precioProducto, cantidad: cantidadProducto });
    }

    localStorage.setItem('carrito', JSON.stringify(carrito));
    actualizarCarrito();
}

function actualizarCarrito() {
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    const carritoIcon = document.querySelector('.content-shopping-cart .number');
    carritoIcon.innerText = `(${carrito.length})`;
}

function clearCart() {
    localStorage.removeItem('carrito');
    actualizarCarrito();
}

document.addEventListener('DOMContentLoaded', actualizarCarrito);