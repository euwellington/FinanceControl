"use client"

import {
  Card,
  CardContent
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  RefreshCcw,
  LineChart,
  ShieldCheck,
  Eye,
  Database,
  Users,
  LayoutDashboard,
  AlertCircle,
  CheckCircle2
} from "lucide-react"
import ImageDashboard from '@/assets/images/doc/frontend/dashboard/dashboard.png'

const DocFrontendDashboard = () => {
  return (
    <div>
      <div className="flex flex-col gap-16 max-w-6xl pb-24 mx-auto px-4">

        <div className="space-y-6 pt-8">
           <div className="flex items-center gap-3">
            <Badge variant="secondary" className="px-4 py-1.5 text-xs font-bold uppercase tracking-widest bg-primary/10 text-primary border-none">
              Dashboard
            </Badge>
          </div>

          <h1 className="text-5xl font-black tracking-tight lg:text-7xl">
            Dashboard Analytics
          </h1>

          <p className="text-xl text-muted-foreground leading-relaxed max-w-4xl">
            A tela de Dashboard é o centro de controle operacional. Sua finalidade principal é 
            proporcionar uma <strong>visualização consolidada</strong> de toda a base de dados (Pessoas, Categorias e Transações), 
            permitindo uma análise rápida da saúde financeira e do fluxo de movimentações em tempo real.
          </p>
        </div>

        <Separator />

        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary rounded-lg shadow-lg shadow-primary/20">
              <Eye className="h-6 w-6 text-primary-foreground" />
            </div>
            <h2 className="text-3xl font-bold">Visual Preview</h2>
          </div>

          <Card className="overflow-hidden border-2 shadow-2xl rounded-2xl bg-white">
            <div className="bg-slate-100 border-b p-3 flex gap-2 items-center">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-400" />
                <div className="w-3 h-3 rounded-full bg-amber-400" />
                <div className="w-3 h-3 rounded-full bg-emerald-400" />
              </div>
              <div className="mx-auto bg-white px-4 py-1 rounded text-[10px] text-slate-400 font-mono w-1/3 text-center border">
                /dashboard
              </div>
            </div>
            <CardContent className="p-0">
              <img 
                src={ImageDashboard}
                alt="Financial Dashboard Analytics" 
                className="w-full h-auto object-cover max-h-[500px]"
              />
            </CardContent>
          </Card>
        </section>

        <section className="space-y-8">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary rounded-lg">
              <LayoutDashboard className="h-6 w-6 text-primary-foreground" />
            </div>
            <h2 className="text-3xl font-bold">Funcionalidade e Lógica</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h3 className="text-xl font-bold flex items-center gap-2">
                <Users className="h-5 w-5 text-blue-500" /> Gestão da Base de Dados
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                A tela serve como um hub de monitoramento para os cadastros de <strong>Pessoas</strong> e <strong>Categorias</strong>. 
                Ela quantifica o volume de dados ativos, permitindo ao gestor entender a escala do ecossistema e a distribuição demográfica 
                através da média de idade dos usuários que realizam transações.
              </p>
            </div>
            <div className="space-y-4">
              <h3 className="text-xl font-bold flex items-center gap-2">
                <LineChart className="h-5 w-5 text-emerald-500" /> Fluxo de Transações
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                O sistema processa o <strong>histórico de fluxo</strong>, listando as 10 transações mais recentes. 
                Cada item é categorizado visualmente entre receita e despesa, fornecendo um rastro de auditoria 
                imediato sobre as últimas movimentações financeiras inseridas na base.
              </p>
            </div>
          </div>
        </section>

        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary rounded-lg">
              <Database className="h-6 w-6 text-primary-foreground" />
            </div>
            <h2 className="text-3xl font-bold">Documentação da API: GET /api/dashboard</h2>
          </div>

          <Card className="border-none bg-slate-50">
            <CardContent className="p-8 space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Badge className="bg-emerald-500 hover:bg-emerald-600">GET</Badge>
                  <code className="ml-3 text-sm font-bold">/api/dashboard</code>
                </div>
                <Badge variant="outline" className="text-xs text-muted-foreground">Auth Required</Badge>
              </div>

              <p className="text-sm text-muted-foreground italic border-l-4 border-primary pl-4">
                Fornece uma visão consolidada de 360 graus da saúde financeira e dados cadastrais, agregando dados das tabelas de transações, pessoas e categorias.
              </p>

              <div className="space-y-4">
                <h4 className="font-bold text-sm uppercase tracking-wider text-slate-500">Response Object (200 OK)</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <ul className="text-sm space-y-2">
                    <li className="flex justify-between border-b pb-1"><span>Contadores de Cadastro</span> <span className="text-primary font-mono font-bold">People, Categories</span></li>
                    <li className="flex justify-between border-b pb-1"><span>Métricas Financeiras</span> <span className="text-primary font-mono font-bold">Revenue, Expenses</span></li>
                    <li className="flex justify-between border-b pb-1"><span>Insights</span> <span className="text-primary font-mono font-bold">AvgAge, netBalance</span></li>
                  </ul>
                  <ul className="text-sm space-y-2">
                    <li className="flex justify-between border-b pb-1"><span>Histórico Recente</span> <span className="text-primary font-mono font-bold">Last 10 Items</span></li>
                    <li className="flex justify-between border-b pb-1"><span>Sinalização</span> <span className="text-primary font-mono font-bold">isPositiveBalance</span></li>
                  </ul>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 pt-4">
                <div className="space-y-2">
                  <span className="text-xs font-mono text-slate-400">Example Success Response:</span>
                  <Card className="bg-slate-950 border-none p-4 overflow-hidden">
                    <pre className="font-mono text-[11px] text-sky-300 leading-tight">
{`{
  "totalCategories": 8,
  "totalPeople": 15,
  "totalTransactions": 142,
  "revenue": 12500.00,
  "expenses": 4200.50,
  "netBalance": 8299.50,
  "avgAgeOfTransactingPeople": 29.5,
  "isPositiveBalance": true,
  "history": [
    {
      "transactionDate": "2026-02-04T15:30:00",
      "amount": 150.00,
      "type": "Expense",
      "description": "Pagamento Internet"
    }
  ]
}`}
                    </pre>
                  </Card>
                </div>

                <div className="space-y-4">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">Error States</h4>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3 p-3 rounded-lg bg-amber-50 border border-amber-100">
                      <AlertCircle className="h-4 w-4 text-amber-600 mt-0.5" />
                      <div>
                        <p className="text-xs font-bold text-amber-900">401 Unauthorized</p>
                        <p className="text-[11px] text-amber-700">Token inválido ou sessão expirada.</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 p-3 rounded-lg bg-red-50 border border-red-100">
                      <AlertCircle className="h-4 w-4 text-red-600 mt-0.5" />
                      <div>
                        <p className="text-xs font-bold text-red-900">500 Internal Error</p>
                        <p className="text-[11px] text-red-700">Falha no processamento dos indicadores financeiros.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary rounded-lg">
              <ShieldCheck className="h-6 w-6 text-primary-foreground" />
            </div>
            <h2 className="text-3xl font-bold">Performance e Reatividade</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-8 bg-blue-50/50 rounded-[3rem] border border-blue-100 space-y-4">
              <div className="h-10 w-10 bg-blue-600 rounded-full flex items-center justify-center shadow-lg shadow-blue-200">
                <RefreshCcw className="h-5 w-5 text-white" />
              </div>
              <h3 className="text-xl font-bold">MobX Store Logic</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Utilizamos o MobX para gerenciar o estado global da dashboard. Ao carregar o componente, 
                a store executa o fetch para <code>/api/dashboard</code>. A reatividade do MobX garante 
                que qualquer nova transação inserida em outros módulos atualize automaticamente os contadores do Dashboard.
              </p>
            </div>

            <div className="p-8 bg-emerald-50/50 rounded-[3rem] border border-emerald-100 space-y-4">
              <div className="h-10 w-10 bg-emerald-600 rounded-full flex items-center justify-center shadow-lg shadow-emerald-200">
                <CheckCircle2 className="h-5 w-5 text-white" />
              </div>
              <h3 className="text-xl font-bold">Skeletons & UX</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Para evitar Layout Shift (CLS), o frontend renderiza placeholders (Skeletons) enquanto o 
                backend calcula as agregações de 360 graus. Isso garante uma percepção de velocidade superior 
                ao usuário final.
              </p>
            </div>
          </div>
        </section>

        <Card className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 border-none text-white overflow-hidden relative">
          <CardContent className="p-16 text-center space-y-6 relative z-10">
            <h3 className="text-4xl font-black text-white">Consolidação de Dados Completa</h3>
            <p className="max-w-2xl mx-auto text-slate-400 text-lg">
              Ao unificar o histórico de fluxo com os indicadores de cadastro, o sistema entrega uma ferramenta 
              analítica poderosa em um único ponto de acesso, otimizando a tomada de decisão.
            </p>
            <div className="flex justify-center gap-8 pt-4">
               <div className="flex flex-col items-center">
                  <span className="text-2xl font-bold text-white">360º</span>
                  <span className="text-[10px] uppercase tracking-widest text-slate-500">Data View</span>
               </div>
               <div className="flex flex-col items-center">
                  <span className="text-2xl font-bold text-white">100%</span>
                  <span className="text-[10px] uppercase tracking-widest text-slate-500">Real-time</span>
               </div>
            </div>
          </CardContent>
        </Card>

      </div>
    </div>
  )
}

export default DocFrontendDashboard