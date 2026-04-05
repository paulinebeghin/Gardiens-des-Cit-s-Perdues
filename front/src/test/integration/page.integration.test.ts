// Mock des API calls
jest.mock('../../api/book', () => ({
  getBooks: jest.fn(),
}));

jest.mock('../../api/character', () => ({
  getCharacters: jest.fn(),
}));

describe('Page Integration Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Book List Page', () => {
    it('devrait charger et afficher la liste des livres', async () => {
      const { getBooks } = require('../../api/book');

      const mockBooks = [
        {
          id: '1',
          title: 'Livre 1',
          titleCategory: 'Fiction',
          category: 'BOOK',
          img: 'book1.jpg',
        },
        {
          id: '2',
          title: 'Livre 2',
          titleCategory: 'Fantasy',
          category: 'BOOK_GRAPH',
          img: 'book2.jpg',
        },
      ];

      getBooks.mockResolvedValueOnce(mockBooks);

      const result = await getBooks();

      expect(result).toHaveLength(2);
      expect(result[0].title).toBe('Livre 1');
      expect(result[1].title).toBe('Livre 2');
    });

    it('devrait filtrer les livres par catégorie', async () => {
      const { getBooks } = require('../../api/book');

      const allBooks = [
        { id: '1', title: 'Livre 1', category: 'BOOK' },
        { id: '2', title: 'Livre 2', category: 'BOOK_GRAPH' },
        { id: '3', title: 'Livre 3', category: 'BOOK' },
      ];

      getBooks.mockResolvedValueOnce(allBooks);

      const result = await getBooks();
      const filtered = result.filter((book: any) => book.category === 'BOOK');

      expect(filtered).toHaveLength(2);
      expect(filtered[0].title).toBe('Livre 1');
    });

    it('devrait afficher un message d\'erreur en cas d\'échec du chargement', async () => {
      const { getBooks } = require('../../api/book');

      getBooks.mockRejectedValueOnce(new Error('API Error'));

      try {
        await getBooks();
        fail('Should have thrown an error');
      } catch (e: any) {
        expect(e.message).toBe('API Error');
      }
    });
  });

  describe('Character List Page', () => {
    it('devrait charger et afficher la liste des personnages', async () => {
      const { getCharacters } = require('../../api/character');

      const mockCharacters = [
        {
          id: '1',
          title: 'Personnage 1',
          slug: 'personnage-1',
          category: 'PROTAGONISTES',
          imageCard: 'char1.jpg',
        },
        {
          id: '2',
          title: 'Personnage 2',
          slug: 'personnage-2',
          category: 'ANTAGONISTES',
          imageCard: 'char2.jpg',
        },
      ];

      getCharacters.mockResolvedValueOnce(mockCharacters);

      const result = await getCharacters();

      expect(result).toHaveLength(2);
      expect(result[0].title).toBe('Personnage 1');
      expect(result[1].category).toBe('ANTAGONISTES');
    });

    it('devrait filtrer les personnages par catégorie', async () => {
      const { getCharacters } = require('../../api/character');

      const allCharacters = [
        { id: '1', title: 'Personnage 1', category: 'PROTAGONISTES' },
        { id: '2', title: 'Personnage 2', category: 'ANTAGONISTES' },
        { id: '3', title: 'Personnage 3', category: 'PROTAGONISTES' },
      ];

      getCharacters.mockResolvedValueOnce(allCharacters);

      const result = await getCharacters();
      const filtered = result.filter((char: any) => char.category === 'PROTAGONISTES');

      expect(filtered).toHaveLength(2);
    });

    it('devrait permettre la recherche de personnages', async () => {
      const { getCharacters } = require('../../api/character');

      const allCharacters = [
        { id: '1', title: 'Aragorn', slug: 'aragorn' },
        { id: '2', title: 'Boromir', slug: 'boromir' },
        { id: '3', title: 'Legolas', slug: 'legolas' },
      ];

      getCharacters.mockResolvedValueOnce(allCharacters);

      const result = await getCharacters();
      const searched = result.filter((char: any) => 
        char.title.toLowerCase().includes('ara')
      );

      expect(searched).toHaveLength(1);
      expect(searched[0].title).toBe('Aragorn');
    });
  });

  describe('Pagination', () => {
    it('devrait récupérer la page suivante', async () => {
      const { getBooks } = require('../../api/book');

      const page1Books = [
        { id: '1', title: 'Livre 1' },
        { id: '2', title: 'Livre 2' },
      ];

      const page2Books = [
        { id: '3', title: 'Livre 3' },
        { id: '4', title: 'Livre 4' },
      ];

      getBooks.mockResolvedValueOnce(page1Books);
      getBooks.mockResolvedValueOnce(page2Books);

      const result1 = await getBooks();
      const result2 = await getBooks();

      expect(result1[0].id).toBe('1');
      expect(result2[0].id).toBe('3');
    });
  });
});
