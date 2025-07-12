import { NextRequest, NextResponse } from "next/server";
import { api } from "../../api";
import { cookies } from "next/headers";


export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const cookieStore = await cookies();
    const cookieHeader = cookieStore.toString();

    const res = await api(`/notes/${id}`, {
      headers: {
        Cookie: cookieHeader,
      },
    });

    return NextResponse.json(res.data);
  } catch (error) {
    console.error('GET error:', error);
    return NextResponse.json({ error: 'Note not found' }, { status: 404 });
  }
}