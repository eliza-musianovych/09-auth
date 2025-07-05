import axios from "axios";
import { Note } from "@/types/note";
import { NewNote } from "@/types/note";
import { Tag } from "@/types/note";

interface NotesHttpResponse {
    notes: Note[];
    totalPages: number;
}

const URL = 'https://notehub-public.goit.study/api/notes';

export const fetchNotes = async(
    query?: string, 
    page: number = 1, 
    tag?: Tag | undefined
): Promise<NotesHttpResponse> => { 
    const parameters = new URLSearchParams({
        ...(query !=='' ? {search: query} : {}),
        ...(tag !== undefined  ? {tag} : {}),
        page: page.toString() ,
    })
    const response = await axios.get<NotesHttpResponse>(
        `${URL}?${parameters}`, {
        headers: {
            Authorization: process.env.NEXT_PUBLIC_NOTEHUB_TOKEN,
        },
});
    return response.data;
};

export const createNote = async(newNote: NewNote): Promise<Note> => {
    const response = await axios.post<Note>(
        `${URL}`, 
        newNote, {
        headers: {
            Authorization: process.env.NEXT_PUBLIC_NOTEHUB_TOKEN,
        },
});
    return response.data;
};

export const deleteNote = async(id: number): Promise<Note> => {
    const response = await axios.delete<Note>(
        `${URL}/${id}`, {
        headers: {
            Authorization: process.env.NEXT_PUBLIC_NOTEHUB_TOKEN,
        },
});
    return response.data;
};

export const fetchNoteById = async(id: number): Promise<Note> => {
    const response = await axios.get<Note>(
        `${URL}/${id}`, {
          headers: {
            Authorization: process.env.NEXT_PUBLIC_NOTEHUB_TOKEN,
        },  
});
return  response.data;
};

export const tags: Tag[] = ['Todo', 'Work', 'Personal', 'Meeting', 'Shopping'];