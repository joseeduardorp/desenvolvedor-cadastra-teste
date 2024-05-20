# Desenvolvedor Cadastra

Uma simples página de e-commerce com funções de filtro, ordenação e gerenciamento do carrinho, desenvolvido como parte do teste técnico do processo seletivo da empresa Cadastra.

## Descrição

Este projeto é uma aplicação front-end de e-commerce que permite aos usuários filtrar produtos por cor, tamanho e faixa de preço, ordenar produtos por mais recentes, maior preço e menor preço, adicionar itens ao carrinho e limpar o carrinho de compras. O design é mobile first, garantindo uma ótima experiência em dispositivos móveis e responsividade para diferentes tamanhos de tela.

## Tecnologias Utilizadas

- HTML
- CSS
- TypeScript
- Gulp
- Webpack

## Instalação

Siga as etapas abaixo para instalar e executar o projeto localmente:

1. Clone o repositório:

   ```bash
   git clone https://github.com/joseeduardorp/desenvolvedor-cadastra-teste.git
   cd desenvolvedor-cadastra-teste
   ```

2. Instale as dependências do projeto:

   ```bash
   npm install
   ```

## Uso

Para iniciar a aplicação, execute o comando abaixo e acesse `http://localhost:3000` no seu navegador:

```bash
npm start
```

## Funcionalidades Principais

- **Filtragem de Produtos:** Filtrar produtos por cor, tamanho e faixa de preço.
- **Ordenação de Produtos:** Ordenar produtos por mais recentes, maior preço e menor preço.
- **Gerenciamento do Carrinho:** Adicionar itens ao carrinho e limpar o carrinho de compras.
- **Mobile First:** Design pensado primeiramente para dispositivos móveis.
- **Responsividade:** Interface responsiva que se adapta a diferentes tamanhos de tela.
- **Metodologia BEM:** Utilização da metodologia BEM (Block-Element-Modifier) nos códigos de estilo.

## Estrutura de Pastas

Abaixo está a estrutura de pastas do projeto para ajudar na navegação e entendimento da organização do código:

```txt
desenvolvedor-cadastra-teste/
│
├── dist/                   # Arquivos de distribuição gerados pelo Gulp
├── src/                    # Código-fonte do projeto
│   ├── img/                # Imagens usadas no projeto
│   ├── scss/               # Arquivos SCSS
│   │   ├── components/     # Arquivos de estilização de componentes
│   │   ├── layout/         # Estilização de elementos estáticos da página como header e footer
│   │   ├── utils/          # Arquivos SCSS utilitários como variáveis de cor, placeholders e mixins
│   │   ├── main.scss       # Arquivo com importações dos módulos e estilos da página inicial
│   │   └── reset.scss      # Reinicia os estilos das tags HTML
│   ├── ts/                 # Arquivos JavaScript e TypeScript
│   │   ├── index.ts        # Ponto de entrada principal do TypeScript
│   │   └── Product.ts      # Interface dos produtos
│   ├── index.html          # Página principal do e-commerce
├── ...                     # Outros arquivos de configuração
├── gulpfile.js             # Configuração do Gulp
├── package.json            # Configurações do npm e dependências do projeto
├── README.md               # Documentação do projeto
└── webpack.config.js       # Configuração do Webpack
```

## Contato

Entre em contato através de:

- E-mail: [joseeduardorperes@gmail.com](mailto:joseeduardorperes@gmail.com).
- LinkedIn: [José Eduardo](https://www.linkedin.com/in/joseeduardorp/).
