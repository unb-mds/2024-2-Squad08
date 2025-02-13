import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import FiltroRegiao from "../pages/FiltroRegiao";

describe("FiltroRegiao", () => {
  test("renderiza as regiões administrativas corretamente", () => {
    render(
      <MemoryRouter>
        <FiltroRegiao />
      </MemoryRouter>
    );

    expect(screen.getByText("ESCOLHA A REGIÃO ADMINISTRATIVA")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "LIMPAR" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "CONCLUIR" })).toBeInTheDocument();
  });

  test("marca e desmarca uma região corretamente", () => {
    render(
      <MemoryRouter>
        <FiltroRegiao />
      </MemoryRouter>
    );

    const checkbox = screen.getByLabelText("Plano Piloto");
    fireEvent.click(checkbox);
    expect(checkbox).toBeChecked();

    fireEvent.click(checkbox);
    expect(checkbox).not.toBeChecked();
  });

  test("limpa os filtros corretamente", () => {
    render(
      <MemoryRouter>
        <FiltroRegiao />
      </MemoryRouter>
    );

    const checkbox = screen.getByLabelText("Plano Piloto");
    fireEvent.click(checkbox);
    expect(checkbox).toBeChecked();

    fireEvent.click(screen.getByText("LIMPAR"));
    expect(checkbox).not.toBeChecked();
  });
});
