"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { ChatInput } from "@/components/ChatInput";
import { MessageList } from "@/components/MessageList";
import { Sidebar } from "@/components/Sidebar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChatMessage } from "@/types/chat";
import { Loader2, Menu } from "lucide-react";

interface ChatResponse {
  messages?: Array<Partial<ChatMessage>>;
  error?: string;
}

export function ChatLayout() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [connectionOk, setConnectionOk] = useState<boolean | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const verifyConnection = async () => {
      try {
        const res = await fetch("/api/chat", { method: "GET" });
        setConnectionOk(res.ok);
      } catch (err) {
        console.error("Error verificando conexión", err);
        setConnectionOk(false);
      }
    };
    verifyConnection();
  }, []);

  const historyPayload = useMemo(
    () =>
      messages.map(({ role, content }) => ({
        role,
        content
      })),
    [messages]
  );

  const sendMessage = useCallback(
    async (content: string) => {
      const userMessage: ChatMessage = {
        id: crypto.randomUUID(),
        role: "user",
        content,
        createdAt: new Date().toISOString()
      };
      setMessages((prev) => [...prev, userMessage]);
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            message: content,
            history: historyPayload
          })
        });

        if (!response.ok) {
          throw new Error("No se pudo obtener respuesta del asistente");
        }

        const data: ChatResponse = await response.json();
        const assistantMessages = (data.messages ?? []).map((msg) => ({
          id: msg.id ?? crypto.randomUUID(),
          role: msg.role ?? "assistant",
          content: msg.content ?? "Respuesta no disponible",
          intent: msg.intent,
          createdAt: msg.createdAt ?? new Date().toISOString(),
          meta: msg.meta
        }));

        setMessages((prev) => [...prev, ...assistantMessages]);
      } catch (err) {
        console.error(err);
        setError("Ocurrió un problema al contactar al asistente. Inténtalo nuevamente.");
        const errorMessage: ChatMessage = {
          id: crypto.randomUUID(),
          role: "system",
          content: "Lo sentimos, hubo un error al procesar tu solicitud.",
          createdAt: new Date().toISOString(),
          intent: "error"
        };
        setMessages((prev) => [...prev, errorMessage]);
      } finally {
        setIsLoading(false);
      }
    },
    [historyPayload]
  );

  return (
    <div className="container py-8">
      <div className="mb-6 flex items-center justify-between gap-3">
        <div className="flex flex-col gap-1">
          <Badge variant="outline" className="w-fit uppercase">MVP – Versión de pruebas</Badge>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">
            Chatbot Universitario Inteligente – UAI
          </h1>
          <p className="text-muted-foreground">
            Haz tus consultas sobre reglamentos, titulación, contactos y más.
          </p>
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          aria-label="Abrir menú"
          onClick={() => setSidebarOpen(true)}
        >
          <Menu />
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-[320px_1fr]">
        <div className="md:block">
          <Sidebar
            onQuickPrompt={(value) => sendMessage(value)}
            connectionOk={connectionOk}
            collapsed
          />
        </div>

        <Card className="relative min-h-[70vh] overflow-hidden rounded-3xl border-white/10">
          <CardHeader className="flex flex-col gap-1">
            <CardTitle className="text-2xl">Conversa con el asistente</CardTitle>
            <CardDescription>
              Disponible 24/7 para resolver dudas académicas y administrativas. Puedes pedir borradores de correo o derivación a áreas internas.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex h-full flex-col gap-4">
            <div className="flex-1 overflow-hidden rounded-2xl border border-white/5 bg-black/10 p-4">
              <MessageList messages={messages} isLoading={isLoading} />
            </div>
            {error && (
              <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-100">
                {error}
              </div>
            )}
            <ChatInput onSend={sendMessage} disabled={isLoading} />
          </CardContent>
        </Card>
      </div>

      {sidebarOpen && (
        <div className="fixed inset-0 z-40 flex bg-black/60 backdrop-blur-sm md:hidden" role="dialog" aria-modal="true">
          <div className="m-4 flex-1">
            <Sidebar
              onQuickPrompt={(value) => {
                sendMessage(value);
                setSidebarOpen(false);
              }}
              connectionOk={connectionOk}
              onClose={() => setSidebarOpen(false)}
            />
          </div>
          <button className="absolute inset-0" onClick={() => setSidebarOpen(false)} aria-label="Cerrar" />
        </div>
      )}

      {isLoading && (
        <div className="pointer-events-none fixed inset-x-0 bottom-6 flex justify-center">
          <div className="flex items-center gap-2 rounded-full border border-white/10 bg-secondary/70 px-4 py-2 text-sm shadow-soft">
            <Loader2 className="h-4 w-4 animate-spin text-primary" />
            <span>Esperando respuesta del workflow n8n...</span>
          </div>
        </div>
      )}
    </div>
  );
}
