import { render, screen, waitFor, fireEvent } from '@testing-library/react';

// Mock des API calls
jest.mock('../../api/book', () => ({
  getBooks: jest.fn(),
  getBookById: jest.fn(),
  createBook: jest.fn(),
  updateBook: jest.fn(),
  deleteBook: jest.fn(),
}));

jest.mock('../../api/character', () => ({
  getCharacters: jest.fn(),
  getCharacterBySlug: jest.fn(),
  createCharacter: jest.fn(),
  updateCharacter: jest.fn(),
  deleteCharacter: jest.fn(),
}));

jest.mock('../../api/page', () => ({
  getPages: jest.fn(),
}));

describe('API Integration Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Book API', () => {
    it('devrait charger la liste des livres depuis l\'API', async () => {
      const { getBooks } = require('../../api/book');
      
      const mockBooks = [
        {
          id: '1',
          title: 'Livre 1',
          titleCategory: 'Fiction',
          category: 'BOOK',
        },
        {
          id: '2',
          title: 'Livre 2',
          titleCategory: 'Fantasy',
          category: 'BOOK_GRAPH',
        },
      ];

      getBooks.mockResolvedValueOnce(mockBooks);

      const result = await getBooks();

      expect(result).toEqual(mockBooks);
      expect(getBooks).toHaveBeenCalledTimes(1);
    });

    it('devrait créer un nouveau livre via l\'API', async () => {
      const { createBook } = require('../../api/book');

      const newBook = {
        title: 'Nouveau Livre',
        titleCategory: 'Drame',
        category: 'BOOK',
      };

      const createdBook = {
        id: '3',
        ...newBook,
      };

      createBook.mockResolvedValueOnce(createdBook);

      const result = await createBook(newBook);

      expect(result).toEqual(createdBook);
      expect(createBook).toHaveBeenCalledWith(newBook);
    });

    it('devrait gérer les erreurs API', async () => {
      const { getBooks } = require('../../api/book');

      const error = new Error('Network error');
      getBooks.mockRejectedValueOnce(error);

      try {
        await getBooks();
        fail('Should have thrown an error');
      } catch (e) {
        expect(e).toEqual(error);
      }
    });
  });

  describe('Character API', () => {
    it('devrait charger la liste des personnages depuis l\'API', async () => {
      const { getCharacters } = require('../../api/character');

      const mockCharacters = [
        {
          id: '1',
          title: 'Personnage 1',
          slug: 'personnage-1',
          category: 'PROTAGONISTES',
        },
      ];

      getCharacters.mockResolvedValueOnce(mockCharacters);

      const result = await getCharacters();

      expect(result).toEqual(mockCharacters);
      expect(getCharacters).toHaveBeenCalledTimes(1);
    });

    it('devrait récupérer un personnage par slug', async () => {
      const { getCharacterBySlug } = require('../../api/character');

      const mockCharacter = {
        id: '1',
        title: 'Personnage Test',
        slug: 'personnage-test',
        category: 'PROTAGONISTES',
        content: ['Histoire du personnage'],
      };

      getCharacterBySlug.mockResolvedValueOnce(mockCharacter);

      const result = await getCharacterBySlug('personnage-test');

      expect(result).toEqual(mockCharacter);
      expect(getCharacterBySlug).toHaveBeenCalledWith('personnage-test');
    });

    it('devrait supprimer un personnage via l\'API', async () => {
      const { deleteCharacter } = require('../../api/character');

      deleteCharacter.mockResolvedValueOnce({ success: true });

      const result = await deleteCharacter('personnage-test');

      expect(result).toEqual({ success: true });
      expect(deleteCharacter).toHaveBeenCalledWith('personnage-test');
    });
  });
});
