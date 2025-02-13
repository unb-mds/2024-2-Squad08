import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import FiltroValor from "../pages/FiltroValor";

describe("FiltroValor", () => {
  test("renderiza os checkboxes e botões corretamente", () => {
    render(
      <MemoryRouter>
        <FiltroValor />
      </MemoryRouter>
    );

    // Verifica a presença dos checkboxes com os rótulos corretos
    expect(screen.getByLabelText("Abaixo de R$ 100.000,00")).toBeInTheDocument();
    expect(screen.getByLabelText("Abaixo de R$ 200.000,00")).toBeInTheDocument();
    expect(screen.getByLabelText("Abaixo de R$ 300.000,00")).toBeInTheDocument();
    expect(screen.getByLabelText("Abaixo de R$ 500.000,00")).toBeInTheDocument();
    expect(screen.getByLabelText("Abaixo de R$ 700.000,00")).toBeInTheDocument();
    expect(screen.getByLabelText("Abaixo de R$ 900.000,00")).toBeInTheDocument();
    expect(screen.getByLabelText("Acima de R$ 1.000.000,00")).toBeInTheDocument();

    // Verifica a presença dos botões
    expect(screen.getByRole("button", { name: "LIMPAR" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "CONCLUIR" })).toBeInTheDocument();
  });

  test("seleciona e desseleciona os checkboxes corretamente", () => {
    render(
      <MemoryRouter>
        <FiltroValor />
      </MemoryRouter>
    );

    const checkbox = screen.getByLabelText("Abaixo de R$ 100.000,00") as HTMLInputElement;

    // Marca o checkbox
    fireEvent.click(checkbox);
    expect(checkbox.checked).toBe(true);

    // Desmarca o checkbox
    fireEvent.click(checkbox);
    expect(checkbox.checked).toBe(false);
  });

  test("limpa os filtros corretamente", () => {
    render(
      <MemoryRouter>
        <FiltroValor />
      </MemoryRouter>
    );

    const checkbox = screen.getByLabelText("Abaixo de R$ 100.000,00") as HTMLInputElement;
    fireEvent.click(checkbox); // Marca o checkbox

    // Verifica que está marcado
    expect(checkbox.checked).toBe(true);

    // Clica no botão "LIMPAR"
    fireEvent.click(screen.getByText("LIMPAR"));

    // Verifica que está desmarcado
    expect(checkbox.checked).toBe(false);
  });
});
