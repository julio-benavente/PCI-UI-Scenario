import { AgGridReact } from "ag-grid-react";
import { ColDef } from "ag-grid-community";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { useEffect } from "react";
import Header from "../header";
import data from "./gridData";
import useGridApi from "./useGridApi";

const defaultColDef = {
  sortable: true,
  // filter: true,
};

const columnDefs: ColDef[] = [
  { field: "designation", headerName: "Designation", filter: true },
  {
    field: "discovery_date",
    headerName: "Discovery Date",
    filter: false,
  },
  { field: "h_mag", headerName: "H (mag)", filter: "agNumberColumnFilter" },
  { field: "moid_au", headerName: "MOID (au)", filter: "agNumberColumnFilter" },
  { field: "q_au_1", headerName: "q (au)", filter: "agNumberColumnFilter" },
  { field: "q_au_2", headerName: "Q (au)", filter: "agNumberColumnFilter" },
  {
    field: "period_yr",
    headerName: "Period (yr)",
    filter: "agNumberColumnFilter",
  },
  {
    field: "i_deg",
    headerName: "Inclination (deg)",
    filter: "agNumberColumnFilter",
  },
  { field: "pha", headerName: "Potentially Hazardous", filter: true },
  {
    field: "orbit_class",
    headerName: "Orbit Class",
    enableRowGroup: true,
    filter: true,
  },
];

const NeoGrid = (): JSX.Element => {
  useEffect(() => {
    window.document.title = "Near-Earth Object Overview";
  }, []);

  const { ref: gridRef, api } = useGridApi();

  return (
    <div className="ag-theme-alpine" style={{ height: 900, width: 1920 }}>
      <Header gridApi={api} />
      <AgGridReact
        ref={gridRef}
        rowData={data}
        columnDefs={columnDefs}
        defaultColDef={defaultColDef}
        rowGroupPanelShow={"always"}
      />
    </div>
  );
};

export default NeoGrid;
