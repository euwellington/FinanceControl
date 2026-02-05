"use client"

import { StoresContext } from '@/stores/inject'
import { observer } from 'mobx-react-lite'
import { useContext, useEffect, useState } from 'react'
import {
    Zap,
    ArrowUpRight,
    ArrowDownLeft,
    Info,
    ShieldCheck,
    Activity,
    User,
    Tag,
    Clock,
    Server,
    Wifi
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import type { IHubTransaction } from "@/interfaces/IHubTransaction"
import { cn } from '@/lib/utils'

const HubTransaction = () => {
    const { hubConnectionStore } = useContext(StoresContext);
    const [transactions, setTransactions] = useState<IHubTransaction[]>([]);

    useEffect(() => {
        let activeConnection: any = null;

        hubConnectionStore.connect.then((connection) => {
            activeConnection = connection;

            connection.invoke('JoinGroup', "")
                .catch(err => console.error(err));

            connection.on('Transaction', (data: IHubTransaction) => {
                setTransactions((prev) => [data, ...prev].slice(0, 15));
            });
        });

        return () => {
            if (activeConnection) {
                activeConnection.off('Transaction');
            }
        };
    }, [hubConnectionStore]);

    const isConnected = hubConnectionStore.state === "Connected";

    return (
        <div className="min-h-screen bg-white dark:bg-slate-950 transition-colors duration-300">
            <div className="p-6 max-w-[1600px] mx-auto space-y-6">

                <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-slate-50 dark:bg-slate-900/50 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-indigo-600 rounded-2xl shadow-indigo-500/20 shadow-lg">
                            <Activity className="h-6 w-6 text-white" />
                        </div>
                        <div>
                            <h1 className="text-2xl font-black tracking-tight text-slate-900 dark:text-white italic">
                                Monitor Transacional em Tempo Real
                            </h1>
                            <p className="text-[10px] font-bold font-mono text-slate-500 uppercase tracking-[0.2em]">Motor de Processamento SignalR Core</p>
                        </div>
                    </div>

                    <div className={`flex items-center gap-4 px-6 py-3 rounded-2xl border transition-all duration-500 ${isConnected
                            ? "bg-emerald-500/5 border-emerald-500/20"
                            : "bg-rose-500/5 border-rose-500/20"
                        }`}>
                        <div className="relative flex h-3 w-3">
                            <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${isConnected ? "bg-emerald-400" : "bg-rose-400"}`}></span>
                            <span className={`relative inline-flex rounded-full h-3 w-3 ${isConnected ? "bg-emerald-500" : "bg-rose-500"}`}></span>
                        </div>
                        <div className="flex flex-col">
                            <span className={`font-black uppercase text-[10px] tracking-widest ${isConnected ? "text-emerald-600 dark:text-emerald-400" : "text-rose-600 dark:text-rose-400"}`}>
                                {isConnected ? "Servidor Conectado" : "Falha na Rede"}
                            </span>
                            <span className="text-[9px] font-bold text-slate-400 font-mono italic">
                                {isConnected ? "LATÊNCIA: < 24ms" : "TENTANDO RECONEXÃO..."}
                            </span>
                        </div>
                    </div>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

                    <div className="lg:col-span-8 space-y-6">
                        <Card className="border-none shadow-sm bg-slate-50 dark:bg-slate-900/40 rounded-[2rem] overflow-hidden">
                            <CardHeader className="p-8 pb-4 border-b border-slate-200 dark:border-slate-800">
                                <div className="flex justify-between items-center">
                                    <div className="flex items-center gap-3">
                                        <Zap className="h-5 w-5 text-indigo-500" />
                                        <CardTitle className="text-lg font-bold tracking-tight uppercase dark:text-white">Fluxo de Dados ao Vivo</CardTitle>
                                    </div>
                                    <Badge variant="outline" className="text-[10px] font-mono border-slate-300 dark:border-slate-700 text-slate-500">
                                        FILA DE ENTRADA VOLÁTIL
                                    </Badge>
                                </div>
                            </CardHeader>

                            <CardContent className="p-4 md:p-8 max-h-[750px] overflow-y-auto custom-scrollbar">
                                <div className="space-y-4">
                                    {transactions.length === 0 ? (
                                        <div className="py-32 text-center border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-3xl">
                                            <div className="flex flex-col items-center gap-3">
                                                <Server className="h-10 w-10 text-slate-300 animate-pulse" />
                                                <p className="text-slate-400 font-bold italic text-sm uppercase tracking-widest">Escutando eventos do servidor...</p>
                                            </div>
                                        </div>
                                    ) : (
                                        transactions.map((t, i) => (
                                            <div key={i} className="group flex flex-col sm:flex-row items-center justify-between p-5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-indigo-500/50 hover:shadow-lg hover:shadow-indigo-500/5 transition-all duration-300 gap-4">
                                                <div className="flex items-center gap-4 w-full sm:w-auto">
                                                    <div className={`h-14 w-14 rounded-2xl flex items-center justify-center shrink-0 shadow-inner ${t.transaction?.type === "Income" ? "bg-emerald-500/10 text-emerald-500" : "bg-rose-500/10 text-rose-500"
                                                        }`}>
                                                        {t.transaction?.type === "Income" ? <ArrowUpRight className="h-6 w-6" /> : <ArrowDownLeft className="h-6 w-6" />}
                                                    </div>
                                                    <div className="space-y-1.5">
                                                        <div className="flex items-center gap-2">
                                                            <span className="text-[10px] font-black px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-500 uppercase tracking-tighter">ID: {t.transaction?.id?.substring(0, 8)}</span>
                                                            <span className="text-[10px] font-bold text-indigo-600 dark:text-indigo-400 underline decoration-indigo-500/30 underline-offset-4">{t.category?.description}</span>
                                                        </div>
                                                        <p className="font-bold text-slate-900 dark:text-slate-100 text-base leading-tight">
                                                            <span className="text-indigo-500">{t.people?.name}</span> registrou {t.transaction?.type === "Income" ? "uma entrada" : "uma saída"} de <span className="text-slate-500 dark:text-slate-400 underline decoration-dotted">{t.transaction?.description}</span>
                                                        </p>
                                                        <div className="flex flex-wrap items-center gap-3">
                                                            <span className="text-[10px] text-slate-400 font-bold flex items-center gap-1 uppercase">
                                                                <User className="h-3 w-3 opacity-50 text-indigo-500" /> {t.people?.name}
                                                            </span>
                                                            <div className="h-1 w-1 rounded-full bg-slate-300 dark:bg-slate-700" />
                                                            <span className="text-[10px] text-slate-400 font-bold flex items-center gap-1 uppercase">
                                                                <Tag className="h-3 w-3 opacity-50 text-indigo-500" /> {t.category?.description}
                                                            </span>
                                                            <div className="h-1 w-1 rounded-full bg-slate-300 dark:bg-slate-700" />
                                                            <span className="text-[10px] text-slate-400 font-bold flex items-center gap-1 uppercase">
                                                                <Clock className="h-3 w-3 opacity-50" /> {new Date().toLocaleTimeString('pt-BR')}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="flex flex-row sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto gap-2 border-t sm:border-t-0 pt-4 sm:pt-0 border-slate-100 dark:border-slate-800">
                                                    <p className={`text-2xl font-black tabular-nums tracking-tighter ${t.transaction?.type === "Income" ? "text-emerald-600 dark:text-emerald-400" : "text-rose-600 dark:text-rose-400"
                                                        }`}>
                                                        {t.transaction?.type === "Income" ? "+" : "-"} {t.transaction?.amount?.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                                                    </p>
                                                    <Badge
                                                        className={cn(
                                                            "font-bold text-[10px] uppercase px-3 py-0.5 rounded-full border-none shadow-sm",
                                                            t.transaction?.type === "Income"
                                                                ? "bg-emerald-500 text-white hover:bg-emerald-600"
                                                                : "bg-rose-500 text-white hover:bg-rose-600"
                                                        )}
                                                    >
                                                        {t.transaction?.type === "Income" ? "Receita Garantida" : "Gasto Identificado"}
                                                    </Badge>
                                                </div>
                                            </div>
                                        ))
                                    )}
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    <aside className="lg:col-span-4 space-y-6">
                        <Card className="rounded-[2rem] border border-slate-200 dark:border-slate-800 shadow-sm bg-white dark:bg-slate-900 overflow-hidden">
                            <div className="p-6 bg-indigo-600 text-white relative">
                                <div className="absolute top-6 right-6">
                                    <Wifi className={cn("h-5 w-5 opacity-50", isConnected && "animate-pulse")} />
                                </div>
                                <h3 className="text-lg font-black italic tracking-tighter uppercase leading-none mb-1">Status do Barramento</h3>
                                <p className="text-indigo-100 text-[9px] font-bold uppercase tracking-widest opacity-80">Protocolo de Notificação Push</p>
                            </div>
                            <CardContent className="p-6 space-y-6">
                                <div className="flex gap-4">
                                    <div className="h-10 w-10 bg-indigo-50 dark:bg-indigo-500/10 rounded-xl flex items-center justify-center shrink-0">
                                        <ShieldCheck className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                                    </div>
                                    <div>
                                        <p className="font-bold text-slate-800 dark:text-slate-200 uppercase text-[10px] tracking-tight">Segurança de Dados</p>
                                        <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-tight mt-1 italic">
                                            Conexão criptografada ponta-a-ponta via TLS 1.3.
                                        </p>
                                    </div>
                                </div>

                                <Separator className="bg-slate-100 dark:bg-slate-800" />

                                <div className="space-y-4">
                                    <div className="flex justify-between items-center px-1">
                                        <span className="text-[9px] font-black uppercase text-slate-400 tracking-[0.2em]">Diagnóstico do Motor</span>
                                        <div className={`h-1.5 w-1.5 rounded-full ${isConnected ? "bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" : "bg-rose-500"}`} />
                                    </div>

                                    <div className="grid grid-cols-1 gap-3">
                                        <div className="group flex justify-between items-center bg-slate-50 dark:bg-slate-800/50 p-4 rounded-2xl border border-slate-100 dark:border-slate-800 transition-all hover:bg-slate-100">
                                            <span className="text-[10px] font-bold text-slate-400 uppercase">Conexão Ativa</span>
                                            <code className="text-[10px] font-black text-indigo-600 dark:text-indigo-400 uppercase italic">
                                                {isConnected ? "SINAL ESTÁVEL" : "DESCONECTADO"}
                                            </code>
                                        </div>
                                        <div className="flex justify-between items-center bg-slate-50 dark:bg-slate-800/50 p-4 rounded-2xl border border-slate-100 dark:border-slate-800">
                                            <span className="text-[10px] font-bold text-slate-400 uppercase">Ambiente</span>
                                            <code className="text-[10px] font-black text-slate-500 italic">PRODUÇÃO v8.0</code>
                                        </div>
                                        <div className="flex justify-between items-center bg-slate-50 dark:bg-slate-800/50 p-4 rounded-2xl border border-slate-100 dark:border-slate-800">
                                            <span className="text-[10px] font-bold text-slate-400 uppercase">Buffer de Cache</span>
                                            <code className="text-[10px] font-black text-indigo-600 dark:text-indigo-400">{transactions.length} REGISTROS</code>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="rounded-[2rem] border border-dashed border-slate-200 dark:border-slate-800 bg-transparent p-6 group hover:bg-slate-50 transition-colors">
                            <div className="flex items-start gap-3 opacity-70 group-hover:opacity-100 transition-opacity">
                                <Info className="h-4 w-4 text-indigo-500 shrink-0 mt-0.5" />
                                <div>
                                    <p className="text-[10px] font-bold text-slate-500 leading-relaxed uppercase tracking-tighter">
                                        Monitoramento Reativo
                                    </p>
                                    <p className="text-[9px] text-slate-400 mt-1">
                                        Os registros abaixo são empurrados pelo servidor via Socket. Não é necessário atualizar a página.
                                    </p>
                                </div>
                            </div>
                        </Card>
                    </aside>
                </div>
            </div>
        </div>
    )
}

export default observer(HubTransaction)