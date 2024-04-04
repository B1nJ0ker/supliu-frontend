import React, { useContext, useEffect, useState } from "react";
import Col from 'react-bootstrap/Col';
import Button from "react-bootstrap/esm/Button";
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Row from 'react-bootstrap/Row';
import Accordion from 'react-bootstrap/Accordion';
import AlbumContext from "../../context/AlbumContext";
import Table from 'react-bootstrap/Table';


export const AlbumEdit = ()=>{

    const { onChangeUpdateForm, formFieldsUpdate, updateAlbum, faixas, getFaixas, onSubmitFaixaForm, faixasAll, onSubmitNovaFaixaForm, onChangeNovaFaixaForm } = useContext(AlbumContext);
    const [validated, setValidated] = useState(false);

    const handleSubmit = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
          event.preventDefault();
          event.stopPropagation();
        }else{
            updateAlbum(event);
        }
        setValidated(true);
    };

    useEffect(()=>{
        setValidated(true);
    }, [validated]);

    return (
        <div>
            <Form noValidate validated={validated}onSubmit={handleSubmit} className="FormsMargins"><br/>
                <Form.Control type="hidden" value={formFieldsUpdate['id']} name="id"/>

                <Row>
                    <Form.Group as={Col} controlId="nome">
                        <FloatingLabel label="Nome" className="mb-3">
                            <Form.Control required name="nome" value={formFieldsUpdate['nome']} onChange={onChangeUpdateForm} type="text" maxLength={100} placeholder="Nome do Álbum" />
                        </FloatingLabel>
                    </Form.Group>
                </Row>
                <br/>
                <Row className="mb-3">
                    <Form.Group as={Col} controlId="ano">
                        <FloatingLabel label="Ano" className="mb-3">
                            <Form.Control type='text' pattern="\d*" minLength="4" maxLength="4" required name="ano" value={formFieldsUpdate['ano']} onChange={onChangeUpdateForm}/>
                        </FloatingLabel>
                    </Form.Group>

                    <Form.Group as={Col} controlId="imagem">
                        <FloatingLabel label="Imagem" className="mb-3">
                            <Form.Control name="imagem" value={formFieldsUpdate['imagem']} onChange={onChangeUpdateForm} type="text" placeholder="URL da imagem"/>
                        </FloatingLabel>
                    </Form.Group>
                    <Form.Group as={Col} controlId="spotify_link">
                        <FloatingLabel label="Spotify" className="mb-3">
                            <Form.Control name="spotify_link" value={formFieldsUpdate['spotify_link']} onChange={onChangeUpdateForm} type="text" placeholder="URL do Spotify"/>
                        </FloatingLabel>
                    </Form.Group>
                </Row>
                <Row>
                    <Button variant="primary" type="submit">Salvar</Button>
                </Row>
            </Form>
            <br></br>
            
            <Accordion className="FormsMargins">
                <Accordion.Item eventKey="0">
                    <Accordion.Header id='accordionFaixas' onClick={(e)=>{getFaixas(formFieldsUpdate['id'], e.target.ariaExpanded)}}>Faixas</Accordion.Header>
                    <Accordion.Body>
                        
                            <Table>
                                <thead>
                                    <tr>
                                        <th>Nome</th>
                                        <th className="tableCenter">Duração</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody id="faixas_album">
                                    <tr>
                                        <td className="tableCenter" colSpan={2}>
                                            <Form id="formAdicionarFaixa" onSubmit={(e) => onSubmitNovaFaixaForm(e, formFieldsUpdate['id'])}>
                                                <Form.Select name="faixa_id" onChange={onChangeNovaFaixaForm}>
                                                    <option value="0">Selecione uma faixa</option>
                                                    {faixasAll.map((faixa)=>{
                                                        return (
                                                            <option key={faixa.id} value={faixa.id}>{faixa.nome}</option>
                                                        );
                                                    })}
                                                </Form.Select>
                                            </Form>
                                        </td>
                                        <td className="tableCenter"><Button type="submit" form="formAdicionarFaixa" variant="info">Adicionar Faixa</Button></td>
                                    </tr>
                                    {faixas.map((faixa)=>{
                                        return (
                                            <tr key={'faixa_'+faixa.id}>
                                                <td><a href={faixa.spotify_link}>{faixa.nome}</a></td>
                                                <td className="tableCenter">{faixa.duracao}</td>
                                                <th className="tableCenter">
                                                    <Form id={'faixa_form_'+faixa.id} onSubmit={(e) => onSubmitFaixaForm(e, faixa, formFieldsUpdate['id'])}>
                                                        <Button variant="danger" type="submit">Remover</Button>   
                                                    </Form>
                                                </th>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </Table>
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
        </div>
    );
};