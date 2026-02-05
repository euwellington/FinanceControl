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
  ArrowLeftRight,
  Database,
  Scale,
  CheckCircle,
  Code2,
  AlertTriangle,
  FileCode,
  ShieldCheck,
  Zap,
  Layers,
  Info,
  History,
  Terminal
} from "lucide-react"

const DocBackendTransaction = () => {
  return (
    <div>
      <div className="flex flex-col gap-16 max-w-6xl pb-24 mx-auto px-4">

        <div className="space-y-6 pt-8 text-center md:text-left">
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="px-3 py-1 text-xs font-semibold uppercase tracking-wider">
              Core Engine
            </Badge>
            <Badge variant="outline" className="px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary border-primary">
              Módulo de Finanças
            </Badge>
          </div>

          <h1 className="text-5xl font-extrabold tracking-tight lg:text-6xl">
            Módulo de Transações Financeiras
          </h1>

          <p className="text-xl text-muted-foreground leading-relaxed max-w-4xl">
            As transações são a unidade fundamental do <strong>Finance Control</strong>. Este módulo
            gerencia o fluxo de capital, aplicando regras de integridade que impedem inconsistências
            entre usuários, categorias e saldos reais.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
            <div className="flex items-start gap-3 p-5 rounded-2xl bg-primary/5 border border-primary/10">
              <ShieldCheck className="h-6 w-6 text-primary mt-1" />
              <div>
                <h3 className="font-bold">Validação Rígida</h3>
                <p className="text-sm text-muted-foreground">Uso de FluentValidation para garantir dados sanitizados.</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-5 rounded-2xl bg-primary/5 border border-primary/10">
              <Zap className="h-6 w-6 text-primary mt-1" />
              <div>
                <h3 className="font-bold">Audit Trails</h3>
                <p className="text-sm text-muted-foreground">Rastreamento automático de criação e deleção (Soft Delete).</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-5 rounded-2xl bg-primary/5 border border-primary/10">
              <Layers className="h-6 w-6 text-primary mt-1" />
              <div>
                <h3 className="font-bold">Consistência</h3>
                <p className="text-sm text-muted-foreground">Verificação cruzada entre idade do usuário e tipos de conta.</p>
              </div>
            </div>
          </div>
        </div>

        <Separator />

        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary rounded-lg">
              <Database className="h-6 w-6 text-primary-foreground" />
            </div>
            <h2 className="text-3xl font-bold">Arquitetura da Entidade</h2>
          </div>

          <Card className="border-2 shadow-sm">
            <CardHeader>
              <CardTitle>Modelo de Dados (C# Entity)</CardTitle>
              <CardDescription>Representação fiel da tabela <code>Transactions</code> no banco de dados.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    A entidade foi projetada para ser autossuficiente em termos de auditoria básica,
                    mantendo referências externas para <strong>Person</strong> (Usuário) e <strong>Category</strong>.
                  </p>
                  <ul className="space-y-3">
                    <li className="flex gap-2 items-center text-sm">
                      <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                      <span><strong>Soft Delete:</strong> Uso de <code>DeletedAt</code> para evitar perda de histórico.</span>
                    </li>
                    <li className="flex gap-2 items-center text-sm">
                      <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                      <span><strong>Decimal Precision:</strong> Armazenamento de <code>Amount</code> com alta precisão monetária.</span>
                    </li>
                  </ul>
                </div>

                <div className="rounded-xl bg-slate-950 p-6 shadow-2xl">
                  <div className="flex items-center gap-2 mb-4 text-slate-500 text-xs font-mono uppercase tracking-widest border-b border-slate-800 pb-2">
                    <Terminal className="h-4 w-4" />
                    <span>TransactionSchema.cs</span>
                  </div>
                  <pre className="font-mono text-xs text-blue-300 space-y-1">
                    {`public class Transaction {
  public Guid Id { get; set; }
  public string Description { get; set; }
  public decimal Amount { get; set; }
  public TransactionType Type { get; set; } // Income=1, Expense=2
  
  // Foreign Keys
  public Guid CategoryId { get; set; }
  public Guid PersonId { get; set; }
  
  // Metadata
  public DateTime CreatedAt { get; set; }
  public DateTime? UpdatedAt { get; set; }
  public DateTime? DeletedAt { get; set; }
}`}
                  </pre>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary rounded-lg">
              <Scale className="h-6 w-6 text-primary-foreground" />
            </div>
            <h2 className="text-3xl font-bold">Regras de Negócio e Restrições</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="border-l-4 border-l-amber-500">
              <CardHeader>
                <div className="flex items-center gap-2 text-amber-600 mb-1 font-bold uppercase text-xs">
                  <AlertTriangle className="h-4 w-4" />
                  Restrição de Idade
                </div>
                <CardTitle className="text-lg">Política para Menores</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground leading-relaxed">
                Usuários com idade inferior a <strong>18 anos</strong> possuem restrições operacionais.
                Por questões de conformidade, o sistema bloqueia o registro de <code>Income</code> (Receitas)
                para este perfil, permitindo apenas a gestão de despesas assistidas.
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-blue-500">
              <CardHeader>
                <div className="flex items-center gap-2 text-blue-600 mb-1 font-bold uppercase text-xs">
                  <ArrowLeftRight className="h-4 w-4" />
                  Vínculo de Categoria
                </div>
                <CardTitle className="text-lg">Coerência de Tipo</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground leading-relaxed">
                Não é permitido associar uma despesa a uma categoria marcada como <strong>"Finalidade: Receita"</strong>.
                Isso evita que gastos com "Alimentação" sejam registrados erroneamente como ganhos salariais.
              </CardContent>
            </Card>
          </div>
        </section>

        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary rounded-lg">
              <CheckCircle className="h-6 w-6 text-primary-foreground" />
            </div>
            <h2 className="text-3xl font-bold">Camada de Validação</h2>
          </div>

          <Card className="border-2 overflow-hidden">
            <CardHeader className="bg-muted/50 border-b">
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Implementação FluentValidation</CardTitle>
                  <CardDescription>Validações assíncronas e verificações de integridade referencial.</CardDescription>
                </div>
                <FileCode className="h-8 w-8 text-primary opacity-20" />
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="bg-slate-950 p-6 font-mono text-[13px] leading-relaxed overflow-x-auto text-slate-300">
                <pre className="">
                  {`namespace FinanceControl.Services.Validation;

public class TransactionValidation : AbstractValidator<Transaction>
{
    public TransactionValidation(
        IPeopleRepository peopleRepository,
        ICategoryRepository categoryRepository,
        bool isUpdate = false
    )
    {
        // Validação de Identidade em Updates
        if (isUpdate) {
            RuleFor(t => t.Id).NotEmpty().WithMessage("O Id deve ser informado.");
        }

        // Regras de Campo Básico
        RuleFor(t => t.Description)
            .NotEmpty().WithMessage("Descrição obrigatória.")
            .MaximumLength(400).WithMessage("Máximo 400 caracteres.");

        RuleFor(t => t.Amount)
            .GreaterThan(0).WithMessage("O valor deve ser positivo.");

        // Validação Assíncrona de Existência de Pessoa
        RuleFor(t => t.PersonId)
            .NotEmpty().WithMessage("PersonId é obrigatório.")
            .MustAsync(async (id, cancel) => await peopleRepository.GetById(id) != null)
            .WithMessage("Pessoa inexistente.");

        // Regra de Ouro: Cruzamento de Dados (Pessoa x Categoria x Tipo)
        RuleFor(t => t.CategoryId)
            .NotEmpty().WithMessage("CategoryId é obrigatório.")
            .MustAsync(async (transaction, catId, cancel) => 
            {
                var category = await categoryRepository.GetById(catId);
                var person = await peopleRepository.GetById(transaction.PersonId);
                
                if (category == null || person == null) return false;

                // 1. Menor de idade só registra despesa
                if (person.Age < 18 && transaction.Type != TransactionType.Expense)
                    return false;

                // 2. Tipo de transação deve bater com o propósito da categoria
                if (transaction.Type == TransactionType.Expense && category.Purpose == CategoryPurpose.Income)
                    return false;

                return true;
            })
            .WithMessage("Inconsistência: Verifique idade do usuário ou tipo da categoria.");
    }
}`}
                </pre>
              </div>
            </CardContent>
          </Card>
        </section>

        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary rounded-lg">
              <History className="h-6 w-6 text-primary-foreground" />
            </div>
            <h2 className="text-3xl font-bold">Ciclo de Vida da Transação</h2>
          </div>

          <div className="relative space-y-8 before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-300 before:to-transparent">

            <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
              <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white bg-slate-100 group-hover:bg-primary group-hover:text-white transition-colors shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
                <Zap className="w-5 h-5" />
              </div>
              <Card className="w-[calc(100%-4rem)] md:w-[45%] p-4 shadow-none bg-muted/30">
                <h4 className="font-bold">Solicitação (Request)</h4>
                <p className="text-xs text-muted-foreground mt-1">O Frontend envia os IDs e o valor via POST/PUT.</p>
              </Card>
            </div>

            <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
              <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white bg-slate-100 group-hover:bg-primary group-hover:text-white transition-colors shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
                <Code2 className="w-5 h-5" />
              </div>
              <Card className="w-[calc(100%-4rem)] md:w-[45%] p-4 shadow-none bg-muted/30">
                <h4 className="font-bold">Validação de Negócio</h4>
                <p className="text-xs text-muted-foreground mt-1">FluentValidation consulta repositórios para checar integridade.</p>
              </Card>
            </div>

            <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
              <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white bg-slate-100 group-hover:bg-primary group-hover:text-white transition-colors shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
                <Database className="w-5 h-5" />
              </div>
              <Card className="w-[calc(100%-4rem)] md:w-[45%] p-4 shadow-none bg-muted/30">
                <h4 className="font-bold">Persistência</h4>
                <p className="text-xs text-muted-foreground mt-1">Registro gravado no MySQL e cache limpo para novos relatórios.</p>
              </Card>
            </div>
          </div>
        </section>

        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary rounded-lg">
              <Info className="h-6 w-6 text-primary-foreground" />
            </div>
            <h2 className="text-3xl font-bold">Considerações Finais</h2>
          </div>

          <Card className="bg-primary/5 border-none">
            <CardContent className="p-10 text-center space-y-4">
              <h3 className="text-2xl font-bold">A Confiabilidade como Prioridade</h3>
              <p className="text-muted-foreground leading-relaxed max-w-3xl mx-auto">
                O módulo de Transações foi construído para ser à prova de falhas. Ao centralizar as regras de
                validação em uma classe <code>TransactionValidation</code> dedicada, garantimos que tanto
                a criação manual quanto importações em lote sigam rigorosamente os mesmos critérios.
                Isso protege o sistema de "erros silenciosos" que poderiam corromper os saldos financeiros
                ao longo do tempo.
              </p>
              <div className="pt-4">
                <Badge variant="outline" className="border-primary text-primary">Pronto para Produção</Badge>
              </div>
            </CardContent>
          </Card>
        </section>

      </div>
    </div>
  )
}

export default DocBackendTransaction