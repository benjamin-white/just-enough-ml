import { ContentBlockProps } from './types'
import styles from './ContentBlock.module.css'

const ContentBlock = ({ children }: ContentBlockProps) => (
  <div className={styles.ContentBlock}>{children}</div>
)

export default ContentBlock
