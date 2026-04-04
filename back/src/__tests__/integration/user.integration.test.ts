import { describe, it, expect, beforeEach, vi } from 'vitest';
import request from 'supertest';
import express from 'express';
import { getUserById } from '../../services/user.service';
import db from '../../lib/db';

// Mock de la base de données avec Vitest
vi.mock('../../lib/db', () => ({
  default: {
    user: {
      findUnique: vi.fn(),
      update: vi.fn(),
    },
  },
}));

const mockDb = db as any;

describe('User Service Integration Tests', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('User Profile Workflow', () => {
    it('devrait récupérer les informations d\'un utilisateur', async () => {
      const mockUser = {
        id: 'user1',
        name: 'John Doe',
        email: 'john@example.com',
        role: 'USER',
        createdAt: new Date(),
        updatedAt: new Date(),
        emailVerified: true,
        image: null,
      };

      mockDb.user.findUnique.mockResolvedValueOnce(mockUser);

      const result = await getUserById('user1');

      expect(result).toEqual(mockUser);
      expect(mockDb.user.findUnique).toHaveBeenCalledWith({
        where: { id: 'user1' },
        select: { id: true, name: true, email: true, role: true },
      });
    });

    it('devrait retourner null si l\'utilisateur n\'existe pas', async () => {
      mockDb.user.findUnique.mockResolvedValueOnce(null);

      const result = await getUserById('inexistent');

      expect(result).toBeNull();
    });

    it('devrait gérer les erreurs de base de données', async () => {
      mockDb.user.findUnique.mockRejectedValueOnce(
        new Error('Database connection failed')
      );

      await expect(getUserById('user1')).rejects.toThrow('Database connection failed');
    });

    it('devrait supporter les multiples appels simultanés', async () => {
      const user1 = { id: 'user1', name: 'User 1' };
      const user2 = { id: 'user2', name: 'User 2' };

      mockDb.user.findUnique
        .mockResolvedValueOnce(user1)
        .mockResolvedValueOnce(user2);

      const [result1, result2] = await Promise.all([
        getUserById('user1'),
        getUserById('user2'),
      ]);

      expect(result1).not.toBeNull();
      expect(result2).not.toBeNull();
      expect(result1?.name).toBe('User 1');
      expect(result2?.name).toBe('User 2');
      expect(mockDb.user.findUnique).toHaveBeenCalledTimes(2);
    });
  });

  describe('User Routes avec Supertest', () => {
    const app = express();
    app.use(express.json());

    app.get('/users/:id', async (req: any, res: any) => {
      try {
        const user = await getUserById(req.params.id);
        if (!user) return res.status(404).json({ error: 'User not found' });
        res.json(user);
      } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
      }
    });

    it('GET /users/:id devrait retourner un utilisateur', async () => {
      const mockUser = {
        id: 'user1',
        name: 'John Doe',
        email: 'john@example.com',
        role: 'USER',
        createdAt: new Date(),
        updatedAt: new Date(),
        emailVerified: true,
        image: null,
      };

      mockDb.user.findUnique.mockResolvedValueOnce(mockUser);

      const response = await request(app)
        .get('/users/user1')
        .expect(200);

      expect(response.body).toMatchObject({
        id: 'user1',
        name: 'John Doe',
        email: 'john@example.com',
        role: 'USER',
        emailVerified: true,
        image: null,
      });
      expect(mockDb.user.findUnique).toHaveBeenCalled();
    });

    it('GET /users/:id devrait retourner 404 si l\'utilisateur n\'existe pas', async () => {
      mockDb.user.findUnique.mockResolvedValueOnce(null);

      const response = await request(app)
        .get('/users/inexistent')
        .expect(404);

      expect(response.body.error).toBe('User not found');
    });

    it('GET /users/:id devrait gérer les erreurs serveur', async () => {
      mockDb.user.findUnique.mockRejectedValueOnce(
        new Error('Database error')
      );

      const response = await request(app)
        .get('/users/user1')
        .expect(500);

      expect(response.body.error).toBe('Internal server error');
    });
  });
});

