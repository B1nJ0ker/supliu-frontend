import { createContext, useContext, useState } from "react";
import axios from "axios";
import GlobalContext from "./GlobalContext";

axios.defaults.baseURL = "http://localhost:8000/api/";

const AlbumContext = createContext();

export const AlbumProvider = ({children}) => {
    const { 
        setLoading, formFieldsPesquisa, setFormFieldsPagination, formFieldsPagination, msToMin, ordem, setOrdem, 
        handleButtonClick, exibirAlerta, paginaAtual, setTotalPaginas, setPaginaAtual, totalPaginas , apiURL
    } = useContext(GlobalContext);

    axios.defaults.baseURL = apiURL;

    const [formFieldsSave, setFormFieldsSave] = useState({ nome: "", ano: "", imagem: "", spotify_link: ""});
    const [formFieldsUpdate, setFormFieldsUpdate] = useState({ id: "", nome: "", ano: "", imagem: "", spotify_link: ""});
    const [formFieldsNovaFaixa, setFormFieldsNovaFaixa] = useState({ album_id: "", faixa_id: ""});
    const [albuns, setAlbuns] = useState([]);
    const [faixas, setFaixas] = useState([]); 
    const [faixasAll, setFaixasAll] = useState([]); 
    const [colunaOrdenada, setColunaOrdenada] = useState('ano');
    const [atualizarAlbuns, setAtualizarAlbuns] = useState(true);

    const updateFormAlbum = (album) =>{
        setFormFieldsUpdate(album);
        handleButtonClick("editarAlbum");
        setFaixas([]);
        if(  document.getElementById('accordionFaixas').children[0].ariaExpanded === "true"){
            document.getElementById('accordionFaixas').children[0].click();
        }
    }

    const onChangeUpdateForm = (e) =>{
        const {name, value} = e.target;
        setFormFieldsUpdate({...formFieldsUpdate, [name]: value});
    }

    const onChangeSaveForm = (e) =>{
        const {name, value} = e.target;
        setFormFieldsSave({...formFieldsSave, [name]: value});
    }

    const ordenarColuna = (coluna) => {
        const novaOrdem = colunaOrdenada === coluna && ordem === 'asc' ? 'desc' : 'asc';
        setOrdem(novaOrdem);
        setColunaOrdenada(coluna);
        setAlbuns(albuns.sort((a, b) => {
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

    const getFaixas = async (id, ariaExpanded = "false") => {
        if(ariaExpanded === "false"){
            let faixas = [];
            try{
                setLoading(true);
                let response = await axios.get("albuns/"+id+"/faixas");
                response.data.content.forEach(faixa => {
                    faixa.duracao = msToMin(faixa.duracao)
                    faixas.push(faixa);
                });
                
            }catch(e){
                exibirAlerta(e.response.data.message, e.response.status)
                //console.log(e);
            }finally{
                setFaixas(faixas);
                getFaixasAll(faixas);
                setLoading(false);
            }
            
        }
    }

    const storeAlbum = async(e)=>{
        e.preventDefault();
        try{
            setLoading(true);
            let resposta = await axios.post("albuns", formFieldsSave);
            setLoading(false);
            setFormFieldsSave({ nome: "", ano: "", imagem: "", spotify_link: ""});
            getAlbuns(formFieldsPagination['nome'], 1);
            if(resposta.data.message){
                exibirAlerta(resposta.data.message, resposta.status);
            }
            handleButtonClick("lista");
        }catch(e){
            setLoading(false);
            if(e.response.status !== 200){
                exibirAlerta(e.response.data.message, e.response.status);
            }else{
               // setErrorAlert();
            }
        }
    }

    const destroyAlbum = async(id,nome)=>{
        if(window.confirm('Certeza que deseja excluir permanentemente o Álbum: '+nome+'?')){
            try{
                setLoading(true);
                const resposta = await axios.delete("albuns/"+id);
                setLoading(false);
                if(resposta.data.message){
                    exibirAlerta(resposta.data.message, resposta.status);
                }
                if(albuns.length === 1 && paginaAtual > 1){
                    setPaginaAtual(totalPaginas - 1);
                }else if(totalPaginas === 1 && albuns.length === 1){
                    setAlbuns([]);
                }else{
                    getAlbuns(formFieldsPagination['nome'])
                }
            }catch(e){
                setLoading(false);
                exibirAlerta(e.response.data.message, e.response.status)
            }
            
        }
    }

    const updateAlbum = async(e)=>{
        e.preventDefault();
        try{
            setLoading(true);
            let resposta = await axios.put("albuns/"+formFieldsUpdate.id, formFieldsUpdate);
            setLoading(false);
            getAlbuns(formFieldsPagination['nome']);
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

    const onSubmitFaixaForm = async (e, faixa,album_id) => {
        e.preventDefault();
        if(window.confirm('Certeza que deseja excluir a Faixa: '+faixa.nome+'?')){
            try{
                setLoading(true);
                let e =await axios.delete("albuns/"+album_id+"/faixa/"+faixa.id);
                setLoading(false);
                exibirAlerta(e.data.message, e.status)
                getFaixas(album_id, "false");
                getAlbuns(formFieldsPagination['nome']);
            }catch(e){
                setLoading(false);
                exibirAlerta(e.response.data.message, e.response.status)
            }
            
        }
    };

    const getFaixasAll = async(faixas) => {
        try{
            setLoading(true);
            const simpFaixas = await axios.get("faixas/simplify");
            const faixasCadastradas = new Set(faixas.map(item => item.id));
            const faixasFiltradas = simpFaixas.data.content.filter(item => !faixasCadastradas.has(item.id));
            setFaixasAll(faixasFiltradas);
        }catch(e){
            console.log(e);
        }finally{
            setLoading(false);
        }
    }
    const onChangeNovaFaixaForm = (e) =>{
        const {name, value} = e.target;
        setFormFieldsNovaFaixa({...formFieldsNovaFaixa, [name]: value});
    }
    const onSubmitNovaFaixaForm = async (e, album_id) => {
        e.preventDefault();
        try{
            setLoading(true);
            let resposta = await axios.post("albuns/"+album_id+"/faixa/"+formFieldsNovaFaixa['faixa_id']);
            setLoading(false);
            getFaixas(album_id);
            if(resposta.data.message){
                exibirAlerta(resposta.data.message, resposta.status);
            }
        }catch(e){
            setLoading(false);
            if(e.response.status !== 200){
                exibirAlerta(e.response.data.message, e.response.status);
            }
        }
    };

    const onSubmitPesquisaForm = async (e) => {
        e.preventDefault();
        if(await getAlbuns(formFieldsPesquisa['nome'], 1) !== 1)
            setFormFieldsPagination(formFieldsPesquisa);
    };

    const getAlbuns = async(nome = "", pagina = paginaAtual)=>{
        if(pagina !== paginaAtual){
            setAtualizarAlbuns(false);
            setPaginaAtual(pagina);
        }
        try{
            setLoading(true);
            const resposta = await axios.get("albuns/?page="+pagina+"&nome="+nome);
            setAlbuns(resposta.data.content.data);
            setTotalPaginas(resposta.data.content.last_page);
            setLoading(false);
        }catch(e){
            setLoading(false);
            if(e.response)
                exibirAlerta(e.response.data.message, e.response.status)
            else
                console.log(e);
            return 1;
        }
    };

    const getAlbunsOnDemand = async()=>{
        try{
            setLoading(true);
            const resposta = await axios.get("albuns/?page="+paginaAtual);
            const maisAlbuns = [...albuns, ...resposta.data.content.data];
            setAlbuns(maisAlbuns);
            setTotalPaginas(resposta.data.content.last_page);
            setPaginaAtual(paginaAtual+1);
            setLoading(false);
        }catch(e){
            exibirAlerta(e.response.data.message, e.response.status)
            setLoading(false);
            //console.log(e);
        }
    };

    return <AlbumContext.Provider 
        value={{ 
            onSubmitPesquisaForm, ordenarColuna, setFaixas,
            faixas, albuns, getFaixas, getAlbuns, onChangeSaveForm, onChangeUpdateForm, formFieldsSave, onChangeNovaFaixaForm,
            setFormFieldsSave, storeAlbum, onSubmitFaixaForm, onSubmitNovaFaixaForm, getAlbunsOnDemand, formFieldsNovaFaixa,
            destroyAlbum, formFieldsUpdate, setFormFieldsUpdate, updateFormAlbum, updateAlbum, faixasAll,atualizarAlbuns, setAtualizarAlbuns
        }}> {children} </AlbumContext.Provider> 
}

export default AlbumContext;