export type FieldValidationObject = {
    valid: boolean;
    message: string;
};
export type ValidationLogicFunction = (subject: any) => Record<string, string[]>;
/**
 * @example
 *   // Define a simple validation logic function
 *   const validateUser = (user) => {
 *     const errors = {};
 *     if (!user.name) {
 *       errors.name = ["Name is required"];
 *     }
 *     if (!user.email) {
 *       errors.email = ["Email is required"];
 *     } else if (!/^\S+@\S+\.\S+$/.test(user.email)) {
 *       errors.email.push("Email is invalid");
 *     }
 *     return errors;
 *   };
 *
 *   // Instantiate the GeneralValidator with the validation logic
 *   const userValidator = new GeneralValidator(validateUser);
 *
 *   // Validate a user object
 *   const user = { name: "", email: "invalid-email" };
 *   userValidator.validate(user);
 *
 *   console.log(userValidator.errors); // { name: ['Name is required'], email: ['Email is invalid'] }
 *   console.log(userValidator.valid()); // false
 *   console.log(userValidator.findErrorMessageForField("email")); // 'Email is invalid'
 *   console.log(userValidator.validField("name")); // { valid: false, message: 'Name is required' }
 */
export default class GeneralValidator {
    errors: Record<string, string[]>;
    validationLogicFunction: ValidationLogicFunction;
    constructor(validationLogicFunction: ValidationLogicFunction);
    get errorMessages(): string[];
    valid(): boolean;
    findErrorMessageForField(fieldName: string): string | undefined;
    errorInField(fieldName: string): boolean;
    validField(fieldName: string): FieldValidationObject;
    validate(subject: any): Record<string, string[]>;
}
