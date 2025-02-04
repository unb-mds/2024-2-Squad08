import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import FiltroExecutor from '../pages/FiltroExecutor';
import FiltroRegiao from '../pages/FiltroRegiao';
import FiltroTipo from '../pages/FiltroTipo';
import FiltroValor from '../pages/FiltroValor';

describe('Filtros', () => {
  const renderFilterComponent = (Component) => {
    render(
      <MemoryRouter>
        <Component />
      </MemoryRouter>
    );
  };

  test('deve renderizar os filtros corretamente em FiltroExecutor', () => {
    renderFilterComponent(FiltroExecutor);

    expect(screen.getByText('ESCOLHA O EXECUTOR')).toBeInTheDocument();
    const checkboxDNIT = screen.getByLabelText(/Departamento Nacional de Infraestrutura de Transportes/i);
    fireEvent.click(checkboxDNIT);
    expect(checkboxDNIT.checked).toBe(true);

    const limparBtn = screen.getByText('LIMPAR');
    fireEvent.click(limparBtn);
    expect(checkboxDNIT.checked).toBe(false);
  });

  test('deve renderizar os filtros corretamente em FiltroRegiao', () => {
    renderFilterComponent(FiltroRegiao);

    expect(screen.getByText('ESCOLHA A REGIÃO')).toBeInTheDocument();
    const checkboxNorte = screen.getByLabelText(/Região Norte/i);
    fireEvent.click(checkboxNorte);
    expect(checkboxNorte.checked).toBe(true);

    const limparBtn = screen.getByText('LIMPAR');
    fireEvent.click(limparBtn);
    expect(checkboxNorte.checked).toBe(false);
  });

  test('deve renderizar os filtros corretamente em FiltroTipo', () => {
    renderFilterComponent(FiltroTipo);

    expect(screen.getByText('ESCOLHA O TIPO')).toBeInTheDocument();
    const checkboxEducacao = screen.getByLabelText(/Educação/i);
    fireEvent.click(checkboxEducacao);
    expect(checkboxEducacao.checked).toBe(true);

    const limparBtn = screen.getByText('LIMPAR');
    fireEvent.click(limparBtn);
    expect(checkboxEducacao.checked).toBe(false);
  });

  test('deve renderizar os filtros corretamente em FiltroValor', () => {
    renderFilterComponent(FiltroValor);

    expect(screen.getByText('ESCOLHA O VALOR')).toBeInTheDocument();
    const checkboxValor = screen.getByLabelText(/Abaixo de R\$ 100.000,00/i);
    fireEvent.click(checkboxValor);
    expect(checkboxValor.checked).toBe(true);

    const limparBtn = screen.getByText('LIMPAR');
    fireEvent.click(limparBtn);
    expect(checkboxValor.checked).toBe(false);
  });
});
