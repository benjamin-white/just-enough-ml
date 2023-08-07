import { useContext, useEffect, useRef, useState } from 'react'
import { Sequential } from '@tensorflow/tfjs'
import LinearRegressionProvider from './LinearRegressionProvider'
import LinearRegressionContext from './LinearRegressionContext'
import ModelSummary from '@/ModelSummary'
import ScatterPlot from '@/ScatterPlot'
import './LinearRegression.module.css'

const LinearRegression = ({ children }: { children: React.ReactNode }) => (
  <LinearRegressionProvider>{children}</LinearRegressionProvider>
)

const Placeholder = () => (
  <div className="h-[400px] bg-gray-100 flex justify-center items-center rounded">
    Loading...
  </div>
)

const LinearRegressionScatterPlot = () => {
  const { data } = useContext(LinearRegressionContext)

  return data ? (
    <ScatterPlot
      data={{ values: data }}
      labels={{
        x: 'Horsepower',
        y: 'MPG',
      }}
    />
  ) : (
    <Placeholder />
  )
}

const LinearRegressionSummary = () => {
  const { model } = useContext(LinearRegressionContext)
  return <ModelSummary model={model?.model as Sequential} />
}

const LinearRegressionPrediction = () => {
  const { model, data } = useContext(LinearRegressionContext)
  const epochsViewerRef = useRef<HTMLDivElement | null>(null)
  const [shouldRunPrediction, setShouldRunPrediction] = useState(false)
  const [prediction, setPrediction] = useState<{ x: number; y: number }[]>()
  const setRunPredictionTrue = setShouldRunPrediction.bind(null, true)

  useEffect(() => {
    if (!data || !model || !shouldRunPrediction) return

    const runPrediction = async () => {
      model.toTensor(data)
      await model.trainModel(epochsViewerRef.current)
      setPrediction(model.predict())
    }

    void runPrediction()
  }, [data, model, shouldRunPrediction])

  return (
    <>
      <div ref={epochsViewerRef} />
      {prediction && data ? (
        <ScatterPlot
          data={{
            values: [data, prediction],
            series: ['original', 'predicted'],
          }}
          labels={{ x: 'Horsepower', y: 'MPG' }}
        />
      ) : shouldRunPrediction ? (
        <Placeholder />
      ) : (
        <button onClick={setRunPredictionTrue} className="button mb-6">
          Predict
        </button>
      )}
    </>
  )
}

LinearRegression.Summary = LinearRegressionSummary
LinearRegression.ScatterPlot = LinearRegressionScatterPlot
LinearRegression.Prediction = LinearRegressionPrediction

export default LinearRegression
