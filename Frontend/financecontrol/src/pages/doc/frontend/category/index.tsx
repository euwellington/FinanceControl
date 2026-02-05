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
  Tags,
  List,
  PlusCircle,
  RefreshCcw,
  Trash2,
  Info,
  AlertCircle,
  Server,
  Workflow,
  Terminal,
  Filter,
  ArrowUpRight,
  ArrowDownLeft
} from "lucide-react"
import ImageHome from '@/assets/images/doc/frontend/category/home.png'
import ImageAdd from '@/assets/images/doc/frontend/category/add.png'
import ImageEdit from '@/assets/images/doc/frontend/category/edit.png'

const DocFrontendCategory = () => {
  return (
    <div>
      <div className="flex flex-col gap-16 max-w-6xl pb-24 mx-auto px-4">

        <div className="space-y-6 pt-8">
          <div className="flex items-center gap-3">
            <Badge variant="secondary" className="px-4 py-1.5 text-xs font-bold uppercase tracking-widest bg-primary/10 text-primary border-none">
              Módulo de Classificação
            </Badge>
          </div>


          <h1 className="text-5xl font-extrabold tracking-tight lg:text-7xl">
            Categorias
          </h1>

          <p className="text-xl text-muted-foreground leading-relaxed max-w-4xl">
            O módulo de <strong>Categorias</strong> serve para organizar o dinheiro que entra e sai.
            Ele separa o que é conta de luz, salário ou lazer, garantindo que os relatórios
            fiquem fáceis de entender e que nada seja apagado sem querer.
          </p>
        </div>

        <Separator />

        <section className="space-y-10">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary rounded-lg shadow-lg">
              <List className="h-6 w-6 text-primary-foreground" />
            </div>
            <h2 className="text-3xl font-bold">Interfaces de Classificação</h2>
          </div>

          <div className="grid grid-cols-1 gap-12">
            <div className="space-y-4">
              <h3 className="text-xl font-bold flex items-center gap-2">
                <Filter className="h-5 w-5 text-blue-500" /> 1. Dashboard de Categorias
              </h3>
              <p className="text-muted-foreground text-sm">
                Visualização paginada com suporte a filtros por descrição e propósito (Income/Expense).
                Exibe metadados de criação e última atualização.
              </p>
              <Card className="overflow-hidden border-2 shadow-xl rounded-2xl">
                <CardContent className="p-0">
                  <img src={ImageHome} alt="Category List View" className="w-full h-[500px] object-cover" />
                </CardContent>
              </Card>
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-bold flex items-center gap-2">
                <PlusCircle className="h-5 w-5 text-emerald-500" /> 2. Definição de Propósito
              </h3>
              <p className="text-muted-foreground text-sm">
                Interface de criação onde o usuário define a descrição e o <code>Purpose</code>.
                O sistema valida se o termo já existe para evitar redundância na taxonomia.
              </p>
              <Card className="overflow-hidden border-2 shadow-xl rounded-2xl">
                <CardContent className="p-0">
                  <img src={ImageAdd} alt="Create Category" className="w-full h-[500px] object-cover" />
                </CardContent>
              </Card>
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-bold flex items-center gap-2">
                <RefreshCcw className="h-5 w-5 text-amber-500" /> 3. Atualização
              </h3>
              <p className="text-muted-foreground text-sm">
                Painel para ajustes de nomenclatura. A exclusão é lógica: a categoria é desativada mas seu
                vínculo histórico com transações antigas permanece intacto.
              </p>
              <Card className="overflow-hidden border-2 shadow-xl rounded-2xl">
                <CardContent className="p-0">
                  <img src={ImageEdit} alt="Category Maintenance" className="w-full h-[500px] object-cover" />
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
                  <code className="text-sm font-bold">/api/category</code>
                </div>
                <Badge variant="outline">Pagination & Filtering</Badge>
              </CardHeader>
              <CardContent className="space-y-4 text-sm border-t pt-4">
                <p className="text-muted-foreground">Retorna lista paginada. Filtros disponíveis: <code>description</code>, <code>purpose</code> (Expense, Income, Both) e <code>createdAt</code>.</p>
                <div className="bg-slate-950 p-4 rounded-lg font-mono text-[11px] text-sky-300 overflow-x-auto">
                  {`// Metadata de Paginação
{
  "page": 1, "pageSize": 10, "totalRecords": 4, "totalPages": 1,
  "data": [ { "id": "GUID", "description": "Saúde", "purpose": "Expense", "createdAt": "..." } ]
}`}
                </div>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-emerald-500 hover:shadow-md transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between py-4">
                <div className="flex items-center gap-4">
                  <Badge className="bg-emerald-600 font-mono">POST</Badge>
                  <code className="text-sm font-bold">/api/category</code>
                </div>
                <PlusCircle className="h-5 w-5 text-emerald-600 opacity-40" />
              </CardHeader>
              <CardContent className="space-y-4 text-sm border-t pt-4">
                <p className="text-muted-foreground">Cria um novo registro taxonômico. Requer <code>description</code> e <code>purpose</code>.</p>
                <div className="bg-slate-950 p-4 rounded-lg font-mono text-[11px] text-emerald-300">
                  {`// Payload
{ "description": "Salário Mensal", "purpose": "Income" }`}
                </div>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-amber-500 hover:shadow-md transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between py-4">
                <div className="flex items-center gap-4">
                  <Badge className="bg-amber-600 font-mono">PUT</Badge>
                  <code className="text-sm font-bold">/api/category</code>
                </div>
                <RefreshCcw className="h-5 w-5 text-amber-600 opacity-40" />
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground border-t pt-4">
                Atualiza <code>description</code> ou <code>purpose</code>. O ID no corpo deve ser um GUID válido.
                Caso a categoria não exista, a API retorna <strong>400 Bad Request</strong>.
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-red-500 hover:shadow-md transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between py-4">
                <div className="flex items-center gap-4">
                  <Badge className="bg-red-600 font-mono">DELETE</Badge>
                  <code className="text-sm font-bold">/api/category/{"{id}"}</code>
                </div>
                <Trash2 className="h-5 w-5 text-red-600 opacity-40" />
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground border-t pt-4">
                Exclui via GUID. Falha se houver transações vinculadas. Em caso de sucesso, o registro é marcado
                como excluído (Soft Delete) para preservar relatórios de anos fiscais anteriores.
              </CardContent>
            </Card>
          </div>
        </section>

        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary rounded-lg">
              <Workflow className="h-6 w-6 text-primary-foreground" />
            </div>
            <h2 className="text-3xl font-bold">Regras de Negócio & Enums</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="bg-slate-50 border-2 border-dashed">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2 text-primary">
                  <AlertCircle className="h-5 w-5" /> Validação de Propósito
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-white rounded-lg border">
                  <span className="font-mono text-xs font-bold">Income (1)</span>
                  <ArrowUpRight className="h-4 w-4 text-emerald-500" />
                </div>
                <div className="flex items-center justify-between p-3 bg-white rounded-lg border">
                  <span className="font-mono text-xs font-bold">Expense (2)</span>
                  <ArrowDownLeft className="h-4 w-4 text-red-500" />
                </div>
                <div className="flex items-center justify-between p-3 bg-white rounded-lg border">
                  <span className="font-mono text-xs font-bold">Both (3)</span>
                  <RefreshCcw className="h-4 w-4 text-blue-500" />
                </div>
                <p className="text-[11px] text-muted-foreground italic">
                  O motor de regras impede que uma categoria "Expense" seja utilizada em uma transação de entrada.
                </p>
              </CardContent>
            </Card>

            <div className="rounded-xl bg-slate-950 p-6 border border-slate-800 shadow-inner">
              <div className="flex items-center justify-between mb-4 border-b border-slate-800 pb-2">
                <span className="text-xs font-mono text-slate-500 uppercase tracking-widest">C# Enum Definition</span>
                <Terminal className="h-4 w-4 text-slate-500" />
              </div>
              <pre className="font-mono text-[13px] text-blue-400 leading-relaxed">
                {`public enum CategoryPurpose
{
    Income = 1,
    Expense = 2,
    Both = 3
}

// Vinculação no DB via EF Core
builder.Property(c => c.Purpose)
       .HasConversion<int>();`}
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
              <Tags className="h-48 w-48 text-white" />
            </div>
            <CardContent className="p-12 relative z-10">
              <div className="max-w-3xl space-y-6">
                <h3 className="text-3xl font-bold text-white">Dados Organizados e Seguros</h3>
                <p className="text-slate-300 text-lg leading-relaxed">
                  As categorias são o coração da organização financeira. O sistema garante que,
                  mesmo que você mude o nome de uma categoria ou pare de usá-la, seu histórico
                  de gastos continue certinho e guardado com segurança, sem bagunçar suas contas.
                </p>
                <div className="flex flex-wrap gap-4 pt-4">
                  <Badge variant="secondary" className="bg-white/5 text-white hover:bg-white/10">Banco de Dados Otimizado</Badge>
                  <Badge variant="secondary" className="bg-white/5 text-white hover:bg-white/10">Nada é Apagado por Erro</Badge>
                  <Badge variant="secondary" className="bg-white/5 text-white hover:bg-white/10">Filtros Inteligentes</Badge>
                  <Badge variant="secondary" className="bg-white/5 text-white hover:bg-white/10">Acesso Protegido</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

      </div>
    </div>
  )
}

export default DocFrontendCategory