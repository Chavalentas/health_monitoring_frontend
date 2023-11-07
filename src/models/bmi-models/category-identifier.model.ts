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
        console.log(category);
        return 'mild';
    }

    public visitModerate(category: ModerateThinnness): string {
        console.log(category);
        return 'moderate';
    }

    public visitSevere(category: SevereThinnness): string {
        console.log(category);
        return 'severe';
    }

    public visitOverweight(category: OverWeight): string {
        console.log(category);
        return 'overweight';
    }

    public visitNormal(category: NormalRange): string {
        console.log(category);
        return 'normal';
    }

    public visitObeseI(category: ObeseClassI): string {
        console.log(category);
        return 'obesei';
    }

    public visitObeseII(category: ObeseClassII): string {
        console.log(category);
        return 'obeseii';
    }

    public visitObeseIII(category: ObeseClassIII): string {
        console.log(category);
        return 'obeseiii';
    }
}