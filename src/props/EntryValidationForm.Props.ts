export interface EntryValidationFormProps{
    entryValidationTitle: string;
    isAddBMIWish: boolean;
    isAddBloodPressureWish: boolean;
    inputHeight: number;
    inputWeight: number;
    inputSys: number;
    inputDia: number;
    infoMessage: string;
    errorMessage: string;
    buttonEnabled: boolean;
    onAddBMIEntryClick: () => void;
    addBMIEntryTitle: string;
    onRemoveBMIEntryClick: () => void;
    removeBMIEntryTitle: string;
    onAddBloodPressureEntryClick: () => void;
    addBloodPressureEntryTitle: string;
    onRemoveBloodPressureEntryClick: () => void;
    removeBloodPressureEntryTitle: string;
    onChangedHeight: (value: string) => void;
    onChangedWeight: (value: string) => void;
    onChangedSys: (value: string) => void;
    onChangedDia: (value: string) => void;
    onSubmit: () => void;
    updateTargetId: string;
}