import type { List } from 'ts-toolbelt'

export const sources = ["biomass", "coal", "imports", "gas", "nuclear", "hydro", "solar", "wind", "other"] as const
export type Source = List.UnionOf<typeof sources>

type Percent = number

export interface Energy {
  source: Source
  part: Percent
}

export interface DataGrid {
  from: Date
  to: Date
  mix: ReadonlyArray<Energy>
}

export const DataGrid = (
  from: string,
  to: string,
  mix: ReadonlyArray<{fuel: string,perc: number}>
): DataGrid | undefined => {
  const dataGridFrom = Date.parse(from)
  if(Number.isNaN(dataGridFrom))
    return undefined;

  const dataGridTo = Date.parse(to)
  if(Number.isNaN(dataGridTo))
    return undefined;

  const dataGridMix = mix
    .filter((obj): obj is {fuel: Source, perc: number} => sources.includes(obj.fuel as never))
    .map(obj => ({
      source: obj.fuel,
      part: obj.perc
    }));
  
  if(dataGridMix.length !== mix.length)
    return undefined;

  return {
    from: new Date(dataGridFrom),
    to: new Date(dataGridTo),
    mix: dataGridMix
  }
}