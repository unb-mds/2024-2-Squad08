import { render, screen, fireEvent, waitFor, cleanup } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import FiltroExecutor from "../pages/FiltroExecutor";
import { vi } from "vitest";

// Mock do fetch para todos os testes
beforeAll(() => {
  global.fetch = vi.fn(() =>
    Promise.resolve({
      json: () => Promise.resolve({ success: true, data: ["Executor A", "Executor B"] }),
    }),
  ) as unknown as typeof fetch; // Conversão explícita para evitar erro de tipagem
});

// Limpa o DOM após cada teste
afterEach(() => {
  cleanup();
  vi.restoreAllMocks(); // Garante que o mock do fetch não acumule chamadas
});

describe("FiltroExecutor", () => {
  test("renderiza os executores corretamente", async () => {
    render(
      <MemoryRouter>
        <FiltroExecutor />
      </MemoryRouter>
    );

    expect(await screen.findByLabelText("Executor A")).toBeInTheDocument();
    expect(await screen.findByLabelText("Executor B")).toBeInTheDocument();
  });

  test("marca e desmarca um executor corretamente", async () => {
    render(
      <MemoryRouter>
        <FiltroExecutor />
      </MemoryRouter>
    );

    const checkbox = await screen.findByLabelText("Executor A");
    fireEvent.click(checkbox);
    expect(checkbox).toBeChecked();

    fireEvent.click(checkbox);
    expect(checkbox).not.toBeChecked();
  });

  test("limpa os filtros corretamente", async () => {
    render(
      <MemoryRouter>
        <FiltroExecutor />
      </MemoryRouter>
    );

    const checkbox = await screen.findByLabelText("Executor A");
    fireEvent.click(checkbox);
    expect(checkbox).toBeChecked();

    fireEvent.click(screen.getByText("LIMPAR"));

    await waitFor(() => expect(checkbox).not.toBeChecked());
  });
});
