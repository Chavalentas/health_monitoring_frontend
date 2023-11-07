import { BloodPressureCategory } from "./bp-abstract-category.model";
import { BloodPressureCategoryReturnValueVisitor } from "./bp-category-return-value-visitor.model";

export class HighNormalBloodPressure extends BloodPressureCategory{
    public acceptVisitor<T>(visitor: BloodPressureCategoryReturnValueVisitor<T>): T{
        return visitor.visitHighNormal(this);
    }
}