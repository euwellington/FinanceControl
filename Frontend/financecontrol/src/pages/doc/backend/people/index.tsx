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
  Users,
  Database,
  ShieldCheck,
  Search,
  UserPlus,
  UserCheck,
  UserMinus,
  Fingerprint,
  Code2,
  Info,
  Layers,
  Server,
  Terminal,
  AlertCircle,
  Clock,
  Briefcase,
  RefreshCcw,
  CheckCircle2
} from "lucide-react"

const DocBackendPeople = () => {
  return (
    <SidebarLayout>
      <div className="flex flex-col gap-16 max-w-6xl pb-24">

        <div className="space-y-6">
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="px-3 py-1 text-xs font-bold uppercase tracking-widest">
              Gerenciamento de Entidades
            </Badge>
            <Badge variant="outline" className="px-3 py-1 text-xs font-bold uppercase tracking-widest text-primary border-primary">
              Módulo de Pessoas
            </Badge>
          </div>

          <h1 className="text-5xl font-extrabold tracking-tight lg:text-7xl">
            Cadastro de Pessoas
          </h1>

          <p className="text-xl text-muted-foreground leading-relaxed max-w-4xl">
            O módulo <strong>People</strong> é a base identitária do sistema Finance Control. 
            Ele gerencia os perfis que interagem com o capital, definindo permissões 
            operacionais baseadas em atributos como idade e status de conta.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 pt-6">
            <div className="p-4 rounded-xl bg-primary/5 border border-primary/10 flex flex-col gap-2">
              <Fingerprint className="h-5 w-5 text-primary" />
              <span className="font-bold text-sm">Identidade Única</span>
              <p className="text-xs text-muted-foreground">Rastreabilidade total via GUID.</p>
            </div>
            <div className="p-4 rounded-xl bg-primary/5 border border-primary/10 flex flex-col gap-2">
              <UserCheck className="h-5 w-5 text-primary" />
              <span className="font-bold text-sm">Validação Etária</span>
              <p className="text-xs text-muted-foreground">Impacto direto nas regras de transação.</p>
            </div>
            <div className="p-4 rounded-xl bg-primary/5 border border-primary/10 flex flex-col gap-2">
              <Clock className="h-5 w-5 text-primary" />
              <span className="font-bold text-sm">Auditoria</span>
              <p className="text-xs text-muted-foreground">Histórico de criação e modificação.</p>
            </div>
            <div className="p-4 rounded-xl bg-primary/5 border border-primary/10 flex flex-col gap-2">
              <ShieldCheck className="h-5 w-5 text-primary" />
              <span className="font-bold text-sm">Integridade</span>
              <p className="text-xs text-muted-foreground">Proteção contra remoção de dependentes.</p>
            </div>
          </div>
        </div>

        <Separator />

        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary rounded-lg">
              <Users className="h-6 w-6 text-primary-foreground" />
            </div>
            <h2 className="text-3xl font-bold">Domínio de Pessoas</h2>
          </div>

          <Card className="border-2">
            <CardHeader>
              <CardTitle>Conceito de Entidade de Negócio</CardTitle>
              <CardDescription>Como o sistema interpreta um usuário financeiro.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6 text-muted-foreground leading-relaxed">
              <p>
                No backend do <strong>Finance Control</strong>, uma "Pessoa" representa qualquer 
                entidade (física ou jurídica, dependendo da configuração) que possa ser origem 
                ou destino de uma movimentação financeira. O atributo <code>Age</code> (Idade) 
                é crítico, pois o motor de regras de negócio utiliza este valor para bloquear 
                operações de crédito/receita para menores de idade, garantindo conformidade.
              </p>

              <div className="bg-muted p-6 rounded-xl border-l-4 border-primary space-y-3">
                <h4 className="font-bold text-foreground flex items-center gap-2">
                  <Briefcase className="h-4 w-4" /> Dependências de Módulo
                </h4>
                <p className="text-sm">
                  Este módulo é a dependência primária para o módulo de <strong>Transactions</strong> 
                  e para o <strong>Report Engine</strong>. Nenhuma transação pode existir sem um 
                  vínculo de <code>PersonId</code> válido e ativo.
                </p>
              </div>
            </CardContent>
          </Card>
        </section>

        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary rounded-lg">
              <Database className="h-6 w-6 text-primary-foreground" />
            </div>
            <h2 className="text-3xl font-bold">Modelagem de Dados</h2>
          </div>

          <Card className="border-2 shadow-xl shadow-primary/5 overflow-hidden">
            <div className="p-8 grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-bold mb-2">Schema de Person</h3>
                  <p className="text-muted-foreground text-sm">Definição das propriedades para persistência em bancos relacionais.</p>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50 border">
                    <span className="font-mono text-xs font-bold">Id</span>
                    <Badge variant="secondary">Guid (Primary Key)</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50 border">
                    <span className="font-mono text-xs font-bold">Name</span>
                    <Badge variant="secondary">String (Max 400)</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50 border">
                    <span className="font-mono text-xs font-bold">Age</span>
                    <Badge variant="secondary">Integer (0-150)</Badge>
                  </div>
                </div>

                <div className="p-4 rounded-lg bg-blue-50 border border-blue-100">
                  <p className="text-xs text-blue-800 leading-relaxed font-medium">
                    <Info className="h-3 w-3 inline mr-1 mb-0.5" />
                    <strong>Nota de Implementação:</strong> O campo <code>Name</code> possui indexação 
                    especial no MySQL para permitir buscas parciais otimizadas via cláusula <code>LIKE</code>.
                  </p>
                </div>
              </div>

              <div className="rounded-xl bg-slate-950 p-6 border border-slate-800 shadow-inner">
                <div className="flex items-center justify-between mb-4 border-b border-slate-800 pb-2">
                  <span className="text-xs font-mono text-slate-500 uppercase tracking-widest">C# Entity Mapping</span>
                  <Terminal className="h-4 w-4 text-slate-500" />
                </div>
                <pre className="font-mono text-[13px] text-emerald-400 leading-relaxed">
{`public class Person
{
    public Guid Id { get; set; }
    public string Name { get; set; }
    public int Age { get; set; }
    
    // Metadata para Auditoria
    public DateTime CreatedAt { get; set; }
    public DateTime? UpdatedAt { get; set; }
    public DateTime? DeletedAt { get; set; }
    
    // Relacionamento (Virtual para EF Core)
    public ICollection<Transaction> Transactions { get; set; }
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
            <h2 className="text-3xl font-bold">Documentação de API</h2>
          </div>

          <div className="grid grid-cols-1 gap-6">
            {/* GET ALL */}
            <Card className="border-l-4 border-l-blue-500 hover:shadow-md transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between py-4">
                <div className="flex items-center gap-4">
                  <Badge className="bg-blue-600 font-mono">GET</Badge>
                  <code className="text-sm font-bold">/api/people</code>
                </div>
                <div className="flex gap-2">
                  <Badge variant="outline">Pagination</Badge>
                  <Badge variant="outline">JWT</Badge>
                </div>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground border-t pt-4">
                Lista todas as pessoas de forma paginada. Suporta query params <code>name</code> para filtragem 
                reativa conforme o usuário digita no frontend.
              </CardContent>
            </Card>

            {/* POST */}
            <Card className="border-l-4 border-l-green-500 hover:shadow-md transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between py-4">
                <div className="flex items-center gap-4">
                  <Badge className="bg-green-600 font-mono">POST</Badge>
                  <code className="text-sm font-bold">/api/people</code>
                </div>
                <UserPlus className="h-5 w-5 text-green-600 opacity-30" />
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground border-t pt-4">
                Insere uma nova pessoa no banco. O corpo da requisição deve conter <code>Name</code> e <code>Age</code>. 
                Retorna o objeto criado com seu novo <code>Guid</code> gerado pelo servidor.
              </CardContent>
            </Card>

            {/* PUT */}
            <Card className="border-l-4 border-l-amber-500 hover:shadow-md transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between py-4">
                <div className="flex items-center gap-4">
                  <Badge className="bg-amber-600 font-mono">PUT</Badge>
                  <code className="text-sm font-bold">/api/people</code>
                </div>
                <RefreshCcw className="h-5 w-5 text-amber-600 opacity-30" />
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground border-t pt-4">
                Atualiza os dados de uma pessoa. Caso a idade seja alterada para menor de 18 anos, 
                o sistema não altera transações passadas, mas bloqueia futuras receitas.
              </CardContent>
            </Card>

            {/* DELETE */}
            <Card className="border-l-4 border-l-red-500 hover:shadow-md transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between py-4">
                <div className="flex items-center gap-4">
                  <Badge className="bg-red-600 font-mono">DELETE</Badge>
                  <code className="text-sm font-bold">/api/people/{"{id}"}</code>
                </div>
                <UserMinus className="h-5 w-5 text-red-600 opacity-30" />
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground border-t pt-4">
                Executa a remoção lógica. A pessoa é desativada mas seu histórico financeiro permanece 
                intacto para consultas de auditoria e balanços anuais.
              </CardContent>
            </Card>
          </div>
        </section>

        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary rounded-lg">
              <Layers className="h-6 w-6 text-primary-foreground" />
            </div>
            <h2 className="text-3xl font-bold">Regras de Validação</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="p-6 rounded-2xl bg-slate-50 border-2 border-dashed border-slate-200">
                <h4 className="font-bold mb-4 flex items-center gap-2 text-primary text-lg">
                  <AlertCircle className="h-5 w-5" /> Regras do FluentValidation
                </h4>
                <ul className="space-y-4">
                  <li className="flex gap-3">
                    <CheckCircle2 className="h-5 w-5 text-green-500 shrink-0" />
                    <span className="text-sm"><strong>Nome Obrigatório:</strong> Não permite strings vazias ou nulas no campo Name.</span>
                  </li>
                  <li className="flex gap-3">
                    <CheckCircle2 className="h-5 w-5 text-green-500 shrink-0" />
                    <span className="text-sm"><strong>Limite de Caracteres:</strong> Valida o comprimento máximo de 400 para evitar Buffer Overflows.</span>
                  </li>
                  <li className="flex gap-3">
                    <CheckCircle2 className="h-5 w-5 text-green-500 shrink-0" />
                    <span className="text-sm"><strong>Range Etário:</strong> A idade deve ser um valor positivo e coerente com a vida humana.</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="bg-slate-900 rounded-2xl p-6 shadow-2xl relative overflow-hidden group">
               <div className="absolute -right-4 -top-4 opacity-10 group-hover:scale-110 transition-transform">
                  <Code2 className="h-32 w-32 text-white" />
               </div>
               <div className="relative z-10">
                  <h4 className="text-white font-bold mb-4">Snippet: Validator Person</h4>
                  <pre className="text-[12px] font-mono text-blue-300 leading-relaxed">
{`RuleFor(p => p.Name)
    .NotEmpty().WithMessage("Nome é vital.")
    .MaximumLength(400);

RuleFor(p => p.Age)
    .InclusiveBetween(0, 150)
    .WithMessage("Idade fora dos limites.");`}
                  </pre>
                  <p className="mt-6 text-xs text-slate-400 italic">
                    Centralizar validações evita que dados corrompidos cheguem à camada de persistência Dapper/EF.
                  </p>
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

          <Card className="bg-primary text-primary-foreground border-none shadow-2xl overflow-hidden">
            <CardContent className="p-12 relative">
              <div className="absolute top-0 right-0 p-8 opacity-20">
                 <Users className="h-48 w-48 text-white" />
              </div>
              <div className="max-w-3xl space-y-6 relative z-10">
                <h3 className="text-3xl font-bold">Sólido e Escalável</h3>
                <p className="text-primary-foreground/90 text-lg leading-relaxed">
                  O módulo de pessoas foi projetado para suportar desde pequenas residências até 
                  configurações corporativas complexas. A utilização de identificadores GUID e 
                  a lógica de remoção lógica (Soft Delete) garantem que o Finance Control seja 
                  um sistema robusto, onde nenhum histórico financeiro é perdido por ações acidentais.
                </p>
                <div className="flex flex-wrap gap-4 pt-4">
                  <div className="bg-white/10 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-tighter">MySQL Ready</div>
                  <div className="bg-white/10 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-tighter">Fluent API</div>
                  <div className="bg-white/10 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-tighter">DTO Pattern</div>
                  <div className="bg-white/10 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-tighter">Async/Await</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

      </div>
    </SidebarLayout>
  )
}

export default DocBackendPeople