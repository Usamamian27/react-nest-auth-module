import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
} from 'class-validator';

export function IsValidPassword(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'isValidPassword',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: {
        validate(value: string, args: ValidationArguments) {
          if (!value) return false;
          const hasLetter = /[a-zA-Z]/.test(value);
          const hasNumber = /\d/.test(value);
          const hasSpecialCharacter = /[!@#$%^&*(),.?":{}|<>]/.test(value);
          const isLongEnough = value.length >= 8;

          return hasLetter && hasNumber && hasSpecialCharacter && isLongEnough;
        },
        defaultMessage(args: ValidationArguments) {
          return 'Password must be at least 8 characters long, and contain at least 1 letter, 1 number, and 1 special character.';
        },
      },
    });
  };
}
