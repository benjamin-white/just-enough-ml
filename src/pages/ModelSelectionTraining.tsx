import ContentBlock from '@/ContentBlock/ContentBlock'
import Content from '../content/model-selection-training'

const ModelSelectionTraining = ({ title }: { title: string }) => (
  <>
    <h1>{title}</h1>
    <ContentBlock>
      <Content />
    </ContentBlock>
  </>
)

export default ModelSelectionTraining
