package com.example.leeproj3.service;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.example.leeproj3.entity.Category;
import com.example.leeproj3.mapper.CategoryMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class CategoryService {
    @Autowired
    private CategoryMapper categoryMapper;

    public List<Category> getAllCategories() {
        return categoryMapper.selectList(null);
    }

    public void saveCategory(Category category) {
        categoryMapper.insert(category);
    }
}
