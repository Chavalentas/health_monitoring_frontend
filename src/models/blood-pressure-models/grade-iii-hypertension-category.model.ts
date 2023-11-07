import { BloodPressureCategory } from "./bp-abstract-category.model";
import { BloodPressureCategoryReturnValueVisitor } from "./bp-category-return-value-visitor.model";

export class GradeIIIHypertension extends BloodPressureCategory{
    public acceptVisitor<T>(visitor: BloodPressureCategoryReturnValueVisitor<T>): T{
        return visitor.visitGradeIII(this);
    }
}