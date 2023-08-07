import { Link } from 'react-router-dom'
import { select } from 'radash'
import ContentBlock from '@/ContentBlock'
import { Intro } from '../content/home'
import routes from './routes'

const Home = () => (
  <>
    <ContentBlock>
      <Intro />
    </ContentBlock>
    <ul>
      {select(
        routes,
        ({ path, slug, title, description }) => (
          <li>
            <Link
              to={path}
              key={slug}
              className="no-underline hover:text-accent transition-colors duration-300"
            >
              <p className="mb-0 underline font-bold">{title}</p>
              <p className="mb-3 italic ">{description}</p>
            </Link>
          </li>
        ),
        ({ title }) => title !== 'Home',
      )}
    </ul>
  </>
)

export default Home
