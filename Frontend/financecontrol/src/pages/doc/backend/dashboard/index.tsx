"use client"

import {
  Card,
  CardContent
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  BarChart3,
  LayoutDashboard,
  Users,
  TrendingUp,
  TrendingDown,
  Wallet,
  ShieldCheck,
  Activity,
  History,
  Server,
  Code2,
  PieChart as PieIcon
} from "lucide-react"

const DocBackendDashboard = () => {
  return (
    <div>
      <div className="flex flex-col gap-16 max-w-6xl pb-24 mx-auto px-4">

        <div className="space-y-6 pt-8 text-center md:text-left">
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="px-3 py-1 text-xs font-semibold uppercase tracking-wider">
              Analytics Engine
            </Badge>
            <Badge variant="outline" className="px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary border-primary">
              v1.0.0
            </Badge>
          </div>

          <h1 className="text-5xl font-black tracking-tight lg:text-7xl">
            Dashboard Controller
          </h1>

          <p className="text-xl text-muted-foreground leading-relaxed max-w-4xl border-l-4 border-primary/20 pl-6">
            O <code>DashboardController</code> é o cérebro analítico do <strong>Finance Control</strong>. Ele consolida dados de múltiplas tabelas (Transações, Pessoas e Categorias) para fornecer uma visão 360° da saúde financeira em uma única requisição atômica.
          </p>
        </div>

        <Separator />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="border-none shadow-lg bg-emerald-50/50">
            <CardContent className="pt-6">
              <TrendingUp className="h-8 w-8 text-emerald-600 mb-4" />
              <h4 className="font-bold text-emerald-950">Métricas de Receita</h4>
              <p className="text-sm text-emerald-800/70">Cálculo em tempo real de fluxos de entrada e saldo líquido positivo.</p>
            </CardContent>
          </Card>
          <Card className="border-none shadow-lg bg-rose-50/50">
            <CardContent className="pt-6">
              <TrendingDown className="h-8 w-8 text-rose-600 mb-4" />
              <h4 className="font-bold text-rose-950">Controle de Despesas</h4>
              <p className="text-sm text-rose-800/70">Agregação de débitos para monitoramento de teto de gastos.</p>
            </CardContent>
          </Card>
          <Card className="border-none shadow-lg bg-blue-50/50">
            <CardContent className="pt-6">
              <Users className="h-8 w-8 text-blue-600 mb-4" />
              <h4 className="font-bold text-blue-950">Insights Demográficos</h4>
              <p className="text-sm text-blue-800/70">Análise de média de idade e perfil das pessoas envolvidas no fluxo.</p>
            </CardContent>
          </Card>
        </div>

        <section className="space-y-8">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary rounded-lg">
              <LayoutDashboard className="h-6 w-6 text-primary-foreground" />
            </div>
            <h2 className="text-3xl font-bold tracking-tight">Consolidação de Dados (360° View)</h2>
          </div>

          <Card className="border-2 overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              <div className="p-8 lg:p-12 space-y-8">
                <div>
                  <h3 className="text-2xl font-bold mb-4">O que este endpoint entrega?</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Diferente de listagens comuns, o Dashboard processa indicadores complexos que exigem joins e funções de agregação (SUM, AVG, COUNT) no SQL Server/MySQL.
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="flex items-start gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100">
                    <div className="p-2 bg-white rounded-lg shadow-sm"><BarChart3 className="h-5 w-5 text-primary" /></div>
                    <div>
                      <span className="font-bold block">Contadores Globais</span>
                      <span className="text-sm text-muted-foreground">Totais ativos de Pessoas, Categorias e Transações.</span>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100">
                    <div className="p-2 bg-white rounded-lg shadow-sm"><Wallet className="h-5 w-5 text-primary" /></div>
                    <div>
                      <span className="font-bold block">Saúde Financeira</span>
                      <span className="text-sm text-muted-foreground">Cálculo de Revenue, Expenses e Net Balance.</span>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100">
                    <div className="p-2 bg-white rounded-lg shadow-sm"><History className="h-5 w-5 text-primary" /></div>
                    <div>
                      <span className="font-bold block">Timeline Recente</span>
                      <span className="text-sm text-muted-foreground">As últimas 10 atividades financeiras ordenadas cronologicamente.</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-slate-950 p-8 lg:p-12 relative overflow-hidden flex flex-col justify-center">
                <div className="absolute top-0 right-0 p-4">
                  <Badge className="bg-emerald-500/20 text-emerald-400 border-none">GET Response Example</Badge>
                </div>
                <pre className="font-mono text-[13px] text-blue-300 leading-relaxed">
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
              </div>
            </div>
          </Card>
        </section>

        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary rounded-lg">
              <Server className="h-6 w-6 text-primary-foreground" />
            </div>
            <h2 className="text-3xl font-bold">Implementação Backend (.NET)</h2>
          </div>

          <Card className="border-none shadow-2xl rounded-[2rem] overflow-hidden bg-slate-950">
            <div className="bg-slate-900 px-8 py-4 border-b border-white/5 flex items-center justify-between">
              <div className="flex items-center gap-3 font-mono text-xs text-slate-400">
                <Code2 className="h-4 w-4" /> DashboardController.cs
              </div>
              <Badge variant="outline" className="text-emerald-500 border-emerald-500/30">Authenticated</Badge>
            </div>
            <CardContent className="p-8 overflow-x-auto">
              <pre className="font-mono text-sm leading-relaxed text-blue-200">
                {`[ApiController]
[Authorize]
[Route("api/[controller]")]
public class DashboardController : ControllerBase
{
    private readonly IDashboardService _dashboardService;

    public DashboardController(IDashboardService dashboardService)
    {
        _dashboardService = dashboardService;
    }

    [HttpGet]
    [ProducesResponseType(typeof(DashboardStats), StatusCodes.Status200OK)]
    public async Task<IActionResult> GetDashboardData()
    {
        try 
        {
            var data = await _dashboardService.GetDashboardStats();
            return Ok(data);
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { message = "Falha nos indicadores", error = ex.Message });
        }
    }
}`}
              </pre>
            </CardContent>
          </Card>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4 p-8 rounded-[2rem] bg-slate-50 border">
            <h3 className="text-xl font-bold flex items-center gap-2">
              <ShieldCheck className="h-5 w-5 text-emerald-600" /> Segurança (JWT)
            </h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              O acesso é restrito via atributo <code>[Authorize]</code>. O dashboard só compila dados pertencentes ao contexto do usuário autenticado, garantindo isolamento total de informações.
            </p>
          </div>

          <div className="space-y-4 p-8 rounded-[2rem] bg-slate-50 border">
            <h3 className="text-xl font-bold flex items-center gap-2">
              <Activity className="h-5 w-5 text-blue-600" /> Performance
            </h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Utiliza <strong>Asynchronous Programming</strong> (async/await) para não bloquear threads do servidor durante o processamento de grandes volumes de transações.
            </p>
          </div>
        </section>

        <section className="pt-10">
          <div className="relative p-12 lg:p-16 rounded-[4rem] bg-slate-900 text-white overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
              <PieIcon size={400} />
            </div>
            <div className="relative space-y-8 max-w-4xl">
              <h2 className="text-5xl font-black tracking-tighter">Pronto para Consumo</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10 text-slate-400 text-lg leading-relaxed">
                <p>
                  Este endpoint é a principal fonte de dados para o <strong>Frontend</strong> montar gráficos de pizza, barras e cards informativos, reduzindo a necessidade de múltiplas chamadas à API.
                </p>
                <div className="flex gap-4">
                  <div className="text-center">
                    <p className="text-3xl font-black text-primary">200</p>
                    <p className="text-[10px] uppercase font-bold tracking-widest text-slate-500">HTTP OK</p>
                  </div>
                  <Separator orientation="vertical" className="h-12 bg-slate-700" />
                  <div className="text-center">
                    <p className="text-3xl font-black text-primary">1</p>
                    <p className="text-[10px] uppercase font-bold tracking-widest text-slate-500">Request Only</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

      </div>
    </div>
  )
}

export default DocBackendDashboard