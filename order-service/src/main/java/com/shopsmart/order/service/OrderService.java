package com.shopsmart.order.service;

import com.shopsmart.order.model.Order;
import com.shopsmart.order.repository.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class OrderService {
    
    @Autowired
    private OrderRepository orderRepository;
    
    public Order createOrder(Order order) {
        return orderRepository.save(order);
    }
    
    public Order getOrder(Long id) {
        return orderRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Order not found"));
    }
} 