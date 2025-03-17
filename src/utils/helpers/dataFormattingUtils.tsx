interface InputValues {
  valorUnit: number;
  description: string;
  icmsIn: number;
  icmsOut: number;
  comission: number;
  ncm: string;
  cst: string;
  cfop: number;
  ean: string;
}

interface FormattedValues {
  valor_unitario: number;
  descricao: string;
  taxa_icms_entrada: number;
  taxa_icms_saida: number;
  comissao: number;
  ean: string;
}

interface FormattedValuesInsert {
  valor_unitario: number;
  descricao: string;
  taxa_icms_entrada: number;
  taxa_icms_saida: number;
  comissao: number;
  ncm_id: number;
  cst_id: number;
  cfop_id: number;
  ean: string;
  excluido: number;
}

/**
 * Função que formata os valores para serem enviados ao backend. Usado nas requisições de criação e edição de itens (POST e PUT)
 * @param values Valores a serem formatados
 * @returns Valores formatados
 * @example formattedValues({valorUnit: 1000, description: "Produto", icmsIn: 18, icmsOut: 12, comission: 5, ncm: "12345678", cst: "123", cfop: 123, ean: "1234567890123"}) => {valor_unitario: 1000, descricao: "Produto", taxa_icms_entrada: 18, taxa_icms_saida: 12, comissao: 5, ncm: "12345678", cst: "123", cfop: 123, ean: "1234567890123", excluido: 0}
 */
export const formattedValues = (values: InputValues): FormattedValues => {
  return {
    valor_unitario: Number(values.valorUnit) || 0,
    descricao: values.description.trim(),
    taxa_icms_entrada: Number(values.icmsIn) || 0,
    taxa_icms_saida: Number(values.icmsOut) || 0,
    comissao: Number(values.comission) || 0,
    ean: values.ean.trim(),
  };
};

export const formattedValuesInsert = (values: InputValues): FormattedValuesInsert => {
  return {
    valor_unitario: Number(values.valorUnit) || 0,
    descricao: values.description.trim(),
    taxa_icms_entrada: Number(values.icmsIn) || 0,
    taxa_icms_saida: Number(values.icmsOut) || 0,
    comissao: Number(values.comission) || 0,
    ncm_id: Number(values.ncm) || 0,
    cst_id: Number(values.cst) || 0,
    cfop_id: Number(values.cfop) || 0,
    ean: values.ean.trim(),
    excluido: 0
  };
};