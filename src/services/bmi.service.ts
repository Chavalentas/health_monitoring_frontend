import { BMICategory } from "../models/bmi-models/bmi-abstract-category.model";
import { UnidentifiedBMICategoryError } from "../models/bmi-models/bmi-errors/unidentified-bmi-category-error.model";
import { MildThinnness } from "../models/bmi-models/mild-thinness-category.model";
import { ModerateThinnness } from "../models/bmi-models/moderate-thinness-category.model";
import { NormalRange } from "../models/bmi-models/normal-range-category.model";
import { ObeseClassI } from "../models/bmi-models/obese-class-i-category.model";
import { ObeseClassII } from "../models/bmi-models/obese-class-ii-category.model";
import { ObeseClassIII } from "../models/bmi-models/obese-class-iii-category.model";
import { OverWeight } from "../models/bmi-models/overweight-category.model";
import { SevereThinnness } from "../models/bmi-models/severe-thinness-category.model";

export class BMIService{
    public getBMI(heightInM: number, weightInKg: number): BMICategory{
        if (heightInM <= 0){
            throw new RangeError('The height has to be greater than 0!')
        }

        if (weightInKg <= 0){
            throw new RangeError('The weight has to be greater than 0!')
        }

        let bmi = weightInKg / Math.pow(heightInM, 2);

        if (bmi < 16.0){
            return new SevereThinnness();
        }

        if (bmi >= 16.0 && bmi < 17.0){
            return new ModerateThinnness();
        }

        if (bmi >= 17.0 && bmi < 18.4){
            return new MildThinnness();
        }

        if (bmi >= 18.4 && bmi < 25.0){
            return new NormalRange();
        }

        if (bmi >= 25.0 && bmi < 30.0){
            return new OverWeight();
        }

        if (bmi >= 30.0 && bmi < 35.0){
            return new ObeseClassI();
        }

        if (bmi >= 35.0 && bmi < 40.0){
            return new ObeseClassII();
        }

        if (bmi >= 40.0){
            return new ObeseClassIII();
        }

        throw new UnidentifiedBMICategoryError('The BMI category could not be specified!');
    }

    public isValidBMI(heightInM: number, weightInKg: number): boolean{
        if (heightInM <= 0){
            return false;
        }

        if (weightInKg <= 0){
            return false;
        }

        let bmi = weightInKg / Math.pow(heightInM, 2);

        if (bmi < 16.0){
            return true;
        }

        if (bmi >= 16.0 && bmi < 17.0){
            return true;
        }

        if (bmi >= 17.0 && bmi < 18.4){
            return true;
        }

        if (bmi >= 18.4 && bmi < 25.0){
            return true;
        }

        if (bmi >= 25.0 && bmi < 30.0){
            return true;
        }

        if (bmi >= 30.0 && bmi < 35.0){
            return true;
        }

        if (bmi >= 35.0 && bmi < 40.0){
            return true;
        }

        if (bmi >= 40.0){
            return true;
        }

        return false;
    }
}