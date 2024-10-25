DROP DATABASE IF EXISTS hoteis;
CREATE DATABASE IF NOT EXISTS hoteis;
USE hoteis;

CREATE TABLE clientes(
    cliente_id int(10) NOT NULL PRIMARY KEY AUTO_INCREMENT,
    nome varchar(255) NOT NULL,
    cpf varchar(11) NOT NULL UNIQUE,
    email varchar(255) NOT NULL UNIQUE,
    endereco varchar(255) NOT NULL,
    data_nascimento date NOT NULL,
    data_cadastro date NOT NULL   
);

CREATE TABLE telefone (
    telefone_id int(10) NOT NULL PRIMARY KEY AUTO_INCREMENT,
    cliente_id int(10) NOT NULL,
    numero varchar(20) NOT NULL,
    tipo enum('residencial', 'comercial', 'celular') NOT NULL,
    FOREIGN KEY (cliente_id) REFERENCES clientes(cliente_id)
);

CREATE TABLE quartos (
    quarto_id int(10) NOT NULL PRIMARY KEY AUTO_INCREMENT,
    numero int(5) NOT NULL,
    andar int(3) NOT NULL,
    tipo enum('simples', 'duplo', 'triplo', 'quadruple') NOT NULL,
    valor_diaria decimal(5,2) NOT NULL,
    statusQuarto enum('disponivel', 'ocupado', 'reservado') NOT NULL,
    cliente_id int(10) NOT NULL,
    FOREIGN KEY (cliente_id) REFERENCES clientes(cliente_id)
);

CREATE TABLE reservas (
    reserva_id int(10) NOT NULL PRIMARY KEY AUTO_INCREMENT,
    cliente_id int(10) NOT NULL,
    quarto_id int(10) NOT NULL,
    data_reserva date NOT NULL,
    data_entrada date NOT NULL,
    data_saida date NOT NULL,
    valor_total decimal(7,2) NOT NULL,
    statusReserva enum('confirmada', 'cancelada', 'pendente') NOT NULL,
    FOREIGN KEY (cliente_id) REFERENCES clientes(cliente_id),
    FOREIGN KEY (quarto_id) REFERENCES quartos(quarto_id)
);

CREATE TABLE estacionamento (
    estacionamento_id int(10) NOT NULL PRIMARY KEY AUTO_INCREMENT,
    cliente_id int(10) NOT NULL,
    veiculo_placa varchar(7) NOT NULL UNIQUE,
    veiculo_marca varchar(50) NOT NULL,
    veiculo_modelo varchar(50) NOT NULL,
    data_entrada datetime NOT NULL,
    data_saida datetime DEFAULT NULL,
    FOREIGN KEY (cliente_id) REFERENCES clientes(cliente_id)
);