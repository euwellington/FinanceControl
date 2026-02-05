"use client"

import SidebarLayout from "@/components/layoutmain"
import {
  Card,
  CardContent,
  CardHeader
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  BarChart3,
  Users,
  Layers,
  TrendingUp,
  PieChart,
  Calculator,
  Filter,
  Server
} from "lucide-react"

import ImagePeopleReport from '@/assets/images/doc/frontend/report/people.png'
import ImageCategoryReport from '@/assets/images/doc/frontend/report/category.png'

const DocFrontendReport = () => {
  return (
    <div>
      <div className="flex flex-col gap-16 max-w-6xl pb-24 mx-auto px-4">

        <div className="space-y-6 pt-8">
          <div className="flex items-center gap-3">
            <Badge variant="secondary" className="px-4 py-1.5 text-xs font-bold uppercase tracking-widest bg-blue-500/10 text-blue-600 border-none">
              Inteligência de Dados
            </Badge>
          </div>

          <h1 className="text-5xl font-extrabold tracking-tight lg:text-7xl">
            Relatórios
          </h1>

          <p className="text-xl text-muted-foreground leading-relaxed max-w-4xl">
            O módulo de <strong>Relatórios</strong> consolida todos os dados do sistema. Ele transforma 
            milhares de transações em visões estratégicas, permitindo analisar o saldo por pessoa ou 
            por categoria com cálculos automáticos de receitas e despesas.
          </p>
        </div>

        <Separator />

        <section className="space-y-10">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary rounded-lg shadow-lg">
              <BarChart3 className="h-6 w-6 text-primary-foreground" />
            </div>
            <h2 className="text-3xl font-bold">Interfaces de Análise</h2>
          </div>

          <div className="grid grid-cols-1 gap-12">
            <div className="space-y-4">
              <h3 className="text-xl font-bold flex items-center gap-2">
                <Users className="h-5 w-5 text-indigo-500" /> 1. Totais por Pessoa
              </h3>
              <p className="text-muted-foreground text-sm">
                Lista paginada que mostra quanto cada pessoa movimentou. O sistema calcula o 
                <strong> saldo líquido</strong> (Receitas - Despesas) individualmente e exibe o total geral do grupo.
              </p>
              <Card className="overflow-hidden border-2 shadow-xl rounded-2xl">
                <CardContent className="p-0">
                  <img src={ImagePeopleReport} alt="Relatório por Pessoa" className="w-full h-[500px] object-cover" />
                </CardContent>
              </Card>
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-bold flex items-center gap-2">
                <Layers className="h-5 w-5 text-emerald-500" /> 2. Desempenho por Categoria
              </h3>
              <p className="text-muted-foreground text-sm">
                Visão focada na taxonomia financeira. Permite identificar quais categorias 
                consomem mais recursos ou geram mais entradas no período selecionado.
              </p>
              <Card className="overflow-hidden border-2 shadow-xl rounded-2xl">
                <CardContent className="p-0">
                  <img src={ImageCategoryReport} alt="Relatório por Categoria" className="w-full h-[500px] object-cover" />
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
            <h2 className="text-3xl font-bold">API de Agregação</h2>
          </div>

          <div className="grid grid-cols-1 gap-6">
            <Card className="border-l-4 border-l-indigo-500">
              <CardHeader className="flex flex-row items-center justify-between py-4">
                <div className="flex items-center gap-4">
                  <Badge className="bg-indigo-600 font-mono">GET</Badge>
                  <code className="text-sm font-bold">/api/report/transactionspeople</code>
                </div>
                <Badge variant="outline">Cálculo de Saldo (Balance)</Badge>
              </CardHeader>
              <CardContent className="space-y-4 text-sm border-t pt-4">
                <p className="text-muted-foreground">Retorna o balanço financeiro agrupado por usuários. Ideal para dashboards de gestão de equipe ou família.</p>
                <div className="bg-slate-950 p-4 rounded-lg font-mono text-[11px] text-indigo-300 overflow-x-auto">
                  {`{
  "totalsByPerson": [
    { "name": "Francisco Wellington", "totalIncome": 5000, "totalExpense": 2000, "balance": 3000 }
  ],
  "totalIncome": 12000, "totalExpense": 8000, "totalBalance": 4000
}`}
                </div>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-emerald-500">
              <CardHeader className="flex flex-row items-center justify-between py-4">
                <div className="flex items-center gap-4">
                  <Badge className="bg-emerald-600 font-mono">GET</Badge>
                  <code className="text-sm font-bold">/api/report/transactionscategory</code>
                </div>
                <Badge variant="outline">Agrupamento Taxonômico</Badge>
              </CardHeader>
              <CardContent className="space-y-4 text-sm border-t pt-4">
                <p className="text-muted-foreground">Consolida os valores baseando-se nas categorias. Útil para identificar "ralos" de dinheiro ou fontes de renda.</p>
                <div className="bg-slate-950 p-4 rounded-lg font-mono text-[11px] text-emerald-300 overflow-x-auto">
                  {`{
  "totalsByCategory": [
    { "name": "Salário", "totalIncome": 5000, "totalExpense": 0, "balance": 5000 }
  ],
  "totalBalance": 11000
}`}
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary rounded-lg">
              <Calculator className="h-6 w-6 text-primary-foreground" />
            </div>
            <h2 className="text-3xl font-bold">Lógica de Processamento</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
             <div className="p-6 bg-slate-50 rounded-2xl border space-y-2">
                <TrendingUp className="h-5 w-5 text-blue-500" />
                <h4 className="font-bold">Soma em Tempo Real</h4>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Os relatórios não são estáticos. Toda vez que uma transação é criada, o relatório 
                  reflete o novo saldo instantaneamente.
                </p>
             </div>
             <div className="p-6 bg-slate-50 rounded-2xl border space-y-2">
                <PieChart className="h-5 w-5 text-purple-500" />
                <h4 className="font-bold">Saldo Global</h4>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  A API sempre envia o <code>totalBalance</code> global, permitindo exibir widgets de resumo 
                  sem precisar de chamadas extras.
                </p>
             </div>
             <div className="p-6 bg-slate-50 rounded-2xl border space-y-2">
                <Filter className="h-5 w-5 text-amber-500" />
                <h4 className="font-bold">Filtros de Pesquisa</h4>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  É possível buscar pessoas ou categorias específicas dentro dos relatórios, 
                  facilitando a auditoria de dados.
                </p>
             </div>
          </div>
        </section>

        <Card className="bg-primary text-primary-foreground border-none shadow-2xl overflow-hidden">
          <CardContent className="p-12 relative">
            <div className="absolute top-0 right-0 p-8 opacity-20">
               <PieChart className="h-48 w-48 text-white" />
            </div>
            <div className="max-w-3xl space-y-6 relative z-10">
              <h3 className="text-3xl font-bold">Visão Clara do seu Dinheiro</h3>
              <p className="text-primary-foreground/90 text-lg leading-relaxed">
                Este módulo é o destino final de todos os dados do Finance Control. Através de 
                cálculos precisos de <code>Income</code> e <code>Expense</code>, entregamos uma 
                interface que permite entender exatamente onde os recursos estão sendo alocados.
              </p>
              <div className="flex gap-3">
                <Badge variant="secondary" className="bg-white/20 text-white border-none">Paginação SQL</Badge>
                <Badge variant="secondary" className="bg-white/20 text-white border-none">Agrupamento Dinâmico</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

      </div>
    </div>
  )
}

export default DocFrontendReport