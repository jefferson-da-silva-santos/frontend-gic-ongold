import { addHours, isAfter, parseISO } from "date-fns";

// Função que calcula compara um datatime com o datatime atual e valida se já se passaram 36h da sua criação
export function hasPassed36Hours(creationDate: string) {
  const date = parseISO(creationDate); // Converte a string para um objeto Date
  const datePlus36Hours = addHours(date, 36); // Soma 36 horas à data original
  return isAfter(new Date(), datePlus36Hours); // Compara se a data atual já passou da data + 36h
}

// Função que valida o id dentro dos submits
export const validateIdentify = (id, changeMessage, getElement) => {
  if (!id) {
    changeMessage("Passe um id e faça uma busca!", "rgb(255, 95, 95)");
    getElement("id").focus();
    return false;
  }
};
