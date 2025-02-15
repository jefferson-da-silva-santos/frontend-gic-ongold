import { addHours, isAfter, parseISO } from "date-fns";

/**
 * Verifica se a data de criação do objeto já passou 36 horas
 * @param creationDate Data de criação do objeto (string no formato ISO, Ex: "2021-09-01T12:00:00")
 * @returns Se a data de criação já passou 36 horas
 * @example hasPassed36Hours("2021-09-01T12:00:00") => true
 */
export function hasPassed36Hours(creationDate: string) {
  const date = parseISO(creationDate); // Converte a string para um objeto Date
  const datePlus36Hours = addHours(date, 36); // Soma 36 horas à data original
  return isAfter(new Date(), datePlus36Hours); // Compara se a data atual já passou da data + 36h
}
