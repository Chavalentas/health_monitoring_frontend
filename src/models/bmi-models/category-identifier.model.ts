import { BMICategoryReturnValueVisitor } from "./bmi-category-return-value-visitor.model";
import { MildThinnness } from "./mild-thinness-category.model";
import { ModerateThinnness } from "./moderate-thinness-category.model";
import { NormalRange } from "./normal-range-category.model";
import { ObeseClassI } from "./obese-class-i-category.model";
import { ObeseClassII } from "./obese-class-ii-category.model";
import { ObeseClassIII } from "./obese-class-iii-category.model";
import { OverWeight } from "./overweight-category.model";
import { SevereThinnness } from "./severe-thinness-category.model";

export class BMICategoryIdentifier implements BMICategoryReturnValueVisitor<string>{
    public visitMild(category: MildThinnness): string {
        return 'mild';
    }

    public visitModerate(category: ModerateThinnness): string {
        return 'moderate';
    }

    public visitSevere(category: SevereThinnness): string {
        return 'severe';
    }

    public visitOverweight(category: OverWeight): string {
        return 'overweight';
    }

    public visitNormal(category: NormalRange): string {
        return 'normal';
    }

    public visitObeseI(category: ObeseClassI): string {
        return 'obesei';
    }

    public visitObeseII(category: ObeseClassII): string {
        return 'obeseii';
    }

    public visitObeseIII(category: ObeseClassIII): string {
        return 'obeseiii';
    }
}