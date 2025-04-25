import express from 'express';
import knexdb from './knexfile.js';

const app = express();
const port = 3000;

app.use(express.json()); // Permite o uso de JSON no corpo das requisições

// Rota para listar todos os cavalos
app.get('/cavalo', async (req, res) => {
  try {
    const cavalos = await knexdb('cavalo').select('*');
    res.status(200).json(cavalos);
  } catch (err) {
    res.status(500).json({ message: 'Erro ao listar cavalos', error: err.message });
  }
});

// Rota para buscar um cavalo por ID
app.get('/cavalo/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const cavalo = await knexdb('cavalo').where({ id }).first();
    if (!cavalo) {
      return res.status(404).json({ message: 'Cavalo não encontrado' });
    }
    res.status(200).json(cavalo);
  } catch (err) {
    res.status(500).json({ message: 'Erro ao buscar cavalo', error: err.message });
  }
});

// Rota para criar um novo cavalo
app.post('/cavalo', async (req, res) => {
    console.log('Request body:', req.body);
  const { valor, raca, data_nascimento, tamanho, peso, pelagem_cor, sexo, numero_registro, localizacao } = req.body;
  try {
    const [id] = await knexdb('cavalo').insert({
      valor,
      raca,
      data_nascimento,
      tamanho,
      peso,
      pelagem_cor,
      sexo,
      numero_registro,
      localizacao,
    });
    res.status(201).json({ message: 'Cavalo criado com sucesso', id });
  } catch (err) {
    console.log(`Erro`, err)
    res.status(500).json({ message: 'Erro ao criar cavalo', error: err.message });
  }
});

// Rota para atualizar um cavalo
app.put('/cavalo/:id', async (req, res) => {
  const { id } = req.params;
  const { valor, raca, data_nascimento, tamanho, peso, pelagem_cor, sexo, numero_registro, localizacao } = req.body;
  
  try {
    const updated = await knexdb('cavalo')
      .where({ id })
      .update({
        valor,
        raca,
        data_nascimento,
        tamanho,
        peso,
        pelagem_cor,
        sexo,
        numero_registro,
        localizacao,
      });

    if (updated) {
      res.status(200).json({ message: 'Cavalo atualizado com sucesso' });
    } else {
      res.status(404).json({ message: 'Cavalo não encontrado para atualizar' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Erro ao atualizar cavalo', error: err.message });
  }
});

// Rota para deletar um cavalo
app.delete('/cavalo/:id', async (req, res) => {
  const { id } = req.params;
  
  try {
    const deleted = await knexdb('cavalo').where({ id }).del();
    if (deleted) {
      res.status(200).json({ message: 'Cavalo deletado com sucesso' });
    } else {
      res.status(404).json({ message: 'Cavalo não encontrado para deletar' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Erro ao deletar cavalo', error: err.message });
  }
});

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
