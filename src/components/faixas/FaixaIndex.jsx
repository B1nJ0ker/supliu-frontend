import React, { useContext } from "react";
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer';
import { FaixaCreate } from "./FaixaCreate";
import { FaixaList } from "./FaixaList";
import { FaixaEdit } from "./FaixaEdit";
import GlobalContext from "../../context/GlobalContext";


export const FaixaIndex = ()=>{
    const { alertas, setAlertas, activeKey, handleTabChange } = useContext(GlobalContext);
    return (
        <div className="container">
            <Tabs activeKey={activeKey} onSelect={handleTabChange} id="tabs" className="mb-3" justify>
                <Tab eventKey="lista" title="Lista">
                    <h1>Faixas</h1>
                    <FaixaList/>
                </Tab>
                <Tab eventKey="criarFaixa" title="Nova">
                    <h1>Nova Faixa</h1>
                   <FaixaCreate />
                </Tab>
                <Tab eventKey="editar" title="" disabled>
                    <h1>Editar Faixa</h1>
                    <FaixaEdit/> 
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