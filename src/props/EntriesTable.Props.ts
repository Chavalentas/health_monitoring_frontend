import { Entry } from "../models/entry.model";

export interface EntriesTableProps{
    tableData: Array<Entry>;
    onUpdateEntry: (entry: Entry) => void;
    onDeleteEntry: (entry: Entry) => void;
    onViewEntry: (entry: Entry) => void;
    handleSorting: (sortField: string, sortOrder: "asc" | "desc") => void;
    deleteTargetId: string;
}