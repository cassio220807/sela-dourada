import express from 'express';
import knexConfig from './knexfile.js';
import cors from 'cors';

const app = express();
const port = 3000;

app.use(cors()); 
app.use(express.json()); 

app.get('/cavalo', async (req, res) => {
  try {
    const cavalos = await knexConfig('cavalo').select('*');
    res.status(200).json(cavalos);
  } catch (err) {
    res.status(500).json({ message: 'Erro ao listar cavalos', error: err.message });
  }
});

app.get('/cavalo/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const cavalo = await knexConfig('cavalo').where({ id }).first();
    if (!cavalo) {
      return res.status(404).json({ message: 'Cavalo não encontrado' });
    }
    res.status(200).json(cavalo);
  } catch (err) {
    res.status(500).json({ message: 'Erro ao buscar cavalo', error: err.message });
  }
});

app.post('/cavalo', async (req, res) => {
  const {
    valor,
    raca,
    data_nascimento,
    tamanho,
    peso,
    pelagem_cor,
    sexo,
    numero_registro,
    localizacao
  } = req.body;

  const sexoCorreto = sexo === 'Masculino' ? 'Macho' : sexo === 'Feminino' ? 'Fêmea' : sexo;

  if (!valor || !raca || !data_nascimento || !tamanho || !peso || !pelagem_cor || !sexoCorreto || !numero_registro || !localizacao) {
    return res.status(400).json({ message: 'Todos os campos são obrigatórios.' });
  }

  try {
    const [id] = await knexConfig('cavalo').insert({
      valor,
      raca,
      data_nascimento,
      tamanho,
      peso,
      pelagem_cor,
      sexo: sexoCorreto, 
      numero_registro,
      localizacao
    });

    res.status(201).json({ message: 'Cavalo criado com sucesso', id });
  } catch (err) {
    console.error('Erro ao criar cavalo:', err);
    res.status(500).json({ message: 'Erro ao criar cavalo', error: err.message });
  }
});

app.put('/cavalo/:id', async (req, res) => {
  const { id } = req.params;
  const {
    valor,
    raca,
    data_nascimento,
    tamanho,
    peso,
    pelagem_cor,
    sexo,
    numero_registro,
    localizacao
  } = req.body;

  try {
    const updated = await knexConfig('cavalo').where({ id }).update({
      valor,
      raca,
      data_nascimento,
      tamanho,
      peso,
      pelagem_cor,
      sexo,
      numero_registro,
      localizacao
    });

    if (updated) {
      res.status(200).json({ message: 'Cavalo atualizado com sucesso' });
    } else {
      res.status(404).json({ message: 'Cavalo não encontrado' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Erro ao atualizar cavalo', error: err.message });
  }
});

app.delete('/cavalo/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const deleted = await knexConfig('cavalo').where({ id }).del();
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
  console.log(`✅ Servidor rodando em http://localhost:${port}`);
});
