import { NextResponse } from "next/server";

const WEBHOOK_URL = process.env.N8N_WEBHOOK_URL;

export async function GET() {
  if (!WEBHOOK_URL) {
    return NextResponse.json(
      { error: "N8N_WEBHOOK_URL no está configurada" },
      { status: 500 }
    );
  }

  return NextResponse.json({ ok: true });
}

export async function POST(request: Request) {
  if (!WEBHOOK_URL) {
    return NextResponse.json(
      { error: "N8N_WEBHOOK_URL no está configurada en el entorno del servidor." },
      { status: 500 }
    );
  }

  try {
    const body = await request.json();
    const payload = {
      ...body,
      source: "web-frontend"
    };

    const response = await fetch(WEBHOOK_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      const text = await response.text();
      throw new Error(`Error en webhook: ${text}`);
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error proxy n8n:", error);
    return NextResponse.json(
      { error: "No se pudo contactar el workflow n8n" },
      { status: 502 }
    );
  }
}
