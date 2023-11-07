import { MildThinnness } from "./mild-thinness-category.model";
import { ModerateThinnness } from "./moderate-thinness-category.model";
import { NormalRange } from "./normal-range-category.model";
import { ObeseClassI } from "./obese-class-i-category.model";
import { ObeseClassII } from "./obese-class-ii-category.model";
import { ObeseClassIII } from "./obese-class-iii-category.model";
import { OverWeight } from "./overweight-category.model";
import { SevereThinnness } from "./severe-thinness-category.model";

export interface BMICategoryReturnValueVisitor<T>{
    visitMild(category: MildThinnness): T;
    visitModerate(category: ModerateThinnness): T;
    visitSevere(category: SevereThinnness): T;
    visitOverweight(category: OverWeight): T;
    visitNormal(category: NormalRange): T;
    visitObeseI(category: ObeseClassI): T;
    visitObeseII(category: ObeseClassII): T;
    visitObeseIII(category: ObeseClassIII): T;
}