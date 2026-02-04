import AreaChart from "@/components/dashboard";
import SidebarLayout from "@/components/layout";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Users, DollarSign, ArrowUpRight, Activity } from "lucide-react";
import { observer } from "mobx-react-lite";

const HomePage = () => {
  return (
    <SidebarLayout>
      <div className="flex flex-col gap-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">Bem-vindo de volta! Aqui está o resumo do seu SaaS hoje.</p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <MetricCard title="Receita Total" value="R$ 45.231,89" icon={<DollarSign size={20}/>} trend="+20.1%" />
          <MetricCard title="Novas Assinaturas" value="+2,350" icon={<Users size={20}/>} trend="+180.1%" />
          <MetricCard title="Vendas" value="+12,234" icon={<ArrowUpRight size={20}/>} trend="+19%" />
          <MetricCard title="Ativos Agora" value="+573" icon={<Activity size={20}/>} trend="+201 since last hour" />
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          <Card className="col-span-12">
            <CardHeader>
              <CardTitle>Visão Geral de Crescimento</CardTitle>
              <CardDescription>Mostrando total de visitantes nos últimos 6 meses</CardDescription>
            </CardHeader>
            <CardContent className="pl-2">
              <AreaChart />
            </CardContent>
          </Card>
        </div>
      </div>
    </SidebarLayout>
  );
}

function MetricCard({ title, value, icon, trend }: { title: string, value: string, icon: React.ReactNode, trend: string }) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <div className="text-muted-foreground">{icon}</div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-green-500 flex items-center gap-1">
          {trend} <span className="text-muted-foreground">em relação ao mês passado</span>
        </p>
      </CardContent>
    </Card>
  );
}

export default observer(HomePage);