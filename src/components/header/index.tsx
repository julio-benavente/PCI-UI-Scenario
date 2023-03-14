interface IHeader {
  gridApi: any;
}

const Header = ({ gridApi }: IHeader) => {
  return (
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
        onClick={gridApi?.clearFiltersAndSorters}
      >
        Clear Filters and Sorters
      </button>
    </div>
  );
};

export default Header;
