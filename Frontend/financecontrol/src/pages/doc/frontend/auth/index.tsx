"use client"

import {
  Card,
  CardContent,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  Database,
  Lock,
  ShieldCheck,
  CheckCircle2,
  RefreshCcw,
  FileCode,
  Sparkles,
  Network,
  History,
  Activity,
  UserCheck,
  Zap,
  Fingerprint,
  Key,
  ShieldAlert
} from "lucide-react"
import ImageLogin from '@/assets/images/doc/frontend/auth/login.png'
import ImageFirstAccess from '@/assets/images/doc/frontend/auth/first-access.png'

const DocFrontendAuth = () => {
  return (
    <div>
      <div className="flex flex-col gap-16 max-w-6xl pb-24 mx-auto px-4">

        <div className="relative space-y-6 pt-8">
          <div className="flex items-center gap-3">
            <Badge variant="secondary" className="px-4 py-1.5 text-xs font-bold uppercase tracking-widest bg-primary/10 text-primary border-none">
              Security Protocol
            </Badge>
          </div>

          <h1 className="text-5xl font-black tracking-tight lg:text-7xl">
            Autenticação & API
          </h1>

          <p className="text-muted-foreground text-xl leading-relaxed max-w-3xl border-l-4 border-primary/20 pl-6">
            Documentação técnica dos processos de login, handshake de serviço e especificações do endpoint
            de autenticação do ecossistema <strong>Finance Control</strong>.
          </p>
        </div>

        <Separator />

        <section className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-amber-500 to-orange-600 rounded-[3rem] blur opacity-10 transition duration-1000" />
          <Card className="relative border-none bg-white overflow-hidden rounded-[2.8rem] shadow-2xl">
            <CardContent className="p-0">
              <div className="flex flex-col lg:flex-row">

                <div className="lg:w-[40%] p-10 lg:p-14 space-y-8 bg-amber-50/40">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="bg-amber-500 p-3 rounded-2xl shadow-lg">
                        <Sparkles className="h-8 w-8 text-white" />
                      </div>
                      <h3 className="text-3xl font-black text-amber-950 uppercase tracking-tighter">Primeiro Acesso</h3>
                    </div>
                    <p className="text-amber-900/80 text-lg leading-relaxed font-medium">
                      Caso o sistema seja novo ou você ainda não possua uma conta registrada, utilize o fluxo de
                      <span className="text-amber-600 font-bold italic ml-1">"Criar uma conta"</span>.
                    </p>
                  </div>

                  <div className="space-y-6">
                    <div className="flex items-center gap-3 p-4 bg-white/60 rounded-2xl border border-amber-200">
                      <UserCheck className="h-6 w-6 text-amber-600" />
                      <span className="font-extrabold text-amber-900 tracking-tight">Cadastro de Pessoa</span>
                    </div>

                    <ul className="space-y-4">
                      {[
                        "Criação de perfil individual",
                        "Vinculação de e-mail seguro",
                        "Senha pessoal criptografada",
                        "Acesso imediato ao dashboard"
                      ].map((item, i) => (
                        <li key={i} className="flex items-center gap-3 text-sm font-bold text-amber-900/70 pl-2">
                          <CheckCircle2 className="h-4 w-4 text-amber-500" /> {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-8">
                    <div className="p-5 bg-amber-950 rounded-3xl text-amber-100 space-y-2 shadow-xl">
                      <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-amber-500">
                        <Zap className="h-3 w-3" /> Status do Sistema
                      </div>
                      <p className="text-xs font-medium leading-relaxed">
                        O frontend identifica a ausência de sessão e redireciona para a criação da primeira entidade "Pessoa" no banco de dados.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="lg:w-[60%] bg-slate-50 flex items-center justify-center p-6 lg:p-12 relative overflow-hidden border-l border-slate-100">
                  <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:20px_20px] opacity-30" />

                  <div className="relative w-full h-full flex items-center justify-center">
                    <div className="absolute inset-0 bg-amber-500/10 blur-[120px] rounded-full" />
                    <div className="relative rounded-[2rem] overflow-hidden shadow-[0_30px_60px_-15px_rgba(0,0,0,0.3)] border-[6px] border-white transform transition duration-700 hover:scale-[1.01]">
                      <img
                        src={ImageFirstAccess}
                        alt="Tela de Cadastro de Pessoa"
                        className="w-full h-auto object-cover"
                      />
                    </div>
                  </div>
                </div>

              </div>
            </CardContent>
          </Card>
        </section>

        <section className="space-y-12">
          <div className="flex items-center gap-4">
            <div className="h-10 w-2 bg-primary rounded-full" />
            <h2 className="text-4xl font-black tracking-tight text-slate-900">Acesso ao Sistema</h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="relative group rounded-[3rem] p-6 bg-slate-50 border border-slate-200 shadow-inner">
              <div className="overflow-hidden rounded-[2rem] shadow-2xl border-4 border-white transition-transform duration-700 hover:scale-[1.02]">
                <img
                  src={ImageLogin}
                  alt="Login UI"
                  className="w-full h-auto"
                />
              </div>
            </div>

            <div className="space-y-8">
              <div className="p-8 rounded-[2.5rem] bg-white border shadow-sm space-y-6">
                <h3 className="text-3xl font-bold flex items-center gap-3">
                  <History className="text-primary h-8 w-8" /> Fluxo de Login
                </h3>
                <p className="text-muted-foreground leading-relaxed text-xl">
                  Para usuários cadastrados, o acesso é autenticado via <strong>JWT</strong>.
                  O sistema utiliza validações assíncronas para garantir fluidez.
                </p>
                <Separator />
                <div className="grid grid-cols-1 gap-4">
                  <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl">
                    <Lock className="text-primary h-5 w-5" />
                    <span className="text-sm font-bold">Segurança via MD5 Client-side</span>
                  </div>
                  <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl">
                    <Database className="text-primary h-5 w-5" />
                    <span className="text-sm font-bold">Persistência em LocalStorage</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="space-y-10 py-12">
          <div className="flex flex-col md:flex-row md:items-center gap-6">
            <div className="flex items-center gap-4">
              <div className="h-12 w-3 bg-indigo-600 rounded-full shadow-[0_0_15px_rgba(79,70,229,0.5)]" />
              <h2 className="text-4xl font-black tracking-tight text-slate-900 italic">Documentação do Endpoint</h2>
            </div>
            <Badge className="w-fit bg-indigo-100 text-indigo-700 hover:bg-indigo-100 border-none px-4 py-1 rounded-full font-bold">
              v1.0 Security Protocol
            </Badge>
          </div>

          <Card className="rounded-[3rem] border-none bg-slate-100/50 p-2 shadow-inner">
            <div className="bg-white rounded-[2.9rem] overflow-hidden shadow-2xl border border-white">

              <div className="p-10 border-b flex flex-col lg:flex-row justify-between items-center bg-gradient-to-r from-slate-50 to-white gap-6">
                <div className="flex flex-wrap items-center justify-center md:justify-start gap-4">
                  <Badge className="bg-emerald-500 text-white font-black px-8 py-3 text-xl shadow-lg shadow-emerald-200 border-none">POST</Badge>
                  <div className="flex flex-col">
                    <code className="text-2xl md:text-3xl font-black text-slate-700 tracking-tight">/api/auth/login</code>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">Ponto de Entrada Principal</span>
                  </div>
                </div>
                <div className="flex flex-col items-end">
                  <Badge variant="outline" className="text-slate-400 border-slate-200 font-mono px-4 py-1">Auth.Controller.cs</Badge>
                  <span className="text-[10px] text-emerald-600 font-bold mt-1">● SSL ENABLED</span>
                </div>
              </div>

              <div className="p-8 md:p-12 space-y-16">

                <div className="bg-amber-50 border-2 border-amber-200 rounded-[2rem] p-8 relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-4 opacity-10">
                    <Fingerprint className="h-24 w-24 text-amber-900" />
                  </div>
                  <div className="flex items-start gap-4 relative z-10">
                    <div className="p-3 bg-amber-500 rounded-2xl shadow-lg">
                      <Key className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h4 className="text-xl font-black text-amber-900 mb-2">Atenção ao Service ID</h4>
                      <p className="text-amber-800 leading-relaxed font-medium">
                        O campo <code className="bg-amber-200/50 px-2 py-1 rounded text-amber-950 font-bold">serviceId</code> é o coração da nossa autenticação.
                        Ele utiliza o identificador único <strong className="underline decoration-2">6B341FA5-87F7-4D30-A5A9-18C9960D0E13</strong>.
                        Sem este ID exato, o backend rejeita a tentativa de login imediatamente, pois ele valida se a requisição está vindo do ecossistema oficial do Finance Control.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                  <div className="space-y-8">
                    <h4 className="text-2xl font-black flex items-center gap-3 text-slate-900 uppercase tracking-tighter">
                      <Network className="text-indigo-600 h-7 w-7" /> Regras de Negócio
                    </h4>
                    <ul className="space-y-6">
                      {[
                        { title: "Sanitização de inputs", desc: "Remoção de caracteres especiais e espaços vazios em E-mail e Senha." },
                        { title: "Database Lookup", desc: "Varredura na base SQL Server para localização do registro da pessoa." },
                        { title: "MD5 Security Match", desc: "Comparação binária do hash da senha enviada com o valor persistido." },
                        { title: "JWT Signature", desc: "Geração de token com validade de 60 minutos (3600 segundos)." }
                      ].map((item, i) => (
                        <li key={i} className="flex gap-4 items-start group">
                          <div className="mt-1 bg-emerald-100 p-1 rounded-full group-hover:bg-emerald-500 transition-colors">
                            <CheckCircle2 className="text-emerald-500 h-5 w-5 group-hover:text-white transition-colors" />
                          </div>
                          <div>
                            <p className="font-bold text-slate-800">{item.title}</p>
                            <p className="text-sm text-slate-500 font-medium italic">{item.desc}</p>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="space-y-8">
                    <h4 className="text-2xl font-black flex items-center gap-3 text-slate-900 uppercase tracking-tighter">
                      <Activity className="text-indigo-600 h-7 w-7" /> HTTP Responses
                    </h4>
                    <div className="grid grid-cols-1 gap-4">
                      {[
                        { code: "200 OK", text: "Sucesso total. O payload retorna o JWT pronto para o Header Authorization.", color: "bg-emerald-500", light: "bg-emerald-50" },
                        { code: "401 UNAUTHORIZED", text: "Credenciais não batem ou ServiceId foi informado incorretamente.", color: "bg-red-500", light: "bg-red-50" },
                        { code: "500 ERROR", text: "Instabilidade no servidor ou falha crítica de conexão com o MySQL.", color: "bg-slate-700", light: "bg-slate-100" }
                      ].map((resp) => (
                        <div key={resp.code} className={`flex flex-col p-5 ${resp.light} rounded-3xl border border-white shadow-sm transition-transform hover:scale-[1.02]`}>
                          <span className={`w-fit font-black text-white text-[10px] px-4 py-1.5 rounded-full shadow-sm mb-2 ${resp.color}`}>{resp.code}</span>
                          <span className="text-xs font-bold text-slate-600 leading-relaxed">{resp.text}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 xl:grid-cols-2 gap-10">
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 ml-4">
                      <ShieldAlert className="h-4 w-4 text-indigo-500" />
                      <span className="text-[10px] font-black uppercase text-slate-400 tracking-[0.3em]">Request Payload</span>
                    </div>
                    <div className="bg-slate-950 p-10 rounded-[2.5rem] shadow-2xl border-t-4 border-indigo-500 relative group">
                      <div className="absolute top-6 right-8 text-slate-800 font-mono text-xs group-hover:text-slate-600 transition-colors">JSON</div>
                      <pre className="text-blue-300 font-mono text-sm leading-relaxed overflow-x-auto">
                        {`{
  // Identificação única do sistema backend
  "serviceId": "6B341FA5-87F7-4D30-A5A9-18C9960D0E13",
  
  "email": "pessoa@dominio.com",
  "password": "hash_md5_senha"
}`}
                      </pre>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center gap-2 ml-4">
                      <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                      <span className="text-[10px] font-black uppercase text-slate-400 tracking-[0.3em]">Success Response</span>
                    </div>
                    <div className="bg-slate-900 p-10 rounded-[2.5rem] shadow-2xl border-t-4 border-emerald-500 relative group">
                      <div className="absolute top-6 right-8 text-slate-700 font-mono text-xs group-hover:text-slate-500 transition-colors">JSON</div>
                      <pre className="text-emerald-400 font-mono text-sm leading-relaxed overflow-x-auto">
                        {`{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6Ikp...",
  "userId": "uuid-da-pessoa-aqui",
  "email": "pessoa@dominio.com",
  "expiresIn": 3600
}`}
                      </pre>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </Card>
        </section>

        <section className="space-y-8">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-primary/10 rounded-2xl">
              <RefreshCcw className="h-8 w-8 text-primary" />
            </div>
            <h2 className="text-4xl font-black tracking-tight text-slate-900">Implementação Frontend</h2>
          </div>

          <Card className="border-none shadow-3xl rounded-[3rem] overflow-hidden bg-slate-950">
            <div className="bg-slate-900 px-10 py-6 border-b border-white/5 flex items-center justify-between">
              <div className="flex items-center gap-3 font-mono text-sm text-slate-400">
                <FileCode className="h-5 w-5" /> src/hooks/useAuth.ts
              </div>
            </div>
            <CardContent className="p-10 lg:p-14 overflow-x-auto">
              <pre className="text-base font-mono leading-relaxed text-blue-200">
                {`const service_application = import.meta.env.VITE_SERVICE_APPLICATION;

export const useAuth = () => {
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const authentication = async (request: ILogin) => {
        setLoading(true);
        setSuccess(false);

        request.serviceId = service_application;

        try {
            const { data } = await LoginAPI.login(request);

            if (data.error) {
                toast.error(data.message);
                return;
            }

            localStorage.setItem("@token", data.data);

            setSuccess(true);
            toast.success("Login realizado!");

            setTimeout(() => {
                window.location.href = '/dashboard';
            }, 1000);

        } catch (error: any) {
            setSuccess(false);
            handleApiError(error, "Erro ao autenticar");
        } finally {
            setLoading(false);
        }
    }

    return { authentication, loading, success }
}`}
              </pre>
            </CardContent>
          </Card>
        </section>

        <section className="pt-10">
          <div className="relative p-12 lg:p-20 rounded-[4.5rem] bg-slate-900 text-white overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
              <ShieldCheck size={500} />
            </div>
            <div className="relative space-y-12 max-w-5xl">
              <h2 className="text-6xl font-black tracking-tighter">Segurança & Integridade</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-16 text-slate-400 text-xl leading-relaxed">
                <div className="space-y-6">
                  <p>
                    O fluxo de autenticação documentado assegura que cada <strong>Pessoa</strong> possua uma identidade digital única dentro do ecossistema.
                    O handshake via UUID de serviço impede acessos externos não autorizados.
                  </p>
                  <p>
                    A separação entre o fluxo de <strong>Cadastro</strong> e <strong>Login</strong> garante escalabilidade para futuros módulos de permissões.
                  </p>
                </div>
                <div className="space-y-8">
                  <div className="p-8 bg-white/5 rounded-[2.5rem] border border-white/10 space-y-4 shadow-inner">
                    <div className="flex items-center gap-3 text-white font-bold text-2xl">
                      <Database className="text-primary h-7 w-7" /> Persistência
                    </div>
                    <p className="text-base text-slate-400">
                      O uso de interceptors no Axios garante que o token JWT seja injetado em todas as requisições após o login bem-sucedido.
                    </p>
                  </div>
                  <div className="flex gap-4 flex-wrap">
                    <Badge className="bg-primary text-white border-none py-2 px-6 rounded-full font-bold">Axios Integrated</Badge>
                    <Badge className="bg-emerald-500 text-white border-none py-2 px-6 rounded-full font-bold">JWT Token</Badge>
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

export default DocFrontendAuth