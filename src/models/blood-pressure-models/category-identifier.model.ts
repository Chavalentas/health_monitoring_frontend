import { BloodPressureCategoryReturnValueVisitor } from "./bp-category-return-value-visitor.model";
import { GradeIHypertension } from "./grade-i-hypertension-category.model";
import { GradeIIHypertension } from "./grade-ii-hypertension-category.model";
import { GradeIIIHypertension } from "./grade-iii-hypertension-category.model";
import { HighNormalBloodPressure } from "./high-normal-category.model";
import { NormalBloodPressure } from "./normal-category.model";
import { OptimalBloodPressure } from "./optimal-category.model";


export class BloodPressureCategoryIdentifier implements BloodPressureCategoryReturnValueVisitor<string>{
    public visitNormal(category: NormalBloodPressure): string {
        console.log(category);
        return 'normal';
    }

    public visitOptimal(category: OptimalBloodPressure): string {
        console.log(category);
       return 'optimal';
    }

    public visitHighNormal(category: HighNormalBloodPressure): string {
        console.log(category);
        return 'hnormal';
    }

    public visitGradeI(category: GradeIHypertension): string {
        console.log(category);
        return 'gradei';
    }

    public visitGradeII(category: GradeIIHypertension): string {
        console.log(category);
        return 'gradeii';
    }

    public visitGradeIII(category: GradeIIIHypertension): string {
        console.log(category);
        return 'gradeiii';
    }
}