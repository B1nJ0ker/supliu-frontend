import { createContext, useContext, useState } from "react";
import axios from "axios";
import GlobalContext from "./GlobalContext";

const FaixaContext = createContext();

export const FaixaProvider = ({children}) => {

    const { 
        setLoading, setFormFieldsPagination, formFieldsPagination, msToMin, minToMs, ordem, setOrdem, apiURL,
        handleButtonClick, exibirAlerta, paginaAtual, setTotalPaginas, setPaginaAtual, totalPaginas, formFieldsPesquisa
    } = useContext(GlobalContext);

    axios.defaults.baseURL = apiURL;

    const [formFieldsSave, setFormFieldsSave] = useState({ nome: "", duracao: "", spotify_link: "", 'albuns[]': []});
    const [formFieldsUpdate, setFormFieldsUpdate] = useState({ id: "", nome: "", duracao: "", spotify_link: "", 'albuns[]': []});
    const [albuns, setAlbuns] =  useState([]);
    const [faixas, setFaixas] = useState([]); 
    const [colunaOrdenada, setColunaOrdenada] = useState('nome');
    const [atualizarFaixas, setAtualizarFaixas] = useState(true);


    const getAlbuns = async() => {
        try{
            setLoading(true);
            const apiAlbuns = await axios.get("albuns/simplify");
            setAlbuns(apiAlbuns.data.content);
        }catch(e){
            console.log(e);
        }finally{
            setLoading(false);
        }
    }

    const updateFormFaixa = async (faixa) =>{
        faixa.duracao = msToMin(faixa.duracao)
        setLoading(true);
        let albuns = await axios.get("faixas/"+faixa.id+"/albuns");
        setLoading(false);
        faixa['albuns[]'] = [];
        albuns.data.content.forEach(album => {
            faixa['albuns[]'].push(album.id+"");
        });
        faixa['_method'] = "PUT";
        setFormFieldsUpdate(faixa);
        handleButtonClick("editarFaixa");
    }

    const onChangeUpdateForm = (e) =>{
        const { name, value, type, checked } = e.target;
        const newValue = type === 'checkbox' ? (checked ? [...formFieldsUpdate[name], value] : formFieldsUpdate[name].filter(item => item !== value)) : value;
        setFormFieldsUpdate(prevState => ({...prevState, [name]: newValue}));
    }

    const onChangeSaveForm = (e) =>{
        const { name, value, type, checked } = e.target;

        // Verifica se é um checkbox e ajusta o valor conforme necessário
        const newValue = type === 'checkbox' ? (checked ? [...formFieldsSave[name], value] : formFieldsSave[name].filter(item => item !== value)) : value;

        // Atualiza o estado com os novos valores
        setFormFieldsSave(prevState => ({
            ...prevState,
            [name]: newValue
        }));
    }

    const ordenarColuna = (coluna) => {
        const novaOrdem = colunaOrdenada === coluna && ordem === 'asc' ? 'desc' : 'asc';
        setOrdem(novaOrdem);
        setColunaOrdenada(coluna);
        setFaixas(faixas.sort((a, b) => {
            const valorA = a[coluna];
            const valorB = b[coluna];
            if (valorA < valorB) {
                return novaOrdem === 'asc' ? -1 : 1;
            }
            if (valorA > valorB) {
                return novaOrdem === 'asc' ? 1 : -1;
            }
            return 0;
        }))
    };
    
    const storeFaixa = async(e)=>{
        e.preventDefault();
        try{
            let formModificado = {...formFieldsSave}
            formModificado.duracao = minToMs(formFieldsSave.duracao);
            setLoading(true);
            let resposta = await axios.post("faixas", formModificado,{headers: {'Content-Type': 'multipart/form-data'}});
            setFormFieldsSave({ nome: "", duracao: "", spotify_link: "", 'albuns[]': []});
            getFaixas(formFieldsPagination['nome'], 1);
            setLoading(false);
            if(resposta.data.message){
                exibirAlerta(resposta.data.message, resposta.status);
            }
            handleButtonClick("lista")
        }catch(e){
            setLoading(false);
            if(e.response)
                if(e.response.status !== 200){
                    exibirAlerta(e.response.data.message, e.response.status);
                }
            //console.log(e)
        }
    }

    const updateFaixa = async(e)=>{
        e.preventDefault();
        try{
            let formModificado = {...formFieldsUpdate}
            formModificado.duracao = minToMs(formFieldsUpdate.duracao);
            setLoading(true);
            let resposta = await axios.post("faixas/"+formModificado.id, formModificado,{headers: {'Content-Type': 'multipart/form-data'}});
            setLoading(false);
            getFaixas(formFieldsPagination['nome']);
            if(resposta.data.message){
                exibirAlerta(resposta.data.message, resposta.status);
            }
        }catch(e){
            setLoading(false);
            if(e.response.status !== 200){
                exibirAlerta(e.response.data.message, e.response.status);
            }
        }
    }

    const destroyFaixa = async(id,nome)=>{
        if(window.confirm('Certeza que deseja apagar permanentemente a Faixa: '+nome+'?')){
            try{
                setLoading(true);
                const resposta = await axios.delete("faixas/"+id);
                setLoading(false);
                if(resposta.data.message){
                    exibirAlerta(resposta.data.message, resposta.status);
                }
                if(faixas.length === 1 && paginaAtual > 1){
                    setPaginaAtual(totalPaginas - 1);
                }else if(totalPaginas === 1 && faixas.length === 1){
                    setFaixas([]);
                }else{
                    getFaixas(formFieldsPagination['nome'])
                }
            }catch(e){
                setLoading(false);
                exibirAlerta(e.response.data.message, e.response.status)
            }
        }
    }

    const getFaixas = async(nome = "", pagina = paginaAtual)=>{
        if(pagina !== paginaAtual){
            setAtualizarFaixas(false);
            setPaginaAtual(pagina);
        }
        try{
            setLoading(true);
            const resultado = await axios.get("faixas/?page="+pagina+"&nome="+nome);
            setFaixas(resultado.data.content.data);
            setLoading(false);
            setTotalPaginas(resultado.data.content.last_page);
        }catch(e){
            setLoading(false);
            if(paginaAtual === totalPaginas)
                return 1;
            if(e.response)
                exibirAlerta(e.response.data.message, e.response.status)
            else
                console.log(e);
        }
    };

    const onSubmitPesquisaForm = async (e) => {
        e.preventDefault();
        if(await getFaixas(formFieldsPesquisa['nome'], 1) !== 1)
            setFormFieldsPagination(formFieldsPesquisa);
    };

    return <FaixaContext.Provider 
        value={{ 
            onSubmitPesquisaForm, ordenarColuna, faixas, getFaixas, destroyFaixa, updateFormFaixa, atualizarFaixas, setAtualizarFaixas,
            onChangeSaveForm, formFieldsSave, storeFaixa, albuns, getAlbuns, onChangeUpdateForm, formFieldsUpdate, updateFaixa
        }}> {children} </FaixaContext.Provider> 
}

export default FaixaContext;