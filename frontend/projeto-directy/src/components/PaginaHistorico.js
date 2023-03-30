import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
// import 'bootstrap/dist/css/bootstrap.min.css';

function PaginaHistorico() {
  const [registros, setRegistros] = useState([]);
  const [filtroInicio, setFiltroInicio] = useState('');
  const [filtroFim, setFiltroFim] = useState('');
  const [ordenacaoData, setOrdenacaoData] = useState('');
  const [ordenacaoTempo, setOrdenacaoTempo] = useState('');

  useEffect(() => {
    axios.post('/registros')
      .then(res => {
        setRegistros(res.data);
      })
      .catch(err => console.log(err));
  }, []);

  function handleFiltrar() {
    axios.get(`/registros/data/${filtroInicio}/${filtroFim}`)
      .then(res => {
        setRegistros(res.data);
      })
      .catch(err => console.log(err));
  }

  function handleOrdenarData() {
    const ordem = ordenacaoData === 'asc' ? 'desc' : 'asc';
    axios.get(`/registros/data/${ordem}`)
      .then(res => {
        setRegistros(res.data);
        setOrdenacaoData(ordem);
      })
      .catch(err => console.log(err));
  }

  function handleOrdenarTempo() {
    const ordem = ordenacaoTempo === 'asc' ? 'desc' : 'asc';
    axios.get(`/registros/tempo/${ordem}`)
      .then(res => {
        setRegistros(res.data);
        setOrdenacaoTempo(ordem);
      })
      .catch(err => console.log(err));
  }

  return (
    <MainContent>
      <h1>Histórico de registros</h1>
      <ContentButton>
        <FiltroDiv>
          <Label htmlFor="filtroInicio">Início:</Label>
          <Input type="date" id="filtroInicio" value={filtroInicio} onChange={(e) => setFiltroInicio(e.target.value)} />
        </FiltroDiv>
        <FiltroDiv>
          <Label htmlFor="filtroFim">Fim:</Label>
          <Input style={{ marginLeft: '15px' }} type="date" id="filtroFim" value={filtroFim} onChange={(e) => setFiltroFim(e.target.value)} />
        </FiltroDiv>
        <Button onClick={handleFiltrar}>Filtrar</Button>
      </ContentButton>
      <table>
        <thead>
          <tr>
            <th>Data e hora</th>
            <th>Tempo (em segundos)</th>
            <th>Dados</th>
          </tr>
        </thead>
        <tbody>
          {registros.map(registro => (
            <tr key={registro.timestamp}>
              <td>{new Date(registro.timestamp).toLocaleString()}</td>
              <td>{registro.tempo}</td>
              <td>{registro.dados}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <FiltroDiv>
          <Button onClick={handleOrdenarData}>{`Ordenar por data ${ordenacaoData ? `(${ordenacaoData})` : ''}`}</Button>
        </FiltroDiv>
        <FiltroDiv>
          <Button onClick={handleOrdenarTempo}>{`Ordenar por tempo ${ordenacaoTempo ? `(${ordenacaoTempo})` : ''}`}</Button>
        </FiltroDiv>
      </div>
      <Link href="/">Voltar para a página principal</Link>
    </MainContent>
  );
}

export default PaginaHistorico;

const MainContent = styled.div`
  position: absolute;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
`;

const ContentButton = styled.div`
  padding: 10px;
  color: black;
  font-size: 20px;
  font-weight: bold;
`

const FiltroDiv = styled.div`
  padding: 5px;
  width: 300px;
`

const Label = styled.label`
  padding: 10px;
`

const Input = styled.input`
  padding: 10px;
  height: 20px;
  width: 200px;
  border-radius: 10px;
  border: 1px solid gray;
  font-size: 15px;
  font-family: cursive;
  &:focus {
    outline: none;
    border: 1px solid gray;
  }
`
const Button = styled.button`
    background-color: #363636;
    width: 280px;
    height: 40px;
    font-size: 15px;
    padding: 10px;
    margin-top: 10px;
    &:hover {
        background-color: #000000;
      }
`

const Link = styled.a`
  margin-top: 10px;
  font-size: 20px;
  color: #DCDCDC;
`
