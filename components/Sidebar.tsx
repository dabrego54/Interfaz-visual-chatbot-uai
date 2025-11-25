import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Library, Mail, MessageSquare, ShieldCheck, Workflow } from "lucide-react";

interface SidebarProps {
  onQuickPrompt: (prompt: string) => void;
  connectionOk: boolean | null;
  collapsed?: boolean;
  onClose?: () => void;
}

const quickPrompts = [
  { label: "Reglamentos académicos", value: "Cuéntame sobre los reglamentos académicos" },
  { label: "Titulación", value: "Quiero saber requisitos de titulación" },
  { label: "Derivación a área correspondiente", value: "Necesito que me derives al área adecuada" },
  { label: "Generar correo formal", value: "Genera un borrador de correo formal" },
  { label: "Consultas generales / FAQ", value: "Tengo una consulta general" }
];

export function Sidebar({ onQuickPrompt, connectionOk, collapsed, onClose }: SidebarProps) {
  return (
    <aside
      className={cn(
        "glass-card gradient-border relative flex h-full w-full max-w-xs flex-col justify-between rounded-3xl border border-white/10 p-6 shadow-soft",
        collapsed ? "hidden md:flex" : "flex"
      )}
      aria-label="Barra lateral con atajos y estado"
    >
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-lg font-semibold tracking-tight">UAI Assistant</div>
            <p className="text-sm text-muted-foreground">
              Asistente universitario 24/7 para dudas académicas y administrativas
            </p>
          </div>
          {!collapsed && onClose && (
            <Button variant="ghost" size="icon" onClick={onClose} aria-label="Cerrar menú">
              ✕
            </Button>
          )}
        </div>

        <div className="space-y-3" aria-label="Atajos rápidos">
          {quickPrompts.map((item) => (
            <Button
              key={item.label}
              variant="outline"
              className="w-full justify-start border-white/10 bg-white/5 text-left text-sm hover:border-primary/40 hover:bg-primary/10"
              onClick={() => onQuickPrompt(item.value)}
            >
              {item.label}
            </Button>
          ))}
        </div>

        <div className="mt-4 space-y-3 rounded-2xl border border-white/10 bg-secondary/50 p-4 text-sm">
          <div className="flex items-center gap-2">
            <ShieldCheck size={16} className="text-primary" />
            <span className="font-semibold">Estado de conexión</span>
          </div>
          <p className="text-muted-foreground text-sm">
            Proxy hacia workflow n8n.
          </p>
          <Badge variant={connectionOk ? "success" : "destructive"}>
            {connectionOk === null ? "Verificando..." : connectionOk ? "Conectado a n8n ✅" : "Error de conexión ❌"}
          </Badge>
        </div>
      </div>

      <div className="mt-6 space-y-2 text-xs text-muted-foreground">
        <div className="flex items-center gap-2">
          <Library size={14} />
          FAQ, matrículas, certificados
        </div>
        <div className="flex items-center gap-2">
          <Workflow size={14} />
          Derivación automática a áreas UAI
        </div>
        <div className="flex items-center gap-2">
          <MessageSquare size={14} />
          Consultas de titulación
        </div>
        <div className="flex items-center gap-2">
          <Mail size={14} />
          Borradores de correo formal
        </div>
      </div>
    </aside>
  );
}
