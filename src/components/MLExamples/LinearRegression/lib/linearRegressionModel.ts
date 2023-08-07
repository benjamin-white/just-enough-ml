import * as tf from '@tensorflow/tfjs'
import * as tfvis from '@tensorflow/tfjs-vis'
import { LinearRegressionContextType } from '../LinearRegressionContext'

type ResponseData = {
  Miles_per_Gallon: number
  Horsepower: number
}[]

class LinearRegressionModel {
  model?: tf.Sequential
  tensor?: {
    inputs: tf.Tensor<tf.Rank>
    labels: tf.Tensor<tf.Rank>
    inputMax: tf.Tensor<tf.Rank>
    inputMin: tf.Tensor<tf.Rank>
    labelMax: tf.Tensor<tf.Rank>
    labelMin: tf.Tensor<tf.Rank>
  }

  constructor() {
    this.createModel()
  }

  async fetchData<T>() {
    const response = await fetch(
      'https://storage.googleapis.com/tfjs-tutorials/carsData.json',
    )
    return (await response.json()) as T
  }

  async getData() {
    const dataResponse = await this.fetchData<ResponseData>()
    return dataResponse
      .map((entry) => ({
        x: entry.Miles_per_Gallon,
        y: entry.Horsepower,
      }))
      .filter((entry) => entry.x != null && entry.y != null)
  }

  createModel() {
    this.model = tf.sequential()
    this.model.add(
      tf.layers.dense({ inputShape: [1], units: 1, useBias: true }),
    )
    this.model.add(tf.layers.dense({ units: 1, useBias: true }))
  }

  async trainModel(epochsRenderTarget?: HTMLDivElement | null) {
    if (!this.model || !this.tensor) {
      throw new Error(
        '`LinearRegressionModel::trainModel` called before `model` and `tensor` set',
      )
    }

    const batchSize = 32
    const epochs = 50

    this.model.compile({
      optimizer: tf.train.adam(),
      loss: tf.losses.meanSquaredError,
      metrics: ['mse'],
    })

    await this.model.fit(this.tensor.inputs, this.tensor.labels, {
      batchSize,
      epochs,
      shuffle: true,
      ...(epochsRenderTarget
        ? {
            callbacks: tfvis.show.fitCallbacks(
              epochsRenderTarget,
              ['loss', 'mse'],
              {
                height: 200,
                callbacks: ['onEpochEnd'],
              },
            ),
          }
        : {}),
    })
  }

  predict() {
    const [xs, predictions] = tf.tidy(() => {
      if (!this.model || !this.tensor) {
        throw new Error(
          '`LinearRegressionModel::predict` called before `model` and `tensor` set',
        )
      }

      const xs = tf.linspace(0, 1, 100)
      const normalisedPredictions = this.model.predict(
        xs.reshape([100, 1]),
      ) as tf.Tensor<tf.Rank>

      const unNormalisedXs = xs
        .mul(this.tensor.inputMax.sub(this.tensor.inputMin))
        .add(this.tensor.inputMin)
        .dataSync()

      const unNormalisedPredictions = normalisedPredictions
        .mul(this.tensor.labelMax.sub(this.tensor.labelMin))
        .add(this.tensor.labelMin)
        .dataSync()

      return [unNormalisedXs, unNormalisedPredictions]
    })

    const predictedPoints = Array.from(xs).map((value, index) => {
      return { x: value, y: predictions[index] }
    })

    return predictedPoints
  }

  toTensor(data: LinearRegressionContextType['data']) {
    if (this.tensor) return
    if (!data) return
    // Wrapping these calculations in a tidy will dispose any
    // intermediate tensors.
    this.tensor = tf.tidy(() => {
      tf.util.shuffle(data)

      const inputTensor = tf.tensor2d(
        data.map((entry) => entry.x),
        [data.length, 1],
      )
      const labelTensor = tf.tensor2d(
        data.map((entry) => entry.y),
        [data.length, 1],
      )

      const inputMin = inputTensor.min()
      const inputMax = inputTensor.max()
      const labelMin = labelTensor.min()
      const labelMax = labelTensor.max()

      const normalizedInputs = inputTensor
        .sub(inputMin)
        .div(inputMax.sub(inputMin))

      const normalizedLabels = labelTensor
        .sub(labelMin)
        .div(labelMax.sub(labelMin))

      return {
        inputs: normalizedInputs,
        labels: normalizedLabels,
        inputMax,
        inputMin,
        labelMax,
        labelMin,
      }
    })
  }
}

export default LinearRegressionModel
