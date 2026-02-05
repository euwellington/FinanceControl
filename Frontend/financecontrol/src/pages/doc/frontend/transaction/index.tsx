"use client"

import SidebarLayout from "@/components/layoutmain"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  ArrowLeftRight,
  List,
  PlusCircle,
  RefreshCcw,
  Info,
  ShieldCheck,
  Server,
  Terminal,
  Filter,
  Scale
} from "lucide-react"

import ImageHome from '@/assets/images/doc/frontend/transaction/home.png'
import ImageAdd from '@/assets/images/doc/frontend/transaction/add.png'
import ImageEdit from '@/assets/images/doc/frontend/transaction/edit.png'

const DocFrontendTransaction = () => {
  return (
    <div>
      <div className="flex flex-col gap-16 max-w-6xl pb-24 mx-auto px-4">

        <div className="space-y-6 pt-8">
          <div className="flex items-center gap-3">
            <Badge variant="secondary" className="px-4 py-1.5 text-xs font-bold uppercase tracking-widest bg-emerald-500/10 text-emerald-600 border-none">
              Movimentação Financeira
            </Badge>
          </div>

          <h1 className="text-5xl font-extrabold tracking-tight lg:text-7xl">
            Transações
          </h1>

          <p className="text-xl text-muted-foreground leading-relaxed max-w-4xl">
            O módulo de <strong>Transações</strong> é onde o fluxo de caixa acontece. Ele conecta 
            Pessoas a Categorias, registrando cada centavo que entra ou sai com validações 
            rígidas para garantir que as contas sempre batam.
          </p>
        </div>

        <Separator />

        <section className="space-y-10">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary rounded-lg shadow-lg">
              <List className="h-6 w-6 text-primary-foreground" />
            </div>
            <h2 className="text-3xl font-bold">Interfaces de Lançamento</h2>
          </div>

          <div className="grid grid-cols-1 gap-12">
            <div className="space-y-4">
              <h3 className="text-xl font-bold flex items-center gap-2">
                <Filter className="h-5 w-5 text-blue-500" /> 1. Histórico de Movimentações
              </h3>
              <p className="text-muted-foreground text-sm">
                Visualização detalhada de todas as receitas e despesas. Permite filtrar por pessoa, 
                categoria, valor e tipo de transação (Income/Expense) usando busca paginada.
              </p>
              <Card className="overflow-hidden border-2 shadow-xl rounded-2xl">
                <CardContent className="p-0">
                  <img src={ImageHome} alt="Transaction List View" className="w-full h-[500px] object-cover" />
                </CardContent>
              </Card>
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-bold flex items-center gap-2">
                <PlusCircle className="h-5 w-5 text-emerald-500" /> 2. Novo Lançamento
              </h3>
              <p className="text-muted-foreground text-sm">
                Interface para registrar valores. O sistema exige a vinculação de um responsável (Pessoa) 
                e um motivo (Categoria), validando as regras de idade e propósito no ato da criação.
              </p>
              <Card className="overflow-hidden border-2 shadow-xl rounded-2xl">
                <CardContent className="p-0">
                  <img src={ImageAdd} alt="Create Transaction" className="w-full h-[500px] object-cover" />
                </CardContent>
              </Card>
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-bold flex items-center gap-2">
                <RefreshCcw className="h-5 w-5 text-amber-500" /> 3. Ajuste de Dados
              </h3>
              <p className="text-muted-foreground text-sm">
                Permite corrigir descrições ou valores de transações existentes. Toda alteração 
                atualiza automaticamente o carimbo de tempo <code>updatedAt</code> para auditoria.
              </p>
              <Card className="overflow-hidden border-2 shadow-xl rounded-2xl">
                <CardContent className="p-0">
                  <img src={ImageEdit} alt="Transaction Maintenance" className="w-full h-[500px] object-cover" />
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
            <h2 className="text-3xl font-bold">API Reference</h2>
          </div>

          <div className="grid grid-cols-1 gap-6">
            <Card className="border-l-4 border-l-blue-500 hover:shadow-md transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between py-4">
                <div className="flex items-center gap-4">
                  <Badge className="bg-blue-600 font-mono">GET</Badge>
                  <code className="text-sm font-bold">/api/transaction</code>
                </div>
                <Badge variant="outline">Pagination & Search</Badge>
              </CardHeader>
              <CardContent className="space-y-4 text-sm border-t pt-4">
                <p className="text-muted-foreground">Recupera transações com metadados de paginação. Retorna detalhes como IDs de categoria/pessoa, valor e timestamps.</p>
                <div className="bg-slate-950 p-4 rounded-lg font-mono text-[11px] text-sky-300 overflow-x-auto">
                  {`{
  "page": 1, "pageSize": 10, "totalRecords": 5,
  "data": [ { "id": "GUID", "description": "Salário", "amount": 5000, "type": "Income" } ]
}`}
                </div>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-emerald-500 hover:shadow-md transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between py-4">
                <div className="flex items-center gap-4">
                  <Badge className="bg-emerald-600 font-mono">POST</Badge>
                  <code className="text-sm font-bold">/api/transaction</code>
                </div>
                <PlusCircle className="h-5 w-5 text-emerald-600 opacity-40" />
              </CardHeader>
              <CardContent className="space-y-4 text-sm border-t pt-4">
                <p className="text-muted-foreground">Cria uma transação vinculada. Requer <code>categoryId</code>, <code>personId</code>, <code>amount</code> e <code>type</code>.</p>
                <div className="bg-slate-950 p-4 rounded-lg font-mono text-[11px] text-emerald-300">
                  {`{ "categoryId": "GUID", "personId": "GUID", "amount": 1200, "type": "Income" }`}
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary rounded-lg">
              <ShieldCheck className="h-6 w-6 text-primary-foreground" />
            </div>
            <h2 className="text-3xl font-bold">Regras de Negócio & Validação</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="bg-slate-50 border-2 border-dashed">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2 text-primary">
                  <Scale className="h-5 w-5" /> Regras do FluentValidation
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-3 bg-white rounded-lg border flex flex-col gap-1">
                  <span className="font-bold text-xs">Proteção de Menores</span>
                  <p className="text-[11px] text-muted-foreground">Menores de 18 anos são proibidos de registrar Receitas (Income). Apenas Despesas são aceitas.</p>
                </div>
                <div className="p-3 bg-white rounded-lg border flex flex-col gap-1">
                  <span className="font-bold text-xs">Conformidade de Categoria</span>
                  <p className="text-[11px] text-muted-foreground">O tipo da transação deve ser compatível com o propósito da categoria escolhida.</p>
                </div>
                <div className="p-3 bg-white rounded-lg border flex flex-col gap-1">
                  <span className="font-bold text-xs">Valores Positivos</span>
                  <p className="text-[11px] text-muted-foreground">O campo valor (Amount) nunca pode ser zero ou negativo.</p>
                </div>
              </CardContent>
            </Card>

            <div className="rounded-xl bg-slate-950 p-6 border border-slate-800 shadow-inner">
              <div className="flex items-center justify-between mb-4 border-b border-slate-800 pb-2">
                <span className="text-xs font-mono text-slate-500 uppercase tracking-widest">C# Validation Logic</span>
                <Terminal className="h-4 w-4 text-slate-500" />
              </div>
              <pre className="font-mono text-[12px] text-blue-400 leading-relaxed overflow-x-auto">
                {`// Exemplo do Validador
if (person.Age < 18 && 
    transaction.Type != Income) 
{
    return "Menor só pode despesas";
}

if (transaction.Type != category.Purpose) 
{
    return "Tipo incompatível";
}`}
              </pre>
            </div>
          </div>
        </section>

        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary rounded-lg">
              <Info className="h-6 w-6 text-primary-foreground" />
            </div>
            <h2 className="text-3xl font-bold">Conclusão</h2>
          </div>

          <Card className="bg-slate-900 border-none overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 p-8 opacity-10">
              <ArrowLeftRight className="h-48 w-48 text-white" />
            </div>
            <CardContent className="p-12 relative z-10">
              <div className="max-w-3xl space-y-6">
                <h3 className="text-3xl font-bold text-white">Integridade e Auditoria</h3>
                <p className="text-slate-300 text-lg leading-relaxed">
                  Sem uma pessoa ou categoria válida, não há transação. Este módulo garante que cada 
                  centavo movimentado tenha um dono e um histórico rastreável, impedindo inconsistências 
                  financeiras e garantindo relatórios 100% confiáveis.
                </p>
                <div className="flex flex-wrap gap-4 pt-4">
                  <Badge variant="secondary" className="bg-white/5 text-white hover:bg-white/10">Validação Assíncrona</Badge>
                  <Badge variant="secondary" className="bg-white/5 text-white hover:bg-white/10">Rastreio de GUIDs</Badge>
                  <Badge variant="secondary" className="bg-white/5 text-white hover:bg-white/10">Timestamps Automáticos</Badge>
                  <Badge variant="secondary" className="bg-white/5 text-white hover:bg-white/10">Fiscais e Auditáveis</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

      </div>
    </div>
  )
}

export default DocFrontendTransaction