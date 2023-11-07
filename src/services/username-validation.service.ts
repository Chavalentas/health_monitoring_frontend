export class UsernameValidationService{
    public async isUsernameValid(username: string): Promise<boolean>{
        return new Promise<boolean>((resolve) => {
            if (username === null || username.length === 0){
                resolve(false);
                return;
            }

            resolve(true);
        });
    }
}