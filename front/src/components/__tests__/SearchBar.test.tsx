import { render, screen, fireEvent } from '@testing-library/react';
import { SearchBar } from '../SearchBar';

describe('SearchBar', () => {
  const mockOnChange = jest.fn();

  beforeEach(() => {
    mockOnChange.mockClear();
  });

  it('devrait afficher le placeholder correct', () => {
    render(<SearchBar value="" onChange={mockOnChange} />);

    const input = screen.getByPlaceholderText('Rechercher un personnage...');
    expect(input).toBeTruthy();
  });

  it('devrait afficher la valeur passée en prop', () => {
    render(<SearchBar value="test search" onChange={mockOnChange} />);

    const input = screen.getByDisplayValue('test search');
    expect(input).toBeTruthy();
  });

  it('devrait appeler onChange quand l\'utilisateur tape', async () => {
    render(<SearchBar value="" onChange={mockOnChange} />);

    const input = screen.getByPlaceholderText('Rechercher un personnage...');
    fireEvent.change(input, { target: { value: 'test' } });

    expect(mockOnChange).toHaveBeenCalledTimes(1);
    expect(mockOnChange).toHaveBeenCalledWith('test');
  });

  it('devrait avoir l\'icône de recherche', () => {
    render(<SearchBar value="" onChange={mockOnChange} />);

    const searchIcon = document.querySelector('svg');
    expect(searchIcon).toBeTruthy();
  });

  it('devrait être rendu correctement', () => {
    const { container } = render(<SearchBar value="" onChange={mockOnChange} />);
    
    const wrapper = container.firstChild;
    expect(wrapper).toBeTruthy();
  });
});