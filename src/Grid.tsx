import { AgGridReact } from "ag-grid-react";
import { ColDef } from "ag-grid-community";
import data from "./near-earth-asteroids.json";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { useEffect, useRef, useCallback } from "react";

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

interface IData {
  designation: string;
  discovery_date: Date;
  h_mag: number;
  moid_au: number;
  q_au_1: number;
  q_au_2: number;
  period_yr: number;
  i_deg: number;
  pha: string;
  orbit_class: string;
}

const formattingData = (data: any): IData[] => {
  return data.map((e: IData) => ({
    designation: e.designation,
    discovery_date: new Date(e.discovery_date).toLocaleDateString(["en-US"], {
      day: "2-digit",
      month: "long",
      year: "numeric",
    }),
    h_mag: Number(e.h_mag),
    moid_au: Number(e.moid_au),
    q_au_1: Number(e.q_au_1),
    q_au_2: Number(e.q_au_2),
    period_yr: Number(e.period_yr),
    i_deg: Number(e.i_deg),
    pha: e.pha === "Y" ? "Yes" : e.pha === "N" ? "No" : "",
    orbit_class: e.orbit_class,
  }));
};

const dataFormated = formattingData(data);

const NeoGrid = (): JSX.Element => {
  useEffect(() => {
    window.document.title = "Near-Earth Object Overview";
  }, []);

  const gridRef = useRef<AgGridReact>(null);

  const clearFiltersAndSorters = useCallback(() => {
    gridRef.current!.api.setFilterModel(null);
    gridRef.current!.columnApi.applyColumnState({
      defaultState: { sort: null },
    });
  }, []);

  return (
    <div className="ag-theme-alpine" style={{ height: 900, width: 1920 }}>
      <div
        style={{
          display: "grid",
          gap: "15px",
          gridAutoColumns: "auto",
          gridAutoFlow: "column",
          justifyContent: "start",
          alignItems: "center",
        }}
      >
        <h1>Near-Earth Object Overview</h1>
        <button
          style={{
            padding: "8px 16px",
            border: "3px black solid",
            background: "white",
            cursor: "pointer",
          }}
          onClick={clearFiltersAndSorters}
        >
          Clear Filters and Sorters
        </button>
      </div>

      <AgGridReact
        ref={gridRef}
        rowData={dataFormated}
        columnDefs={columnDefs}
        defaultColDef={defaultColDef}
        rowGroupPanelShow={"always"}
      />
    </div>
  );
};

export default NeoGrid;
