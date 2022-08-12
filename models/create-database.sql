CREATE DATABASE ticketmanagement;

\c ticketmanagement;

CREATE TABLE parties(
    party_id serial PRIMARY KEY,
    name TEXT NOT NULL,
    sale_start_date DATE NOT NULL,
    sale_end_date DATE NOT NULL,
    party_date DATE NOT NULL,
    banner_url TEXT NOT NULL
);

CREATE TABLE salespersons(
    salesperson_id serial PRIMARY KEY,
    name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    phone TEXT NOT NULL,
    email TEXT NOT NULL,
    sale_url TEXT NOT NULL,
    party_name TEXT,
    party_id INT NOT NULL,
    CONSTRAINT fk_parties FOREIGN KEY(party_id) REFERENCES parties(party_id) ON DELETE CASCADE
);

CREATE TABLE users(
    user_id serial PRIMARY KEY,
    username TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    role INT NOT NULL,
    refresh_token TEXT
);

CREATE TABLE clients(
    client_id serial PRIMARY KEY,
    name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    phone TEXT NOT NULL,
    ci TEXT NOT NULL,
    gender TEXT NOT NULL,
    payment_url TEXT NOT NULL,
    instagram TEXT,
    salesperson_name TEXT,
    created_at TIMESTAMP,
    qr_code TEXT NOT NULL,
    party_id INT NOT NULL,
    CONSTRAINT fk_parties FOREIGN KEY(party_id) REFERENCES parties(party_id) ON DELETE CASCADE,
    salesperson_id INT NOT NULL,
    CONSTRAINT fk_salespersons FOREIGN KEY(salesperson_id) REFERENCES salespersons(salesperson_id) ON DELETE CASCADE
);