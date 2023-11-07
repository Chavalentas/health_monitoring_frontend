import { BloodPressureCategoryReturnValueVisitor } from "./bp-category-return-value-visitor.model";
import { GradeIHypertension } from "./grade-i-hypertension-category.model";
import { GradeIIHypertension } from "./grade-ii-hypertension-category.model";
import { GradeIIIHypertension } from "./grade-iii-hypertension-category.model";
import { HighNormalBloodPressure } from "./high-normal-category.model";
import { NormalBloodPressure } from "./normal-category.model";
import { OptimalBloodPressure } from "./optimal-category.model";


export class BloodPressureCategoryIdentifier implements BloodPressureCategoryReturnValueVisitor<string>{
    public visitNormal(category: NormalBloodPressure): string {
        return 'normal';
    }

    public visitOptimal(category: OptimalBloodPressure): string {
       return 'optimal';
    }

    public visitHighNormal(category: HighNormalBloodPressure): string {
        return 'hnormal';
    }

    public visitGradeI(category: GradeIHypertension): string {
        return 'gradei';
    }

    public visitGradeII(category: GradeIIHypertension): string {
        return 'gradeii';
    }

    public visitGradeIII(category: GradeIIIHypertension): string {
        return 'gradeiii';
    }
}