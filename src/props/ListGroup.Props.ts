export interface ListGroupProps{
    items: string[];
    heading: string;
    onSelectedItem: (item: string) => void;
}