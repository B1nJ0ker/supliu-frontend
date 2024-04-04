import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Routes } from 'react-router-dom';

import {AlbumIndex} from './components/albuns/AlbumIndex'
import {FaixaIndex} from './components/faixas/FaixaIndex'

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { AlbumProvider } from './context/AlbumContext';
import { FaixaProvider } from './context/FaixaContext';
import { Home } from './components/Home';
import { GlobalProvider } from './context/GlobalContext';
import { LoadingShow } from './components/loading/LoadingShow';

function App() {
  return (
    <GlobalProvider>
      <AlbumProvider>
        <FaixaProvider>
          <Navbar expand="lg" className="bg-body-tertiary">
            <Container>
              <Navbar.Brand href="/">Tião Carreiro e Pardinho</Navbar.Brand>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                  <Nav.Link href="/">Início</Nav.Link>
                  <Nav.Link href="/albuns">Gerenciar Álbuns</Nav.Link>
                  <Nav.Link href="/faixas">Gerenciar Faixas</Nav.Link>
                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>
          <Routes>
            <Route path="/albuns" element={<AlbumIndex />} />
            <Route path="/faixas" element={<FaixaIndex />} />
            <Route path="/" element={<Home />} />
          </Routes>
          <LoadingShow />
        </FaixaProvider>
      </AlbumProvider>
    </GlobalProvider>
  );
}

export default App;
