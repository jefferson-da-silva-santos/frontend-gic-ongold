/**
 * Função que verifica se um ID é válido (não é nulo e é um número)
 * @param id ID a ser verificado
 * @returns true se o ID for válido, false caso contrário
 * @example isValidId(1) => true
 */
export const isValidId = (id: number | string | null | undefined): boolean => {
  return id !== null && id !== undefined && !isNaN(Number(id));
};