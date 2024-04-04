import React, { useContext, useEffect, useState } from "react";
import Col from 'react-bootstrap/Col';
import Button from "react-bootstrap/esm/Button";
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Row from 'react-bootstrap/Row';
import AlbumContext from "../../context/AlbumContext";


export const AlbumCreate = ()=>{
    const { onChangeSaveForm, formFieldsSave, storeAlbum  } = useContext(AlbumContext);
    const [validated, setValidated] = useState(false);

    const handleSubmit = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
          event.preventDefault();
          event.stopPropagation();
        }else{
            storeAlbum(event);
        }
        setValidated(true);
        
    };

    useEffect(()=>{
        setValidated(true);
    }, [validated]);

    return (
        <Form noValidate validated={validated} onSubmit={handleSubmit} className="FormsMargins"><br/>
            <Row>
                <Form.Group as={Col} controlId="nome">
                    <FloatingLabel label="Nome do Álbum" className="mb-3">
                    <Form.Control required name="nome" value={formFieldsSave['nome']} onChange={onChangeSaveForm} type="text" maxLength={100} placeholder="Nome do Álbum" />
                    </FloatingLabel>
                </Form.Group>
            </Row>
            <br/>
            <Row className="mb-3">
                <Form.Group as={Col} controlId="ano">
                    <FloatingLabel label="Ano" className="mb-3">
                        <Form.Control type='text' pattern="\d*" minLength="4" maxLength="4" required name="ano" value={formFieldsSave['ano']} onChange={onChangeSaveForm}/>
                    </FloatingLabel>

                </Form.Group>

                <Form.Group as={Col} controlId="imagem">
                    <FloatingLabel label="Imagem" className="mb-3">
                        <Form.Control name="imagem" value={formFieldsSave['imagem']} onChange={onChangeSaveForm} type="text" placeholder="URL da imagem"/>
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
        </Form>
    );
};