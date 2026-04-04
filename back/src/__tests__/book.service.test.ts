import { describe, it, expect, beforeEach, vi } from 'vitest';
import { getAllBooks, getBookById, createBook, updateBook, deleteNote } from '../services/book.service';
import db from '../lib/db';

// Mock de la bdd
vi.mock('../lib/db', () => ({
  default: {
    book: {
      findMany: vi.fn(),
      findUnique: vi.fn(),
      create: vi.fn(),
      update: vi.fn(),
      delete: vi.fn(),
    },
  },
}));

const mockDb = db as any;

describe('Book Service', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('getAllBooks', () => {
    it('devrait retourner tous les livres triés par date de création décroissante', async () => {
      const mockBooks = [
        { 
          id: '1', 
          title: 'Book 1', 
          createdAt: new Date('2024-01-01'),
          category: 'BOOK' as const,
          titleCategory: 'Category 1',
          subtitle: null,
          grandFormat: null,
          poche: null,
          collector: null,
          graph: null,
          epubURL: null,
          summary: null,
          imgCategory: null,
          img: null,
        },
        { 
          id: '2', 
          title: 'Book 2', 
          createdAt: new Date('2024-01-02'),
          category: 'BOOK' as const,
          titleCategory: 'Category 2',
          subtitle: null,
          grandFormat: null,
          poche: null,
          collector: null,
          graph: null,
          epubURL: null,
          summary: null,
          imgCategory: null,
          img: null,
        },
      ];

      mockDb.book.findMany.mockResolvedValue(mockBooks);

      const result = await getAllBooks();

      expect(mockDb.book.findMany).toHaveBeenCalledWith({
        orderBy: { createdAt: 'desc' },
      });
      expect(result).toEqual(mockBooks);
    });
  });

  describe('getBookById', () => {
    it('devrait retourner un livre par son ID', async () => {
      const mockBook = { 
        id: '1', 
        title: 'Test Book',
        category: 'BOOK' as const,
        titleCategory: 'Test Category',
        createdAt: new Date(),
        subtitle: null,
        grandFormat: null,
        poche: null,
        collector: null,
        graph: null,
        epubURL: null,
        summary: null,
        imgCategory: null,
        img: null,
      };

      mockDb.book.findUnique.mockResolvedValue(mockBook);

      const result = await getBookById('1');

      expect(mockDb.book.findUnique).toHaveBeenCalledWith({
        where: { id: '1' },
      });
      expect(result).toEqual(mockBook);
    });
  });

  describe('createBook', () => {
    it('devrait créer un nouveau livre', async () => {
      const bookData = {
        title: 'New Book',
        subtitle: 'Subtitle',
        titleCategory: 'Category',
        grandFormat: 'true',
        poche: 'false',
        collector: 'false',
        graph: 'Graph',
        summary: 'Summary',
        epubURL: 'url',
        imgCategory: 'img',
        img: 'img',
        category: 'BOOK' as const,
      };

      const createdBook = { 
        id: '1', 
        createdAt: new Date(),
        ...bookData 
      };

      mockDb.book.create.mockResolvedValue(createdBook);

      const result = await createBook(bookData);

      expect(mockDb.book.create).toHaveBeenCalledWith({
        data: {
          title: bookData.title,
          subtitle: bookData.subtitle,
          titleCategory: bookData.titleCategory,
          grandFormat: bookData.grandFormat,
          poche: bookData.poche,
          collector: bookData.collector,
          graph: bookData.graph,
          summary: bookData.summary,
          epubURL: bookData.epubURL,
          imgCategory: bookData.imgCategory,
          img: bookData.img,
          category: bookData.category,
        },
      });
      expect(result).toEqual(createdBook);
    });
  });

  describe('updateBook', () => {
    it('devrait mettre à jour un livre existant', async () => {
      const updateData = {
        title: 'Updated Title',
        subtitle: 'Updated Subtitle',
        titleCategory: 'Updated Category',
        grandFormat: 'false',
        graph: 'Updated Graph',
        poche: 'true',
        collector: 'true',
        summary: 'Updated Summary',
        epubURL: 'updated-url',
        imgCategory: 'updated-img',
        img: 'updated-img',
        category: 'BOOK_GRAPH' as const,
      };

      const updatedBook = { 
        id: '1', 
        createdAt: new Date(),
        ...updateData 
      };

      mockDb.book.update.mockResolvedValue(updatedBook);

      const result = await updateBook('1', updateData);

      expect(mockDb.book.update).toHaveBeenCalledWith({
        where: { id: '1' },
        data: {
          title: updateData.title,
          subtitle: updateData.subtitle,
          titleCategory: updateData.titleCategory,
          grandFormat: updateData.grandFormat,
          graph: updateData.graph,
          poche: updateData.poche,
          collector: updateData.collector,
          summary: updateData.summary,
          epubURL: updateData.epubURL,
          imgCategory: updateData.imgCategory,
          img: updateData.img,
          category: updateData.category,
        },
      });
      expect(result).toEqual(updatedBook);
    });
  });

  describe('deleteNote', () => {
    it('devrait supprimer un livre existant', async () => {
      const mockBook = { 
        id: '1', 
        title: 'Book to delete',
        category: 'BOOK' as const,
        titleCategory: 'Category',
        createdAt: new Date(),
        subtitle: null,
        grandFormat: null,
        poche: null,
        collector: null,
        graph: null,
        epubURL: null,
        summary: null,
        imgCategory: null,
        img: null,
      };

      mockDb.book.findUnique.mockResolvedValue(mockBook);
      mockDb.book.delete.mockResolvedValue(mockBook);

      const result = await deleteNote('1');

      expect(mockDb.book.findUnique).toHaveBeenCalledWith({ where: { id: '1' } });
      expect(mockDb.book.delete).toHaveBeenCalledWith({ where: { id: '1' } });
      expect(result).toBe(true);
    });

    it('devrait retourner null si le livre n\'existe pas', async () => {
      mockDb.book.findUnique.mockResolvedValue(null);

      const result = await deleteNote('999');

      expect(mockDb.book.findUnique).toHaveBeenCalledWith({ where: { id: '999' } });
      expect(mockDb.book.delete).not.toHaveBeenCalled();
      expect(result).toBeNull();
    });
  });
});