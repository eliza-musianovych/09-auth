import { QueryClient, HydrationBoundary, dehydrate } from "@tanstack/react-query";
import { fetchNoteById } from "@/lib/api";
import NoteDetailsClient from "./NoteDetails.client";
import { Metadata } from "next";

type Props = {
    params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }:Props): Promise<Metadata> {
  const { id } = await params;
  const note = await fetchNoteById(Number(id));
    return {
    title: `Note: ${note.title}`,
    description: note.content.slice(0, 30),
    openGraph: {
      title: `Note: ${note.title}`,
      description: note.content.slice(0, 20),
      url: `https://08-zustand-eypfyygwr-yelyzaveta-musianovychs-projects.vercel.app/notes/${id}`,
      images: [
        {
          url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
          width: 1200,
          height: 630,
          alt: note.title,
        },
      ],
    }
  }
}

export default async function NoteDetails({params}: Props) {
    const { id } = await params;
    const queryClient = new QueryClient();

    await queryClient.prefetchQuery({
        queryKey: ['note', Number(id)],
        queryFn: () => fetchNoteById(Number(id)),
    });
    return (
    <HydrationBoundary state={dehydrate(queryClient)}>
        <NoteDetailsClient /> 
    </HydrationBoundary>
    );
}