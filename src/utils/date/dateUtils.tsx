import { addHours, isAfter, parseISO } from "date-fns";

/**
 * Verifica se a data de criação do objeto já passou 36 horas
 * @param creationDate Data de criação do objeto (string no formato ISO, Ex: "2021-09-01T12:00:00")
 * @returns Se a data de criação já passou 36 horas
 * @example hasPassedNumberHours("2021-09-01T12:00:00") => true
 */
export function hasPassedValueHours(creationDate: string, value: number) {
  const date = parseISO(creationDate); // Converte a string para um objeto Date
  const datePlusHours = addHours(date, value); // Soma a quantidade de horas à data original
  return isAfter(new Date(), datePlusHours); // Compara se a data atual já passou da data + (valor de horas)
}


export function hasPassed30Days(creationDate: string) {
  const date = new Date(creationDate); // Converte a string para um objeto Date
  const datePlus30Days = new Date(date.getTime() + 30 * 24 * 60 * 60 * 1000); // Adiciona 30 dias à data original
  return new Date() > datePlus30Days; // Compara se a data atual já passou da data + 30 dias
}



export function hasPassed10Seconds(creationDate: string) {
  const date = new Date(creationDate); // Converte a string para um objeto Date
  const datePlus10Seconds = new Date(date.getTime() + 10000); // Adiciona 10 segundos à data original
  return new Date() > datePlus10Seconds; // Compara se a data atual já passou da data + 10 segundos
}