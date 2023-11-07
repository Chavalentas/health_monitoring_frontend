import { Entry } from "../models/entry.model";
import { LabelAccessor } from "../models/table-models/label-accessor.model";

export interface TableBodyProps{
    columns: Array<LabelAccessor>;
    tableData: Array<Entry>;
    onUpdateEntry: (entry: Entry) => void;
    onDeleteEntry: (entry: Entry) => void;
    onViewEntry: (entry: Entry) => void;
    deleteTargetId: string;
}