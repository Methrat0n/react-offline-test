import React from 'react'

import { App } from './app'
import { render } from "@testing-library/react";

const example = {
  "data": {
    "from": "2019-08-12T12:30Z",
    "to": "2019-08-12T13:00Z",
    "generationmix": [
      {
        "fuel": "biomass",
        "perc": 4.8
      },
      {
        "fuel": "coal",
        "perc": 2.5
      },
      {
        "fuel": "imports",
        "perc": 8.7
      },
      {
        "fuel": "gas",
        "perc": 46.5
      },
      {
        "fuel": "nuclear",
        "perc": 16.1
      },
      {
        "fuel": "other",
        "perc": 0.3
      },
      {
        "fuel": "hydro",
        "perc": 0.9
      },
      {
        "fuel": "solar",
        "perc": 14.6
      },
      {
        "fuel": "wind",
        "perc": 5.6
      }
    ]
  }
}

describe('App', () => {
  // @ts-expect-error
  global.fetch = jest.fn(() => {});

  it('The api "from" and "to" should be visible but formatted', async () => {
    // @ts-expect-error
    fetch.mockImplementationOnce(() => Promise.resolve({json: () => Promise.resolve(example)}));

    const { findByText } = render(<App />);
    const formattedFrom = new Date(example.data.from).toLocaleTimeString()
    const formattedTo = new Date(example.data.to).toLocaleTimeString()
    await findByText(`Energy mix in the UK from ${formattedFrom} to ${formattedTo}`);
  })
})
