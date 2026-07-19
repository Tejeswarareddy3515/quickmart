import { NextRequest, NextResponse } from "next/server";

const API_BASE_URL = process.env.API_URL || "http://localhost:3001";

export async function GET(request: NextRequest) {
  return handleRequest(request, "GET");
}

export async function POST(request: NextRequest) {
  return handleRequest(request, "POST");
}

export async function PUT(request: NextRequest) {
  return handleRequest(request, "PUT");
}

export async function PATCH(request: NextRequest) {
  return handleRequest(request, "PATCH");
}

export async function DELETE(request: NextRequest) {
  return handleRequest(request, "DELETE");
}

async function handleRequest(request: NextRequest, method: string) {
  const path = request.nextUrl.pathname.replace("/api", "");
  const url = `${API_BASE_URL}/api/v1${path}${request.nextUrl.search}`;

  const headers = new Headers(request.headers);
  headers.delete("host");

  let body;
  if (method !== "GET" && method !== "HEAD") {
    body = await request.text();
  }

  try {
    const response = await fetch(url, {
      method,
      headers,
      body: body || undefined,
    });

    const responseBody = await response.text();
    return new NextResponse(responseBody, {
      status: response.status,
      headers: response.headers,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "API request failed", message: error instanceof Error ? error.message : "Unknown error" },
      { status: 502 }
    );
  }
}
