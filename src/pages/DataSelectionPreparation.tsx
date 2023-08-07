import ContentBlock from '@/ContentBlock'
import Content from '../content/data-selection-preparation'

const DataSelectionPreparation = ({ title }: { title: string }) => (
  <>
    <h1>{title}</h1>
    <ContentBlock>
      <Content />
    </ContentBlock>
  </>
)

export default DataSelectionPreparation
