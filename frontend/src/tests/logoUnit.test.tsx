import { render, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import { useNavigate } from 'react-router-dom';
import Logo from '../components/Logo';

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual<typeof import('react-router-dom')>('react-router-dom');
  return {
    ...actual,
    useNavigate: vi.fn(),
  };
});

describe('Logo component', () => {
  it('deve renderizar o botão com o texto correto', () => {
    const mockNavigate = vi.fn();
    (useNavigate as jest.Mock).mockReturnValue(mockNavigate);

    const { getByText } = render(<Logo />);
    
    const button = getByText('MONITORA BSB');
    fireEvent.click(button);
    
    expect(mockNavigate).toHaveBeenCalled();
  });
});
