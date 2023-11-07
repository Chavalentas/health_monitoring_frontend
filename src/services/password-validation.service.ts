export class PasswordValidationService{
    public async isPasswordValid(password: string): Promise<boolean>{
        return new Promise<boolean>((resolve) => {
            if (password === null || password.length === 0){
                resolve(false);
                return;
            }
    
            if (password.length < 8){
                resolve(false);
                return;
            }
    
            // Uppercase
            if (!password.match(/[A-Z]/)){
                resolve(false);
                return;
            }
    
            // Lowercase
            if (!password.match(/[a-z]/)){
                resolve(false);
                return;
            } 
    
            // Numbers
            if (!password.match(/\d/)){
                resolve(false);
                return;
            }
    
            let specialChar: RegExp = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    
            if (!password.match(specialChar)){
                resolve(false);
                return;
            }
    
            resolve(true);
        });
    }

    public async doPasswordsMatch(password: string, repassword: string): Promise<boolean>{
        return new Promise<boolean>((resolve) => {
            resolve(password === repassword);
        });
    }
}