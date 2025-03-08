package com.example.leeproj3.controller;

import com.example.leeproj3.entity.Category;
import com.example.leeproj3.service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/categories")
public class CategoryController {
    @Autowired
    private CategoryService categoryService;

    @GetMapping
    public List<Category> getAllCategories() {
        return categoryService.getAllCategories();
    }

    @PostMapping
    public void createCategory(@RequestBody Category category) {
        categoryService.saveCategory(category);
    }
}

