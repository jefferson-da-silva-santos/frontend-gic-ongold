/**
 * Função que calcula o valor total do custo do item
 * @param value Valor do item
 * @param entryIcms Taxa de ICMS de entrada
 * @param exitIcms Taxa de ICMS de saída
 * @param commissionRate Taxa de comissão
 * @returns Valor total do custo do item
 * @example calculateTotCust(1000, 18, 12, 5) => 1350
 */
export const calculateTotCust = (
  value = 0,
  entryIcms = 0,
  exitIcms = 0,
  commissionRate = 0
) => {
  return parseFloat(
    ((entryIcms / 100 + exitIcms / 100 + commissionRate / 100) * value).toFixed(2)
  );
};
