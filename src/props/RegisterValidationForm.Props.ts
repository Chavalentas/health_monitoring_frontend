export interface RegisterValidationFormProps{
    onSubmit: () => void;
    onChangedUsername: (username: string) => void;
    onChangedPassword: (password: string) => void;
    onChangedRepassword: (repassword: string) => void; 
    wrongUsername: boolean;
    wrongPassword: boolean;
    wrongRepassword: boolean;
    errorMessage: string;
    infoMessage: string;
    informationText: string;
    linkUrl: string;
    linkText: string;
}