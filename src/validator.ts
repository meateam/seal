import * as validator from 'validator';

export class Validator {

  // check if the string contains only letters (a-zA-Z).
  static isAlpha(str): boolean {
    return validator.isAlpha(str);
  }

  // check if the string contains only letters and numbers.
  static isAlphanumeric(str): boolean {
    return validator.isAlphanumeric(str);
  }

  static isEmail(str): boolean {
    return validator.isEmail(str);
  }

  // check if the string is in a array of allowed values.
  static isIn(str, values): boolean {
    return validator.isIn(str, values);
  }

  // check if the string is an integer.
  // options is an object which can contain the keys min and/or max to check the integer is within boundaries (e.g. { min: 10, max: 99 }).
  // options can also contain the key allow_leading_zeroes, which when set to false will disallow integer values with leading zeroes
  static isInt(str, options): boolean {
    return validator.isInt(str, options);
  }

  // check if the string is valid JSON (note: uses JSON.parse).
  static isJSON(str): boolean {
    return validator.isJSON(str);
  }

  // check if the string's length falls in a range.
  // @options is an object which defaults to {min:0, max: undefined}
  static isLength(str, options): boolean {
    return validator.isLength(str, options);
  }

  static isLowercase(str): boolean {
    return validator.isLowercase(str);
  }

  static isMongoId(str): boolean {
    return validator.isMongoId(str);
  }

  static isNumeric(str): boolean {
    return validator.isNumeric(str);
  }

  // options is an object which defaults to { protocols: ['http','https','ftp'], require_protocol: false
  static isURL(str, options): boolean {
    return validator.isURL(options, str);
  }

  static isUppercase(str): boolean {
    return validator.isUppercase(str);
  }

}
