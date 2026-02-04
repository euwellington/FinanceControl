import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Home, ArrowLeft, Ghost } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-background">
      {/* Background Decorativo com Blur */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] -z-10" />
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="container flex flex-col items-center text-center px-4"
      >
        {/* Ícone Animado */}
        <motion.div
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="relative mb-8"
        >
          <Ghost className="w-32 h-32 text-primary opacity-80" />
          <div className="absolute -bottom-2 w-24 h-4 bg-foreground/5 rounded-[100%] blur-md mx-auto left-0 right-0" />
        </motion.div>

        {/* Título e Texto */}
        <h1 className="text-9xl font-extrabold tracking-tighter text-foreground/20 select-none">
          404
        </h1>
        
        <h2 className="text-3xl font-bold mt-[-40px] mb-4 bg-gradient-to-t from-foreground to-foreground/60 bg-clip-text text-transparent">
          Página não encontrada
        </h2>
        
        <p className="text-muted-foreground max-w-[450px] mb-8 text-lg">
          Parece que você se aventurou em um território desconhecido. 
          O link que você seguiu pode estar quebrado ou a página foi movida.
        </p>

        {/* Botões de Ação */}
        <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
          <Button 
            variant="outline" 
            size="lg"
            onClick={() => navigate(-1)}
            className="group transition-all hover:bg-secondary"
          >
            <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
            Voltar
          </Button>
          
          <Button 
            size="lg"
            onClick={() => navigate("/dashboard")}
            className="bg-[#2c2f6e] hover:bg-[#2c2f6e]/90 text-white shadow-lg shadow-primary/20"
          >
            <Home className="mr-2 h-4 w-4" />
            Início
          </Button>
        </div>
      </motion.div>

      {/* Rodapé minimalista */}
      <footer className="absolute bottom-8 text-sm text-muted-foreground/50 font-medium">
        © {new Date().getFullYear()} MyFinance. Todos os direitos reservados.
      </footer>
    </div>
  );
}