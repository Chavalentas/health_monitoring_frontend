import { BMICategory } from "./bmi-abstract-category.model";
import { BMICategoryReturnValueVisitor } from "./bmi-category-return-value-visitor.model";

export class NormalRange extends BMICategory{
    public acceptVisitor<T>(visitor: BMICategoryReturnValueVisitor<T>): T{
        return visitor.visitNormal(this);
    }
}