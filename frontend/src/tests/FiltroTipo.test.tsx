import { render, screen, fireEvent, waitFor, cleanup } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { vi } from "vitest";
import FiltroTipo from "../pages/FiltroTipo";

// Mock da API
beforeAll(() => {
  global.fetch = vi.fn(() =>
    Promise.resolve({
      ok: true,
      json: () => Promise.resolve({ success: true, data: ["Obra Pública", "Obra Privada"] }),
    }),
  ) as unknown as typeof fetch;
});

// Limpeza após cada teste
afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
});

// Função auxiliar para renderizar com roteador
const renderWithRouter = (ui) => {
  return render(<MemoryRouter>{ui}</MemoryRouter>);
};

describe("FiltroTipo", () => {
  test("renderiza os tipos corretamente", async () => {
    renderWithRouter(<FiltroTipo />);

    expect(screen.getByText("ESCOLHA O TIPO")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "LIMPAR" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "CONCLUIR" })).toBeInTheDocument();

    // Esperar os checkboxes carregarem
    expect(await screen.findByLabelText("Obra Pública")).toBeInTheDocument();
    expect(await screen.findByLabelText("Obra Privada")).toBeInTheDocument();
  });

  test("marca e desmarca um tipo corretamente", async () => {
    renderWithRouter(<FiltroTipo />);

    const checkbox = await screen.findByLabelText("Obra Pública");
    fireEvent.click(checkbox);
    expect(checkbox).toBeChecked();

    fireEvent.click(checkbox);
    expect(checkbox).not.toBeChecked();
  });

  test("limpa os filtros corretamente", async () => {
    renderWithRouter(<FiltroTipo />);

    const checkbox = await screen.findByLabelText("Obra Pública");
    fireEvent.click(checkbox);
    expect(checkbox).toBeChecked();

    fireEvent.click(screen.getByRole("button", { name: "LIMPAR" }));

    await waitFor(() => expect(checkbox).not.toBeChecked());
  });
});
