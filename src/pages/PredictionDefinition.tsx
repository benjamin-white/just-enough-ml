import Content from '../content/prediction-definition'
import ContentBlock from '@/ContentBlock'

const PredictionDefinition = ({ title }: { title: string }) => (
  <>
    <h1>{title}</h1>
    <ContentBlock>
      <Content />
    </ContentBlock>
  </>
)

export default PredictionDefinition
