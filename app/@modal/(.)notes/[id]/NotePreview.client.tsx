'use client';

import { fetchNoteById } from '@/lib/api';
import { useQuery } from '@tanstack/react-query';
import { useParams, useRouter } from 'next/navigation';
import Modal from '@/components/Modal/Modal';
import NotePreview from '@/components/NotePreview/NotePreview';

export default function NoteDetailsClient() {
    const router = useRouter();
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
    <Modal onClose={() => router.back()}>
        <NotePreview note={note} />
    </Modal>
    )
}