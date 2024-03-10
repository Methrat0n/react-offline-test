import { DataGrid } from './datagrid.model'

import config from '../../config'

export const fetchDatagrid = async (): Promise<DataGrid> => {
  const response = await fetch(config.datagrid.url(), {
    keepalive: true
  })

  const json = await response.json()
  if(!json.data)
    throw new Error('Unparseable response')

  const data = json.data

  // checking type at runtime, avoid compile time check entirely because of it
  if(
    typeof data === "object" &&
    'from' in data && typeof data.from === "string" &&
    'to' in data && typeof data.to === "string" &&
    'generationmix' in data && Array.isArray(data.generationmix) &&
    data.generationmix.every((mix: any) => 
      "fuel" in mix && typeof mix.fuel === "string" &&
      "perc" in mix && typeof mix.perc === 'number'
    )
  ) {
    const maybeDatagrid = DataGrid(
      data.from,
      data.to,
      data.generationmix
    )
    if(!maybeDatagrid) {
      throw new Error('Unparseable DataGrid')
    }
    return maybeDatagrid
  } else {
    throw new Error(`Unparseable data ${JSON.stringify(data, null, 2)}`)
  }

 }