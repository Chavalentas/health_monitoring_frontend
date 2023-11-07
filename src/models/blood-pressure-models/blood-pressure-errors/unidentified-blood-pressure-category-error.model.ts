export class UnidentifiedBloodPressureCategoryError extends Error{
    constructor(message: string){
        super(message);
        this.name = 'UnidentifiedBloodPressureCategoryError';
    }
}