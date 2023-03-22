import React from 'react';
import { DataGrid, GridColDef, GridRowsProp } from '@mui/x-data-grid';

type Props = {
  rows: GridRowsProp;
  columns: GridColDef[];
  height?: string;
};

function Table({ rows, columns, height }: Props) {
  return (
    <div style={{ height, width: '100%' }} className="p-4 ">
      <DataGrid
        className="bg-gray-400 opacity-70"
        sx={{
          boxShadow: 2,
          border: 2,
          borderColor: 'primary.light',
          '& .MuiDataGrid-cell:hover': {
            color: 'primary.main',
          },
        }}
        rows={rows}
        columns={columns}
      />
    </div>
  );
}

// default values
Table.defaultProps = {
  height: '90vh',
};

export default Table;
