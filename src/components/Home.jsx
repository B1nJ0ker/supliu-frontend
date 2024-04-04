import React, { useEffect } from "react";
import { useContext } from "react";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Modal from 'react-bootstrap/Modal';
import ListGroup from 'react-bootstrap/ListGroup';
import AlbumContext from "../context/AlbumContext";
import { useState } from "react";
import GlobalContext from "../context/GlobalContext";


export const Home = ()=>{
    const { loading, msToMin } = useContext(GlobalContext);
    const { albuns, faixas, getFaixas, setFaixas, getAlbunsOnDemand } = useContext(AlbumContext);
    const [albumAtual, setAlbumAtual] = useState({ id: "", nome: "", ano: "", imagem: "", spotify_link: "", quantidade_faixas: '', duracao_total: ''});
    const [show, setShow] = useState(false);
    

    const handleClose = () => {
        setAlbumAtual({});
        setFaixas([]);
        setShow(false)
    };
    const handleShow = () => setShow(true);
    const exibirModal = (album) =>{
        getFaixas(album.id);
        setAlbumAtual(album)
        handleShow();
    }
    useEffect(()=>{
        getAlbunsOnDemand();
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            if (
                window.innerHeight + document.documentElement.scrollTop === document.documentElement.offsetHeight && !loading
            ) {
                getAlbunsOnDemand();
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [loading]);
    
    return (
        <div className="container"><br />
        <div
                
                className="modal"
                style={{ display: 'block', position: 'initial' }}
                >
                <Modal onHide={handleClose} show={show} centered size="lg">
                    <Modal.Header closeButton>
                    <Modal.Title>{albumAtual.nome}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                    <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-start'}}>
                        <Card style={{ width: '18rem' }}>
                            <a href={albumAtual.spotify_link} rel="noreferrer" target="_blank">
                            <Card.Img variant="top" style={{ objectFit: 'cover', height: '12.5rem', cursor: 'pointer' }} src={albumAtual.imagem} />
                            </a>
                            <ListGroup className="list-group-flush">
                                <ListGroup.Item style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                                    <b>{albumAtual.ano}</b>
                                    {albumAtual.spotify_link && 
                                        (<a href={ albumAtual.spotify_link } target="_blank" rel="noreferrer">
                                            <img alt="Spotify Logo"  src="https://logosmarcas.net/wp-content/uploads/2020/09/Spotify-Emblema.png" height={30}/>
                                        </a>)
                                    }
                                </ListGroup.Item>
                            </ListGroup>
                        </Card>

                        <Card style={{ width: '100%' }}>
                            <Card.Header className="flexBetween"><span># Faixas</span> <b>Duração: {msToMin(albumAtual.duracao_total)}</b></Card.Header>
                            <ListGroup variant="flush">
                                {faixas.map((faixa)=>{
                                    return(
                                        <ListGroup.Item key={faixa.id} className="flexBetween" >
                                            <a href={ faixa.spotify_link } target="_blank" rel="noreferrer" className="faixaNome linkFormat">
                                                {faixa.spotify_link && 
                                                    (<img alt="Spotify Logo" src="https://logosmarcas.net/wp-content/uploads/2020/09/Spotify-Emblema.png" height={30}/>)
                                                }{faixa.nome}
                                            </a>  
                                            <b>{faixa.duracao}</b>
                                        </ListGroup.Item>
                                    )
                                })}
                            </ListGroup>
                        </Card>
                    </div>
                    </Modal.Body>
                </Modal>
            </div>

            <h2>Introdução</h2>
            <div className="Introdução">
                <p>
                    Tião Carreiro & Pardinho foi uma dupla brasileira de música sertaneja, expoente de uma de suas variantes mais tradicionais, a moda de viola, e do pagode de viola, uma variante do cateretê. A dupla era composta pelos músicos José Dias Nunes (Tião Carreiro), responsável pelos solos de viola caipira e pela voz mais grave, e Antônio Henrique de Lima (Pardinho), encarregado do som de base, no violão ou na viola, e da voz mais aguda.
                </p>
                <p>
                    Embora tradicionalmente na música sertaneja a voz mais aguda ocupasse o lugar da primeira voz, a dupla se destacou pela proeminência da voz mais grave, e, consequentemente, na maior parte de suas canções Tião Carreiro realizava a primeira voz. Sua carreira se estendeu por dois períodos, de 1954 a 1978 e 1981 a 1993.
                </p>
                <p>
                    A dupla teve papel fundamental na difusão da música sertaneja junto ao grande público, levando-a dos programas sertanejos das rádios nas madrugadas aos teatros, rodeios e exposições, e para o horário nobre da televisão. 
                </p>
            </div>
            <h2>Discografia</h2>
            <div className="gridDiscografia">
                {albuns.map((album)=>{
                    return (
                        <Card key={album.id} style={{ width: '18rem' }}>
                            <a href={album.spotify_link} rel="noreferrer" target="_blank">
                                <Card.Img style={{ objectFit: 'cover', height: '12.5rem', cursor: 'pointer' }} variant="top" src={album.imagem} />
                            </a>
                            <Card.Body>
                                <Card.Title>{album.nome}</Card.Title>
                                <Card.Text className="flexBetween">
                                <b>{album.ano}</b>  <b>{album.quantidade_faixas} faixas</b>
                                </Card.Text>
                                <Button variant="primary" onClick={()=>{exibirModal(album)}}>Detalhes</Button>
                            </Card.Body>
                        </Card>
                    )
                })}
            </div>
            {!loading && (
                <div style={{ display: 'flex', justifyContent: 'center', marginTop: '1rem', padding: '2rem' }}>
                    <Button variant="primary" onClick={getAlbunsOnDemand}>Carregar mais</Button>
                </div>
            )}
        </div>
    );
};