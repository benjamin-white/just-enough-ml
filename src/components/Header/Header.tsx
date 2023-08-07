import { Link } from 'react-router-dom'
import { HeaderProps } from './types'

const Header = ({ title }: HeaderProps) => (
  <div className="container">
    <div className="py-4 mb-12 border-b">
      <Link
        to="/"
        className="no-underline hover:text-accent transition-colors duration-300"
      >
        {title}
      </Link>
    </div>
  </div>
)

export default Header
