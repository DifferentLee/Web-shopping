package com.example.leeproj3.service;

import com.example.leeproj3.entity.Cart;
import com.example.leeproj3.mapper.CartMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
public class CartService {
    @Autowired
    private CartMapper cartMapper;

    public List<Cart> getCartItems() {
        return cartMapper.selectList(null);
    }

    public void addCartItem(Cart cart) {
        cartMapper.insert(cart);
    }

    public void deleteCartItem(Long id) {
        cartMapper.deleteById(id);
    }
}
