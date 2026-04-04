import { describe, it, expect, beforeEach, vi } from 'vitest';
import { getUserById } from '../services/user.service';
import db from '../lib/db';

// Mock de la base de données
vi.mock('../lib/db', () => ({
  default: {
    user: {
      findUnique: vi.fn(),
    },
  },
}));

const mockDb = db as any;

describe('User Service', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('getUserById', () => {
    it('devrait retourner un utilisateur quand il existe', async () => {
      const mockUser = {
        id: '1',
        name: 'Test User',
        email: 'test@example.com',
        role: 'USER',
        createdAt: new Date(),
        updatedAt: new Date(),
        emailVerified: true,
        image: null,
      };

      mockDb.user.findUnique.mockResolvedValue(mockUser);

      const result = await getUserById('1');

      expect(mockDb.user.findUnique).toHaveBeenCalledWith({
        where: { id: '1' },
        select: { id: true, name: true, email: true, role: true },
      });
      expect(result).toEqual(mockUser);
    });

    it('devrait retourner null quand l\'utilisateur n\'existe pas', async () => {
      mockDb.user.findUnique.mockResolvedValue(null);

      const result = await getUserById('999');

      expect(mockDb.user.findUnique).toHaveBeenCalledWith({
        where: { id: '999' },
        select: { id: true, name: true, email: true, role: true },
      });
      expect(result).toBeNull();
    });
  });
});