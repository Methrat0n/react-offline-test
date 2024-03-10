
import type { DataGrid } from "./datagrid.model"

import useSWR from "swr"

import { fetchDatagrid } from './datagrid.client'

type UseDataGrid = {
  dataGrid?: DataGrid,
  isLoading: boolean,
  error: any
}

export const useDataGrid = (): UseDataGrid => {
  const { data, error, isLoading } = useSWR('dataGrid', fetchDatagrid)
 
  return {
    dataGrid: data,
    isLoading,
    error
  }
}