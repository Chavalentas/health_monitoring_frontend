export interface ProfileValidationFormProps{
    onChangedUsername: (username: string) => void;
    onChangedPassword: (password: string) => void;
    onChangedRepassword: (repassword: string) => void; 
    onUpdateProfile: () => void;
    onUpdatePassword: () => void;
    onDeleteProfile: () => void;
    userNameInput: string;
    wrongUsername: boolean;
    wrongPassword: boolean;
    wrongRepassword: boolean;
    errorMessage: string;
    infoMessage: string;
}