import { formatDate, formatPhone } from "../formatter";

describe("Funções de Formatação", () => {
  describe("formatDate", () => {
    test("formata datas ISO para formato brasileiro", () => {
      const cases = [
        { input: "2021-02-15T00:00:00.000Z", expected: "15/02/2021" },
        { input: "2020-03-12T00:00:00.000Z", expected: "12/03/2020" },
      ];

      cases.forEach(({ input, expected }) => {
        expect(formatDate(input)).toBe(expected);
      });
    });
  });

  describe("formatPhone", () => {
    test("formata números de telefone internacionais", () => {
      const cases = [
        { input: "5551122334455", expected: "(55) 51122-334455" },
        { input: "5559988776655", expected: "(55) 59988-776655" },
      ];

      cases.forEach(({ input, expected }) => {
        expect(formatPhone(input)).toBe(expected);
      });
    });
  });
});
