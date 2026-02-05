"use client"

import SidebarLayout from "@/components/layout"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  KeyRound,
  UserPlus,
  Database,
  Code2,
  Lock,
  ShieldCheck,
  AlertCircle,
  CheckCircle2,
  RefreshCcw,
  Fingerprint,
  Server,
  FileCode,
  Info
} from "lucide-react"

const DocBackendAuth = () => {
  return (
    <SidebarLayout>
      <div className="flex flex-col gap-14 max-w-6xl pb-20">

        <div className="space-y-6">
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="px-3 py-1 text-xs font-semibold uppercase tracking-wider">
              Segurança
            </Badge>
            <Badge variant="outline" className="px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary border-primary">
              v1.0.0
            </Badge>
          </div>

          <h1 className="text-5xl font-extrabold tracking-tight lg:text-6xl">
            Autenticação e Controle de Acesso
          </h1>

          <p className="text-muted-foreground text-xl leading-relaxed max-w-4xl">
            O ecossistema de segurança do <strong>Finance Control</strong> baseia-se em padrões
            de mercado robustos, utilizando <strong>JWT (JSON Web Tokens)</strong> para autorização
            stateless e <strong>Criptografia Hash</strong> para persistência de credenciais.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
            <div className="flex items-start gap-3 p-4 rounded-xl bg-primary/5 border border-primary/10">
              <ShieldCheck className="h-6 w-6 text-primary mt-1" />
              <div>
                <h3 className="font-bold">Identity First</h3>
                <p className="text-sm text-muted-foreground">Foco na validação rigorosa da identidade do usuário.</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-4 rounded-xl bg-primary/5 border border-primary/10">
              <Lock className="h-6 w-6 text-primary mt-1" />
              <div>
                <h3 className="font-bold">Stateless Auth</h3>
                <p className="text-sm text-muted-foreground">Tokens auto-contidos que dispensam sessões no servidor.</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-4 rounded-xl bg-primary/5 border border-primary/10">
              <RefreshCcw className="h-6 w-6 text-primary mt-1" />
              <div>
                <h3 className="font-bold">Ciclo de Vida</h3>
                <p className="text-sm text-muted-foreground">Gerenciamento de expiração e revogação de acesso.</p>
              </div>
            </div>
          </div>
        </div>

        <Separator className="my-2" />

        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary rounded-lg">
              <KeyRound className="h-6 w-6 text-primary-foreground" />
            </div>
            <h2 className="text-3xl font-bold">Mecanismo de Autenticação</h2>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>JSON Web Token (JWT)</CardTitle>
              <CardDescription>Padrão RFC 7519 para transmissão segura de informações.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6 text-muted-foreground leading-relaxed">
              <p>
                A autenticação no backend do Finance Control não utiliza <code>cookies</code> ou <code>sessions</code> tradicionais
                armazenadas em memória (RAM) do servidor. Em vez disso, adotamos o <strong>JWT</strong>.
                Isso permite que a aplicação seja horizontalmente escalável, pois qualquer instância do backend
                consegue validar o token se possuir a chave secreta.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <h4 className="text-foreground font-semibold flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-500" /> Vantagens do Modelo
                  </h4>
                  <ul className="list-disc list-inside space-y-2 text-sm">
                    <li>Desempenho: Não exige consultas constantes ao MySQL.</li>
                    <li>Segurança: Assinado digitalmente para evitar alterações.</li>
                    <li>Flexibilidade: Pode ser usado em Web, Mobile e integrações.</li>
                    <li>Descentralização: Ideal para arquiteturas de containers.</li>
                  </ul>
                </div>
                <div className="bg-muted p-4 rounded-lg border">
                  <h4 className="text-foreground font-semibold mb-2 text-sm uppercase">Estrutura do Token</h4>
                  <p className="text-xs font-mono break-all leading-relaxed">
                    <span className="text-red-500 font-bold">header</span>.
                    <span className="text-purple-500 font-bold">payload</span>.
                    <span className="text-blue-500 font-bold">signature</span>
                  </p>
                  <Separator className="my-3" />
                  <p className="text-xs italic">O payload contém: UserID, Email, Role e Expiração.</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary rounded-lg">
              <Server className="h-6 w-6 text-primary-foreground" />
            </div>
            <h2 className="text-3xl font-bold">Configuração de Ambiente</h2>
          </div>

          <Card>
            <CardContent className="pt-6 space-y-6">
              <p className="text-muted-foreground">
                As configurações de segurança são injetadas via variáveis de ambiente no <code>appsettings.json</code> ou
                diretamente no container Docker. Sem estas chaves, o serviço de autenticação falhará ao iniciar.
              </p>

              <div className="rounded-xl bg-slate-950 p-6 font-mono text-sm text-slate-300 shadow-2xl border border-slate-800">
                <div className="flex items-center gap-2 mb-4 text-slate-500 border-b border-slate-800 pb-2">
                  <FileCode className="h-4 w-4" />
                  <span>.env / docker-compose.yml</span>
                </div>
                <div className="space-y-3">
                  <p><span className="text-blue-400">VALIDATION_SERVICE_WEBAPI</span>=6B341FA5-87F7-4D30-A5A9-18C9960D0E13</p>
                  <p><span className="text-blue-400">JWTSETTINGS_EXPIREINHOURS_WEBAPI</span>=25</p>
                  <p><span className="text-blue-400">JTW_SECRET_KEY_SERVICE_WEBAPI</span>=EFBDAE5A-3CE0-4178-BCEA-52A686951FDB</p>
                  <p><span className="text-blue-400">JWTSETTINGS_VALIDISSUER</span>=SERVICE_AUTHENTICATION</p>
                  <p><span className="text-blue-400">JWTSETTINGS_VALIDAUDIENCE</span>=https://localhost</p>
                </div>
              </div>

              <div className="bg-amber-500/10 border border-amber-500/20 p-4 rounded-lg flex gap-4">
                <AlertCircle className="h-6 w-6 text-amber-600 shrink-0" />
                <p className="text-sm text-amber-800 dark:text-amber-400 leading-relaxed">
                  <strong>Atenção:</strong> Em ambientes de produção, a <code>JTW_SECRET_KEY</code> deve ser uma string longa e complexa,
                  preferencialmente gerada de forma aleatória e armazenada em um cofre de senhas (como Azure Key Vault).
                </p>
              </div>
            </CardContent>
          </Card>
        </section>

        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary rounded-lg">
              <Fingerprint className="h-6 w-6 text-primary-foreground" />
            </div>
            <h2 className="text-3xl font-bold">Endpoint de Login</h2>
          </div>

          <Card className="overflow-hidden border-2">
            <div className="bg-primary px-6 py-3 flex justify-between items-center">
              <div className="flex gap-4 items-center font-mono font-bold text-primary-foreground">
                <Badge className="bg-green-500 text-white">POST</Badge>
                <span>/api/auth/login</span>
              </div>
              <Badge variant="secondary">Público</Badge>
            </div>

            <CardContent className="p-0">
              <div className="grid grid-cols-1 lg:grid-cols-2">
                <div className="p-8 space-y-6 border-r">
                  <h3 className="text-xl font-bold">Descrição do Fluxo</h3>
                  <p className="text-muted-foreground text-sm">
                    Este endpoint é a porta de entrada principal. Ele valida as credenciais contra a base de dados MySQL.
                  </p>

                  <div className="space-y-4">
                    <h4 className="text-sm font-semibold uppercase tracking-wider text-primary">Processamento Interno:</h4>
                    <ol className="list-decimal list-inside space-y-3 text-sm text-muted-foreground">
                      <li>Recebimento do <code>email</code> e <code>password</code> (MD5).</li>
                      <li>Busca do usuário ativo por e-mail no repositório.</li>
                      <li>Comparação binária do hash da senha.</li>
                      <li>Criação das <code>Claims</code> (Identidade) do usuário.</li>
                      <li>Geração e assinatura do token com a <code>SecretKey</code>.</li>
                      <li>Retorno do objeto de sucesso com tempo de expiração.</li>
                    </ol>
                  </div>
                </div>

                <div className="p-8 bg-muted/30 space-y-6">
                  <h3 className="text-xl font-bold">Requisição (JSON)</h3>
                  <div className="rounded-lg bg-slate-900 p-4 font-mono text-xs text-slate-300">
                    <pre>
                      {`{
  "serviceId": "6B341FA5...",
  "email": "usuario@exemplo.com",
  "password": "hash_md5_da_senha"
}`}
                    </pre>
                  </div>

                  <h3 className="text-xl font-bold pt-4">Resposta de Sucesso (200)</h3>
                  <div className="rounded-lg bg-slate-900 p-4 font-mono text-xs text-green-400">
                    <pre>
                      {`{
  "token": "eyJhbGciOiJIUzI1Ni...",
  "userId": "7c9f8214-7ff0-4c72...",
  "email": "usuario@exemplo.com",
  "expiresIn": 86400,
  "error": false,
  "message": "Login realizado com sucesso"
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
              <UserPlus className="h-6 w-6 text-primary-foreground" />
            </div>
            <h2 className="text-3xl font-bold">Fluxo de Provisionamento (Primeiro Acesso)</h2>
          </div>

          <Card className="border-primary/40 shadow-lg shadow-primary/5">
            <CardHeader>
              <CardTitle className="text-2xl">Cadastro de Administrador Inicial</CardTitle>
              <CardDescription>Para cenários de banco de dados vazio.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="text-muted-foreground leading-relaxed">
                Como o sistema opera sob regime de <strong>Zero Trust</strong>, nenhum endpoint de negócio funciona sem token.
                Entretanto, no primeiro deploy, o banco MySQL está vazio. Para resolver o "paradoxo do ovo e da galinha",
                existe um endpoint de bypass controlado.
              </p>

              <div className="bg-muted rounded-2xl p-8 border border-dashed border-primary/50">
                <div className="flex flex-col md:flex-row gap-8 items-center">
                  <div className="flex-1 space-y-4">
                    <div className="flex items-center gap-2 text-primary font-bold font-mono">
                      <Badge>POST</Badge>
                      <span>/api/people/first/register</span>
                    </div>
                    <p className="text-sm text-muted-foreground italic">
                      Este endpoint deve ser desativado ou monitorado após a criação dos administradores.
                      Ele permite a inserção direta de uma entidade de "Pessoa" que será vinculada a um login.
                    </p>
                  </div>
                  <div className="w-full md:w-auto">
                    <div className="rounded-lg bg-slate-900 p-4 font-mono text-xs text-slate-300">
                      <pre>
                        {`{
  "name": "Admin Finance",
  "age": 30,
  "email": "admin@finance.com",
  "password": "..." 
}`}
                      </pre>
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
              <Code2 className="h-6 w-6 text-primary-foreground" />
            </div>
            <h2 className="text-3xl font-bold">Implementação Técnica</h2>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Lógica do Controller de Pessoas</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="rounded-xl bg-slate-950 p-6 font-mono text-sm text-slate-300 overflow-x-auto">
                <pre className="leading-relaxed">
                  {`[HttpPost("first/register")]
[AllowAnonymous] // Permite acesso sem JWT apenas aqui
public async Task<IActionResult> FirstRegister([FromBody] PeopleRequest request)
{
    // Mapeamento de DTO para Entidade de Negócio
    var person = _mapper.Map<People>(request);

    // Inserção via serviço com validação de regras (ex: email único)
    var response = await _peopleService.Insert(person);

    if (response.Error) 
    {
        // Retorna 400 em caso de erro de validação ou email duplicado
        return BadRequest(response);
    }

    // Retorna 200 OK com os dados da pessoa criada (sem a senha)
    return Ok(response);
}`}
                </pre>
              </div>
            </CardContent>
          </Card>
        </section>

        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary rounded-lg">
              <Info className="h-6 w-6 text-primary-foreground" />
            </div>
            <h2 className="text-3xl font-bold">Tratamento de Erros de Autenticação</h2>
          </div>

          <div className="rounded-lg border overflow-hidden">
            <table className="w-full text-sm text-left">
              <thead className="bg-muted text-muted-foreground uppercase text-xs">
                <tr>
                  <th className="px-6 py-4">Código HTTP</th>
                  <th className="px-6 py-4">Cenário</th>
                  <th className="px-6 py-4">Causa Provável</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                <tr>
                  <td className="px-6 py-4 font-mono font-bold text-red-500">401 Unauthorized</td>
                  <td className="px-6 py-4">Token Ausente ou Expirado</td>
                  <td className="px-6 py-4">O cabeçalho Authorization não foi enviado ou o tempo de vida do JWT acabou.</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 font-mono font-bold text-red-500">403 Forbidden</td>
                  <td className="px-6 py-4">Sem Permissão (Role)</td>
                  <td className="px-6 py-4">O usuário está logado, mas tenta acessar um recurso de nível superior.</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 font-mono font-bold text-amber-500">400 Bad Request</td>
                  <td className="px-6 py-4">Dados Inválidos</td>
                  <td className="px-6 py-4">E-mail com formato incorreto ou senha não enviada em hash MD5.</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 font-mono font-bold text-slate-500">500 Server Error</td>
                  <td className="px-6 py-4">Erro Crítico</td>
                  <td className="px-6 py-4">Banco de dados MySQL ou MongoDB está offline.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </SidebarLayout>
  )
}

export default DocBackendAuth