import { describe, it, expect, beforeEach, vi } from 'vitest';
import request from 'supertest';
import express from 'express';
import { getAllBooks, getBookById, createBook, updateBook, deleteNote } from '../../services/book.service';
import db from '../../lib/db';

// Mock de la base de données avec Vitest
vi.mock('../../lib/db', () => ({
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

describe('Book Service Integration Tests', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Complete Book Workflow', () => {
    it('devrait créer, récupérer et mettre à jour un livre', async () => {
      const newBook = {
        title: 'Nouveau Livre Test',
        subtitle: '',
        titleCategory: 'Fiction',
        grandFormat: '',
        poche: '',
        collector: '',
        graph: '',
        summary: '',
        epubURL: '',
        img: '',
        imgCategory: '',
        category: 'BOOK' as const,
      };

      const createdBook = {
        id: '1',
        ...newBook,
        createdAt: new Date(),
      };

      const updatedBook = {
        ...createdBook,
        title: 'Livre Mis à Jour',
      };

      // Créer un livre
      mockDb.book.create.mockResolvedValueOnce(createdBook);
      const result1 = await createBook(newBook);
      expect(result1).toEqual(createdBook);

      // Récupérer le livre
      mockDb.book.findUnique.mockResolvedValueOnce(createdBook);
      const result2 = await getBookById('1');
      expect(result2).toEqual(createdBook);

      // Mettre à jour le livre
      mockDb.book.update.mockResolvedValueOnce(updatedBook);
      const result3 = await updateBook('1', { title: 'Livre Mis à Jour', graph: '' });
      expect(result3.title).toBe('Livre Mis à Jour');
    });

    it('devrait récupérer une liste de livres triée', async () => {
      const mockBooks = [
        {
          id: '1',
          title: 'Livre A',
          category: 'BOOK',
          titleCategory: 'Fiction',
          createdAt: new Date('2024-02-01'),
          subtitle: '',
          grandFormat: '',
          poche: '',
          collector: '',
          graph: '',
          epubURL: '',
          summary: '',
          imgCategory: '',
          img: '',
        },
        {
          id: '2',
          title: 'Livre B',
          category: 'BOOK',
          titleCategory: 'Fantasy',
          createdAt: new Date('2024-01-01'),
          subtitle: '',
          grandFormat: '',
          poche: '',
          collector: '',
          graph: '',
          epubURL: '',
          summary: '',
          imgCategory: '',
          img: '',
        },
      ];

      mockDb.book.findMany.mockResolvedValueOnce(mockBooks);
      const result = await getAllBooks();
      
      expect(result).toHaveLength(2);
      expect(result[0].title).toBe('Livre A');
      expect(mockDb.book.findMany).toHaveBeenCalledWith({
        orderBy: { createdAt: 'desc' },
      });
    });

    it('devrait supprimer un livre et gérer l\'absence du livre', async () => {
      const book = { id: '1', title: 'Livre à supprimer' };

      // Supprimer un livre existant
      mockDb.book.findUnique.mockResolvedValueOnce(book);
      mockDb.book.delete.mockResolvedValueOnce(book);
      
      const result = await deleteNote('1');
      expect(result).toBe(true);

      // Supprimer un livre inexistant
      mockDb.book.findUnique.mockResolvedValueOnce(null);
      const result2 = await deleteNote('999');
      expect(result2).toBeNull();
    });
  });

  describe('Book Routes avec Supertest', () => {
    const app = express();
    app.use(express.json());

    app.get('/books', async (_req: any, res: any) => {
      try {
        // Appel du service
        const books = await getAllBooks();
        res.json(books);
      } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
      }
    });

    app.post('/books', async (req: any, res: any) => {
      try {
        const book = await createBook(req.body);
        res.status(201).json(book);
      } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
      }
    });

    it('GET /books devrait retourner la liste des livres', async () => {
      const mockBooks = [
        {
          id: '1',
          title: 'Livre 1',
          category: 'BOOK',
          titleCategory: 'Fiction',
          subtitle: '',
          grandFormat: '',
          poche: '',
          collector: '',
          graph: '',
          summary: '',
          epubURL: '',
          img: '',
          imgCategory: '',
        },
      ];

      mockDb.book.findMany.mockResolvedValueOnce(mockBooks);

      const response = await request(app).get('/books').expect(200);

      expect(response.body).toEqual(mockBooks);
      expect(mockDb.book.findMany).toHaveBeenCalled();
    });

    it('POST /books devrait créer un nouveau livre', async () => {
      const newBook = {
        title: 'Nouveau',
        titleCategory: 'Test',
        category: 'BOOK',
        subtitle: '',
        grandFormat: '',
        poche: '',
        collector: '',
        graph: '',
        summary: '',
        epubURL: '',
        img: '',
        imgCategory: '',
      };
      const createdBook = { id: '123', ...newBook };

      mockDb.book.create.mockResolvedValueOnce(createdBook);

      const response = await request(app)
        .post('/books')
        .send(newBook)
        .expect(201);

      expect(response.body).toEqual(createdBook);
      expect(mockDb.book.create).toHaveBeenCalled();
    });
  });
});

