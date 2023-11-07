export interface Entry{
    id: string;
    userId: string;
    dateTime: Date | number | string;
    height: number | null;
    weight: number | null;
    sys: number | null;
    dia: number | null;
}