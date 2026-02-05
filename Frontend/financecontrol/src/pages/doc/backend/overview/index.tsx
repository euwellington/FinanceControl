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
  Server,
  Database,
  ShieldCheck,
  Container,
  Code2,
  BookOpen,
  Terminal,
  Github,
  Zap,
  Activity,
  Settings,
  Layers,
  Cpu,
  Globe,
  Lock,
  Share2,
  ArrowRightLeft,
  FileCode2,
  Workflow,
  CheckCircle2,
  TestTube2,
  Boxes,
  Microscope
} from "lucide-react"

const DocBackendOverview = () => {
  return (
    <SidebarLayout>
      <div className="flex flex-col gap-16 max-w-6xl pb-24">

        <div className="space-y-6">
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="px-3 py-1 text-xs font-bold uppercase tracking-widest">
              Core Engine
            </Badge>
            <Badge variant="outline" className="px-3 py-1 text-xs font-bold uppercase tracking-widest text-primary border-primary">
              .NET 8 (LTS)
            </Badge>
          </div>

          <h1 className="text-5xl font-extrabold tracking-tight lg:text-7xl">
            Backend Architecture
          </h1>

          <p className="text-xl text-muted-foreground leading-relaxed max-w-4xl">
            A infraestrutura do <strong>Finance Control</strong> utiliza o poder do .NET 8 para entregar uma API robusta, 
            seguindo rigorosamente os princípios de Clean Architecture e SOLID. Cada camada possui responsabilidades 
            isoladas, facilitando a manutenção e a escalabilidade.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 pt-6">
            <div className="p-4 rounded-xl bg-primary/5 border border-primary/10 flex flex-col gap-2">
              <Boxes className="h-5 w-5 text-primary" />
              <span className="font-bold text-sm">Modular Monolith</span>
              <p className="text-xs text-muted-foreground">Domínios isolados por namespaces e pastas.</p>
            </div>
            <div className="p-4 rounded-xl bg-primary/5 border border-primary/10 flex flex-col gap-2">
              <Microscope className="h-5 w-5 text-primary" />
              <span className="font-bold text-sm">Test-Driven</span>
              <p className="text-xs text-muted-foreground">Suporte nativo a testes unitários e de integração.</p>
            </div>
            <div className="p-4 rounded-xl bg-primary/5 border border-primary/10 flex flex-col gap-2">
              <Zap className="h-5 w-5 text-primary" />
              <span className="font-bold text-sm">Dapper Fast</span>
              <p className="text-xs text-muted-foreground">Consultas SQL raw para performance extrema.</p>
            </div>
            <div className="p-4 rounded-xl bg-primary/5 border border-primary/10 flex flex-col gap-2">
              <ShieldCheck className="h-5 w-5 text-primary" />
              <span className="font-bold text-sm">Dependency Injection</span>
              <p className="text-xs text-muted-foreground">Desacoplamento total via interfaces.</p>
            </div>
          </div>
        </div>

        <Separator />

        <section className="space-y-8">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary rounded-lg">
              <Layers className="h-6 w-6 text-primary-foreground" />
            </div>
            <h2 className="text-3xl font-bold">Estrutura de Camadas (Padrão MVC + S)</h2>
          </div>

          <div className="grid grid-cols-1 gap-6">
            {/* Camada 1: Controller */}
            <Card className="border-l-4 border-l-blue-500">
              <CardContent className="p-6 flex flex-col md:flex-row gap-6">
                <div className="md:w-1/4">
                  <Badge className="bg-blue-600 mb-2">Layer: API / Controller</Badge>
                  <h4 className="font-bold text-lg">Portas de Entrada</h4>
                </div>
                <div className="flex-1 text-sm text-muted-foreground space-y-2">
                  <p>Responsável apenas por receber o <code>HttpRequest</code>, validar o esquema básico e retornar o <code>ActionResult</code> adequado.</p>
                  <ul className="flex flex-wrap gap-2 pt-2">
                    <li className="bg-muted px-2 py-1 rounded border">MapControllers()</li>
                    <li className="bg-muted px-2 py-1 rounded border">Routing</li>
                    <li className="bg-muted px-2 py-1 rounded border">Authorization Attributes</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Camada 2: Service */}
            <Card className="border-l-4 border-l-emerald-500">
              <CardContent className="p-6 flex flex-col md:flex-row gap-6">
                <div className="md:w-1/4">
                  <Badge className="bg-emerald-600 mb-2">Layer: Service</Badge>
                  <h4 className="font-bold text-lg">Business Logic</h4>
                </div>
                <div className="flex-1 text-sm text-muted-foreground space-y-2">
                  <p>O coração do sistema. Aqui residem as regras de negócio, cálculos financeiros, orquestração de logs e chamadas de serviços externos.</p>
                  <div className="bg-emerald-50 border border-emerald-100 p-3 rounded text-emerald-800 text-xs italic font-medium">
                    Nenhum código SQL ou lógica de persistência deve existir nesta camada.
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Camada 3: Repository */}
            <Card className="border-l-4 border-l-amber-500">
              <CardContent className="p-6 flex flex-col md:flex-row gap-6">
                <div className="md:w-1/4">
                  <Badge className="bg-amber-600 mb-2">Layer: Repository</Badge>
                  <h4 className="font-bold text-lg">Data Access</h4>
                </div>
                <div className="flex-1 text-sm text-muted-foreground space-y-2">
                  <p>Interage com o MySQL (via Dapper/EF) ou MongoDB. Implementa o padrão <strong>Repository Pattern</strong> para esconder a complexidade das queries.</p>
                  <ul className="flex flex-wrap gap-2 pt-2">
                    <li className="bg-muted px-2 py-1 rounded border">IUnitOfWork</li>
                    <li className="bg-muted px-2 py-1 rounded border">Dapper Queries</li>
                    <li className="bg-muted px-2 py-1 rounded border">EF Core Context</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Camada 4: Model/Entity */}
            <Card className="border-l-4 border-l-slate-500">
              <CardContent className="p-6 flex flex-col md:flex-row gap-6">
                <div className="md:w-1/4">
                  <Badge className="bg-slate-600 mb-2">Layer: Model / Entity</Badge>
                  <h4 className="font-bold text-lg">Domain Objects</h4>
                </div>
                <div className="flex-1 text-sm text-muted-foreground space-y-2">
                  <p>Representações puras das tabelas do banco de dados e objetos de transferência (DTOs). Contém as definições de tipos e validações do <code>FluentValidation</code>.</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary rounded-lg">
              <TestTube2 className="h-6 w-6 text-primary-foreground" />
            </div>
            <h2 className="text-3xl font-bold">Estratégia de Testes</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <p className="text-muted-foreground">
                Garantimos a qualidade do código através de um pipeline de testes robusto utilizando <strong>xUnit</strong> e <strong>Moq</strong>.
              </p>
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-4 bg-muted/50 rounded-lg border">
                  <CheckCircle2 className="h-5 w-5 text-green-600" />
                  <div>
                    <span className="font-bold text-sm block">Unit Tests</span>
                    <span className="text-xs text-muted-foreground">Validação de métodos isolados na camada de Service.</span>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 bg-muted/50 rounded-lg border">
                  <CheckCircle2 className="h-5 w-5 text-green-600" />
                  <div>
                    <span className="font-bold text-sm block">Integration Tests</span>
                    <span className="text-xs text-muted-foreground">Teste do fluxo completo desde o Controller até o Banco (Docker).</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-xl bg-slate-950 p-6 border border-slate-800 shadow-inner">
               <div className="flex items-center justify-between mb-4 border-b border-slate-800 pb-2">
                  <span className="text-xs font-mono text-slate-500">XUNIT SAMPLE</span>
                  <Code2 className="h-4 w-4 text-slate-500" />
               </div>
               <pre className="font-mono text-[11px] text-blue-400 leading-relaxed overflow-x-auto">
{`[Fact]
public async Task Create_Should_ReturnSuccess_WhenDataIsValid()
{
    // Arrange
    var person = new Person { Name = "John", Age = 30 };
    _mockRepo.Setup(r => r.AddAsync(person)).ReturnsAsync(true);

    // Act
    var result = await _service.HandleCreate(person);

    // Assert
    Assert.True(result.IsSuccess);
}`}
               </pre>
            </div>
          </div>
        </section>

        <section className="space-y-6">
           <div className="flex items-center gap-3">
            <div className="p-2 bg-primary rounded-lg">
              <Workflow className="h-6 w-6 text-primary-foreground" />
            </div>
            <h2 className="text-3xl font-bold">Pipeline de Execução</h2>
          </div>

          <Card className="border-2 bg-primary/5">
             <CardContent className="p-10">
                <div className="relative flex flex-col md:flex-row items-center justify-between gap-4">
                   {/* Background Line */}
                   <div className="absolute top-1/2 left-0 w-full h-0.5 bg-muted-foreground/20 -translate-y-1/2 hidden md:block"></div>
                   
                   {[
                     { label: "Request", sub: "JSON Body", icon: Globe },
                     { label: "Auth", sub: "JWT Filter", icon: Lock },
                     { label: "Validator", sub: "FluentAPI", icon: ShieldCheck },
                     { label: "Logic", sub: "Service", icon: Cpu },
                     { label: "Query", sub: "Dapper/EF", icon: Database },
                     { label: "Response", sub: "Result object", icon: Share2 },
                   ].map((step, idx) => (
                     <div key={idx} className="relative z-10 flex flex-col items-center gap-2">
                        <div className="p-4 bg-background border-2 border-primary rounded-full shadow-lg group-hover:scale-110 transition-transform">
                           <step.icon className="h-5 w-5 text-primary" />
                        </div>
                        <div className="text-center">
                          <p className="font-bold text-xs">{step.label}</p>
                          <p className="text-[10px] text-muted-foreground font-mono">{step.sub}</p>
                        </div>
                     </div>
                   ))}
                </div>
             </CardContent>
          </Card>
        </section>

        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary rounded-lg">
              <Container className="h-6 w-6 text-primary-foreground" />
            </div>
            <h2 className="text-3xl font-bold">Ecossistema de Infraestrutura</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 bg-muted rounded-2xl border flex flex-col items-center gap-3">
              <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
                 <Server className="h-6 w-6 text-blue-600" />
              </div>
              <p className="font-bold">Web API</p>
              <Badge>Port 5701</Badge>
              <p className="text-xs text-center text-muted-foreground">Host Kestrel configurado para alta concorrência.</p>
            </div>

            <div className="p-6 bg-muted rounded-2xl border flex flex-col items-center gap-3">
              <div className="h-12 w-12 rounded-full bg-orange-100 flex items-center justify-center">
                 <Database className="h-6 w-6 text-orange-600" />
              </div>
              <p className="font-bold">MySQL 8.0</p>
              <Badge>Port 3306</Badge>
              <p className="text-xs text-center text-muted-foreground">Persistência relacional com otimização de índices.</p>
            </div>

            <div className="p-6 bg-muted rounded-2xl border flex flex-col items-center gap-3">
              <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center">
                 <Activity className="h-6 w-6 text-green-600" />
              </div>
              <p className="font-bold">MongoDB 7.0</p>
              <Badge>Port 27017</Badge>
              <p className="text-xs text-center text-muted-foreground">Storage NoSQL focado em logs e eventos de auditoria.</p>
            </div>
          </div>
        </section>

        <section className="space-y-6">
          <Card className="bg-slate-900 border-none overflow-hidden group">
            <CardContent className="p-12 relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">
               <div className="space-y-6 max-w-xl">
                 <h3 className="text-4xl font-bold text-white">Documentação Viva</h3>
                 <p className="text-slate-400 text-lg">
                   A API expõe um endpoint OpenAPI completo. Utilize o Swagger para testar as 
                   integrações de cada camada sem precisar de ferramentas externas como Postman.
                 </p>
                 <div className="bg-white p-4 rounded-xl flex items-center justify-between group-hover:ring-2 ring-primary transition-all">
                   <code className="text-black font-mono font-bold">http://localhost:5701/swagger</code>
                   <Terminal className="h-5 w-5 text-black opacity-20" />
                 </div>
               </div>
               <div className="hidden lg:block p-8 bg-primary/20 rounded-full animate-pulse">
                  <Globe className="h-32 w-32 text-primary" />
               </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </SidebarLayout>
  )
}

export default DocBackendOverview