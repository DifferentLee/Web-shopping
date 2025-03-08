package com.example.leeproj3.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.example.leeproj3.entity.Product;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface ProductMapper extends BaseMapper<Product> {
}
