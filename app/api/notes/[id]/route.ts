import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { api } from "../../api";

type Props = {
  params: Promise<{ id: string }>;
};

export async function GET(request: Request, { params }: Props) {
  const cookieStore = await cookies();
  const { id } = await params;

  try {
    await api.get(`/notes/${id}`, {
      headers: {
        Cookie: cookieStore.toString(),
      },
    });
    return NextResponse.json({ message: 'Note detail get successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error getting note detail:', error);
    return NextResponse.json({ error: 'Failed to get note detail' }, { status: 500 });
  }
}; 

export async function DELETE(request: Request, { params }: Props) {
  const cookieStore = await cookies();
  const { id } = await params;

  try {
    await api.delete(`/notes/${id}`, {
      headers: {
        Cookie: cookieStore.toString(),
      },
    });
    return NextResponse.json({ message: 'Note deleted successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error deleting note:', error);
    return NextResponse.json({ error: 'Failed to delete note' }, { status: 500 });
  }
}