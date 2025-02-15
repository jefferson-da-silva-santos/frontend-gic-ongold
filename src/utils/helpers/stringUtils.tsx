/**
 * Função que limita a quantidade de palavras de um texto
 * @param texto Texto a ser limitado
 * @param value Quantidade de palavras a serem exibidas
 * @returns Texto limitado
 * @example limitWord("Lorem ipsum dolor sit amet", 3) => "Lorem ipsum dolor..."
 */
export const limitWord = (texto: string, value = 5) => {
  const palavras = texto.split(/\s+/);
  if (palavras.length > value) {
    return palavras.slice(0, value).join(" ") + "...";
  }
  return texto;
};
