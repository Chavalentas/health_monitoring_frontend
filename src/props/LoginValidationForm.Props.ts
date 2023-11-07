export interface LoginValidationFormProps{
    onSubmit: () => void;
    onChangedUsername: (username: string) => void;
    onChangedPassword: (password: string) => void;
    wrongUsername: boolean;
    wrongPassword: boolean;
    errorMessage: string;
    infoMessage: string;
    informationText: string;
    linkUrl: string;
    linkText: string;
}