<div align="center">
  <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/dotnetcore/dotnetcore-original.svg" width="80" height="80" alt="DotNet 8" />
  <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/react/react-original.svg" width="80" height="80" alt="React" />
  
  <h1>📊 FinanceControl Ecosystem</h1>
  <p><strong>Gestão Inteligente de Gastos Residenciais com Persistência Híbrida</strong></p>
  
  <p>
    <img src="https://img.shields.io/badge/.NET-8.0-512bd4?style=for-the-badge&logo=dotnet" />
    <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" />
    <img src="https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge&logo=mysql&logoColor=white" />
    <img src="https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white" />
    <img src="https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white" />
  </p>
</div>

<hr>

<h2>📖 Sobre o Projeto</h2>
<p>
  O <strong>FinanceControl</strong> nasceu da necessidade de um controle financeiro que fosse além de uma simples planilha. É um ecossistema <i>FullStack</i> que separa responsabilidades de forma clara: 
  O <b>MySQL</b> cuida da integridade do seu saldo e contas, enquanto o <b>MongoDB</b> imortaliza cada ação realizada no sistema através de um log de eventos robusto.
</p>

<hr>

<h2>🚀 Quick Start (Deploy Automatizado)</h2>

<p>O projeto está totalmente conteinerizado. O ambiente sobe com isolamento de rede e volumes persistentes.</p>

<h3>1. Preparação do Ambiente</h3>
<pre><code># Clone o repositório
git clone https://github.com/euwellington/FinanceControl.git
cd FinanceControl/Backend/FinanceControl

# Inicie os serviços via Docker
docker-compose up -d</code></pre>

Acesso Swagger: http://localhost:5701/swagger/index.html

<h3>2. Setup do Dashboard (Frontend)</h3>
<p>O frontend utiliza Vite para performance extrema durante o desenvolvimento.</p>
<pre><code>cd FinanceControl/Frontend/financecontro
npm install
npm run dev</code></pre>

Acesso Frontend: http://localhost:5173

<hr>

<h2>🏗️ Arquitetura de Software</h2>

<h3>Backend - ASP.NET Web API 8</h3>
<p>A aplicação segue os princípios da <b>Clean Architecture</b>, garantindo que a lógica de negócio seja independente de frameworks externos.</p>

<ul>
  <li><b>Repository Pattern:</b> Abstração da camada de dados para facilitar testes unitários.</li>
  <li><b>DTO Pattern:</b> Uso extensivo de <i>Data Transfer Objects</i> com <b>AutoMapper</b> para evitar exposição de entidades do banco.</li>
  <li><b>Middleware de Exceções:</b> Tratamento global de erros que retorna respostas padronizadas para o frontend.</li>
  <li><b>Health Checks:</b> Endpoint nativo que monitora se o MySQL e o MongoDB estão online antes da API liberar o tráfego.</li>
</ul>

<h3>Frontend - React + Vite + Shadcn UI</h3>
<p>Desenvolvido com o que há de mais moderno no ecossistema JavaScript (Node 16+):</p>
<ul>
  <li><b>Tailwind CSS:</b> Para um design responsivo e <i>dark mode</i> nativo.</li>
  <li><b>Shadcn/UI:</b> Componentes baseados em Radix UI para acessibilidade total.</li>
  <li><b>Axios:</b> Cliente HTTP configurado com interceptors para renovação de tokens JWT.</li>
</ul>

<hr>

<h2>🛠️ Stack Tecnológica Detalhada</h2>

<table>
  <thead>
    <tr>
      <th>Categoria</th>
      <th>Tecnologia</th>
      <th>Finalidade</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><b>Runtime</b></td>
      <td>.NET 8.0 / Node 16</td>
      <td>Ambiente de execução Backend e Frontend.</td>
    </tr>
    <tr>
      <td><b>SQL DB</b></td>
      <td>MySQL 8.0</td>
      <td>Dados relacionais (Usuários, Contas, Transações).</td>
    </tr>
    <tr>
      <td><b>NoSQL DB</b></td>
      <td>MongoDB</td>
      <td>Logs de auditoria e histórico de mudanças (CRUD).</td>
    </tr>
    <tr>
      <td><b>ORM/Micro-ORM</b></td>
      <td>Dapper & EF Core</td>
      <td>Performance em leituras e facilidade em escritas.</td>
    </tr>
    <tr>
      <td><b>Segurança</b></td>
      <td>JWT / Identity</td>
      <td>Autenticação e Autorização baseada em Claims.</td>
    </tr>
    <tr>
      <td><b>Real-Time</b></td>
      <td>SignalR</td>
      <td>Notificações instantâneas de novos gastos.</td>
    </tr>
  </tbody>
</table>

<hr>

<h2>🗄️ Estratégia de Dados e Persistência</h2>

<h3>Dual-Database Approach</h3>
<p>
  Diferente de sistemas convencionais, aqui aplicamos <b>Polyglot Persistence</b>:
</p>
<ul>
  <li><b>Escrita Relacional:</b> Toda transação financeira é atômica no MySQL. Se o banco falhar, a transação sofre rollback.</li>
  <li><b>Trilha de Auditoria (NoSQL):</b> Cada vez que você cria ou edita um gasto, o <code>MongoDB.Driver</code> serializa o objeto em BSON e salva o estado anterior. Isso permite rastrear quem alterou o quê e quando.</li>
</ul>

<hr>

<h2>📡 Endpoints e Integração</h2>

<p>A API expõe uma documentação viva via <b>Swagger</b>. Com o projeto rodando, acesse:</p>
<pre><code>URL: http://localhost:5701/swagger/index.html</code></pre>

<h3>Fluxo de Comunicação:</h3>
<ol>
  <li>O Frontend faz o login e recebe um <b>Token JWT</b>.</li>
  <li>O token é enviado no Header de cada requisição.</li>
  <li>A API valida o token, processa a lógica, grava no MySQL, gera o log no MongoDB e avisa o Dashboard via <b>SignalR</b>.</li>
</ol>

<hr>

<h2>⚙️ Configurações de Portas</h2>

<ul>
  <li><b>WebAPI:</b> <code>5701</code></li>
  <li><b>Frontend (React):</b> <code>5173</code></li>
  <li><b>MySQL:</b> <code>3306</code></li>
  <li><b>MongoDB:</b> <code>27017</code></li>
</ul>

<hr>

<div align="center">
  <p>Desenvolvido por <a href="https://github.com/euwellington">Wellington</a></p>
</div>
