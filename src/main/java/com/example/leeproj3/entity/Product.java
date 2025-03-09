package com.example.leeproj3.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;

@Data
@TableName("products")
public class Product {
    @TableId(type = IdType.AUTO)
    private Long pid;
    private Long catid;
    private String name;
    private Double price;
    private String description;
    private String imageUrl;
}