import { describe, it, expect, beforeEach, vi } from 'vitest';
import request from 'supertest';
import express from 'express';
import {
  getAllCharacter,
  getCharacterBySlug,
  createCharacter,
  updateNote,
  deleteCharacter,
} from '../../services/character.service';
import db from '../../lib/db';

// Mock de la bdd avec Vitest
vi.mock('../../lib/db', () => ({
  default: {
    page: {
      findMany: vi.fn(),
      findFirst: vi.fn(),
      findUnique: vi.fn(),
      create: vi.fn(),
      update: vi.fn(),
      delete: vi.fn(),
    },
  },
}));

const mockDb = db as any;

describe('Character Service Integration Tests', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Complete Character Workflow', () => {
    it('devrait créer, récupérer et mettre à jour un personnage', async () => {
      const characterData = {
        title: 'Nouveau Personnage',
        category: 'PROTAGONISTES' as const,
        abilities: ['Force'],
        family: ['Famille'],
        content: ['Histoire'],
        imageCard: 'card.jpg',
        imageFull: 'full.jpg',
      };

      const createdCharacter = {
        id: '1',
        slug: 'nouveau-personnage',
        userId: 'user1',
        ...characterData,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      const updatedCharacter = {
        ...createdCharacter,
        title: 'Personnage Mis à Jour',
        slug: 'personnage-mis-a-jour',
      };

      // Créer 
      mockDb.page.create.mockResolvedValueOnce(createdCharacter);
      const result1 = await createCharacter('user1', characterData);
      expect(result1.title).toBe('Nouveau Personnage');

      // Récup
      mockDb.page.findFirst.mockResolvedValueOnce(createdCharacter);
      const result2 = await getCharacterBySlug('nouveau-personnage');
      expect(result2).not.toBeNull();
      expect(result2?.title).toBe('Nouveau Personnage');

      // Mettre à jour 
      mockDb.page.findUnique.mockResolvedValueOnce(createdCharacter);
      mockDb.page.update.mockResolvedValueOnce(updatedCharacter);
      const result3 = await updateNote('nouveau-personnage', 'user1', {
        ...characterData,
        title: 'Personnage Mis à Jour',
      });
      expect(result3).not.toBeNull();
      expect(result3?.title).toBe('Personnage Mis à Jour');
    });

    it('devrait récupérer une liste de personnages filtrée', async () => {
      const mockCharacters = [
        {
          id: '1',
          title: 'Personnage A',
          slug: 'personnage-a',
          userId: 'user1',
          category: 'PROTAGONISTES' as const,
          imageCard: 'card1.jpg',
          imageFull: null,
          abilities: [],
          family: [],
          content: [],
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ];

      mockDb.page.findMany.mockResolvedValueOnce(mockCharacters);
      const result = await getAllCharacter('user1', 'Personnage');

      expect(result).toHaveLength(1);
      expect(result[0].title).toBe('Personnage A');
      expect(mockDb.page.findMany).toHaveBeenCalled();
    });

    it('devrait supprimer un personnage avec contrôle de propriété', async () => {
      const character = {
        id: '1',
        slug: 'personnage-test',
        userId: 'user1',
        title: 'Personnage Test',
        category: 'PROTAGONISTES' as const,
        imageCard: 'card.jpg',
        imageFull: null,
        abilities: [],
        family: [],
        content: [],
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      // Suppr un personnage de l'utilisateur 
      mockDb.page.findUnique.mockResolvedValueOnce(character);
      mockDb.page.delete.mockResolvedValueOnce(character);
      
      const result = await deleteCharacter('personnage-test', 'user1');
      expect(result).toBe(true);

      // Essayer de supprimer un personnage d'un autre utilisateur
      mockDb.page.findUnique.mockResolvedValueOnce({
        ...character,
        userId: 'other-user',
        category: 'PROTAGONISTES' as const,
      });

      const result2 = await deleteCharacter('personnage-test', 'user1');
      expect(result2).toBeNull();
    });

    it('devrait gérer les erreurs dans le workflow complet', async () => {
      mockDb.page.findFirst.mockResolvedValueOnce(null);
      
      const result = await getCharacterBySlug('inexistent');
      expect(result).toBeNull();
    });
  });

  describe('Character Routes avec Supertest', () => {
    const app = express();
    app.use(express.json());

    app.get('/characters', async (req: any, res: any) => {
      try {
        const characters = await getAllCharacter('user1');
        res.json(characters);
      } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
      }
    });

    app.get('/characters/:slug', async (req: any, res: any) => {
      try {
        const character = await getCharacterBySlug(req.params.slug);
        if (!character) return res.status(404).json({ error: 'Character not found' });
        res.json(character);
      } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
      }
    });

    app.post('/characters', async (req: any, res: any) => {
      try {
        const character = await createCharacter('user1', req.body);
        res.status(201).json(character);
      } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
      }
    });

    it('GET /characters devrait retourner la liste des personnages', async () => {
      const mockCharacters = [
        {
          id: '1',
          title: 'Char 1',
          slug: 'char-1',
          category: 'PROTAGONISTES',
          userId: 'user1',
          imageCard: 'card.jpg',
          imageFull: null,
          abilities: [],
          family: [],
          content: [],
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ];

      mockDb.page.findMany.mockResolvedValueOnce(mockCharacters);

      const response = await request(app).get('/characters').expect(200);

      expect(response.body).toHaveLength(1);
      expect(response.body[0]).toEqual(expect.objectContaining({
        id: '1',
        title: 'Char 1',
        slug: 'char-1',
        category: 'PROTAGONISTES',
        userId: 'user1',
      }));
      expect(mockDb.page.findMany).toHaveBeenCalled();
    });

    it('GET /characters/:slug devrait retourner un personnage', async () => {
      const mockCharacter = {
        id: '1',
        title: 'Test Character',
        slug: 'test-character',
        category: 'PROTAGONISTES',
        userId: 'user1',
        imageCard: 'card.jpg',
        imageFull: null,
        abilities: [],
        family: [],
        content: [],
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      mockDb.page.findFirst.mockResolvedValueOnce(mockCharacter);

      const response = await request(app)
        .get('/characters/test-character')
        .expect(200);

      expect(response.body).toEqual(expect.objectContaining({
        id: '1',
        title: 'Test Character',
        slug: 'test-character',
        category: 'PROTAGONISTES',
        userId: 'user1',
      }));
    });

    it('POST /characters devrait créer un nouveau personnage', async () => {
      const newCharacter = {
        title: 'Nouveau',
        category: 'PROTAGONISTES',
        imageCard: 'card.jpg',
      };

      const createdCharacter = { id: '123', slug: 'nouveau', ...newCharacter };

      mockDb.page.create.mockResolvedValueOnce(createdCharacter);

      const response = await request(app)
        .post('/characters')
        .send(newCharacter)
        .expect(201);

      expect(response.body).toEqual(createdCharacter);
      expect(mockDb.page.create).toHaveBeenCalled();
    });
  });
});

