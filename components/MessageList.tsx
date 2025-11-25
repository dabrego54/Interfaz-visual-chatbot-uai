import { useEffect, useRef } from "react";
import { MessageBubble } from "@/components/MessageBubble";
import { ChatMessage } from "@/types/chat";

interface MessageListProps {
  messages: ChatMessage[];
  isLoading?: boolean;
}

export function MessageList({ messages, isLoading }: MessageListProps) {
  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  return (
    <div className="flex-1 overflow-y-auto pr-1" role="list" aria-label="Historial de conversación">
      <div className="space-y-4">
        {messages.map((message) => (
          <MessageBubble
            key={message.id}
            message={message}
            isAssistant={message.role === "assistant" || message.role === "system"}
          />
        ))}
        {isLoading && (
          <div className="flex items-center gap-3 text-muted-foreground">
            <span className="h-3 w-3 animate-ping rounded-full bg-primary" aria-hidden />
            <span className="text-sm">El asistente está escribiendo…</span>
          </div>
        )}
        <div ref={bottomRef} />
      </div>
    </div>
  );
}
