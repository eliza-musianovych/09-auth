'use client';

import NotePreview from '@/components/NotePreview/NotePreview';
import { fetchNoteById } from '@/lib/api'
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';

export default function NoteDetailsClient() {
    const { id } = useParams<{ id: string }>();
    const numericId = Number(id);

    const {data: note, isLoading, error} = useQuery({
        queryKey: ['notes', numericId],
        queryFn: () => fetchNoteById(numericId),
        refetchOnMount: false,
    });

    if (isLoading) return <p>Loading, please wait...</p>;

    if (error || !note) return <p>Something went wrong.</p>;

    return (
    <NotePreview note={note} />
    )
}