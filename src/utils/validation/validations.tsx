import { addHours, isAfter, parseISO } from "date-fns";
import { isNaN } from "formik";

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

// Função responsável por limitar as descrições dos itens nos selects
export const limitWord = (texto) => {
  const palavras = texto.split(/\s+/);
  if (palavras.length > 5) {
    return palavras.slice(0, 5).join(" ") + "...";
  }
  return texto;
};

// Função que calcula o total de custo
export const calculateTotCust = (
  value = 0,
  entryIcms = 0,
  exitIcms = 0,
  commissionRate = 0
) => {
  return parseFloat(
    (
      (entryIcms / 100 + exitIcms / 100 + commissionRate / 100) *
      value
    ).toFixed(2)
  );
};

// Função que formata o valor total de custo para o padrão BR
export const formatCurrency = (value: number): string => {
  return value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
};

export interface FormValues {
  description: string;
  ean: string;
  ncm: string;
  icmsIn: string;
  icmsOut: string;
  cst: string;
  cfop: string;
  valorUnit: string;
  comission: string;
}

export const validate = (values: FormValues) => {
  const errors: Partial<FormValues> = {};

  if (!values.description) {
    errors.description = "Campo obrigatório";
  } else if (!/^[a-zA-Z0-9\s]+$/.test(values.description)) {
    errors.description =
      "O nome do produto não pode conter caracteres especiais";
  }

  if (!values.ean) {
    errors.ean = "Campo obrigatório";
  } else if (!/^\d{13,}$/.test(values.ean)) {
    errors.ean = "O código de barras deve conter no mínimo 13 dígitos";
  }

  if (!values.ncm) {
    errors.ncm = "Selecione um NCM para continuar";
  }

  if (!values.icmsIn) {
    errors.icmsIn = "Campo obrigatório";
  } else if (isNaN(values.icmsIn)) {
    errors.icmsIn = "A taxa ICMS de entrada deve conter apenas números";
  }

  if (!values.icmsOut) {
    errors.icmsOut = "Campo obrigatório";
  } else if (isNaN(values.icmsOut)) {
    errors.icmsOut = "A taxa ICMS de saída deve conter apenas números";
  }

  if (!values.cst) {
    errors.cst = "Selecione um CST para continuar";
  }

  if (!values.cfop) {
    errors.cfop = "Selecione um CFOP para continuar";
  }

  if (!values.valorUnit) {
    errors.valorUnit = "Campo obrigatório";
  } else if (!/^\d+([.,]\d+)?$/.test(values.valorUnit)) {
    errors.valorUnit = "O valor unitário deve conter apenas números";
  }

  if (!values.comission) {
    errors.comission = "Campo obrigatório";
  } else if (!/^\d+([.,]\d+)?$/.test(values.comission)) {
    errors.comission = "A comissão deve conter apenas números";
  }

  return errors;
};