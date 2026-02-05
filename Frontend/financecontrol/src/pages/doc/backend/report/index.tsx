"use client"

import SidebarLayout from "@/components/layout"
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
  BarChart3,
  Users,
  Layers,
  Database,
  Code2,
  TrendingUp,
  PieChart,
  ArrowUpRight,
  ArrowDownRight,
  Calculator,
  Search,
  Filter,
  FileJson,
  CheckCircle2,
  Info
} from "lucide-react"

const DocBackendReport = () => {
  return (
    <SidebarLayout>
      <div className="max-w-6xl flex flex-col gap-16 pb-20">

        <div className="space-y-6">
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="px-3 py-1 text-xs font-semibold uppercase tracking-wider">
              Análise de Dados
            </Badge>
            <Badge variant="outline" className="px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary border-primary">
              Módulo de Relatórios
            </Badge>
          </div>

          <h1 className="text-5xl font-extrabold tracking-tight lg:text-6xl">
            Relatórios e Business Intelligence
          </h1>

          <p className="text-xl text-muted-foreground leading-relaxed max-w-4xl">
            O módulo de relatórios do <strong>Finance Control</strong> transforma registros granulares 
            de transações em visões agregadas de alto nível, permitindo que o usuário final entenda 
            o fluxo de caixa real entre pessoas e categorias.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 pt-4">
            <div className="p-4 rounded-xl bg-primary/5 border border-primary/10 flex flex-col gap-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              <span className="font-bold text-sm">Cálculo de Saldo</span>
              <p className="text-xs text-muted-foreground">Processamento automático de Receita vs Despesa.</p>
            </div>
            <div className="p-4 rounded-xl bg-primary/5 border border-primary/10 flex flex-col gap-2">
              <Calculator className="h-5 w-5 text-primary" />
              <span className="font-bold text-sm">Agregação SQL</span>
              <p className="text-xs text-muted-foreground">Queries otimizadas com Dapper para somatórios rápidos.</p>
            </div>
            <div className="p-4 rounded-xl bg-primary/5 border border-primary/10 flex flex-col gap-2">
              <Filter className="h-5 w-5 text-primary" />
              <span className="font-bold text-sm">Paginação</span>
              <p className="text-xs text-muted-foreground">Entrega de dados em lotes para performance frontend.</p>
            </div>
            <div className="p-4 rounded-xl bg-primary/5 border border-primary/10 flex flex-col gap-2">
              <PieChart className="h-5 w-5 text-primary" />
              <span className="font-bold text-sm">Visão Híbrida</span>
              <p className="text-xs text-muted-foreground">Totais por item e totais gerais na mesma resposta.</p>
            </div>
          </div>
        </div>

        <Separator />

        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary rounded-lg">
              <BarChart3 className="h-6 w-6 text-primary-foreground" />
            </div>
            <h2 className="text-3xl font-bold">Arquitetura de Consolidação</h2>
          </div>

          <Card className="border-2">
            <CardHeader>
              <CardTitle>Engenharia de Dados</CardTitle>
              <CardDescription>Como o sistema processa informações financeiras em larga escala.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6 text-muted-foreground leading-relaxed">
              <p>
                Diferente dos endpoints de CRUD (Create, Read, Update, Delete) que lidam com registros únicos, 
                o módulo de relatórios utiliza <strong>Objetos de Transferência de Dados (DTOs)</strong> complexos 
                que não possuem representação direta em uma única tabela do MySQL.
              </p>
              
              <div className="bg-muted p-6 rounded-xl border-l-4 border-primary">
                <h4 className="font-bold text-foreground flex items-center gap-2 mb-2">
                  <Search className="h-4 w-4" /> Lógica de Agrupamento
                </h4>
                <p className="text-sm">
                  O backend realiza um <code>LEFT JOIN</code> entre a tabela de Pessoas/Categorias e a tabela 
                  de Transações, aplicando funções de agregação <code>SUM()</code> e filtros de <code>GROUP BY</code>. 
                  Isso garante que o saldo líquido (Balance) seja calculado no servidor, reduzindo o processamento no cliente.
                </p>
              </div>

              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 p-4 rounded-lg bg-green-500/5 border border-green-500/20">
                  <div className="flex items-center gap-2 text-green-600 mb-2">
                    <ArrowUpRight className="h-5 w-5" />
                    <span className="font-bold uppercase text-xs">Receitas</span>
                  </div>
                  <p className="text-sm text-green-700/80">Soma de todos os lançamentos positivos associados ao ID pesquisado.</p>
                </div>
                <div className="flex-1 p-4 rounded-lg bg-red-500/5 border border-red-500/20">
                  <div className="flex items-center gap-2 text-red-600 mb-2">
                    <ArrowDownRight className="h-5 w-5" />
                    <span className="font-bold uppercase text-xs">Despesas</span>
                  </div>
                  <p className="text-sm text-red-700/80">Soma de todos os lançamentos negativos associados ao ID pesquisado.</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary rounded-lg">
              <Users className="h-6 w-6 text-primary-foreground" />
            </div>
            <h2 className="text-3xl font-bold">Relatório: Totais por Pessoa</h2>
          </div>

          <Card className="overflow-hidden border-2">
            <div className="bg-primary/5 px-6 py-4 flex flex-col md:flex-row justify-between md:items-center gap-4 border-b">
              <div className="flex gap-4 items-center font-mono font-bold">
                <Badge className="bg-blue-500 text-white">GET</Badge>
                <span className="text-primary">/api/report/transactionspeople</span>
              </div>
              <Badge variant="outline" className="w-fit">Requer JWT</Badge>
            </div>
            
            <CardContent className="p-0">
              <div className="grid grid-cols-1 lg:grid-cols-2">
                <div className="p-8 space-y-6 border-r">
                  <h3 className="text-xl font-bold flex items-center gap-2">
                    <Info className="h-5 w-5 text-primary" /> Definição da Resposta
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    Este relatório é focado na gestão de pessoas. Ele responde à pergunta: 
                    <em> "Quanto cada membro da residência está contribuindo ou gastando?"</em>
                  </p>
                  
                  <div className="space-y-4">
                    <h4 className="text-xs font-semibold uppercase tracking-wider text-primary">Esquema de Dados:</h4>
                    <ul className="space-y-3">
                      <li className="flex items-start gap-2 text-sm text-muted-foreground">
                        <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                        <span><strong>PersonId:</strong> Referência única no MySQL.</span>
                      </li>
                      <li className="flex items-start gap-2 text-sm text-muted-foreground">
                        <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                        <span><strong>TotalIncome:</strong> Agregado de receitas brutas.</span>
                      </li>
                      <li className="flex items-start gap-2 text-sm text-muted-foreground">
                        <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                        <span><strong>Balance:</strong> Campo computado (Income - Expense).</span>
                      </li>
                    </ul>
                  </div>

                  <div className="p-4 bg-amber-50 rounded-lg border border-amber-200">
                    <p className="text-xs text-amber-800 font-medium">
                      Nota: O backend inclui um objeto de metadados para paginação, essencial para interfaces que utilizam tabelas dinâmicas.
                    </p>
                  </div>
                </div>

                <div className="p-8 bg-slate-950 space-y-4">
                  <div className="flex items-center justify-between text-slate-400">
                    <span className="text-xs font-mono uppercase tracking-widest">Exemplo de Resposta (JSON)</span>
                    <FileJson className="h-4 w-4" />
                  </div>
                  <div className="font-mono text-[13px] text-blue-300 leading-relaxed overflow-x-auto">
                    <pre>
{`{
  "totalsByPerson": [
    {
      "personId": "7c9f8214-7ff0-4c72-8052-9b09275c30a3",
      "name": "Francisco Wellington",
      "totalIncome": 5902.50,
      "totalExpense": 3000.00,
      "balance": 2902.50
    }
  ],
  "totalIncome": 12000.00,
  "totalExpense": 8000.00,
  "totalBalance": 4000.00,
  "page": 1,
  "pageSize": 10,
  "totalRecords": 5
}`}
                    </pre>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary rounded-lg">
              <Layers className="h-6 w-6 text-primary-foreground" />
            </div>
            <h2 className="text-3xl font-bold">Relatório: Totais por Categoria</h2>
          </div>

          <Card className="border-2 shadow-xl shadow-primary/5">
            <CardHeader className="bg-muted/50 border-b pb-6">
              <div className="flex items-center gap-3 mb-2">
                <Badge className="bg-blue-500 text-white font-mono">GET</Badge>
                <code className="text-sm font-bold">/api/report/transactionscategory</code>
              </div>
              <CardDescription>
                Ideal para visualização em gráficos de pizza (Pie Charts) ou barras.
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                <div className="space-y-3">
                  <h4 className="font-bold text-foreground uppercase text-xs tracking-widest">Agrupamento</h4>
                  <p className="text-sm text-muted-foreground">
                    Une transações de mesma finalidade (Ex: Alimentação, Lazer) independente da pessoa que realizou.
                  </p>
                </div>
                <div className="space-y-3">
                  <h4 className="font-bold text-foreground uppercase text-xs tracking-widest">Campos de Resumo</h4>
                  <p className="text-sm text-muted-foreground">
                    Retorna <code>totalIncome</code> e <code>totalExpense</code> para cada categoria encontrada.
                  </p>
                </div>
                <div className="space-y-3">
                  <h4 className="font-bold text-foreground uppercase text-xs tracking-widest">Cálculo Global</h4>
                  <p className="text-sm text-muted-foreground">
                    Ao final do JSON, o sistema entrega o somatório de todas as categorias para checagem de consistência.
                  </p>
                </div>
              </div>

              <div className="rounded-xl bg-slate-900 p-6 font-mono text-xs text-green-400 border border-slate-800 shadow-2xl">
                <pre>
{`{
  "totalsByCategory": [
    {
      "categoryId": "521d74cf-c3fe-4bda-b072-563fb4fdbcf7",
      "description": "Salário",
      "totalIncome": 5000.00,
      "totalExpense": 0.00,
      "balance": 5000.00
    },
    {
      "categoryId": "a32b-...",
      "description": "Mercado",
      "totalIncome": 0.00,
      "totalExpense": 1250.40,
      "balance": -1250.40
    }
  ],
  "totalIncome": 15000.00,
  "totalExpense": 4000.00,
  "totalBalance": 11000.00
}`}
                </pre>
              </div>
            </CardContent>
          </Card>
        </section>

        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary rounded-lg">
              <Code2 className="h-6 w-6 text-primary-foreground" />
            </div>
            <h2 className="text-3xl font-bold">Modelagem das Entidades</h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="border-l-4 border-l-primary">
              <CardHeader>
                <CardTitle className="text-lg">PersonTotal.cs</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="rounded-lg bg-slate-950 p-4 font-mono text-xs text-slate-300">
                  <pre>
{`public class PersonTotal
{
    public Guid PersonId { get; set; }
    public string Name { get; set; }
    public decimal TotalIncome { get; set; }
    public decimal TotalExpense { get; set; }
    
    // Propriedade calculada em tempo de execução
    public decimal Balance => TotalIncome - TotalExpense;
}`}
                  </pre>
                </div>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-primary">
              <CardHeader>
                <CardTitle className="text-lg">CategoryTotal.cs</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="rounded-lg bg-slate-950 p-4 font-mono text-xs text-slate-300">
                  <pre>
{`public class CategoryTotal
{
    public Guid CategoryId { get; set; }
    public string Description { get; set; }
    public CategoryPurpose Purpose { get; set; }
    public decimal TotalIncome { get; set; }
    public decimal TotalExpense { get; set; }
    
    // Propriedade calculada em tempo de execução
    public decimal Balance => TotalIncome - TotalExpense;
}`}
                  </pre>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary rounded-lg">
              <Database className="h-6 w-6 text-primary-foreground" />
            </div>
            <h2 className="text-3xl font-bold">Conclusão e Performance</h2>
          </div>

          <Card className="bg-primary/5 border-none">
            <CardContent className="p-8">
              <div className="flex flex-col md:flex-row gap-8 items-center">
                <div className="space-y-4">
                  <p className="text-lg font-medium text-foreground">
                    O módulo de relatórios é o cérebro analítico do Finance Control.
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    Através da utilização de Micro ORMs como o <strong>Dapper</strong>, conseguimos 
                    entregar esses cálculos complexos com latência mínima, permitindo que o 
                    dashboard do frontend carregue instantaneamente mesmo com milhares de transações. 
                    Sem esta camada de agregação, o processamento de dados seria inviável para 
                    dispositivos móveis ou navegadores com hardware limitado.
                  </p>
                  <div className="flex gap-4">
                    <Badge variant="secondary">Eficiência SQL</Badge>
                    <Badge variant="secondary">Agregados DTO</Badge>
                    <Badge variant="secondary">Saldo Computado</Badge>
                  </div>
                </div>
                <div className="shrink-0">
                   <div className="w-32 h-32 rounded-full border-8 border-primary border-t-transparent animate-spin-slow flex items-center justify-center">
                      <TrendingUp className="h-10 w-10 text-primary" />
                   </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

      </div>
    </SidebarLayout>
  )
}

export default DocBackendReport