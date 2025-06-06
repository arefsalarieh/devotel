// src/component/list-component/TableContainer.tsx

import React from 'react';
import { getListData } from '../../services/list';
import Table from '../table/table';

const TableContainer: React.FC = () => {
  const { data, isLoading, error } = getListData();

  data && console.log(data)

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading data</div>;
  }

  return <Table data={data?.data || []} columns={data?.columns || []} />;
};

export default TableContainer;