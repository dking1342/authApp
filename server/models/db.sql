-- create db
CREATE DATABASE auth;

-- creates extension for uuid generate
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- create table
CREATE TABLE users(
    user_id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_name VARCHAR(100) NOT NULL,
    user_email VARCHAR(100) NOT NULL,
    user_password VARCHAR(100) NOT NULL
);

-- insert into table (example)
INSERT INTO users (
    user_name,
    user_email,
    user_password
) VALUES (
    'username',
    'user@example.com',
    '123'
);

-- find user
SELECT *
FROM users
WHERE user_email = 'user@example.com';