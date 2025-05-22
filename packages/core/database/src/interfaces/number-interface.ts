

import { BaseInterface } from './base-interface';

export class NumberInterface extends BaseInterface {
  sanitizeValue(value: any) {
    if (typeof value === 'string') {
      if (['n/a', '-'].includes(value.toLowerCase())) {
        return null;
      }

      if (value.includes(',')) {
        value = value.replace(/,/g, '');
      }
    }

    return value;
  }

  async toValue(value: any) {
    if (value === null || value === undefined || typeof value === 'number') {
      return value;
    }

    if (!value) {
      return null;
    }

    const sanitizedValue = this.sanitizeValue(value);
    const numberValue = this.parseValue(sanitizedValue);

    if (!this.validate(numberValue)) {
      throw new Error(`Invalid number value: "${value}"`);
    }

    return numberValue;
  }

  parseValue(value) {
    return value;
  }

  validate(value) {
    return !isNaN(value);
  }
}
