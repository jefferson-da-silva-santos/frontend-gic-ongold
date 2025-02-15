/**
 * Função que formata um valor para moeda brasileira
 * @param value Valor a ser formatado
 * @returns Valor formatado
 * @example formatCurrency(1000) => "R$ 1.000,00"
 */

export const formatCurrency = (value: number): string => {
  return value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
};
