import { describe, expect, test, vi, beforeEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import axios from "axios";
import { UserTable } from "../UserTable";
import { formatDate, formatPhone } from "../../utils/formatter";

// Mock do axios
vi.mock("axios");
const mockedAxios = axios as any;

// Mock de dados de exemplo
const mockEmployees = [
  {
    id: 1,
    name: "Maria Silva",
    job: "Engenheiro Front-end",
    admission_date: "2022-01-15T00:00:00.000Z",
    phone: "5551122334455",
    image: "/user1.jpg",
  },
  {
    id: 2,
    name: "Carlos Oliveira",
    job: "Desenvolvedor Back-end",
    admission_date: "2021-03-10T00:00:00.000Z",
    phone: "5559988776655",
    image: "/user2.jpg",
  },
];

describe("Componente UserTable", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  // Teste 1: Verifica o estado de carregamento
  test("1. Exibe estado de carregamento inicial", async () => {
    mockedAxios.get.mockReturnValue(new Promise(() => {}));
    render(<UserTable />);

    expect(screen.getByTestId("loading-spinner")).toBeInTheDocument();
    expect(screen.queryByRole("table")).not.toBeInTheDocument();
  });

  // Teste 2: Verifica a exibição dos dados após o carregamento
  test("2. Exibe dados após carregamento", async () => {
    mockedAxios.get.mockResolvedValue({ data: mockEmployees });
    render(<UserTable />);

    await waitFor(() => {
      expect(screen.getByRole("table")).toBeInTheDocument();
      expect(screen.getAllByRole("row")).toHaveLength(3);
    });

    // Verifica se os dados de cada usuário estão sendo exibidos corretamente
    mockEmployees.forEach((user) => {
      // Verifica a imagem (thumb)
      const userImages = screen.getAllByAltText(user.name);
      expect(userImages.length).toBeGreaterThan(0); // Verifica se pelo menos uma imagem foi encontrada
      expect(userImages[0]).toHaveAttribute("src", user.image); // Verifica o src da primeira imagem

      // Verifica nome, cargo, data de admissão e telefone
      const nameElements = screen.getAllByText(user.name);
      expect(nameElements.length).toBeGreaterThan(0); // Verifica se pelo menos um elemento com o nome foi encontrado

      const jobElements = screen.getAllByText(user.job);
      expect(jobElements.length).toBeGreaterThan(0); // Verifica se pelo menos um elemento com o cargo foi encontrado

      const dateElements = screen.getAllByText(formatDate(user.admission_date));
      expect(dateElements.length).toBeGreaterThan(0); // Verifica se pelo menos um elemento com a data foi encontrado

      const phoneElements = screen.getAllByText(formatPhone(user.phone));
      expect(phoneElements.length).toBeGreaterThan(0); // Verifica se pelo menos um elemento com o telefone foi encontrado
    });
  });

  // Teste 3: Verifica a funcionalidade de pesquisa
  test("3. Filtra resultados por termo parcial", async () => {
    mockedAxios.get.mockResolvedValue({ data: mockEmployees });
    render(<UserTable />);

    // Esperar carregamento inicial
    await screen.findByRole("table");

    // Simula a digitação no campo de busca
    await userEvent.type(
      screen.getByPlaceholderText("Pesquisar"),
      "Engenheiro"
    );

    // Verifica se apenas o usuário "Maria Silva" é exibido
    await waitFor(
      () => {
        const rows = screen.getAllByRole("row");
        expect(rows).toHaveLength(2); // Header + 1 resultado
        expect(screen.getByText("Engenheiro Front-end")).toBeInTheDocument();
        expect(
          screen.queryByText("Desenvolvedor Back-end")
        ).not.toBeInTheDocument();
      },
      { timeout: 500 }
    );
  });

  // Teste 4: Verifica a mensagem de "nenhum resultado"
  test("4. Exibe mensagem de 'nenhum resultado'", async () => {
    mockedAxios.get.mockResolvedValue({ data: mockEmployees });
    render(<UserTable />);

    await screen.findByRole("table");
    await userEvent.type(screen.getByPlaceholderText("Pesquisar"), "XXXXXXX");

    await waitFor(() => {
      expect(screen.getByText("Nenhum usuário encontrado")).toBeInTheDocument();
    });
  });

  // Teste 5: Verifica o tratamento de erros
  test("5. Exibe mensagem de erro corretamente", async () => {
    mockedAxios.get.mockRejectedValue(new Error("Erro de conexão"));
    render(<UserTable />);

    await waitFor(() => {
      expect(
        screen.getByText((content) =>
          content.includes("Falha ao cerregar funcionários")
        )
      ).toBeInTheDocument();
    });
  });

  // Teste 6: Verifica a formatação da data e do telefone
  test("6. Formata corretamente a data e o telefone", async () => {
    mockedAxios.get.mockResolvedValue({ data: mockEmployees });
    render(<UserTable />);

    // Aguarda a tabela ser renderizada
    await screen.findByRole("table");

    // Verifica a formatação da data e do telefone
    mockEmployees.forEach((user) => {
      const formattedDate = formatDate(user.admission_date);
      const formattedPhone = formatPhone(user.phone);

      expect(screen.getByText(formattedDate)).toBeInTheDocument();
      expect(screen.getByText(formattedPhone)).toBeInTheDocument();
    });
  });
});
