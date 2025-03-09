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

    // 根据类别查产品
    @GetMapping("/category/{catid}")
    public List<Product> getProductsByCategory(@PathVariable Long catid) {
        return productService.getProductsByCategory(catid);
    }

    // 根据产品 id 获取详情
    @GetMapping("/detail/{pid}")
    public Product getProductById(@PathVariable Long pid) {
        return productService.getProductById(pid);
    }

    // 创建产品
    @PostMapping
    public void createProduct(@RequestBody Product product) {
        // 可添加输入验证逻辑
        productService.saveProduct(product);
    }

    // 删除产品
    @DeleteMapping("/{pid}")
    public void deleteProduct(@PathVariable Long pid) {
        productService.deleteProduct(pid);
    }
}
