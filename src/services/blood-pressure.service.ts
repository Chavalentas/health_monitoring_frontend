import { UnidentifiedBloodPressureCategoryError } from "../models/blood-pressure-models/blood-pressure-errors/unidentified-blood-pressure-category-error.model";
import { BloodPressureCategory } from "../models/blood-pressure-models/bp-abstract-category.model";
import { GradeIHypertension } from "../models/blood-pressure-models/grade-i-hypertension-category.model";
import { GradeIIHypertension } from "../models/blood-pressure-models/grade-ii-hypertension-category.model";
import { GradeIIIHypertension } from "../models/blood-pressure-models/grade-iii-hypertension-category.model";
import { HighNormalBloodPressure } from "../models/blood-pressure-models/high-normal-category.model";
import { IsolatedSystolicHypertension } from "../models/blood-pressure-models/isolated-systolic-hypertension-category.model";
import { NormalBloodPressure } from "../models/blood-pressure-models/normal-category.model";
import { OptimalBloodPressure } from "../models/blood-pressure-models/optimal-category.model";

export class BloodPressureService{
    public getBloodPressure(sys: number, dia: number): BloodPressureCategory{
        if (sys <= 0){
            throw new RangeError('The sys has to be greater than 0!')
        }

        if (dia <= 0){
            throw new RangeError('The dia has to be greater than 0!')
        }

        if (sys < 120 && dia < 80){
            return new OptimalBloodPressure();
        }

        if ((sys >= 120 && sys < 130) && (dia >= 80 && dia < 85)){
            return new NormalBloodPressure();
        }

        if ((sys >= 130 && sys < 140) && (dia >= 85 && dia < 90)){
            return new HighNormalBloodPressure();
        }

        if ((sys >= 140 && sys < 160) && (dia >= 90 && dia < 100)){
            return new GradeIHypertension();
        }

        if ((sys >= 160 && sys < 180) && (dia >= 100 && dia < 110)){
            return new GradeIIHypertension();
        }

        if (sys >= 140 && dia < 90){
            return new IsolatedSystolicHypertension();
        }

        throw new UnidentifiedBloodPressureCategoryError('The blood pressure category could not be specified!');
    }

    public getSysBloodPressure(sys: number): BloodPressureCategory{
        if (sys <= 0){
            throw new RangeError('The sys has to be greater than 0!')
        }

        if (sys < 120){
            return new OptimalBloodPressure();
        }

        if (sys >= 120 && sys < 130){
            return new NormalBloodPressure();
        }

        if (sys >= 130 && sys < 140){
            return new HighNormalBloodPressure();
        }

        if (sys >= 140 && sys < 160){
            return new GradeIHypertension();
        }

        if (sys >= 160 && sys < 180){
            return new GradeIIHypertension();
        }

        if (sys >= 180){
            return new GradeIIIHypertension();
        }

        throw new UnidentifiedBloodPressureCategoryError('The blood pressure category could not be specified!');
    }

    public getDiaBloodPressure(dia: number): BloodPressureCategory{
        if (dia <= 0){
            throw new RangeError('The dia has to be greater than 0!')
        }

        if (dia < 80){
            return new OptimalBloodPressure();
        }

        if (dia >= 80 && dia < 85){
            return new NormalBloodPressure();
        }

        if (dia >= 85 && dia < 90){
            return new HighNormalBloodPressure();
        }

        if (dia >= 90 && dia < 100){
            return new GradeIHypertension();
        }

        if (dia >= 100 && dia < 110){
            return new GradeIIHypertension();
        }

        if (dia >= 110){
            return new GradeIIIHypertension();
        }

        throw new UnidentifiedBloodPressureCategoryError('The blood pressure category could not be specified!');
    }

    public isValidBloodPressure(sys: number, dia: number): boolean{
        if (sys <= 0){
            return false;
        }

        if (dia <= 0){
            return false;
        }

        if (sys < 120 && dia < 80){
            return true;
        }

        if ((sys >= 120 && sys < 130) && (dia >= 80 && dia < 85)){
            return true;
        }

        if ((sys >= 130 && sys < 140) && (dia >= 85 && dia < 90)){
            return true;
        }

        if ((sys >= 140 && sys < 160) && (dia >= 90 && dia < 100)){
            return true;
        }

        if ((sys >= 160 && sys < 180) && (dia >= 100 && dia < 110)){
            return true;
        }

        if (sys >= 140 && dia < 90){
            return true;
        }

        return false;
    }

    public isValidSysBloodPressure(sys: number): boolean{
        if (sys <= 0){
            return false;
        }

        if (sys < 120){
            return true;
        }

        if (sys >= 120 && sys < 130){
            return true;
        }

        if (sys >= 130 && sys < 140){
            return true;
        }

        if (sys >= 140 && sys < 160){
            return true;
        }

        if (sys >= 160 && sys < 180){
            return true;
        }

        if (sys >= 180){
            return true;
        }

        return false;
    }

    public isValidDiaBloodPressure(dia: number): boolean{
        if (dia <= 0){
            return false;
        }

        if (dia < 80){
            return true;
        }

        if (dia >= 80 && dia < 85){
            return true;
        }

        if (dia >= 85 && dia < 90){
            return true;
        }

        if (dia >= 90 && dia < 100){
            return true;
        }

        if (dia >= 100 && dia < 110){
            return true;
        }

        if (dia >= 110){
            return true;
        }

        return false;
    }
}