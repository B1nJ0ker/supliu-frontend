import { createContext, useState } from "react";

const GlobalContext = createContext();

export const GlobalProvider = ({children}) => {
    const [errors, setErrors] = useState({});
    const [formFieldsPesquisa, setFormFieldsPesquisa] = useState({ nome: ""});
    const [formFieldsPagination, setFormFieldsPagination] = useState({ nome: ""});
    const [activeKey, setActiveKey] = useState('lista');
    const [alertas, setAlertas] = useState([]);
    const [paginaAtual, setPaginaAtual] = useState(1);
    const [totalPaginas, setTotalPaginas] = useState(0);
    const [loading, setLoading] = useState(false);
    const [ordem, setOrdem] = useState('desc');

    const apiURL = "http://localhost:8000/api/";

    const exibirAlerta = (msg, status) =>{
        const alerta = {
            id: alertas.length+'_'+Date.now(),
            message: msg,
            status: status,
            tipo: status === 200 ? 'Sucesso' : 'Falha',
            bg: status === 200 ? 'success' : 'danger',
            show: true
        }
        alertas.push(alerta)
        setAlertas(alertas);
        setErrors({});
    }

    const msToMin = (ms) => {
        let min = Math.floor(ms / 60000);
        let seg = Math.min(Math.floor((ms % 60000) / 1000), 59);
        return `${min}:${seg < 10 ? '0' : ''}${seg}`
    };

    const minToMs = (min) => {
        const totalSegundos = parseInt(min.split(":")[0] ? min.split(":")[0] : min) * 60 + parseInt(min.split(":")[1] ? min.split(":")[1] : 0);
        return totalSegundos * 1000;
    };

    const onChangePesquisaForm = (e) =>{
        const {name, value} = e.target;
        setFormFieldsPesquisa({...formFieldsPesquisa, [name]: value});
    }

    const handleTabChange = (key) => {
        setActiveKey(key);
        document.getElementById('tabs-tab-editar').innerHTML = key === "editar" ? "Editar" : "";
    };
    const handleButtonClick = (tab) => { 
        setActiveKey(tab); 
        document.getElementById('tabs-tab-editar').innerHTML = tab === "editar" ? "Editar" : "";
    };

    return <GlobalContext.Provider 
        value={{ 
            ordem, setOrdem, activeKey, setActiveKey, paginaAtual, totalPaginas, setPaginaAtual, setTotalPaginas, errors, setErrors, setAlertas,
            loading, setLoading, msToMin, minToMs, handleTabChange, handleButtonClick, onChangePesquisaForm, formFieldsPesquisa, setFormFieldsPesquisa, exibirAlerta, alertas,
            formFieldsPagination, setFormFieldsPagination, apiURL
        }}> {children} </GlobalContext.Provider> 
}

export default GlobalContext;