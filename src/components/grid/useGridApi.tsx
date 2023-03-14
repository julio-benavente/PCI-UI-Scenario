import { useState, useRef, useCallback, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";

const useGridApi = () => {
  const ref = useRef<AgGridReact>(null);
  const [api, setApi] = useState<any>(null);

  const clearFiltersAndSorters = useCallback(() => {
    ref.current!.api.setFilterModel(null);
    ref.current!.columnApi.applyColumnState({
      defaultState: { sort: null },
    });
  }, []);

  useEffect(() => {
    if (ref) {
      setApi({
        ...ref.current!.api,
        ...ref.current!.columnApi,
        clearFiltersAndSorters,
      });
    }
  }, [ref.current]);

  return { ref, api };
};

export default useGridApi;
