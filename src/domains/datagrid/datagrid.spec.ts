
import type { Arbitrary } from 'fast-check';

import * as fc from 'fast-check';
import { DataGrid, sources } from './datagrid.model';
import { fetchDatagrid } from './datagrid.client';

const source = fc.constantFrom(...sources)

const dateString = (): Arbitrary<string> => fc.integer().map(num => new Date(num).toISOString())
const mix = (): Arbitrary<ReadonlyArray<{fuel: string,perc: number}>> => fc.array(fc.record({
  fuel: source,
  perc: fc.integer()
}))

const notADate = (): Arbitrary<string> => fc.string().filter(s => Number.isNaN(Date.parse(s)))
const mixWithUnknownFuel = (): Arbitrary<ReadonlyArray<{fuel: string,perc: number}>> => fc.array(fc.record({
  fuel: fc.string().filter(s => !sources.includes(s as never)),
  perc: fc.integer()
}), { minLength: 1})

describe('Datagrid constructor', () => {
  it('Should build a Datagrid from valid inputs', () => {
    fc.assert(fc.property(dateString(), dateString(), mix(), (from, to, mix) => {
      return DataGrid(from, to, mix) !== undefined
    }))
  })
  it('should return undefined if "from" parameter is not a date iso string', () => {
    fc.assert(fc.property(notADate(), dateString(), mix(), (from, to, mix) => {
      return DataGrid(from, to, mix) === undefined
    }))
  })
  it('should return undefined if "to" parameter is not a date iso string', () => {
    fc.assert(fc.property(dateString(), notADate(), mix(), (from, to, mix) => {
      return DataGrid(from, to, mix) === undefined
    }))
  })
  it('should return undefined if "to" parameter is not a date iso string', () => {
    fc.assert(fc.property(dateString(), dateString(), mixWithUnknownFuel(), (from, to, mix) => {
      return DataGrid(from, to, mix) === undefined
    }))
  })
});

describe('Datagrid client fetchDatagrid', () => {
  // @ts-expect-error
  global.fetch = jest.fn(() => {});

  it('If the API answer with garbage we should know', async () => {
    // @ts-expect-error
    fetch.mockImplementationOnce(() => Promise.resolve({json: () => Promise.resolve({})}));

    await expect(fetchDatagrid()).rejects.toThrow(new Error('Unparseable response'))
  })
  it('If the API answer with garbage data we should know', async () => {
    // @ts-expect-error
    fetch.mockImplementationOnce(() => Promise.resolve({json: () => Promise.resolve({data: {}})}));

    await expect(fetchDatagrid()).rejects.toThrow(new Error(`Unparseable data ${JSON.stringify({}, null, 2)}`))
  })
})

// hooks will be a proxy for the client, no test needed
