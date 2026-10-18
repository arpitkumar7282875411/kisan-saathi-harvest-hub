import { createOpenAI } from "@ai-sdk/openai";
import { convertToModelMessages, streamText, type UIMessage } from "ai";
import {
  createLovableAiGatewayRunIdFetch,
  getLovableAiGatewayRunId,
  withLovableAiGatewayRunIdHeader,
} from "./run-id";

const MODEL = "openai/gpt-6-astra";
const BASE_URL = "https://ai.gateway.lovable.dev/v1";

const BASE = `You are "Kisan Mitra", a friendly, practical farming assistant for small and marginal farmers in India.
- Reply in the same language the farmer writes in (Hindi, English, Hinglish, Punjabi, Marathi, Telugu, Tamil, etc.).
- Use very simple words, short sentences and bullet points. Avoid jargon.
- Give concrete, actionable steps: quantities per acre, timing, low-cost/organic options first, then chemical options with safety advice.
- For prices or government schemes, give indicative info and tell them to verify at the local mandi, Krishi Vigyan Kendra (KVK) or Kisan Call Centre 1800-180-1551.
- Keep answers under ~200 words unless the farmer asks for detail.`;

const MODES: Record<string, string> = {
  assistant: `${BASE}
You help with daily farm work: crop planning, sowing calendar, fertilizer, pest control, irrigation, weather precautions, selling crops, and schemes.`,
  doctor: `${BASE}
You are acting as a crop doctor. When the farmer sends a photo of a plant/leaf/fruit:
1. **Crop** (if identifiable) and **Likely problem** (disease, pest or nutrient deficiency) with confidence (low/medium/high).
2. **Signs seen** in the photo.
3. **Treatment now** — organic first, then chemical with dose per litre/acre.
4. **Prevention** for next time.
If the photo is unclear or not a plant, politely ask for a clearer close-up photo in daylight.`,
};

function errorMessage(error: unknown) {
  const status = (error as { statusCode?: number })?.statusCode;
  if (status === 429) return "Too many requests right now. Please wait a minute and try again.";
  if (status === 402) return "AI credits are used up for this app. The app owner needs to add credits.";
  if (status === 403) return "The AI service refused this request.";
  return "Sorry, the assistant could not answer. Please try again.";
}

export async function handleChat(request: Request) {
  const apiKey = process.env["LOVABLE_API_KEY"];
  if (!apiKey) return Response.json({ error: "AI is not configured." }, { status: 500 });

  let body: { messages?: UIMessage[]; mode?: string };
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid request" }, { status: 400 });
  }
  const messages = Array.isArray(body.messages) ? body.messages.slice(-30) : [];
  const instructions = MODES[body.mode ?? "assistant"] ?? MODES["assistant"]!;

  const runIdFetch = createLovableAiGatewayRunIdFetch(getLovableAiGatewayRunId(request));
  const provider = createOpenAI({
    baseURL: BASE_URL,
    apiKey,
    headers: { "Lovable-API-Key": apiKey, "X-Lovable-AIG-SDK": "vercel-ai-sdk" },
    fetch: runIdFetch.fetch,
  });

  const result = streamText({
    model: provider.responses(MODEL),
    instructions,
    messages: await convertToModelMessages(messages),
    abortSignal: request.signal,
    providerOptions: {
      openai: {
        store: false,
        forceReasoning: true,
        reasoningEffort: "low",
        reasoningSummary: "auto",
        include: ["reasoning.encrypted_content"],
      },
    },
  });

  return withLovableAiGatewayRunIdHeader(
    result.toUIMessageStreamResponse({ sendReasoning: false, onError: errorMessage }),
    runIdFetch,
  );
}
