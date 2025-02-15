import notie from "notie";

interface AlertOptions {
  type: number;
  text: string;
  stay: boolean;
  time: number;
  position: string;
}

/**
 * Função que exibe um alerta para o usuário
 * @param type Tipo do alerta (success - 1, warning - 2, error - 3, info - 4)
 * @param text Texto do alerta (Ex: "Item criado com sucesso!")
 * @param time Tempo de exibição do alerta (em segundos)
 * @example showAlert(1, "Item criado com sucesso!", 3)
 */
export const showAlert = (type: number, text: string, time: number = 3): void => {
  const options: AlertOptions = {
    type,
    text,
    stay: false,
    time,
    position: "top",
  };
  notie.alert(options);
};
