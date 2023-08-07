type Point = { x: number; y: number }

export type ScatterPlotProps = {
  data: {
    values: Point[] | Point[][]
    series?: string[]
  }
  labels: { x: string; y: string }
}
