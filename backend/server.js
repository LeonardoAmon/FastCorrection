const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post('/registros', (req, res) => {
  const data = req.body;
  const timestamp = new Date().toISOString();
  data.timestamp = timestamp;

  const registros = JSON.parse(fs.readFileSync('registros.json'));

  const idExistente = registros.some(registro => registro.id === data.id);
  if (idExistente) {
    res.status(400).send({ message: 'Já existe um registro com este ID.' });
  } else {
    registros.push(data);
    fs.writeFileSync('registros.json', JSON.stringify(registros));
    res.status(200).send({ message: 'Registro salvo com sucesso.' });
  }
});

app.get('/registros', (req, res) => {
  const registros = JSON.parse(fs.readFileSync('registros.json'));
  res.status(200).send(registros);
});

app.get('/registros/data/:inicio/:fim', (req, res) => {
  const registros = JSON.parse(fs.readFileSync('registros.json'));
  const inicio = new Date(req.params.inicio);
  const fim = new Date(req.params.fim);
  const registrosFiltrados = registros.filter(registro => {
    const data = new Date(registro.timestamp);
    return data >= inicio && data <= fim;
  });
  res.status(200).send(registrosFiltrados);
});

app.get('/registros/data/:ordem', (req, res) => {
  const registros = JSON.parse(fs.readFileSync('registros.json'));
  const ordem = req.params.ordem.toLowerCase();
  const registrosOrdenados = registros.sort((a, b) => {
    const dataA = new Date(a.timestamp);
    const dataB = new Date(b.timestamp);
    if (ordem === 'asc') {
      return dataA - dataB;
    } else {
      return dataB - dataA;
    }
  });
  res.status(200).send(registrosOrdenados);
});

app.get('/registros/tempo/:ordem', (req, res) => {
  const registros = JSON.parse(fs.readFileSync('registros.json'));
  const ordem = req.params.ordem.toLowerCase();
  const registrosOrdenados = registros.sort((a, b) => {
    if (ordem === 'asc') {
      return a.tempo - b.tempo;
    } else {
      return b.tempo - a.tempo;
    }
  });
  res.status(200).send(registrosOrdenados);
});

const PORT = 3001;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}.`);
});
