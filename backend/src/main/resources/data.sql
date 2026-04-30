-- Insert test users
-- Both users use password: "password"
-- Hash: $2a$10$dXJ3SW6G7P50eS3BKj2e9uFSKoMjCsOt/SEhYdkslM2cPvAMZK0E2
INSERT INTO users (name, email, password, role, created_at, updated_at) VALUES
('Admin User', 'admin@erp.com', '$2a$10$dXJ3SW6G7P50eS3BKj2e9uFSKoMjCsOt/SEhYdkslM2cPvAMZK0E2', 'ADMIN', NOW(), NOW()),
('Regular User', 'user@erp.com', '$2a$10$dXJ3SW6G7P50eS3BKj2e9uFSKoMjCsOt/SEhYdkslM2cPvAMZK0E2', 'USER', NOW(), NOW());

-- Insert test products
INSERT INTO products (name, description, price, quantity, created_at, updated_at) VALUES
('Laptop Dell XPS 13', 'High-performance ultrabook with 13-inch display', 1299.99, 15, NOW(), NOW()),
('Magic Keyboard', 'Wireless keyboard with touchpad', 299.99, 42, NOW(), NOW()),
('USB-C Cable', 'High-speed USB-C cable for charging and data transfer', 19.99, 150, NOW(), NOW()),
('Monitor 4K 27"', 'Ultra HD 4K display with HDR support', 599.99, 8, NOW(), NOW()),
('Wireless Mouse', 'Silent click wireless mouse with long battery life', 49.99, 75, NOW(), NOW());
