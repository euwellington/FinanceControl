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
  Tags,
  Database,
  ShieldCheck,
  Code2,
  Info,
  Layers,
  Search,
  CheckCircle2,
  AlertCircle,
  Server,
  Workflow,
  Terminal
} from "lucide-react"

const DocBackendCategory = () => {
  return (
    <div>
      <div className="flex flex-col gap-16 max-w-6xl pb-24 mx-auto px-4">

        <div className="space-y-6 pt-8 text-center md:text-left">
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="px-3 py-1 text-xs font-semibold uppercase tracking-wider">
              Módulo de Classificação
            </Badge>
          </div>

          <h1 className="text-5xl font-extrabold tracking-tight lg:text-7xl">
            Gerenciamento de Categorias
          </h1>

          <p className="text-xl text-muted-foreground leading-relaxed max-w-4xl">
            O módulo <strong>Category</strong> atua como a espinha dorsal taxonômica do 
            sistema Finance Control. Ele não apenas classifica transações, mas dita o 
            comportamento de validação de fluxos financeiros e a estrutura analítica dos relatórios.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 pt-6">
            <div className="p-4 rounded-xl bg-primary/5 border border-primary/10 flex flex-col gap-2">
              <Layers className="h-5 w-5 text-primary" />
              <span className="font-bold text-sm">Organização</span>
              <p className="text-xs text-muted-foreground">Estruturação lógica de fluxos de caixa.</p>
            </div>
            <div className="p-4 rounded-xl bg-primary/5 border border-primary/10 flex flex-col gap-2">
              <ShieldCheck className="h-5 w-5 text-primary" />
              <span className="font-bold text-sm">Consistência</span>
              <p className="text-xs text-muted-foreground">Evita erros de lançamento em contas erradas.</p>
            </div>
            <div className="p-4 rounded-xl bg-primary/5 border border-primary/10 flex flex-col gap-2">
              <Search className="h-5 w-5 text-primary" />
              <span className="font-bold text-sm">Indexação</span>
              <p className="text-xs text-muted-foreground">Otimizado para buscas rápidas no SQL.</p>
            </div>
            <div className="p-4 rounded-xl bg-primary/5 border border-primary/10 flex flex-col gap-2">
              <Workflow className="h-5 w-5 text-primary" />
              <span className="font-bold text-sm">Integração</span>
              <p className="text-xs text-muted-foreground">Totalmente vinculado ao módulo de transações.</p>
            </div>
          </div>
        </div>

        <Separator />

        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary rounded-lg">
              <Tags className="h-6 w-6 text-primary-foreground" />
            </div>
            <h2 className="text-3xl font-bold">Conceitos Fundamentais</h2>
          </div>

          <Card className="border-2">
            <CardHeader>
              <CardTitle>Ciclo de Vida da Categoria</CardTitle>
              <CardDescription>Entenda o papel estratégico das categorias no backend.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6 text-muted-foreground leading-relaxed">
              <p>
                No ecossistema do <strong>Finance Control</strong>, uma categoria não é apenas uma etiqueta. 
                Ela é um contrato de negócio. Ao definir o <code>Purpose</code> de uma categoria, o backend 
                passa a monitorar todas as transações vinculadas a ela para garantir que uma despesa não seja 
                atribuída a uma categoria de "Salário", por exemplo.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <h4 className="font-bold text-foreground flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary" /> Padronização
                  </h4>
                  <p className="text-sm">Garante que o usuário não crie termos duplicados para a mesma finalidade.</p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-bold text-foreground flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary" /> Inteligência
                  </h4>
                  <p className="text-sm">Permite que o sistema sugira tipos de transação baseados na categoria.</p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-bold text-foreground flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary" /> Segurança
                  </h4>
                  <p className="text-sm">Implementa restrições de deleção para categorias em uso (Foreign Key Constraints).</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary rounded-lg">
              <Database className="h-6 w-6 text-primary-foreground" />
            </div>
            <h2 className="text-3xl font-bold">Estrutura de Dados (Database)</h2>
          </div>

          <Card className="border-2 shadow-xl shadow-primary/5 overflow-hidden">
            <div className="p-8 grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-bold mb-2">Entidade Category</h3>
                  <p className="text-muted-foreground">Abaixo, a definição exata das propriedades mapeadas para o MySQL.</p>
                </div>
                
                <ul className="space-y-4">
                  <li className="flex items-start gap-3 text-sm">
                    <div className="p-1 bg-primary/10 rounded">
                      <Code2 className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <span className="font-bold block text-foreground">Id (Guid)</span>
                      Identificador global único, gerado no momento da inserção via <code>Guid.NewGuid()</code>.
                    </div>
                  </li>
                  <li className="flex items-start gap-3 text-sm">
                    <div className="p-1 bg-primary/10 rounded">
                      <Code2 className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <span className="font-bold block text-foreground">Purpose (Enum)</span>
                      Define a natureza financeira: <code>Income (1)</code>, <code>Expense (2)</code> ou <code>Both (3)</code>.
                    </div>
                  </li>
                  <li className="flex items-start gap-3 text-sm">
                    <div className="p-1 bg-primary/10 rounded">
                      <Code2 className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <span className="font-bold block text-foreground">Timestamps</span>
                      Campos automáticos para auditoria de criação, última atualização e exclusão lógica.
                    </div>
                  </li>
                </ul>
              </div>

              <div className="rounded-xl bg-slate-950 p-6 border border-slate-800 shadow-inner">
                <div className="flex items-center justify-between mb-4 border-b border-slate-800 pb-2">
                  <span className="text-xs font-mono text-slate-500 uppercase tracking-widest">C# Entity Definition</span>
                  <Terminal className="h-4 w-4 text-slate-500" />
                </div>
                <pre className="font-mono text-[13px] text-blue-400 leading-relaxed">
{`public class Category
{
    public Guid Id { get; set; }
    public string Description { get; set; }
    public CategoryPurpose Purpose { get; set; }
    
    // Audit Fields
    public DateTime CreatedAt { get; set; }
    public DateTime? UpdatedAt { get; set; }
    public DateTime? DeletedAt { get; set; }
}

public enum CategoryPurpose
{
    Income = 1,
    Expense = 2,
    Both = 3
}`}
                </pre>
              </div>
            </div>
          </Card>
        </section>

        <section className="space-y-8">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary rounded-lg">
              <Server className="h-6 w-6 text-primary-foreground" />
            </div>
            <h2 className="text-3xl font-bold">API Reference</h2>
          </div>

          <div className="space-y-6">
            <Card className="border-l-4 border-l-blue-500">
              <CardHeader className="flex flex-row items-center justify-between">
                <div className="flex items-center gap-3">
                  <Badge className="bg-blue-600">GET</Badge>
                  <code className="text-sm font-bold">/api/category</code>
                </div>
                <Badge variant="outline">Paginado</Badge>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                Retorna a lista de categorias ativas. Aceita parâmetros de <code>page</code> e <code>pageSize</code>. 
                Utiliza Projeção de Dados para retornar apenas o necessário ao frontend, otimizando o payload.
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-green-500">
              <CardHeader className="flex flex-row items-center justify-between">
                <div className="flex items-center gap-3">
                  <Badge className="bg-green-600">POST</Badge>
                  <code className="text-sm font-bold">/api/category</code>
                </div>
                <Badge variant="outline">Criação</Badge>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                Cria uma nova categoria. O <code>Purpose</code> é validado contra o enum <code>CategoryPurpose</code>. 
                Em caso de sucesso, retorna <strong>201 Created</strong> com o objeto no corpo da resposta.
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-amber-500">
              <CardHeader className="flex flex-row items-center justify-between">
                <div className="flex items-center gap-3">
                  <Badge className="bg-amber-600">PUT</Badge>
                  <code className="text-sm font-bold">/api/category</code>
                </div>
                <Badge variant="outline">Atualização</Badge>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                Atualiza uma categoria existente. Nota: Alterar o propósito de uma categoria com transações 
                vinculadas pode gerar erros de validação no módulo de Transações.
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-red-500">
              <CardHeader className="flex flex-row items-center justify-between">
                <div className="flex items-center gap-3">
                  <Badge className="bg-red-600">DELETE</Badge>
                  <code className="text-sm font-bold">/api/category/{"{id}"}</code>
                </div>
                <Badge variant="outline">Exclusão</Badge>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                Realiza o <strong>Soft Delete</strong> da categoria. A categoria é marcada com <code>DeletedAt</code> 
                e deixa de aparecer nas listagens, mas permanece no banco para integridade histórica.
              </CardContent>
            </Card>
          </div>
        </section>

        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary rounded-lg">
              <ShieldCheck className="h-6 w-6 text-primary-foreground" />
            </div>
            <h2 className="text-3xl font-bold">Integridade e Segurança</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h3 className="text-xl font-bold flex items-center gap-2">
                <AlertCircle className="h-5 w-5 text-red-500" /> Restrições de Negócio
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                O backend não permite que uma categoria seja excluída permanentemente se houver 
                transações vinculadas a ela no banco de dados. Isso evita a criação de "órfãos" financeiro.
              </p>
              <div className="p-4 bg-muted rounded-xl border-l-4 border-primary">
                <p className="text-xs italic">
                  "Se você apagar a categoria 'Aluguel', o que acontece com as 12 transações feitas no último ano? 
                  O sistema exige que os dados sejam preservados via Soft Delete."
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-bold flex items-center gap-2">
                <ShieldCheck className="h-5 w-5 text-green-500" /> Camada JWT
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                Todas as operações de escrita (POST, PUT, DELETE) exigem que o token JWT contenha 
                as claims necessárias. Caso o token esteja expirado ou ausente, a API retornará 
                automaticamente <strong>401 Unauthorized</strong>.
              </p>
              <div className="flex gap-2">
                <Badge variant="secondary">Bearer Token</Badge>
                <Badge variant="secondary">Authorize Attribute</Badge>
              </div>
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

          <Card className="bg-slate-900 border-none overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-10">
               <Tags className="h-40 w-40 text-white" />
            </div>
            <CardContent className="p-12 relative z-10">
              <div className="max-w-3xl space-y-6">
                <h3 className="text-3xl font-bold text-white">Prontidão para Escala</h3>
                <p className="text-slate-300 text-lg leading-relaxed">
                  O módulo Category foi projetado seguindo os princípios de <strong>Clean Code</strong> e 
                  <strong>SOLID</strong>. A separação clara entre a entidade de banco de dados e os 
                  objetos de transferência (DTOs) permite que o sistema evolua sem quebrar as 
                  integrações existentes. 
                </p>
                <p className="text-slate-400">
                  Ao garantir uma taxonomia rígida, o Finance Control assegura que o usuário terá 
                  dados limpos para tomadas de decisão estratégicas.
                </p>
                <div className="flex gap-4 pt-4">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-primary">100%</p>
                    <p className="text-[10px] uppercase text-slate-500 font-bold tracking-widest">Auditoria</p>
                  </div>
                  <Separator orientation="vertical" className="h-10 bg-slate-700" />
                  <div className="text-center">
                    <p className="text-2xl font-bold text-primary">SQL</p>
                    <p className="text-[10px] uppercase text-slate-500 font-bold tracking-widest">Otimizado</p>
                  </div>
                  <Separator orientation="vertical" className="h-10 bg-slate-700" />
                  <div className="text-center">
                    <p className="text-2xl font-bold text-primary">JWT</p>
                    <p className="text-[10px] uppercase text-slate-500 font-bold tracking-widest">Protegido</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

      </div>
    </div>
  )
}

export default DocBackendCategory