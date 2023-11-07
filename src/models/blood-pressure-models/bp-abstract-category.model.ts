import { BloodPressureCategoryReturnValueVisitor } from "./bp-category-return-value-visitor.model";

export abstract class BloodPressureCategory{
    abstract acceptVisitor<T>(visitor: BloodPressureCategoryReturnValueVisitor<T>): T;
}