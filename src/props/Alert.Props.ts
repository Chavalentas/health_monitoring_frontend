import { ReactNode } from "react";

export interface AlertProps{
    children: ReactNode;
    onClose: () => void;
}