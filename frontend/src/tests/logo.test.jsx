import { render, fireEvent } from '@testing-library/react';
import { useNavigate } from 'react-router-dom';
import Logo from '../components/Logo';  

vi.mock('react-router-dom', () => ({
  ...vi.importActual('react-router-dom'),
  useNavigate: vi.fn(),
}));

describe('Logo component', () => {
  it('deve renderizar o botão com o texto correto', () => {
    const mockNavigate = vi.fn();
    useNavigate.mockReturnValue(mockNavigate);

    const { getByText } = render(<Logo />);
    
    const button = getByText('MONITORA BSB');
    fireEvent.click(button);
    
    expect(mockNavigate).toHaveBeenCalled();
  });
});
