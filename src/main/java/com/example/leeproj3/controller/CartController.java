package com.example.leeproj3.controller;

import com.example.leeproj3.entity.Cart;
import com.example.leeproj3.service.CartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/cart")
public class CartController {
    @Autowired
    private CartService cartService;

    @GetMapping
    public List<Cart> getCartItems() {
        return cartService.getCartItems();
    }

    @PostMapping
    public void addToCart(@RequestBody Cart cart) {
        cartService.addToCart(cart);
    }

    @DeleteMapping("/{id}")
    public void removeFromCart(@PathVariable Long id) {
        cartService.removeFromCart(id);
    }
}
