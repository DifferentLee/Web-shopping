package com.example.leeproj3.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.example.leeproj3.entity.Cart;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface CartMapper extends BaseMapper<Cart> {
}