import { isNaN } from "formik";

/**
 * Interface para os valores do formulário
 */
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

/**
 * Função de validação do formulário
 * @param values Valores do formulário
 * @param edit Flag para verificar se é uma edição ou uma criação
 * @returns Erros de validação
 * @example validate({description: "Produto", ean: "1234567890123", ncm: "12345678", icmsIn: "18", icmsOut: "12", cst: "123", cfop: "123", valorUnit: "1000", comission: "5"}) => {}
 */
export const validate = (values: FormValues, edit = false) => {
  const errors: Partial<FormValues> = {};

  if (!values.description) {
    errors.description = !edit
      ? "Campo obrigatório"
      : "Campo obrigatório";
    } else if (!/^[a-zA-Z0-9\s\u00C0-\u00FF]+$/.test(values.description)) {
    errors.description =
      "O nome do produto não pode conter caracteres especiais";
  }

  if (!values.ean) {
    errors.ean = !edit
      ? "Campo obrigatório"
      : "Campo obrigatório";
  } else if (!/^\d{13,}$/.test(values.ean)) {
    errors.ean =
      "O código de barras deve conter no mínimo 13 dígitos (apenas números)";
  }

  if (!values.ncm || values.ncm === undefined) {
    errors.ncm = !edit
      ? "Selecione um NCM para continuar"
      : "Faça uma busca para carregar o NCM";
  }

  if (!values.icmsIn) {
    errors.icmsIn = !edit
      ? "Campo obrigatório"
      : "Campo obrigatório";
  } else if (isNaN(values.icmsIn)) {
    errors.icmsIn = !edit
      ? "A taxa ICMS de entrada deve conter apenas números"
      : "A taxa ICMS de entrada deve conter apenas números";
  }

  if (!values.icmsOut) {
    errors.icmsOut = !edit
      ? "Campo obrigatório"
      : "Campo obrigatório";
  } else if (isNaN(values.icmsOut)) {
    errors.icmsOut = !edit
      ? "A taxa ICMS de saída deve conter apenas números"
      : "A taxa ICMS de saída deve conter apenas números";
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
      : "Campo obrigatório";
  } else if (!/^\d+([.,]\d+)?$/.test(values.valorUnit)) {
    errors.valorUnit = !edit
      ? "O valor unitário deve conter apenas números"
      : "O valor unitário deve conter apenas números";
  }

  if (!values.comission) {
    errors.comission = !edit
      ? "Campo obrigatório"
      : "Campo obrigatório";
  } else if (!/^\d+([.,]\d+)?$/.test(values.comission)) {
    errors.comission = !edit
      ? "A comissão deve conter apenas números"
      : "A comissão deve conter apenas números";
  }

  console.log(errors);
  return errors;
};
