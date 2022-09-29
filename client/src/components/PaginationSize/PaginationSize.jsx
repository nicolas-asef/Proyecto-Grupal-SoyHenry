
import * as React from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

export default function PaginationSize({workersPerPage, workers, paginado}) {

  
  const pageNumber = [];

  for (let i = 1; i <= Math.ceil(workers/workersPerPage) ; i++) {
      pageNumber.push(i)
      
  }

  return (
    <Stack spacing={2}>
      
      <Pagination count={pageNumber} size="large" onClick={ e => paginado(e.target.value)}/>
    </Stack>
  );
}

