import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import HomePage from './pages/HomePage'
import DownloadsPage from './pages/DownloadsPage'
import SeriesPage from './pages/SeriesPage'
import BookPage from './pages/BookPage'
import ReaderPage from './pages/ReaderPage'
import WorldPage from './pages/WorldPage'
import AuthorPage from './pages/AuthorPage'
import NewsPage from './pages/NewsPage'
import NewsPostPage from './pages/NewsPostPage'

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/download" element={<DownloadsPage />} />
        <Route path="/series" element={<SeriesPage />} />
        <Route path="/series/:bookSlug" element={<BookPage />} />
        <Route path="/series/:bookSlug/read/:chapterSlug" element={<ReaderPage />} />
        <Route path="/world" element={<WorldPage />} />
        <Route path="/author" element={<AuthorPage />} />
        <Route path="/news" element={<NewsPage />} />
        <Route path="/news/:postSlug" element={<NewsPostPage />} />
      </Routes>
    </Layout>
  )
}

export default App
