import { formatCurrency } from "../currency/currencyUtils";
import { hasPassedValueHours } from "../date/dateUtils";
import { calculateTotCust } from "../helpers/calculateUtils";
import { formattedValues } from "../helpers/dataFormattingUtils";
import { limitWord } from "../helpers/stringUtils";
import { isValidId } from "./idValidation";
import { validate } from "./formValidation";
import { showAlert } from "../ui/alertUtils";
import { hasPassed30Days } from "../date/dateUtils";
/**
 * Exportação de todas as funções de validação e formatação para serem usadas em outros arquivos da aplicação.
 * @module utils/validation
 * @see module:utils/currency
 * @see module:utils/date
 * @see module:utils/helpers
 * @see module:utils/ui
 * @see module:utils/helpers/stringUtils
 * @see module:utils/helpers/calculateUtils
 * @see module:utils/helpers/dataFormattingUtils
 * @see module:utils/validation/idValidation
 * @see module:utils/validation/formValidation
 * @see module:utils/ui/alertUtils
 * @see module:utils/currency/currencyUtils
 * @see module:utils/date/dateUtils
 */
export {
  hasPassedValueHours,
  validate,
  formattedValues,
  isValidId,
  formatCurrency,
  limitWord,
  calculateTotCust,
  showAlert,
  hasPassed30Days
};