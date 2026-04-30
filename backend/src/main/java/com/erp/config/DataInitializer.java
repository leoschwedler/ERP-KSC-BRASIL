package com.erp.config;

import com.erp.entity.Product;
import com.erp.entity.Role;
import com.erp.entity.User;
import com.erp.repository.ProductRepository;
import com.erp.repository.UserRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;

@Component
@Slf4j
public class DataInitializer implements CommandLineRunner {

    private final UserRepository userRepository;
    private final ProductRepository productRepository;
    private final PasswordEncoder passwordEncoder;

    public DataInitializer(UserRepository userRepository, ProductRepository productRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.productRepository = productRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public void run(String... args) throws Exception {
        if (userRepository.count() == 0) {
            log.info("Initializing database with test users...");

            User admin = User.builder()
                .name("Admin User")
                .email("admin@erp.com")
                .password(passwordEncoder.encode("admin123"))
                .role(Role.ADMIN)
                .createdAt(LocalDateTime.now())
                .updatedAt(LocalDateTime.now())
                .build();

            User user = User.builder()
                .name("Regular User")
                .email("user@erp.com")
                .password(passwordEncoder.encode("user123"))
                .role(Role.USER)
                .createdAt(LocalDateTime.now())
                .updatedAt(LocalDateTime.now())
                .build();

            userRepository.save(admin);
            userRepository.save(user);
            log.info("Test users created: admin@erp.com (admin123) and user@erp.com (user123)");
        }

        if (productRepository.count() == 0) {
            log.info("Initializing database with test products...");

            Product p1 = Product.builder()
                .name("Laptop Dell XPS 13")
                .description("High-performance ultrabook with 13-inch display")
                .price(new java.math.BigDecimal("1299.99"))
                .quantity(15)
                .createdAt(LocalDateTime.now())
                .updatedAt(LocalDateTime.now())
                .build();

            Product p2 = Product.builder()
                .name("Magic Keyboard")
                .description("Wireless keyboard with touchpad")
                .price(new java.math.BigDecimal("299.99"))
                .quantity(42)
                .createdAt(LocalDateTime.now())
                .updatedAt(LocalDateTime.now())
                .build();

            Product p3 = Product.builder()
                .name("USB-C Cable")
                .description("High-speed USB-C cable for charging and data transfer")
                .price(new java.math.BigDecimal("19.99"))
                .quantity(150)
                .createdAt(LocalDateTime.now())
                .updatedAt(LocalDateTime.now())
                .build();

            productRepository.saveAll(java.util.Arrays.asList(p1, p2, p3));
            log.info("Test products created");
        }
    }
}
