"use client"

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  Database,
  ShieldCheck,
  Zap,
  FileCode,
  Globe,
  Share2,
  Lock,
  Boxes,
  Workflow,
  HeartPulse,
  LineChart
} from "lucide-react"

const DocBackendOverview = () => {
  const packageReference = [
    { name: "AutoMapper", version: "12.0.0", desc: "Mapeamento automático entre Entidades de Banco e DTOs (Data Transfer Objects), reduzindo código repetitivo e erros de atribuição manual." },
    { name: "JwtBearer & IdentityModel", version: "8.x", desc: "Implementação de segurança baseada em tokens JWT. Gerencia a autenticação, validação de claims e proteção de rotas privadas." },
    { name: "MySql.Data", version: "8.4.0", desc: "Driver oficial para conectividade com o MySQL, permitindo a execução de queries e gestão de transações relacionais." },
    { name: "MongoDB.Driver & Bson", version: "3.6.0", desc: "Ecossistema para interação com o MongoDB. O Bson permite a serialização de documentos JSON binários para alta performance." },
    { name: "Dapper", version: "2.1.66", desc: "Micro-ORM focado em performance extrema. Utilizado para consultas complexas de leitura onde a velocidade é prioridade absoluta." },
    { name: "FluentValidation", version: "12.1.1", desc: "Biblioteca para definição de regras de validação de forma fluida, separando a lógica de validação dos modelos de dados." },
    { name: "Swashbuckle (Swagger)", version: "6.6.2", desc: "Geração automática de documentação interativa da API, permitindo testar todos os endpoints diretamente pelo navegador." },
    { name: "NewtonsoftJson", version: "8.0.23", desc: "Serializador JSON robusto que oferece flexibilidade máxima no tratamento de objetos complexos e referências cíclicas." },
    { name: "SignalR", version: "1.2.9", desc: "Comunicação em tempo real. Permite que o servidor envie notificações para o frontend instantaneamente (ex: atualizações de saldo)." }
  ]

  return (
    <div>
      <div className="flex flex-col gap-16 max-w-6xl pb-24 mx-auto px-4">

        <div className="space-y-6 pt-8 text-center md:text-left">
           <div className="flex items-center gap-2">
            <Badge variant="secondary" className="px-3 py-1 text-xs font-semibold uppercase tracking-wider">
              Finance Control Core
            </Badge>
            <Badge variant="outline" className="px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary border-primary">
              v1.0.0
            </Badge>
          </div>

          <h1 className="text-5xl font-black tracking-tight lg:text-7xl">
            Backend Core
          </h1>

          <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-r-xl max-w-4xl">
            <p className="text-xl text-blue-900 font-medium leading-relaxed">
              O <strong>Finance Control</strong> é um sistema robusto de <strong>Controle de Gastos Pessoais</strong>. 
              Sua missão é fornecer uma infraestrutura segura para que usuários gerenciem suas finanças, 
              categorizem despesas em tempo real e analisem sua saúde financeira através de dados processados.
            </p>
          </div>
        </div>

        <Separator />

        <section className="space-y-8">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-slate-900 rounded-lg shadow-xl">
              <Zap className="h-6 w-6 text-yellow-400" />
            </div>
            <h2 className="text-3xl font-bold italic">Quick Start com Docker</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4 font-mono">
                <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 shadow-2xl">
                    <div className="flex items-center gap-2 mb-4">
                        <div className="w-3 h-3 rounded-full bg-red-500" />
                        <div className="w-3 h-3 rounded-full bg-yellow-500" />
                        <div className="w-3 h-3 rounded-full bg-green-500" />
                    </div>
                    <p className="text-emerald-400"># 1. Clone o projeto</p>
                    <p className="text-white mb-4 italic">git clone https://github.com/euwellington/FinanceControl.git</p>
                    
                    <p className="text-emerald-400"># 2. Inicie a infraestrutura</p>
                    <p className="text-white italic">docker-compose up -d</p>
                </div>
            </div>
            
            <Card className="bg-blue-600 text-white border-none shadow-xl">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <HeartPulse className="h-5 w-5" /> Saúde do Sistema
                    </CardTitle>
                </CardHeader>
                <CardContent className="text-sm space-y-4">
                    <p>O container da API monitora a saúde do MySQL. O serviço só se torna "Ready" após o banco de dados aceitar conexões.</p>
                    <div className="flex items-center gap-4 pt-4 border-t border-white/20">
                        <div className="text-center flex-1">
                            <p className="text-2xl font-bold">5701</p>
                            <p className="text-[10px] uppercase opacity-70">Porta WebAPI</p>
                        </div>
                        <div className="text-center flex-1">
                            <p className="text-2xl font-bold">3306</p>
                            <p className="text-[10px] uppercase opacity-70">Porta MySQL</p>
                        </div>
                    </div>
                </CardContent>
            </Card>
          </div>
        </section>

        <section className="space-y-8">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-600 rounded-lg shadow-lg">
              <Boxes className="h-6 w-6 text-white" />
            </div>
            <h2 className="text-3xl font-bold">Ecossistema de Bibliotecas (NuGet)</h2>
          </div>

          <p className="text-muted-foreground max-w-3xl">
            Cada biblioteca foi selecionada criteriosamente para garantir que o sistema de controle financeiro 
            seja escalável, seguro e fácil de manter.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {packageReference.map((lib, i) => (
              <Card key={i} className="hover:shadow-md transition-shadow border-slate-200">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <Badge variant="secondary" className="text-[10px] font-mono">{lib.version}</Badge>
                    <FileCode className="h-4 w-4 text-slate-400" />
                  </div>
                  <CardTitle className="text-base text-blue-700">{lib.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-xs text-slate-600 leading-relaxed italic">
                    {lib.desc}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section className="space-y-8">
            <div className="flex items-center gap-3">
                <div className="p-2 bg-emerald-600 rounded-lg shadow-lg">
                    <Workflow className="h-6 w-6 text-white" />
                </div>
                <h2 className="text-3xl font-bold">Fluxo de Persistência Híbrido</h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div className="space-y-6">
                    <div className="p-6 bg-white rounded-2xl border shadow-sm space-y-4">
                        <div className="flex items-center gap-3">
                            <Database className="h-6 w-6 text-blue-500" />
                            <h4 className="font-bold">Camada Relacional (MySQL)</h4>
                        </div>
                        <p className="text-sm text-muted-foreground">
                            Armazena os dados mestre do sistema de gastos: usuários, lançamentos, contas e categorias. 
                            Utiliza o <strong>Dapper</strong> para relatórios de performance e o <strong>MySQL Driver</strong> para 
                            operações padrão.
                        </p>
                    </div>

                    <div className="p-6 bg-white rounded-2xl border shadow-sm space-y-4">
                        <div className="flex items-center gap-3">
                            <Share2 className="h-6 w-6 text-emerald-500" />
                            <h4 className="font-bold">Camada Documental (MongoDB)</h4>
                        </div>
                        <p className="text-sm text-muted-foreground">
                            Utiliza <strong>MongoDB.Bson</strong> para processar logs de auditoria e telemetria. 
                            Toda alteração crítica no saldo de um usuário gera um log documental para rastreabilidade futura.
                        </p>
                    </div>
                </div>

                <div className="bg-slate-900 rounded-3xl p-8 text-white space-y-8 relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-4 opacity-10"><LineChart className="h-32 w-32" /></div>
                    <h4 className="text-xl font-bold border-b border-white/10 pb-4">Conformidade e Segurança</h4>
                    <div className="space-y-4">
                        <div className="flex items-center gap-3 text-sm">
                            <Lock className="h-4 w-4 text-emerald-400" />
                            <span>Criptografia MD5 para senhas.</span>
                        </div>
                        <div className="flex items-center gap-3 text-sm">
                            <ShieldCheck className="h-4 w-4 text-emerald-400" />
                            <span>Validação rigorosa via FluentValidation.</span>
                        </div>
                        <div className="flex items-center gap-3 text-sm">
                            <Globe className="h-4 w-4 text-emerald-400" />
                            <span>CORS configurado para o ecossistema Vite.</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <section className="pt-12 text-center space-y-6">
            <Separator />
            <div className="flex flex-col items-center gap-4">
                <p className="text-muted-foreground font-medium italic">
                    "Transformando dados financeiros em decisões inteligentes."
                </p>
                <div className="flex gap-4">
                    <Badge className="bg-slate-200 text-slate-700 border-none">Docker Compose 3.9</Badge>
                    <Badge className="bg-slate-200 text-slate-700 border-none">.NET 8.0</Badge>
                    <Badge className="bg-slate-200 text-slate-700 border-none">Fortaleza-CE (TZ)</Badge>
                </div>
            </div>
        </section>

      </div>
    </div>
  )
}

export default DocBackendOverview