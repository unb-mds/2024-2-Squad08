import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Endereco from "../pages/Endereco";

test("Renderiza o formulário de endereço corretamente e permite o envio", () => {
  render(
    <MemoryRouter>
      <Endereco />
    </MemoryRouter>
  );

  fireEvent.change(screen.getByPlaceholderText(/CEP/i), { target: { value: "12345-678" } });
  fireEvent.change(screen.getByPlaceholderText(/Cidade/i), { target: { value: "Brasília" } });
  fireEvent.change(screen.getByPlaceholderText(/Estado/i), { target: { value: "DF" } });
  fireEvent.change(screen.getByPlaceholderText(/Rua/i), { target: { value: "Rua Teste" } });
  fireEvent.change(screen.getByPlaceholderText(/Bairro/i), { target: { value: "Centro" } });
  fireEvent.change(screen.getByPlaceholderText(/Número/i), { target: { value: "123" } });

  fireEvent.click(screen.getByRole("button", { name: /salvar/i }));
});
