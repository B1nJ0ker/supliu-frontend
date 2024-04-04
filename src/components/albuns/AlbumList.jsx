import React, { useContext, useEffect } from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Table from 'react-bootstrap/Table';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';
import AlbumContext from "../../context/AlbumContext";
import GlobalContext from "../../context/GlobalContext";


export const AlbumList = ()=>{
    const { onChangePesquisaForm, formFieldsPesquisa, msToMin, handleButtonClick, paginaAtual, setPaginaAtual, totalPaginas, formFieldsPagination} = useContext(GlobalContext);
    const { albuns, getAlbuns, destroyAlbum, updateFormAlbum, ordenarColuna, onSubmitPesquisaForm, atualizarAlbuns, setAtualizarAlbuns } = useContext(AlbumContext);

    useEffect(()=>{
        if(atualizarAlbuns)
            getAlbuns(formFieldsPagination['nome']);
        else
            setAtualizarAlbuns(true)
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
                            <InputGroup style={{width: "50%",  margin: 'auto'}}>
                                <Form.Control
                                    placeholder="Nome do Álbum"
                                    aria-label="Nome do Álbum"
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
                    <th></th>
                    <th style={{cursor: 'pointer'}} onClick={() => ordenarColuna('nome')}>Nome ▼</th>
                    <th style={{cursor: 'pointer'}} onClick={() => ordenarColuna('ano')} className="tableCenter">Ano ▼</th>
                    <th style={{cursor: 'pointer'}} onClick={() => ordenarColuna('quantidade_faixas')} className="tableCenter">Faixas ▼</th>
                    <th style={{cursor: 'pointer'}} onClick={() => ordenarColuna('duracao_total')} className="tableCenter">Duração (min.) ▼</th>
                    <th className="tableCenter"><Button variant="info" onClick={()=>handleButtonClick("criarAlbum")}>Novo Álbum</Button></th>
                </tr>
            </thead>
            <tbody>
                {albuns.map((album)=>{
                    return (
                        <tr key={'album_'+album.id}>
                            <td><img style={{height: 60, width: 60}} alt="Imagem do Álbum" src={ album.imagem } /></td>
                            <td><a href={ album.spotify_link } target="_blank" rel="noreferrer" className="linkFormat">
                                {album.spotify_link && 
                                        (<img alt="Spotify Logo" src="https://logosmarcas.net/wp-content/uploads/2020/09/Spotify-Emblema.png" height={30}/>
                                )}{album.nome}</a>
                            </td>
                            <td style={{textAlign: 'center'}}>{album.ano}</td>
                            <td className="tableCenter" style={{ fontWeight: 'bold' }}>{album.quantidade_faixas}</td>
                            <td className="tableCenter">{msToMin(album.duracao_total)}</td>
                            <th className="tableCenter">
                                <Button variant="outline-warning" onClick={()=>{updateFormAlbum(album) }}>Editar</Button>{'  '}
                                <Button variant="outline-danger" onClick={()=>destroyAlbum(album.id, album.nome)}>Remover</Button>
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