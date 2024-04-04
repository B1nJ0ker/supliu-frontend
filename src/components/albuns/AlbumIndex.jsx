import React from "react";

import { useContext } from "react";
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer';
import { AlbumCreate } from "./AlbumCreate";
import { AlbumList } from "./AlbumList";
import { AlbumEdit } from "./AlbumEdit";
import GlobalContext from "../../context/GlobalContext";


export const AlbumIndex = ()=>{
    const { alertas, setAlertas, activeKey, handleTabChange } = useContext(GlobalContext);
    
    return (
        <div className="container">
            <Tabs activeKey={activeKey} onSelect={handleTabChange} id="tabs" className="mb-3" justify>
                <Tab eventKey="lista" title="Lista">
                    <h1>Álbuns</h1>
                    <AlbumList/>
                </Tab>
                <Tab eventKey="criarAlbum" title="Novo">
                    <h1>Novo Álbum</h1>
                    <AlbumCreate />
                </Tab>
                <Tab eventKey="editarAlbum" title="Editar" disabled>
                    <h1>Editar Álbum</h1>
                    <AlbumEdit />
                </Tab>
            </Tabs>
            <ToastContainer position="top-end" className="p-3" style={{ zIndex: 1 }}>
                {alertas.map((alerta) =>{
                    return(
                        <Toast id={alerta.id} key={alerta.id} 
                            onClose={() => {
                                setAlertas(alertas.filter(item => item.id !== alerta.id));
                            }} 
                            show={alerta.show} delay={3000} autohide bg={alerta.bg}>
                            <Toast.Header>
                                <strong className="me-auto">{alerta.tipo}</strong>
                                <small className="text-muted">{alerta.status}</small>
                            </Toast.Header>
                            <Toast.Body><b>{alerta.message}</b></Toast.Body>
                        </Toast>
                    );
                })}
            </ToastContainer>
        </div>
    );
};