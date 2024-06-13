import { ValidationRule } from "model-validations";
interface Transformer<S, T> {
    transform(source: S): T[];
}
type TransformationLogicFn = (this: GeneralValidatorTransformer, source: any) => ValidationRule[];
declare class GeneralValidatorTransformer implements Transformer<Record<string, any>, ValidationRule> {
    validationResults: ValidationRule[];
    transformationLogic: TransformationLogicFn;
    constructor(input: Record<string, any>, transformationLogic: TransformationLogicFn);
    transform(source: Record<string, any>): ValidationRule[];
    createValidationRule(attribute: string, validationType: string, options?: Record<string, any>): ValidationRule;
    createPresenceRule(attribute: string): ValidationRule;
    createInclusionRule(attribute: string, allowedValues: any[]): ValidationRule;
    createConfirmationRule(attribute: string, confirmationAttribute: string): ValidationRule;
    createNumericalityRule(attribute: string, options?: {}): ValidationRule;
}
export declare class CallbackTransformer extends GeneralValidatorTransformer {
    constructor(input: Record<string, any>);
}
export declare class ArgumentSpecTransformer extends GeneralValidatorTransformer {
    constructor(input: Record<string, any>);
}
export {};
