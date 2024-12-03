const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');

const app = express();

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'saepSenai',
  password: 'senai',
  port: 5432,
});

// const pool = new Pool({
//     user: 'local', // Substitua pelo seu usuário do PostgreSQL
//     host: 'localhost',
//     database: 'alugaTarefas', // Nome da sua database
//     password: '12345', // Substitua pela sua senha
//     port: 5432, // Porta padrão do PostgreSQL
// });

app.use(cors());
app.use(express.json());

app.get('/tarefas', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM tarefas');
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Erro ao buscar tarefas' });
  }
});

app.get('/tarefas/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('SELECT * FROM tarefas WHERE id = $1', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Tarefa não encontrado' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Erro ao buscar tarefa' });
  }
});

app.post('/tarefas', async (req, res) => {
  const { descricao, setor, prioridade, id_usuario} = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO tarefas (descricao, setor, prioridade, id_usuario) VALUES ($1, $2, $3, $4) RETURNING *',
      [descricao, setor, prioridade, id_usuario]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Erro ao adicionar tarefa' });
  }
});

app.put('/tarefas/:id', async (req, res) => {
  const { id } = req.params;
  const { descricao, setor, prioridade, id_usuario, status } = req.body;
  try {
    const result = await pool.query(
      'UPDATE tarefas SET descricao = $1, setor = $2, prioridade = $3, id_usuario = $4, status = $5 WHERE id = $6 RETURNING *',
      [descricao, setor, prioridade, id_usuario, status, id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Tarefa não encontrado' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Erro ao atualizar tarefa' });
  }
});

app.delete('/tarefas/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('DELETE FROM tarefas WHERE id = $1 RETURNING *', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Tarefa não encontrado' });
    }
    res.json({ message: 'Tarefa deletado com sucesso' });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Erro ao deletar tarefa' });
  }
});

app.post('/usuarios', async (req, res) => {
  const { nome } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO usuarios (nome) VALUES ($1) RETURNING *',
      [nome]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Erro ao adicionar usuario' });
  }
});

app.get('/usuarios', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM usuarios');
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Erro ao buscar usuarios' });
  }
});

app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000');
});