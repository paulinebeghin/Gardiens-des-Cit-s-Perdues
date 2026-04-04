import db from "@/lib/db";
import type { CreateBookDto, UpdateBookDto } from "@/dtos/book.dto";

export async function getAllBooks() {
  return await db.book.findMany({
    orderBy: { 
      createdAt: "desc" 
    }, 
  });
}

export async function getBookById(id: string,) {
  const result = await db.book.findUnique({
    where: { id },
  });
  return result;
}

export async function updateBook(id: string, data: UpdateBookDto) {
  return await db.book.update({
    where: { 
      id: id 
    },
    data: {
      title: data.title,
      subtitle: data.subtitle,
      titleCategory: data.titleCategory,
      grandFormat: data.grandFormat,
      graph:data.graph,
      poche: data.poche,
      collector: data.collector,
      summary: data.summary,
      epubURL: data.epubURL,
      imgCategory: data.imgCategory,
      img: data.img,
      category: data.category,
    },
    
  });
}

export async function createBook(data: CreateBookDto) {
  console.log("DATA REÇUE :", JSON.stringify(data, null, 2));

  return await db.book.create({
    
    data: {
      title: data.title,
      subtitle: data.subtitle,
      titleCategory: data.titleCategory,
      grandFormat: data.grandFormat,
      poche: data.poche,
      collector: data.collector,
      graph:data.graph,
      summary: data.summary,
      epubURL: data.epubURL,
      imgCategory: data.imgCategory,
      img: data.img,
      category: data.category,
    },
  });
}
export async function deleteNote(id: string) {
 
  const existing = await db.book.findUnique({ 
    where: { id } 
  });
  if (!existing) return null;
  await db.book.delete({ 
    where: { id } 
  });
  return true;
}