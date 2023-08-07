import { useEffect, useRef } from 'react'
import * as tfvis from '@tensorflow/tfjs-vis'
import { ModelSummaryProps } from './types'

const ModelSummary = ({ model }: ModelSummaryProps) => {
  const ref = useRef<HTMLDivElement | null>(null)
  useEffect(() => {
    ref.current && void tfvis.show.modelSummary(ref.current, model)
  }, [model])

  return <div ref={ref} className="mb-10" />
}

export default ModelSummary
