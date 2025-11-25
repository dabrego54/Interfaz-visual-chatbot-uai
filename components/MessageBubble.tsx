import { useMemo, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { ChatMessage } from "@/types/chat";
import { Bot, ThumbsDown, ThumbsUp, UserRound } from "lucide-react";

interface MessageBubbleProps {
  message: ChatMessage;
  isAssistant?: boolean;
}

const intentLabels: Record<string, string> = {
  FAQ: "FAQ",
  derivation: "Derivación",
  titulation: "Titulación",
  emailDraft: "Correo"
};

export function MessageBubble({ message, isAssistant }: MessageBubbleProps) {
  const [feedback, setFeedback] = useState<"up" | "down" | null>(null);

  const intentLabel = useMemo(() => {
    if (!message.intent) return null;
    return intentLabels[message.intent] ?? message.intent;
  }, [message.intent]);

  const handleFeedback = (value: "up" | "down") => {
    setFeedback(value);
    // TODO: conectar con endpoint de feedback cuando esté disponible
    console.info("Feedback registrado", { messageId: message.id, feedback: value });
  };

  return (
    <div
      className={cn(
        "flex w-full gap-3 fade-in",
        isAssistant ? "justify-start" : "justify-end"
      )}
      role="listitem"
      aria-label={isAssistant ? "Respuesta del asistente" : "Mensaje del usuario"}
    >
      {isAssistant && (
        <div className="mt-1 flex h-9 w-9 items-center justify-center rounded-2xl bg-primary/30 text-primary-foreground shadow-glow">
          <Bot size={18} />
        </div>
      )}
      <div
        className={cn(
          "relative max-w-2xl rounded-2xl border border-white/5 px-4 py-3 shadow-soft backdrop-blur-sm",
          isAssistant
            ? "bg-card/80 text-foreground"
            : "bg-primary text-primary-foreground ml-auto",
          "animate-in slide-in-from-bottom-2 duration-200"
        )}
      >
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 text-xs uppercase tracking-wide text-muted-foreground">
            {isAssistant ? (
              <span className="flex items-center gap-1"><Bot size={14} /> UAI Assistant</span>
            ) : (
              <span className="flex items-center gap-1"><UserRound size={14} /> Tú</span>
            )}
            <span aria-hidden>•</span>
            <time dateTime={message.createdAt} className="text-[11px] opacity-70">
              {new Date(message.createdAt).toLocaleTimeString("es-CL", {
                hour: "2-digit",
                minute: "2-digit"
              })}
            </time>
          </div>
          {intentLabel && (
            <Badge variant="outline" className="text-[11px]">
              {intentLabel}
            </Badge>
          )}
        </div>
        <div className="mt-2 whitespace-pre-wrap text-sm leading-relaxed">
          {message.content}
        </div>
        {isAssistant && (
          <div className="mt-3 flex items-center gap-2 text-xs text-muted-foreground">
            <span>¿Te fue útil?</span>
            <button
              type="button"
              className={cn(
                "flex items-center gap-1 rounded-full border border-white/10 bg-white/5 px-2 py-1 transition hover:border-primary/40 hover:text-primary",
                feedback === "up" && "border-emerald-400/60 text-emerald-200"
              )}
              onClick={() => handleFeedback("up")}
              aria-label="Marcar como útil"
            >
              <ThumbsUp size={14} />
            </button>
            <button
              type="button"
              className={cn(
                "flex items-center gap-1 rounded-full border border-white/10 bg-white/5 px-2 py-1 transition hover:border-primary/40 hover:text-primary",
                feedback === "down" && "border-red-400/60 text-red-200"
              )}
              onClick={() => handleFeedback("down")}
              aria-label="Marcar como no útil"
            >
              <ThumbsDown size={14} />
            </button>
            {feedback && <span className="text-emerald-200">¡Gracias por tu feedback!</span>}
          </div>
        )}
      </div>
    </div>
  );
}
