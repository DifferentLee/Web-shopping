package com.example.leeproj3.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import lombok.Data;

@Data
public class Cart {
    @TableId(type = IdType.AUTO)
    private Long id;
    private Long pid;
    private Integer quantity;
    // 可添加用户 id 等其他字段
}
