import { FormEvent, KeyboardEvent, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Send } from "lucide-react";

interface ChatInputProps {
  onSend: (message: string) => Promise<void> | void;
  disabled?: boolean;
}

export function ChatInput({ onSend, disabled }: ChatInputProps) {
  const [value, setValue] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const text = value.trim();
    if (!text) return;
    setValue("");
    await onSend(text);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      const form = event.currentTarget.form;
      form?.dispatchEvent(new Event("submit", { cancelable: true, bubbles: true }));
    }
  };

  const handleInput = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 160)}px`;
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-end gap-3 rounded-2xl border border-white/5 bg-secondary/70 p-3 shadow-soft backdrop-blur"
      aria-label="Enviar mensaje al asistente"
    >
      <Textarea
        ref={textareaRef}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={handleKeyDown}
        onInput={handleInput}
        placeholder="Escribe tu consulta..."
        maxLength={2000}
        rows={1}
        disabled={disabled}
        aria-label="Mensaje"
        className="resize-none"
      />
      <Button type="submit" disabled={disabled} className="shrink-0" aria-label="Enviar mensaje">
        <Send size={18} className="mr-2" /> Enviar
      </Button>
    </form>
  );
}
