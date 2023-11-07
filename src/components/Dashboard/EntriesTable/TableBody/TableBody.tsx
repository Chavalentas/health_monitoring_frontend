import { TableBodyProps } from "../../../../props/TableBody.Props";
import { Entry } from "../../../../models/entry.model";

const TableBody = (props: TableBodyProps) => {

    return (
        <tbody>
         {props.tableData.map((data: Entry) => {
          return (
           <tr key={data.id}>
            {props.columns.map(({ accessor }) => {
                if (accessor === 'update'){
                    return <th key={accessor}>
                    <button                   
                    data-bs-toggle="modal"
                    className="btn btn-primary" 
                    onClick={() => props.onUpdateEntry(data)}>
                    Update
                  </button>
                  </th>
                }

                if (accessor === 'delete'){
                    return <th key={accessor}>
                      <button 
                      className="btn btn-primary" 
                      data-bs-toggle="modal"
                      data-bs-target={props.deleteTargetId}
                      onClick={() => props.onDeleteEntry(data)}>
                    Delete
                  </button></th>        
                }

                if (accessor === 'view'){
                  return <th key={accessor}>
                    <button 
                    className="btn btn-primary" 
                    data-bs-toggle="modal"
                    onClick={() => props.onViewEntry(data)}>
                  View
                </button></th>        
              }

             let dataJson = JSON.parse(JSON.stringify(data));
             let rowData = dataJson[accessor] ? dataJson[accessor] : "——";

             if (accessor === 'dateTime'){
                let date = new Date(Date.parse(rowData));
                rowData = date.toLocaleString();
             }

             return <td key={accessor}>{rowData}</td>;
            })}
           </tr>
          );
         })}
        </tbody>
       );
};

export default TableBody;