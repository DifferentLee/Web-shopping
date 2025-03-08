package com.example.leeproj3.controller;

import com.example.leeproj3.entity.Product;
import com.example.leeproj3.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/products")
public class ProductController {
    @Autowired
    private ProductService productService;

    @GetMapping("/{catid}")
    public List<Product> getProductsByCategory(@PathVariable Long catid) {
        return productService.getProductsByCategory(catid);
    }

    @PostMapping
    public void createProduct(@RequestBody Product product) {
        productService.saveProduct(product);
    }
}
