import ContentBlock from '@/ContentBlock'
import Content from '../content/validating-output-review'

const ValidatingOutputReview = ({ title }: { title: string }) => (
  <>
    <h1>{title}</h1>
    <ContentBlock>
      <Content />
    </ContentBlock>
  </>
)

export default ValidatingOutputReview
