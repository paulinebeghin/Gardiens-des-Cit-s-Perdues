import { describe, it, expect, beforeEach, vi } from 'vitest';
import {
  getAllCharacter,
  getCharacterBySlug,
  createCharacter,
  updateNote,
  deleteCharacter
} from '../services/character.service';
import db from '../lib/db';

// Mock de la base de données
vi.mock('../lib/db', () => ({
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

describe('Character Service', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('getAllCharacter', () => {
    it('devrait retourner tous les personnages d\'un utilisateur', async () => {
      const mockCharacters = [
        { 
          id: '1', 
          title: 'Character 1', 
          userId: 'user1',
          slug: 'character-1',
          category: 'PROTAGONISTES' as const,
          imageCard: 'card1.jpg',
          imageFull: null,
          abilities: [],
          family: [],
          content: [],
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        { 
          id: '2', 
          title: 'Character 2', 
          userId: 'user1',
          slug: 'character-2',
          category: 'PROTAGONISTES' as const,
          imageCard: 'card2.jpg',
          imageFull: null,
          abilities: [],
          family: [],
          content: [],
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ];

      mockDb.page.findMany.mockResolvedValue(mockCharacters);

      const result = await getAllCharacter('user1');

      expect(mockDb.page.findMany).toHaveBeenCalledWith({
        where: {
          userId: 'user1',
          title: undefined,
        },
        orderBy: { title: 'asc' },
      });
      expect(result).toEqual(mockCharacters);
    });

    it('devrait filtrer par recherche', async () => {
      const mockCharacters = [{ 
        id: '1', 
        title: 'Test Character', 
        userId: 'user1',
        slug: 'test-character',
        category: 'PROTAGONISTES' as const,
        imageCard: 'card.jpg',
        imageFull: null,
        abilities: [],
        family: [],
        content: [],
        createdAt: new Date(),
        updatedAt: new Date(),
      }];

      mockDb.page.findMany.mockResolvedValue(mockCharacters);

      const result = await getAllCharacter('user1', 'Test');

      expect(mockDb.page.findMany).toHaveBeenCalledWith({
        where: {
          userId: 'user1',
          title: {
            contains: 'Test',
            mode: 'insensitive',
          },
        },
        orderBy: { title: 'asc' },
      });
      expect(result).toEqual(mockCharacters);
    });
  });

  describe('getCharacterBySlug', () => {
    it('devrait retourner un personnage par son slug', async () => {
      const mockCharacter = { 
        id: '1', 
        slug: 'test-character', 
        title: 'Test Character',
        userId: 'user1',
        category: 'PROTAGONISTES' as const,
        imageCard: 'card.jpg',
        imageFull: null,
        abilities: [],
        family: [],
        content: [],
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      mockDb.page.findFirst.mockResolvedValue(mockCharacter);

      const result = await getCharacterBySlug('test-character');

      expect(mockDb.page.findFirst).toHaveBeenCalledWith({
        where: { slug: 'test-character' },
      });
      expect(result).toEqual(mockCharacter);
    });
  });

  describe('createCharacter', () => {
    it('devrait créer un nouveau personnage', async () => {
      const characterData = {
        title: 'New Character',
        category: 'HERO',
        abilities: ['Force', 'Agilité'],
        family: ['Famille 1'],
        content: ['Contenu'],
        imageCard: 'card.jpg',
        imageFull: 'full.jpg',
      };

      const createdCharacter = {
        id: '1',
        slug: 'new-character',
        userId: 'user1',
        createdAt: new Date(),
        updatedAt: new Date(),
        ...characterData,
      };

      mockDb.page.create.mockResolvedValue(createdCharacter);

      const result = await createCharacter('user1', characterData);

      expect(mockDb.page.create).toHaveBeenCalledWith({
        data: {
          title: characterData.title,
          slug: 'new-character',
          category: 'HERO',
          abilities: characterData.abilities,
          family: characterData.family,
          content: characterData.content,
          imageCard: characterData.imageCard,
          imageFull: characterData.imageFull,
          userId: 'user1',
        },
      });
      expect(result).toEqual(createdCharacter);
    });
  });

  describe('updateNote', () => {
    it('devrait mettre à jour un personnage existant', async () => {
      const updateData = {
        title: 'Updated Character',
        category: 'VILLAIN',
        abilities: ['Intelligence'],
        family: ['Nouvelle Famille'],
        content: ['Nouveau Contenu'],
        imageCard: 'new-card.jpg',
        imageFull: 'new-full.jpg',
      };

      const existingCharacter = {
        id: '1',
        slug: 'old-slug',
        userId: 'user1',
        title: 'Old Title',
        category: 'PROTAGONISTES' as const,
        imageCard: 'old-card.jpg',
        imageFull: null,
        abilities: [],
        family: [],
        content: [],
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      const updatedCharacter = {
        id: '1',
        slug: 'updated-character',
        userId: 'user1',
        createdAt: new Date(),
        updatedAt: new Date(),
        ...updateData,
      };

      mockDb.page.findUnique.mockResolvedValue(existingCharacter);
      mockDb.page.update.mockResolvedValue(updatedCharacter);

      const result = await updateNote('old-slug', 'user1', updateData);

      expect(mockDb.page.findUnique).toHaveBeenCalledWith({ where: { slug: 'old-slug' } });
      expect(mockDb.page.update).toHaveBeenCalledWith({
        where: { slug: 'old-slug' },
        data: {
          title: updateData.title,
          slug: 'updated-character',
          category: 'VILLAIN',
          abilities: updateData.abilities,
          family: updateData.family,
          content: updateData.content,
          imageCard: updateData.imageCard,
          imageFull: updateData.imageFull,
          userId: 'user1',
        },
      });
      expect(result).toEqual(updatedCharacter);
    });

    it('devrait retourner null si le personnage n\'existe pas', async () => {
      mockDb.page.findUnique.mockResolvedValue(null);

      const result = await updateNote('nonexistent', 'user1', {
        title: 'Test',
        category: 'HERO',
        content: ['Test content'],
        abilities: [],
        family: [],
        imageCard: '',
        imageFull: '',
      });

      expect(result).toBeNull();
    });

    it('devrait retourner null si l\'utilisateur n\'est pas propriétaire', async () => {
      const existingCharacter = {
        id: '1',
        slug: 'test-slug',
        userId: 'other-user',
      };

      mockDb.page.findUnique.mockResolvedValue(existingCharacter);

      const result = await updateNote('test-slug', 'user1', {
        title: 'Test',
        category: 'HERO',
        content: ['Test content'],
        abilities: [],
        family: [],
        imageCard: '',
        imageFull: '',
      });

      expect(result).toBeNull();
    });
  });

  describe('deleteCharacter', () => {
    it('devrait supprimer un personnage existant', async () => {
      const existingCharacter = {
        id: '1',
        slug: 'test-slug',
        userId: 'user1',
      };

      mockDb.page.findUnique.mockResolvedValue(existingCharacter);
      mockDb.page.delete.mockResolvedValue(existingCharacter);

      const result = await deleteCharacter('test-slug', 'user1');

      expect(mockDb.page.findUnique).toHaveBeenCalledWith({ where: { slug: 'test-slug' } });
      expect(mockDb.page.delete).toHaveBeenCalledWith({ where: { slug: 'test-slug' } });
      expect(result).toBe(true);
    });

    it('devrait retourner null si le personnage n\'existe pas', async () => {
      mockDb.page.findUnique.mockResolvedValue(null);

      const result = await deleteCharacter('nonexistent', 'user1');

      expect(mockDb.page.delete).not.toHaveBeenCalled();
      expect(result).toBeNull();
    });

    it('devrait retourner null si l\'utilisateur n\'est pas propriétaire', async () => {
      const existingCharacter = {
        id: '1',
        slug: 'test-slug',
        userId: 'other-user',
        title: 'Character',
        category: 'PROTAGONISTES' as const,
        imageCard: 'card.jpg',
        imageFull: null,
        abilities: [],
        family: [],
        content: [],
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      mockDb.page.findUnique.mockResolvedValue(existingCharacter);

      const result = await deleteCharacter('test-slug', 'user1');

      expect(mockDb.page.delete).not.toHaveBeenCalled();
      expect(result).toBeNull();
    });
  });
});