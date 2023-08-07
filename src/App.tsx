import Layout from '@/Layout'
import { Route, Routes } from 'react-router-dom'
import routes from './pages/routes'

const App = () => (
  <Routes>
    <Route path="/" element={<Layout />}>
      {routes.map(({ path, slug, title, Element }) => (
        <Route path={path} element={<Element title={title} />} key={slug} />
      ))}
    </Route>
  </Routes>
)

export default App
