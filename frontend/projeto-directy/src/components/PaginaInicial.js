import React, { useState } from 'react';
import axios from 'axios';
import styled from "styled-components";


function PaginaInicial(props) {
    const [primeiroClick, setPrimeiroClick] = useState(null);
    const [segundoClick, setSegundoClick] = useState(null);
    const [tempo, setTempo] = useState(null);

    function handleClick() {
        if (!primeiroClick) {
            setPrimeiroClick(Date.now());
        } else {
            setSegundoClick(Date.now());
            setTempo(((Date.now() - primeiroClick) / 1000).toFixed(2));
            const data = {
                tempo: ((Date.now() - primeiroClick) / 1000).toFixed(2),
                tempoTotal: tempo
            };
            axios.post('http://localhost:3001/registros', data)
                .then(() => {
                    setPrimeiroClick(null);
                    setSegundoClick(null);
                })
                .catch(err => console.error(err));
        }
    }


    return (
        <MainContent>
            <Button onClick={handleClick}>
                {segundoClick ? `Clique para começar novamente` : (primeiroClick ? 'Clique novamente para parar o cronômetro' : 'Clique aqui para começar o cronômetro')}
            </Button>
            {tempo !== null &&
                <Span>
                    Tempo total: {tempo}s
                </Span>
            }
            <Button onClick={() => props.redirectTo('/historico')}>
                Ir para histórico
            </Button>
        </MainContent>
    );
}

export default PaginaInicial;


const MainContent = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
`;

const Button = styled.button`
    background-color: #363636;
    width: 300px;
    height: 50px;
    margin: 10px;
    font-size: 15px;
    padding: 10px;
    &:hover {
        background-color: #000000;
      }
`

const Span = styled.span`
    color: black;
    font-size: 30px;
    font-weight: bold;
    padding: 20px;
`