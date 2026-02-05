"use client"

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  Globe,
  Layout,
  Layers,
  Package,
  ShieldCheck,
  Component,
  Terminal,
  FileCode,
  Download,
  PlayCircle,
  Github,
  GitBranch,
  ArrowUpRight
} from "lucide-react"

const DocFrontendOverview = () => {
  const libraries = [
    { name: "React 19 & Vite", desc: "Core da aplicação e Build Tool de alta performance para desenvolvimento rápido." },
    { name: "MobX React Lite", desc: "Gerenciamento de estado reativo e simples, focado em performance e mutabilidade controlada." },
    { name: "TanStack Table", desc: "Sistema de tabelas robusto para exibição e manipulação de dados financeiros complexos." },
    { name: "Shadcn/UI & Radix", desc: "Componentes acessíveis e altamente customizáveis (Alert, Dialog, Tabs, Select)." },
    { name: "Framer Motion", desc: "Biblioteca para animações fluidas e interações de interface premium." },
    { name: "Axios", desc: "Cliente HTTP para comunicação com a API .NET, com suporte a interceptors e cancelamento." },
    { name: "React Router 7", desc: "Gerenciamento de rotas e navegação SPA (Single Page Application)." },
    { name: "Recharts", desc: "Visualização de dados através de gráficos de pizza, barras e linhas para controle financeiro." },
    { name: "Tailwind CSS", desc: "Estilização utilitária com suporte a temas e design responsivo via tailwind-merge." },
    { name: "JWT Decode & MD5", desc: "Segurança e utilitários para decodificação de tokens e hashing de strings." },
    { name: "Date-fns", desc: "Manipulação e formatação de datas de forma leve e modular." },
    { name: "Lucide React", desc: "Conjunto de ícones vetoriais consistentes para toda a interface." }
  ]

  return (
    <div>
      <div className="flex flex-col gap-16 max-w-6xl pb-24 mx-auto px-4">

        <div className="space-y-6 pt-8">
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="px-3 py-1 text-xs font-bold uppercase tracking-widest bg-primary/10 text-primary border-none">
              Frontend Ecosystem
            </Badge>
            <Badge variant="outline" className="px-3 py-1 text-xs font-bold uppercase tracking-widest text-emerald-600 border-emerald-200 bg-emerald-50">
              React 19 + Node 22
            </Badge>
          </div>

          <h1 className="text-5xl font-extrabold tracking-tight lg:text-7xl">
            Frontend Architecture
          </h1>

          <p className="text-xl text-muted-foreground leading-relaxed max-w-4xl">
            A interface do <strong>Finance Control</strong> é construída sobre uma stack moderna e performática, 
            utilizando <strong>Vite</strong> para um ciclo de desenvolvimento instantâneo e <strong>TypeScript</strong> para 
            segurança de tipos em toda a aplicação.
          </p>
        </div>

        <Separator />

        <section className="space-y-8">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-slate-900 rounded-lg shadow-lg">
              <Github className="h-6 w-6 text-white" />
            </div>
            <h2 className="text-3xl font-bold">1. Obter o Projeto</h2>
          </div>

          <Card className="border-2 border-slate-200 shadow-sm overflow-hidden">
            <CardContent className="p-0">
              <div className="bg-slate-50 p-6 border-b">
                <p className="text-sm text-muted-foreground mb-4">
                  Clone o repositório oficial do projeto para sua máquina local utilizando o Git:
                </p>
                <div className="flex items-center gap-3">
                  <div className="bg-slate-950 text-sky-400 p-4 rounded-lg font-mono text-sm flex-1 border border-slate-800">
                    git clone https://github.com/euwellington/FinanceControl.git
                  </div>
                </div>
              </div>
              <div className="p-4 bg-white flex items-center justify-between">
                <div className="flex items-center gap-4 text-xs font-medium text-slate-500">
                  <span className="flex items-center gap-1"><GitBranch className="h-3 w-3" /> main branch</span>
                  <span className="flex items-center gap-1"><ShieldCheck className="h-3 w-3" /> Repositório Público</span>
                </div>
                <a 
                  href="https://github.com/euwellington/FinanceControl" 
                  target="_blank" 
                  className="text-xs font-bold text-primary hover:underline flex items-center gap-1"
                >
                  Ver no GitHub <ArrowUpRight className="h-3 w-3" />
                </a>
              </div>
            </CardContent>
          </Card>
        </section>

        <section className="space-y-8">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary rounded-lg shadow-lg">
              <Download className="h-6 w-6 text-primary-foreground" />
            </div>
            <h2 className="text-3xl font-bold">2. Configurar Ambiente</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h3 className="text-xl font-bold flex items-center gap-2 text-primary">
                Gerenciamento de Node (NVM)
              </h3>
              <p className="text-muted-foreground text-sm">
                Utilize o <strong>NVM</strong> para garantir que você está na versão 22 do Node, compatível com o React 19.
              </p>
              <a 
                href="https://github.com/nvm-sh/nvm#installing-and-updating" 
                target="_blank" 
                className="text-primary text-xs font-bold underline flex items-center gap-1 hover:opacity-80"
              >
                Instalar NVM via GitHub <Globe className="h-3 w-3" />
              </a>
              
              <div className="bg-slate-950 p-5 rounded-xl font-mono text-[13px] text-sky-400 space-y-2 border border-slate-800 shadow-inner">
                <p className="text-slate-500 italic"># Instalar e usar versão 22</p>
                <p>nvm install 22</p>
                <p>nvm use 22</p>
                <div className="h-px bg-slate-800 my-2" />
                <p className="text-slate-500 italic"># Confirmar versão</p>
                <p>node -v <span className="text-slate-500"># deve ser v22.x.x</span></p>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-bold flex items-center gap-2 text-emerald-600">
                Instalação e Dev Server
              </h3>
              <p className="text-muted-foreground text-sm">
                Entre na pasta do projeto, instale as dependências e inicie o Vite.
              </p>
              
              <div className="grid grid-cols-1 gap-4">
                <div className="space-y-3">
                   <div className="bg-slate-950 p-4 rounded-xl font-mono text-[12px] border border-slate-800">
                      <p className="text-slate-500 italic"># Entre no diretório</p>
                      <p className="text-white">cd FinanceControl</p>
                      <div className="h-px bg-slate-800 my-2" />
                      <p className="text-slate-500 italic"># Instale e rode (NPM ou Yarn)</p>
                      <p className="text-blue-300">npm install && npm run dev</p>
                      <p className="text-slate-500 my-1">ou</p>
                      <p className="text-purple-300">yarn install && yarn dev</p>
                   </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="space-y-8">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary rounded-lg">
              <Layers className="h-6 w-6 text-primary-foreground" />
            </div>
            <h2 className="text-3xl font-bold">Stack Tecnológica</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {libraries.map((lib, i) => (
              <Card key={i} className="hover:bg-muted/50 transition-all hover:-translate-y-1">
                <CardHeader className="p-4">
                  <div className="flex items-center gap-2">
                    <Package className="h-4 w-4 text-primary" />
                    <CardTitle className="text-sm">{lib.name}</CardTitle>
                  </div>
                  <CardDescription className="text-xs mt-1">
                    {lib.desc}
                  </CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </section>

        <section className="space-y-8">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary rounded-lg">
              <Layout className="h-6 w-6 text-primary-foreground" />
            </div>
            <h2 className="text-3xl font-bold">Estrutura de Diretórios</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="bg-muted/30 border-dashed">
              <CardContent className="p-6">
                <h4 className="font-bold mb-4 flex items-center gap-2">
                  <FileCode className="h-4 w-4" /> Configurações de Root
                </h4>
                <ul className="space-y-2 text-sm font-mono">
                  <li className="flex justify-between"><span>vite.config.ts</span> <Badge variant="outline">Build Config</Badge></li>
                  <li className="flex justify-between"><span>tailwind.config.js</span> <Badge variant="outline">Styles</Badge></li>
                  <li className="flex justify-between"><span>tsconfig.json</span> <Badge variant="outline">TS Config</Badge></li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-muted/30 border-dashed">
              <CardContent className="p-6">
                <h4 className="font-bold mb-4 flex items-center gap-2">
                  <Component className="h-4 w-4" /> Organização do /src
                </h4>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-blue-500"/> <strong>components:</strong> Shadcn e Layouts</li>
                  <li className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-purple-500"/> <strong>services:</strong> Axios e MobX</li>
                  <li className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-orange-500"/> <strong>pages:</strong> Views da Aplicação</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>

        <section className="space-y-6">
          <Card className="bg-slate-900 border-none overflow-hidden group">
            <CardContent className="p-12 relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">
              <div className="space-y-6 max-w-xl">
                <div className="flex items-center gap-2 text-primary font-bold tracking-widest uppercase text-xs">
                  <PlayCircle className="h-4 w-4" /> Ambiente pronto
                </div>
                <h3 className="text-4xl font-bold text-white">Servidor Local</h3>
                <p className="text-slate-400 text-lg leading-relaxed">
                  Com o Node 22 e as dependências instaladas, o Vite servirá a aplicação com 
                  HMR (Hot Module Replacement) instantâneo.
                </p>
                <div className="bg-white p-4 rounded-xl flex items-center justify-between group-hover:ring-2 ring-primary transition-all">
                  <code className="text-black font-mono font-bold">http://localhost:5173/</code>
                  <Terminal className="h-5 w-5 text-black opacity-20" />
                </div>
              </div>
              <div className="hidden lg:block p-8 bg-primary/20 rounded-full animate-pulse">
                <div className="text-primary font-bold text-6xl italic">VITE</div>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  )
}

export default DocFrontendOverview