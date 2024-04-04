import React, { useContext, useEffect, useRef, useState } from "react";
import Col from 'react-bootstrap/Col';
import Button from "react-bootstrap/esm/Button";
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Row from 'react-bootstrap/Row';
import Accordion from 'react-bootstrap/Accordion';
import ListGroup from 'react-bootstrap/ListGroup';
import FaixaContext from "../../context/FaixaContext";
import $ from 'jquery';
import 'jquery-mask-plugin/dist/jquery.mask.min.js'; 


export const FaixaCreate = ()=>{
    const { onChangeSaveForm, formFieldsSave, storeFaixa, albuns, getAlbuns } = useContext(FaixaContext);
    const [validated, setValidated] = useState(false);
    const duracaoRef = useRef(null);

    const handleSubmit = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
          event.preventDefault();
          event.stopPropagation();
        }else{
            storeFaixa(event);
        }
        setValidated(true);
    };

    useEffect(()=>{
        getAlbuns();
        $(duracaoRef.current).mask('00:99');
    }, []);

    useEffect(()=>{
        setValidated(true);
    }, [validated]);

    return (
        <Form noValidate validated={validated} onSubmit={handleSubmit} className="FormsMargins" id='novaFaixaForm' ><br/>
            <Row>
                <Form.Group as={Col} controlId="nome">
                    <FloatingLabel label="Nome da Faixa" className="mb-3">
                        <Form.Control required name="nome" value={formFieldsSave['nome']} onChange={onChangeSaveForm} type="text" maxLength={100} placeholder="Nome da Faixa" />
                    </FloatingLabel>
                </Form.Group>
            </Row>
            <br/>
            <Row className="mb-3">
                <Form.Group as={Col} controlId="duracao">
                    <FloatingLabel label="Duração" className="mb-3">
                        <Form.Control ref={duracaoRef} pattern="^([0-5]?[0-9]:[0-5]?[0-9])?$" required name="duracao" value={formFieldsSave['duracao']} onChange={onChangeSaveForm} type="text"/>
                    </FloatingLabel>
                </Form.Group>
                <Form.Group as={Col} controlId="spotify_link">
                    <FloatingLabel label="Spotify" className="mb-3">
                        <Form.Control name="spotify_link" value={formFieldsSave['spotify_link']} onChange={onChangeSaveForm} type="text" placeholder="URL do Spotify"/>
                    </FloatingLabel>
                </Form.Group>
            </Row>
            <Row>
                <Button variant="primary" type="submit">Salvar</Button>
            </Row>
            <br></br>
            <Accordion defaultActiveKey="0">
                <Accordion.Item eventKey="0">
                    <Accordion.Header>Álbuns</Accordion.Header>
                    <Accordion.Body>
                    <ListGroup>
                        {albuns.map((album)=>{
                            return (
                                <div key={"album_"+album.id}>
                                    <ListGroup.Item>
                                        <Form.Check form='novaFaixaForm' onChange={onChangeSaveForm} type="checkbox" name={'albuns[]'} 
                                        id={"album_"+album.id} value={album.id+""} label={album.nome}
                                        checked={formFieldsSave['albuns[]'].includes(album.id+"")}/>
                                    </ListGroup.Item>
                                </div>
                            )})
                        }
                    </ListGroup>
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
        </Form>
    );
};