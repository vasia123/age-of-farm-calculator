
import { type ComposerTranslation } from 'vue-i18n';

function isNumeric(val: any): val is number | string {
    return !(val instanceof Array) && (val - parseFloat(val) + 1) >= 0;
}

export function formatNumber(num: number | string, numSignChars = 2): string {
    const number = Number(num)
    if (Number.isInteger(number)) {
        return String(num);
    }
    const numString = num.toString();
    const decimalPos = numString.indexOf('.');
    if (decimalPos === -1) {
        return numString;
    }
    let firstSignificantDigitPos = decimalPos + 1;
    while (numString[firstSignificantDigitPos] === '0') {
        firstSignificantDigitPos++;
    }
    if (firstSignificantDigitPos > decimalPos + 8) {
        return numString.substring(0, decimalPos);
    }
    const decimalPlaces = firstSignificantDigitPos - decimalPos - 1 + numSignChars;
    return number.toFixed(decimalPlaces);
}
export const translateIfString = (stringOrNumber: string | number, $t: ComposerTranslation) => {
    if (isNumeric(stringOrNumber)) return stringOrNumber;
    const parsedNumber = parseInt(stringOrNumber, 10);
    if (parsedNumber.toString() === stringOrNumber) {
        return stringOrNumber;
    } else {
        return $t(stringOrNumber);
    }
};