import React, { useContext, useEffect } from "react";
import Button from "react-bootstrap/esm/Button";
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Table from 'react-bootstrap/Table';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';
import FaixaContext from "../../context/FaixaContext";
import GlobalContext from "../../context/GlobalContext";


export const FaixaList = ()=>{
    const { onChangePesquisaForm, formFieldsPesquisa, msToMin, handleButtonClick, paginaAtual, setPaginaAtual,
         totalPaginas, formFieldsPagination } = useContext(GlobalContext);
    const { faixas, ordenarColuna, getFaixas, destroyFaixa, atualizarFaixas, setAtualizarFaixas,
         updateFormFaixa, onSubmitPesquisaForm } = useContext(FaixaContext);
    
    useEffect(()=>{
        if(atualizarFaixas)
            getFaixas(formFieldsPagination['nome']);
        else
            setAtualizarFaixas(true)
    }, [paginaAtual]);

    const mudarPagina = (pagina) => {
        setPaginaAtual(pagina);
    };

    return (
        <Table striped bordered hover style={{ verticalAlign: 'middle' }}>
            <thead>
                <tr>
                    <th className="tableCenter" colSpan={6}>
                        <Form onSubmit={(e)=>{onSubmitPesquisaForm(e)}}>
                            <InputGroup style={{width: "50%", margin: 'auto'}}>
                                <Form.Control
                                    placeholder="Nome da Faixa"
                                    aria-label="Nome da Faixa"
                                    name="nome"
                                    value={formFieldsPesquisa['nome']}
                                    onChange={onChangePesquisaForm}
                                />
                                <Button variant="outline-secondary" type="submit">Pesquisar</Button>
                            </InputGroup>
                        </Form>
                    </th>
                </tr>
                <tr>
                    <th className="tableCenter" style={{cursor: 'pointer'}} onClick={() => ordenarColuna('nome')}>Nome ▼</th>
                    <th className="tableCenter" style={{cursor: 'pointer'}} onClick={() => ordenarColuna('duracao')}>Duração (min.) ▼</th>
                    <th className="tableCenter"><Button variant="info" onClick={()=>handleButtonClick("criarFaixa")}>Nova Faixa</Button></th>
                </tr>
            </thead>
            <tbody>
                {faixas.map((faixa)=>{
                    return (
                        <tr key={'faixa_'+faixa.id}>
                            <td><a href={ faixa.spotify_link } rel="noreferrer" className="linkFormat">
                                {faixa.spotify_link && 
                                    (<img alt="Spotify Logo" src="https://logosmarcas.net/wp-content/uploads/2020/09/Spotify-Emblema.png" height={30}/>)
                                } {faixa.nome}</a></td>
                            <td className="tableCenter">{msToMin(faixa.duracao)}</td>
                            <th className="tableCenter">
                                <Button variant="outline-warning" onClick={()=>{updateFormFaixa({...faixa}) }}>Editar</Button>{'  '}
                                <Button variant="outline-danger" onClick={()=>destroyFaixa(faixa.id, faixa.nome)}>Remover</Button>
                            </th>
                        </tr>
                    )
                })}
                <tr>
                    <td className="tableCenter" colSpan={6}>
                        <ButtonToolbar className="paginationButtons" aria-label="Toolbar with button groups">
                            <ButtonGroup className="me-2" aria-label="First group">
                                <Button onClick={() => mudarPagina(1)} disabled={paginaAtual === 1}>1</Button>{' '}
                            </ButtonGroup>
                            <ButtonGroup className="me-2" aria-label="First group">
                                <Button onClick={() => mudarPagina(paginaAtual - 1)} disabled={paginaAtual === 1}>🡄</Button> <Button disabled>{paginaAtual}</Button> <Button onClick={() => mudarPagina(paginaAtual + 1)} disabled={paginaAtual === totalPaginas}>🡆</Button>{' '}
                            </ButtonGroup>
                            <ButtonGroup className="me-2" aria-label="First group">
                                <Button onClick={() => mudarPagina(totalPaginas)} disabled={paginaAtual === totalPaginas}>{totalPaginas}</Button>{' '}
                            </ButtonGroup>
                        </ButtonToolbar>
                    </td>
                </tr>
            </tbody>
        </Table>
    );
};