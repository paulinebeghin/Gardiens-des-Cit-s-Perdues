import { render, screen } from '@testing-library/react';
import { BookItem } from '../BookItem';
import type { Book } from '../../innterface/book.interface';

// Mock de react-router-dom
jest.mock('react-router-dom', () => ({
  Link: ({ to, children, className, style }: any) => (
    <a href={to} className={className} style={style}>
      {children}
    </a>
  ),
}));

describe('BookItem', () => {
  const mockBook: Book = {
    id: '1',
    title: 'Test Book',
    titleCategory: 'Test Category',
    category: 'BOOK',
    createdAt: '2024-01-01T00:00:00.000Z',
    imgCategory: 'test-image.jpg',
  };

  it('devrait afficher l\'image du livre', () => {
    render(<BookItem book={mockBook} />);

    const image = screen.getByAltText('Test Book');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', 'test-image.jpg');
  });

  it('devrait utiliser l\'image par défaut si aucune image n\'est disponible', () => {
    const bookWithoutImage = { ...mockBook, imgCategory: null, img: null };

    render(<BookItem book={bookWithoutImage} />);

    const image = screen.getByAltText('Test Book');
    expect(image).toHaveAttribute('src', 'https://placehold.co/200x300?text=Pas+d\'image');
  });

  it('devrait afficher le titre de la catégorie', () => {
    render(<BookItem book={mockBook} />);

    expect(screen.getByText('Test Category')).toBeInTheDocument();
  });

  it('devrait afficher "Tome X" pour les IDs commençant par "tome-"', () => {
    const tomeBook = { ...mockBook, id: 'tome-5' };

    render(<BookItem book={tomeBook} />);

    expect(screen.getByText('Tome 5')).toBeInTheDocument();
  });

  it('devrait avoir un lien vers la page du livre', () => {
    render(<BookItem book={mockBook} />);

    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', '/livres/1');
  });

  it('devrait avoir les classes CSS appropriées', () => {
    render(<BookItem book={mockBook} />);

    const link = screen.getByRole('link');
    expect(link).toHaveClass('relative', 'group', 'block', 'transition-transform', 'duration-300', 'hover:scale-105');
  });

  it('devrait avoir le style minWidth approprié', () => {
    render(<BookItem book={mockBook} />);

    const link = screen.getByRole('link');
    expect(link).toHaveStyle({ minWidth: '200px' });
  });
});