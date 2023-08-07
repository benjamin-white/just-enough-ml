import React from 'react'
import type LinearRegressionModel from './lib/linearRegressionModel'

export type LinearRegressionContextType = {
  model?: LinearRegressionModel
  data?: {
    x: number
    y: number
  }[]
}

const LinearRegressionContext =
  React.createContext<LinearRegressionContextType>({})

export default LinearRegressionContext
