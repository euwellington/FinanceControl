"use client"

import SidebarLayout from "@/components/layoutmain"
import {
  Card,
  CardContent,
  CardHeader,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  Users,
  ShieldCheck,
  UserPlus,
  UserMinus,
  Info,
  Layers,
  Server,
  Clock,
  RefreshCcw,
  Mail,
  Lock,
  ListFilter
} from "lucide-react"
import ImageHome from '@/assets/images/doc/frontend/people/home.png'
import ImageAdd from '@/assets/images/doc/frontend/people/register.png'
import ImageEdit from '@/assets/images/doc/frontend/people/edit.png'

const DocFrontendPeople = () => {
  return (
    <div>
      <div className="flex flex-col gap-16 max-w-6xl pb-24 mx-auto px-4">

        <div className="space-y-6 pt-8">
           <div className="flex items-center gap-3">
            <Badge variant="secondary" className="px-4 py-1.5 text-xs font-bold uppercase tracking-widest bg-primary/10 text-primary border-none">
              Identidade & Acesso
            </Badge>
          </div>

          <h1 className="text-5xl font-extrabold tracking-tight lg:text-7xl">
            Gerenciamento de pessoas
          </h1>

          <p className="text-xl text-muted-foreground leading-relaxed max-w-4xl">
            O módulo <strong>Pessoas</strong> gerencia os perfis de usuários e entidades. É a base identitária do sistema, 
            armazenando desde dados demográficos (como idade e e-mail) até o rastreio de sessões (login/logout), 
            sendo essencial para vincular transações financeiras a responsáveis reais.
          </p>
        </div>

        <Separator />

        <section className="space-y-10">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary rounded-lg shadow-lg">
              <Layers className="h-6 w-6 text-primary-foreground" />
            </div>
            <h2 className="text-3xl font-bold">Interfaces do Módulo</h2>
          </div>

          <div className="grid grid-cols-1 gap-12">
            <div className="space-y-4">
              <h3 className="text-xl font-bold flex items-center gap-2">
                <ListFilter className="h-5 w-5 text-blue-500" /> 1. Listagem e Pesquisa Paginada
              </h3>
              <p className="text-muted-foreground text-sm">
                A tela principal utiliza paginação para lidar com grandes volumes de dados, permitindo filtros por nome, idade e e-mail.
              </p>
              <Card className="overflow-hidden border-2 shadow-xl rounded-2xl">
                <CardContent className="p-0">
                  <img src={ImageHome} alt="People List View" className="w-full h-[400px] object-cover" />
                </CardContent>
              </Card>
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-bold flex items-center gap-2">
                <UserPlus className="h-5 w-5 text-emerald-500" /> 2. Cadastro de Nova Pessoa
              </h3>
              <p className="text-muted-foreground text-sm">
                Interface de criação com validação em tempo real de e-mail e força de senha (criptografada em MD5 no backend).
              </p>
              <Card className="overflow-hidden border-2 shadow-xl rounded-2xl">
                <CardContent className="p-0">
                  <img src={ImageAdd} alt="Add Person View" className="w-full h-[400px] object-cover" />
                </CardContent>
              </Card>
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-bold flex items-center gap-2">
                <RefreshCcw className="h-5 w-5 text-amber-500" /> 3. Edição
              </h3>
              <p className="text-muted-foreground text-sm">
                Painel de edição para atualização de dados cadastrais e opção de remoção com proteção contra exclusão de pessoas com transações ativas.
              </p>
              <Card className="overflow-hidden border-2 shadow-xl rounded-2xl">
                <CardContent className="p-0">
                  <img src={ImageEdit} alt="Edit/Delete View" className="w-full h-[400px] object-cover" />
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section className="space-y-8">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary rounded-lg">
              <Server className="h-6 w-6 text-primary-foreground" />
            </div>
            <h2 className="text-3xl font-bold">Endpoints da API</h2>
          </div>

          <div className="grid grid-cols-1 gap-6">
            <Card className="border-l-4 border-l-blue-500">
              <CardHeader className="flex flex-row items-center justify-between py-4">
                <div className="flex items-center gap-4">
                  <Badge className="bg-blue-600 font-mono">GET</Badge>
                  <code className="text-sm font-bold">/api/people</code>
                </div>
                <Badge variant="outline">Pagination (Page & PageSize)</Badge>
              </CardHeader>
              <CardContent className="space-y-4 text-sm border-t pt-4">
                <p className="text-muted-foreground">Recupera a lista paginada. Retorna metadados como <code>totalRecords</code> e <code>totalPages</code>.</p>
                <div className="bg-slate-950 p-4 rounded-lg font-mono text-[11px] text-sky-300">
                  {`// Response Example
{
  "page": 1, "totalRecords": 42,
  "data": [{ "id": "GUID", "name": "Francisco...", "email": "francisco@example.com" }]
}`}
                </div>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-emerald-500">
              <CardHeader className="flex flex-row items-center justify-between py-4">
                <div className="flex items-center gap-4">
                  <Badge className="bg-emerald-600 font-mono">POST</Badge>
                  <code className="text-sm font-bold">/api/people</code>
                </div>
                <Lock className="h-4 w-4 text-emerald-600" />
              </CardHeader>
              <CardContent className="space-y-4 text-sm border-t pt-4">
                <p className="text-muted-foreground">Cria um novo usuário. Requer <strong>name, age, email</strong> e <strong>password</strong>. Senhas são enviadas em MD5.</p>
                <div className="bg-slate-950 p-4 rounded-lg font-mono text-[11px] text-pink-300">
                  {`// Request Body
{ "name": "Maria Silva", "age": 28, "email": "maria@mail.com", "password": "hash" }`}
                </div>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-amber-500">
              <CardHeader className="flex flex-row items-center justify-between py-4">
                <div className="flex items-center gap-4">
                  <Badge className="bg-amber-600 font-mono">PUT</Badge>
                  <code className="text-sm font-bold">/api/people</code>
                </div>
                <RefreshCcw className="h-4 w-4 text-amber-600" />
              </CardHeader>
              <CardContent className="text-sm border-t pt-4 text-muted-foreground">
                Atualiza os dados de uma pessoa identificada pelo seu <strong>ID (GUID)</strong>. Caso o ID não seja encontrado, retorna 400 Bad Request.
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-red-500">
              <CardHeader className="flex flex-row items-center justify-between py-4">
                <div className="flex items-center gap-4">
                  <Badge className="bg-red-600 font-mono">DELETE</Badge>
                  <code className="text-sm font-bold">/api/people/{"{id}"}</code>
                </div>
                <UserMinus className="h-4 w-4 text-red-600" />
              </CardHeader>
              <CardContent className="text-sm border-t pt-4 text-muted-foreground">
                Remove o registro. A operação pode falhar (400) se existirem transações financeiras vinculadas à pessoa, preservando a integridade da base.
              </CardContent>
            </Card>
          </div>
        </section>

        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary rounded-lg">
              <Info className="h-6 w-6 text-primary-foreground" />
            </div>
            <h2 className="text-3xl font-bold">Atributos e Auditoria</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
             <div className="p-6 bg-slate-50 rounded-2xl border space-y-2">
                <Clock className="h-5 w-5 text-blue-500" />
                <h4 className="font-bold">Rastreio Temporal</h4>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  O sistema monitora <code>lastLogin</code> e <code>lastLogout</code>, oferecendo visibilidade sobre o engajamento do usuário.
                </p>
             </div>
             <div className="p-6 bg-slate-50 rounded-2xl border space-y-2">
                <ShieldCheck className="h-5 w-5 text-emerald-500" />
                <h4 className="font-bold">GUID Unificado</h4>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Toda a comunicação frontend-backend utiliza identificadores únicos globais para evitar colisões de dados.
                </p>
             </div>
             <div className="p-6 bg-slate-50 rounded-2xl border space-y-2">
                <Mail className="h-5 w-5 text-indigo-500" />
                <h4 className="font-bold">E-mail Único</h4>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  O e-mail serve como chave de identificação secundária, sendo obrigatório e validado por regex no frontend.
                </p>
             </div>
          </div>
        </section>

        <Card className="bg-primary text-primary-foreground border-none shadow-2xl overflow-hidden">
          <CardContent className="p-12 relative">
            <div className="absolute top-0 right-0 p-8 opacity-20">
               <Users className="h-48 w-48 text-white" />
            </div>
            <div className="max-w-3xl space-y-6 relative z-10">
              <h3 className="text-3xl font-bold">Base Sólida para Transações</h3>
              <p className="text-primary-foreground/90 text-lg leading-relaxed">
                Sem uma pessoa válida, não há transação. Este módulo garante que cada centavo movimentado 
                tenha um dono e um histórico auditável, desde a criação (createdAt) até a última modificação (updatedAt).
              </p>
            </div>
          </CardContent>
        </Card>

      </div>
    </div>
  )
}

export default DocFrontendPeople