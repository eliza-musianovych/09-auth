import { QueryClient, HydrationBoundary, dehydrate } from "@tanstack/react-query";
import { fetchNoteById } from "@/lib/api";
import NoteModalClient from './NotePreview.client';

type Props = {
    params: Promise<{ id: string }>;
};

export default async function NoteModal({params}: Props) {
    const { id } = await params;
    const queryClient = new QueryClient();

    await queryClient.prefetchQuery({
        queryKey: ['note', Number(id)],
        queryFn: () => fetchNoteById(Number(id)),
    });
    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <NoteModalClient />
        </HydrationBoundary>
    );
}