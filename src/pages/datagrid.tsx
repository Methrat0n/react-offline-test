import type { FC } from 'react'

import React from 'react'

import { useDataGrid } from '../domains/datagrid/datagrid.hook'
import { LogBarChart } from '../ui/LogBarChart'

const colors = [
  '#4dc9f6',
  '#f67019',
  '#f53794',
  '#537bc4',
  '#acc236',
  '#166a8f',
  '#00a950',
  '#58595b',
  '#8549ba'
]

export const DataGridPage: FC = () => {
  const { dataGrid, isLoading, error } = useDataGrid()

  if(error)
    console.error(error)

  // TODO design loader or hydrate it
  if(isLoading || !dataGrid)
    return null

  const title = `Energy mix in the UK from ${dataGrid.from.toLocaleTimeString()} to ${dataGrid.to.toLocaleTimeString()}`
  const data = Object.fromEntries(dataGrid.mix.map((energy, index) => [energy.source, [colors[index % colors.length], energy.part]] as const))

  return <LogBarChart data={data} title={title} />
}
