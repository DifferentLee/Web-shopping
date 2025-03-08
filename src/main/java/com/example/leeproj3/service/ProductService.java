package com.example.leeproj3.service;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.example.leeproj3.entity.Product;
import com.example.leeproj3.mapper.ProductMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class ProductService {
    @Autowired
    private ProductMapper productMapper;

    public List<Product> getProductsByCategory(Long catid) {
        QueryWrapper<Product> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("catid", catid);
        return productMapper.selectList(queryWrapper);
    }

    public void saveProduct(Product product) {
        productMapper.insert(product);
    }
}

