import React, { useEffect, useMemo, useState } from 'react'
import LinearRegressionModel from './lib/linearRegressionModel'
import LinearRegressionContext, {
  LinearRegressionContextType,
} from './LinearRegressionContext'

const LinearRegressionProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const model = useMemo(() => new LinearRegressionModel(), [])
  const [data, setData] = useState<LinearRegressionContextType['data']>()

  useEffect(() => {
    const loadData = async () => {
      const data = await model.getData()
      setData(data)
    }

    try {
      void loadData()
    } catch (error) {
      console.error(error)
    }
  }, [model])

  return (
    <LinearRegressionContext.Provider value={{ model, data }}>
      {children}
    </LinearRegressionContext.Provider>
  )
}

export default LinearRegressionProvider
