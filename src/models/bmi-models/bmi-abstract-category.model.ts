import { BMICategoryReturnValueVisitor } from "./bmi-category-return-value-visitor.model";

export abstract class BMICategory {
    abstract acceptVisitor<T>(visitor: BMICategoryReturnValueVisitor<T>): T;
}