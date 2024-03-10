import type { FC } from 'react'

import React from 'react'

import { Chart as ChartJS, Tooltip, Legend, BarElement, CategoryScale, LogarithmicScale, LinearScale } from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(BarElement, Tooltip, Legend, CategoryScale, LogarithmicScale, LinearScale);

type LogBarChartProps = {
  data: Record<string, readonly [color: string, value: number]> // label -> color -> part
  title: string
}

const createCharteJSConfig = (data: Record<string, readonly [color: string, value: number]>, title: string) => ({
  type: 'bar',
  data: {
    labels: [''],
    datasets: Object.entries(data).map(([label, [color, value]], index) => ({
      id: index,
      label,
      data: [value],
      backgroundColor: color
    }))
  },
  options: {
    responsive: false,
    plugins: {
      legend: {
        position: 'top' as const,
      }
    },
    scales: {
      x: {
        display: true,
        stacked: true,
      },
      y: {
        display: true,
        stacked: true,
        // type: 'logarithmic' as const,
        beginAtZero: true,
        max: 100
      }
    }
  },
});

export const LogBarChart: FC<LogBarChartProps> = ({ data, title }) => {
  const config = createCharteJSConfig(data, title)

  return (
    <div style={{marginLeft: '40%'}}>
      <Bar 
        datasetIdKey='id'
        data={config.data}
        options={config.options}
        height={800}
        title={title}
      />
      <span>{title}</span>
    </div>
  )
}