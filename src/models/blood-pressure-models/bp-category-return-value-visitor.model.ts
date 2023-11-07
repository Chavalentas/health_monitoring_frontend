import { GradeIHypertension } from "./grade-i-hypertension-category.model";
import { GradeIIHypertension } from "./grade-ii-hypertension-category.model";
import { GradeIIIHypertension } from "./grade-iii-hypertension-category.model";
import { HighNormalBloodPressure } from "./high-normal-category.model";
import { NormalBloodPressure } from "./normal-category.model";
import { OptimalBloodPressure } from "./optimal-category.model";

export interface BloodPressureCategoryReturnValueVisitor<T>{
    visitNormal(category: NormalBloodPressure): T;
    visitOptimal(category: OptimalBloodPressure): T;
    visitHighNormal(category: HighNormalBloodPressure): T;
    visitGradeI(category: GradeIHypertension): T;
    visitGradeII(category: GradeIIHypertension): T;
    visitGradeIII(category: GradeIIIHypertension): T;
}