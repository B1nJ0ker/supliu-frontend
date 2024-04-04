# Desafio Supliu
## Requisitos
 * [Node 20.12.0+](https://nodejs.org/en)
 * [npm 10.5.0+](https://www.npmjs.com/)
 * [React 18.2.0](https://react.dev/)

## Funcionalidades

* ### Páginas
Existem ao todo 3 Páginas: 
1. ```/``` - **Início** : Exibe uma breve introdução e todos os álbuns com seus detalhes por meio de scroll infinito, também é possível visualizar todas as faixas de cada álbum;
1. ```/albuns``` - **Gerenciar Álbuns**: Permite listar todos os álbuns já cadastrados, organizar a lista, pesquisar pelo nome, adicionar um novo álbum, editar e remover. Além disso, também é possível adicionar ou remover faixas dos álbuns;
1. ```/faixas``` - **Gerenciar Faixas**: Permite listar todas as faixas já cadastradas, organizar a lista, pesquisar pelo nome, adicionar uma nova faixa (que deve ser atribuída a, pelo menos, um álbum), editar e remover.

* ### Validação dos dados:
Os formulários são validados por meio do próprio HTML. O React Bootstrap facilita a integração desses recursos de validação HTML5 em componentes, permitindo utilizar os mesmos atributos e comportamentos que teria em um formulário HTML regular, mas com a conveniência e a estilização adicionais fornecidas pelos componentes do Bootstrap.

 ###### Álbum

1. ```nome```: Required|String|Unique|Max:100;
1. ```ano```: Required|Integer|Digits:4;
1. ```imagem```: String;
1. ```spotify_link```: String.

 ###### Faixa

1. ```nome```: Required|String|Unique|Max:100;
1. ```duracao```: Required; (Formato ``mm:ss`` - Ex.: 05:20)
1. ```spotify_link```: String.
1. ```albuns```: Required|Array. (Checkbox)


## Instalação
* ### Node
Baixar e instalar o [Node.JS](https://nodejs.org/en).

### Configuração
* #### Dependências
Instale as dependências com ```npm install```

* #### Configurar a URL da API
No arquivo ```\src\context\GlobalContext.js``` edite a URL caso seja necessário:
```bash
const apiURL = "http://URL_DA_API/api/";
```
* ### Iniciar servidor: `npm start`

# Bibliotecas Externas 
* #### [Jquery](https://github.com/jquery/jquery) - [Jquery Mask Plugin](https://github.com/igorescobar/jQuery-Mask-Plugin)
* #### [React Bootstrap](https://github.com/react-bootstrap/react-bootstrap)
* #### [Axios](https://github.com/axios/axios)
