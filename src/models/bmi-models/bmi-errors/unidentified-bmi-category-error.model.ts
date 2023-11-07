export class UnidentifiedBMICategoryError extends Error{
    constructor(message: string){
        super(message);
        this.name = 'UnidentifiedBMICategoryError';
    }
}