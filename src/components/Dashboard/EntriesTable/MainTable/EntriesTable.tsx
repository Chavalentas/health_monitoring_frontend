import "./EntriesTable.css";
import TableHead from "../TableHead/TableHead";
import TableBody from "../TableBody/TableBody";
import { EntriesTableProps } from "../../../../props/EntriesTable.Props";
import { Entry } from "../../../../models/entry.model";

const EntriesTable = (props: EntriesTableProps) => {
  const columns = [
    { label: "Date of entry", accessor: "dateTime", sortable: true },
    { label: "Height (in cm)", accessor: "height", sortable: true },
    { label: "Weight (in kg)", accessor: "weight", sortable: true },
    { label: "Systolic (in mmHg)", accessor: "sys", sortable: true },
    { label: "Diastolic (in mmHg)", accessor: "dia", sortable: true },
    {label: "", accessor: "update", sortable: false},
    {label: "", accessor: "delete", sortable: false},
    {label: "", accessor: "view", sortable: false}
  ];

  return (
    <div className="card mb-3 entries-card-container">
      <div className="card-body table-responsive">
        {props.tableData.length > 0 ?
        <table className="table">
          <TableHead
            columns={columns}
            handleSorting={(accessor: string, sortOrder: "asc" | "desc") =>
              props.handleSorting(accessor, sortOrder)
            }
          />
          <TableBody onDeleteEntry={(entry: Entry) => props.onDeleteEntry(entry)} 
                     onUpdateEntry={(entry: Entry) => props.onUpdateEntry(entry)}
                     onViewEntry={(entry: Entry) => props.onViewEntry(entry)}
                     columns={columns} 
                     deleteTargetId={props.deleteTargetId}
                     tableData={props.tableData} />
        </table>
        : <h2>No entries!</h2>
        }
      </div>
    </div>
  );
};

export default EntriesTable;
