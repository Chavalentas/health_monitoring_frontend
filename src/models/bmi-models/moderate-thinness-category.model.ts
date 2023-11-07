import { BMICategory } from "./bmi-abstract-category.model";
import { BMICategoryReturnValueVisitor } from "./bmi-category-return-value-visitor.model";

export class ModerateThinnness extends BMICategory{
    public acceptVisitor<T>(visitor: BMICategoryReturnValueVisitor<T>): T{
        return visitor.visitModerate(this);
    }
}