import { render, screen } from '@testing-library/react';
import { Header } from '../Header';

describe('Header', () => {
  it('devrait afficher le nom passé en prop', () => {
    render(<Header name="Test Header" />);

    const headerElement = screen.getByRole('heading', { level: 1 });
    expect(headerElement).toBeInTheDocument();
    expect(headerElement).toHaveTextContent('Test Header');
  });

  it('devrait avoir les classes CSS appropriées', () => {
    render(<Header name="Test" />);

    const headerElement = screen.getByRole('heading', { level: 1 });
    expect(headerElement).toHaveClass('text-6xl', 'max-sm:text-3xl', 'text-center', 'text-white', 'py-10');
  });
});