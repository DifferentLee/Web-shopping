package com.example.leeproj3.controller;

import com.example.leeproj3.entity.Product;
import com.example.leeproj3.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/cart")
public class CartController {

    @Autowired
    private ProductService productService;

    // 根据 pid 返回产品信息，用于前端购物车展示
    @GetMapping("/product/{pid}")
    public Product getProductForCart(@PathVariable Long pid) {
        return productService.getProductById(pid);
    }
}
