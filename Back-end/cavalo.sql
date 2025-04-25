CREATE DATABASE IF NOT EXISTS cavalo;

USE cavalo;

CREATE TABLE IF NOT EXISTS cavalo (
    id INT AUTO_INCREMENT PRIMARY KEY,           -- ID único para cada animal
    valor DECIMAL(10, 2) NOT NULL,               -- Valor (R$)
    raca VARCHAR(100) NOT NULL,                  -- Raça do animal
    data_nascimento DATE,                       -- Data de nascimento (ou ano)
    tamanho DECIMAL(3, 2),                       -- Tamanho em metros
    peso DECIMAL(5, 2),                         -- Peso em kg
    pelagem_cor VARCHAR(50),                    -- Cor da pelagem
    sexo ENUM('Masculino', 'Feminino') NOT NULL, -- Sexo (Masculino, Feminino, Outro)
    numero_registro VARCHAR(50) UNIQUE,         -- Número de Registro
    localizacao VARCHAR(255),                   -- Localização (cidade, estado, etc)
    data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,  -- Data de criação do registro
    data_atualizacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP -- Data de atualização
);

INSERT INTO cavalo (valor, raca, data_nascimento, tamanho, peso, pelagem_cor, sexo, numero_registro, localizacao)
VALUES
(1200.50, 'Labrador', '2020-08-15', 0.60, 30.5, 'Amarelo', 'Masculino', '12345', 'São Paulo, SP');

drop database cavalo;