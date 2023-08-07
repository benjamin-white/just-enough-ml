import { useEffect, useRef } from 'react'
import * as tfvis from '@tensorflow/tfjs-vis'
import { ScatterPlotProps } from './types'

const ScatterPlot = ({ data, labels }: ScatterPlotProps) => {
  const ref = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (!ref.current) return
    void tfvis.render.scatterplot(ref.current, data, {
      xLabel: labels.x,
      yLabel: labels.y,
      height: 400,
    })
  }, [data, labels.x, labels.y])

  return <div ref={ref} className="mb-10" />
}

export default ScatterPlot
