import { LabelAccessor } from "../models/table-models/label-accessor.model";

export interface TableHeadProps{
    columns: Array<LabelAccessor>;
    handleSorting: (accessor: string, sortOrder: "asc" | "desc") => void;
}