import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport, type FileUIPart } from "ai";
import { useEffect, useMemo, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import { Camera, Loader2, Send, Square, Sprout, X } from "lucide-react";
import { Button } from "@/components/ui/button";

async function resizeImage(file: File): Promise<FileUIPart> {
  const url = await new Promise<string>((res, rej) => {
    const r = new FileReader();
    r.onload = () => res(r.result as string);
    r.onerror = rej;
    r.readAsDataURL(file);
  });
  const img = await new Promise<HTMLImageElement>((res, rej) => {
    const i = new Image();
    i.onload = () => res(i);
    i.onerror = rej;
    i.src = url;
  });
  const max = 1024;
  const scale = Math.min(1, max / Math.max(img.width, img.height));
  const canvas = document.createElement("canvas");
  canvas.width = Math.round(img.width * scale);
  canvas.height = Math.round(img.height * scale);
  canvas.getContext("2d")!.drawImage(img, 0, 0, canvas.width, canvas.height);
  return { type: "file", mediaType: "image/jpeg", url: canvas.toDataURL("image/jpeg", 0.85), filename: file.name };
}

export function AssistantChat({
  mode = "assistant",
  suggestions = [],
  allowImage = true,
  placeholder = "Ask anything about your farm…",
  greeting,
}: {
  mode?: "assistant" | "doctor";
  suggestions?: string[];
  allowImage?: boolean;
  placeholder?: string;
  greeting: string;
}) {
  const transport = useMemo(() => new DefaultChatTransport({ api: "/api/chat", body: { mode } }), [mode]);
  const { messages, sendMessage, status, stop, error } = useChat({ transport });
  const [input, setInput] = useState("");
  const [photo, setPhoto] = useState<FileUIPart | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const endRef = useRef<HTMLDivElement>(null);
  const busy = status === "submitted" || status === "streaming";

  useEffect(() => {
    if (messages.length) endRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages]);

  const send = (text: string) => {
    const t = text.trim();
    if ((!t && !photo) || busy) return;
    sendMessage({
      text: t || "Please check this crop photo and tell me the problem and treatment.",
      ...(photo ? { files: [photo] } : {}),
    });
    setInput("");
    setPhoto(null);
  };

  return (
    <div className="flex flex-col rounded-3xl border bg-card shadow-soft">
      <div className="max-h-[55vh] min-h-48 space-y-4 overflow-y-auto p-4">
        <div className="flex gap-3">
          <div className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-field text-primary-foreground">
            <Sprout className="h-5 w-5" />
          </div>
          <div className="min-w-0 rounded-2xl bg-secondary px-4 py-3 text-secondary-foreground">{greeting}</div>
        </div>

        {messages.map((m) => (
          <div key={m.id} className={m.role === "user" ? "flex justify-end" : "flex gap-3"}>
            {m.role !== "user" && (
              <div className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-field text-primary-foreground">
                <Sprout className="h-5 w-5" />
              </div>
            )}
            <div
              className={
                m.role === "user"
                  ? "max-w-[85%] rounded-2xl bg-primary px-4 py-3 text-primary-foreground"
                  : "min-w-0 max-w-[90%] md-body"
              }
            >
              {m.parts.map((p, i) => {
                if (p.type === "text")
                  return m.role === "user" ? <p key={i}>{p.text}</p> : <ReactMarkdown key={i}>{p.text}</ReactMarkdown>;
                if (p.type === "file" && p.mediaType.startsWith("image/"))
                  return <img key={i} src={p.url} alt="Crop photo" className="mb-2 max-h-48 rounded-xl" />;
                return null;
              })}
            </div>
          </div>
        ))}

        {status === "submitted" && (
          <div className="flex items-center gap-2 pl-12 text-muted-foreground">
            <Loader2 className="h-4 w-4 animate-spin" /> Thinking…
          </div>
        )}
        {error && (
          <p className="rounded-xl bg-destructive/10 px-3 py-2 text-sm text-destructive">
            {error.message || "Something went wrong. Please try again."}
          </p>
        )}
        <div ref={endRef} />
      </div>

      {messages.length === 0 && suggestions.length > 0 && (
        <div className="flex gap-2 overflow-x-auto px-4 pb-3">
          {suggestions.map((s) => (
            <button
              key={s}
              onClick={() => send(s)}
              className="shrink-0 rounded-full border bg-muted px-4 py-2 text-sm font-medium text-foreground hover:bg-secondary"
            >
              {s}
            </button>
          ))}
        </div>
      )}

      {photo && (
        <div className="relative mx-4 mb-2 w-fit">
          <img src={photo.url} alt="Selected" className="h-20 rounded-xl" />
          <button
            onClick={() => setPhoto(null)}
            aria-label="Remove photo"
            className="absolute -right-2 -top-2 grid h-6 w-6 place-items-center rounded-full bg-destructive text-destructive-foreground"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      )}

      <form
        onSubmit={(e) => {
          e.preventDefault();
          send(input);
        }}
        className="flex items-end gap-2 border-t p-3"
      >
        {allowImage && (
          <>
            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              capture="environment"
              className="hidden"
              onChange={async (e) => {
                const f = e.target.files?.[0];
                if (f) setPhoto(await resizeImage(f));
                e.target.value = "";
              }}
            />
            <Button type="button" variant="outline" size="icon" className="h-12 w-12 shrink-0 rounded-full" onClick={() => fileRef.current?.click()} aria-label="Add photo">
              <Camera className="h-5 w-5" />
            </Button>
          </>
        )}
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              send(input);
            }
          }}
          rows={1}
          placeholder={placeholder}
          className="min-h-12 flex-1 resize-none rounded-2xl border bg-background px-4 py-3 text-base outline-none focus:ring-2 focus:ring-ring"
        />
        {busy ? (
          <Button type="button" size="icon" variant="secondary" className="h-12 w-12 shrink-0 rounded-full" onClick={() => stop()} aria-label="Stop">
            <Square className="h-5 w-5" />
          </Button>
        ) : (
          <Button type="submit" size="icon" className="h-12 w-12 shrink-0 rounded-full" aria-label="Send">
            <Send className="h-5 w-5" />
          </Button>
        )}
      </form>
    </div>
  );
}
