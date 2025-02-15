import { addHours, isAfter, parseISO } from "date-fns";
import { isNaN } from "formik";
import { alert } from "notie";

// Função que calcula compara um datatime com o datatime atual e valida se já se passaram 36h da sua criação
export function hasPassed36Hours(creationDate: string) {
  const date = parseISO(creationDate); // Converte a string para um objeto Date
  const datePlus36Hours = addHours(date, 36); // Soma 36 horas à data original
  return isAfter(new Date(), datePlus36Hours); // Compara se a data atual já passou da data + 36h
}

// Função que valida o id dentro dos submits
export const validateIdentify = (id, changeMessage, getElement) => {
  if (!id) {
    alert({
      type: 2, // optional, default = 4, enum: [1, 2, 3, 4, 5, 'success', 'warning', 'error', 'info', 'neutral']
      text: "Passe um id e faça uma busca!", // required
      stay: false, // optional, default = false
      time: 2, // optional, default = 3, minimum = 1,
      position: 'top' // optional, default = 'top', enum: ['top', 'bottom']
    })
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
    ((entryIcms / 100 + exitIcms / 100 + commissionRate / 100) * value).toFixed(
      2
    )
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

export const validate = (values: FormValues, edit = false) => {
  const errors: Partial<FormValues> = {};

  if (!values.description) {
    errors.description = !edit
      ? "Campo obrigatório"
      : "Campo obrigatório (Faça uma busca)";
    } else if (!/^[a-zA-Z0-9\s\u00C0-\u00FF]+$/.test(values.description)) {
    errors.description =
      "O nome do produto não pode conter caracteres especiais";
  }

  if (!values.ean) {
    errors.ean = !edit
      ? "Campo obrigatório"
      : "Campo obrigatório (Faça uma busca)";
  } else if (!/^\d{13,}$/.test(values.ean)) {
    errors.ean =
      "O código de barras deve conter no mínimo 13 dígitos (apenas números)";
  }

  if (!values.ncm) {
    errors.ncm = !edit
      ? "Selecione um NCM para continuar"
      : "Faça uma busca para carregar o NCM";
  }

  if (!values.icmsIn) {
    errors.icmsIn = !edit
      ? "Campo obrigatório"
      : "Campo obrigatório (Faça uma busca)";
  } else if (isNaN(values.icmsIn)) {
    errors.icmsIn = !edit
      ? "A taxa ICMS de entrada deve conter apenas números"
      : "A taxa ICMS de entrada deve conter apenas números (Faça uma busca)";
  }

  if (!values.icmsOut) {
    errors.icmsOut = !edit
      ? "Campo obrigatório"
      : "Campo obrigatório (Faça uma busca)";
  } else if (isNaN(values.icmsOut)) {
    errors.icmsOut = !edit
      ? "A taxa ICMS de saída deve conter apenas números"
      : "A taxa ICMS de saída deve conter apenas números (Faça uma busca)";
  }

  if (!values.cst) {
    errors.cst = !edit
      ? "Selecione um CST para continuar"
      : "Faça uma busca para carregar o CST";
  }

  if (!values.cfop) {
    errors.cfop = !edit
      ? "Selecione um CFOP para continuar"
      : "Faça uma busca para carregar o CFOP";
  }

  if (!values.valorUnit) {
    errors.valorUnit = !edit
      ? "Campo obrigatório"
      : "Campo obrigatório (Faça uma busca)";
  } else if (!/^\d+([.,]\d+)?$/.test(values.valorUnit)) {
    errors.valorUnit = !edit
      ? "O valor unitário deve conter apenas números"
      : "O valor unitário deve conter apenas números (Faça uma busca)";
  }

  if (!values.comission) {
    errors.comission = !edit
      ? "Campo obrigatório"
      : "Campo obrigatório (Faça uma busca)";
  } else if (!/^\d+([.,]\d+)?$/.test(values.comission)) {
    errors.comission = !edit
      ? "A comissão deve conter apenas números"
      : "A comissão deve conter apenas números (Faça uma busca)";
  }

  return errors;
};

// Função responsável por formatar os dados de envio da requisição (body)
export const formattedValues = (values) => {
  return {
    valor_unitario: Number(values.valorUnit) || 0,
    descricao: values.description.trim(),
    taxa_icms_entrada: Number(values.icmsIn) || 0,
    taxa_icms_saida: Number(values.icmsOut) || 0,
    comissao: Number(values.comission) || 0,
    ncm: values.ncm.trim(),
    cst: values.cst.trim(),
    cfop: Number(values.cfop) || 0,
    ean: values.ean.trim(),
    excluido: 0,
  };
};
