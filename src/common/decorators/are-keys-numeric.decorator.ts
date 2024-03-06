import {
    registerDecorator,
    ValidationArguments,
    ValidationOptions,
    ValidatorConstraint,
    ValidatorConstraintInterface,
} from "class-validator";

@ValidatorConstraint({ name: "areKeysNumeric", async: false })
export class AreKeysNumericConstraint implements ValidatorConstraintInterface {
    validate(value: any) {
        if (!value || typeof value !== "object") {
            return false;
        }

        for (const key of Object.keys(value)) {
            if (typeof value[key] !== "number") {
                return false;
            }
        }

        return true;
    }

    defaultMessage(args: ValidationArguments) {
        return `All values in ${args.property} must be numbers.`;
    }
}

export function AreKeysNumeric(validationOptions?: ValidationOptions) {
    return function (object: any, propertyName: string) {
        registerDecorator({
            name: "areKeysNumeric",
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            validator: AreKeysNumericConstraint,
        });
    };
}
