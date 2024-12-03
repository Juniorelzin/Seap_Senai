-- Tabela de clientes
CREATE TABLE usuarios (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL
);

-- Tabela de carros
CREATE TABLE tarefas (
    id SERIAL PRIMARY KEY,
    id_usuario INTEGER REFERENCES usuarios(id),
    Descricao VARCHAR(100) NOT NULL,
    Setor VARCHAR(100) NOT NULL,
    Prioridade VARCHAR(100) NOT NULL,
    status VARCHAR(20) NOT NULL DEFAULT 'afazer' CHECK (status IN ('afazer', 'fazendo', 'pronto'))
);

DROP TABLE usuarios;
DROP TABLE tarefas;

SELECT * FROM usuarios;

SELECT * FROM tarefas;

INSERT INTO usuarios (nome) VALUES
('João Silva');
INSERT INTO tarefas (Descricao, Setor, Prioridade, status) VALUES
('Limpar', 'x', 'Alta', 'afazer');
INSERT INTO clientes (nome, email) VALUES
('Marie Curie', 'marie.curie@science.com'),
INSERT INTO carros (modelo, cor, km, status, id_usuario, data_aluguel) VALUES
('Ecto-1 Ghostbusters', 'Branco', 150000, 'disponivel', NULL, NULL),







