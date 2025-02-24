# 🚀 Teste Prático Frontend

Este projeto é uma aplicação frontend desenvolvida como parte de um teste prático. Ele consome dados de uma API (simulada com JSON Server) e exibe uma lista de funcionários com funcionalidades de busca, filtragem e exibição de detalhes. A aplicação foi construída com React, Tailwind CSS e Vitest para testes.

![](https://github.com/user-attachments/assets/ae77e4aa-0e7e-4120-908d-7514ff4c0b7c)

### 📌 Sobre o Projeto

###### O objetivo deste projeto é demonstrar habilidades em desenvolvimento frontend, incluindo:

- Consumo de API: A aplicação faz requisições HTTP para uma API simulada com JSON Server.

- Interface Responsiva: A tabela de funcionários é exibida de forma otimizada para dispositivos móveis e desktop.

- Funcionalidades de Busca: Os usuários podem pesquisar funcionários por nome, cargo ou telefone. A busca é feita de forma eficiente usando o hook useDebounce, evitando sobrecarga no sistema.

- Testes Automatizados: A aplicação inclui testes unitários e de integração usando Vitest e React Testing Library.


### 🛠️ Tecnologias

- React: Biblioteca JavaScript para construção de interfaces de usuário.

- Vite: Ferramenta de build rápida para desenvolvimento moderno.

- Tailwind CSS: Framework CSS utilitário para estilização rápida e responsiva.

- Vitest: Framework de testes rápido e moderno.

- JSON Server: Simula uma API RESTful para desenvolvimento e testes.

- Lucide React: Biblioteca de ícones para React.

- Date-fns: Biblioteca para manipulação de datas.

- use-debounce: Hook para debounce de funções.


#### 🚀 Como Executar

Como a aplicação foi feita utilizando a versão 19 do react e algumas bibliotecas ainda não tem muito suporte a esta versão do react, então quando for instalar as dependencias utilize o **npm install --legacy-peer-deps**

**1.** **Clone o repositório**
```bash
git clone https://github.com/DanielEgiidio/teste-pratico-frontend
```
**2. ** **Instale as dependências**
```bash
npm install --legacy-peer-deps
```
**3**. **Rode o JSON server**
garanta que você tem instalado globalmente o json server na sua maquina, copie e cole no terminal **npm install -g json-server --legacy-peer-deps**
```bash
 json-server --watch db.json --port 3001
```
**4**. **Execute o projeto**

```bash
npm run start
```

**5**. **Execute os testes unitarios**
```bash
npm run test
```

