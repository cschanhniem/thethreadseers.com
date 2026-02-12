import { useEffect, useMemo, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { ChevronLeft, ChevronRight, Settings } from 'lucide-react'
import ReactMarkdown from 'react-markdown'

type ChapterEntry = {
  slug: string
  fileName: string
}

const chapterFileImporters = import.meta.glob('../../content/03_BOOK_ONE/**/*.md', {
  query: '?raw',
  import: 'default',
}) as Record<string, () => Promise<string>>

const numberedChapters: ChapterEntry[] = Array.from({ length: 36 }, (_, index) => {
  const chapterNumber = index + 1
  return { slug: `chapter-${chapterNumber}`, fileName: `${chapterNumber}.md` }
})

const chapterOrder: ChapterEntry[] = [
  { slug: 'preface', fileName: 'preface.md' },
  { slug: 'prologue', fileName: 'saigon_1943.md' },
  ...numberedChapters,
  { slug: 'epilogue', fileName: 'epilogue.md' },
]

function getChapterIndex(slug: string): number {
  return chapterOrder.findIndex((chapter) => chapter.slug === slug)
}

function getImporterByFileName(fileName: string): (() => Promise<string>) | null {
  const match = Object.entries(chapterFileImporters).find(([path]) =>
    path.endsWith(`/${fileName}`),
  )
  return match?.[1] ?? null
}

function extractTitle(markdown: string): string | null {
  const firstLine = markdown.split('\n', 1)[0]?.trim() ?? ''
  if (!firstLine.startsWith('#')) return null
  return firstLine.replace(/^#+\s+/, '').trim() || null
}

function stripTopHeading(markdown: string): string {
  const lines = markdown.split('\n')

  if (!lines[0]?.trim().startsWith('#')) return markdown

  lines.shift()
  while (lines[0]?.trim() === '') {
    lines.shift()
  }

  return lines.join('\n')
}

export default function ReaderPage() {
  const { bookSlug, chapterSlug } = useParams<{ bookSlug: string; chapterSlug: string }>()
  const [fontSize, setFontSize] = useState(18)
  const [showSettings, setShowSettings] = useState(false)
  const [title, setTitle] = useState('Loading...')
  const [markdown, setMarkdown] = useState<string | null>(null)
  const [loadError, setLoadError] = useState<string | null>(null)

  const effectiveBookSlug = bookSlug ?? 'book-one'
  const effectiveChapterSlug = chapterSlug ?? 'prologue'

  const chapterIndex = useMemo(() => getChapterIndex(effectiveChapterSlug), [effectiveChapterSlug])
  const chapterEntry = chapterIndex >= 0 ? chapterOrder[chapterIndex] : null

  const prevChapterSlug =
    chapterIndex > 0 ? chapterOrder[chapterIndex - 1].slug : null
  const nextChapterSlug =
    chapterIndex >= 0 && chapterIndex < chapterOrder.length - 1
      ? chapterOrder[chapterIndex + 1].slug
      : null

  useEffect(() => {
    let cancelled = false

    async function loadChapter() {
      setLoadError(null)
      setMarkdown(null)

      if (!chapterEntry) {
        setLoadError('Chapter not found.')
        setTitle('Chapter Not Found')
        return
      }

      const importer = getImporterByFileName(chapterEntry.fileName)
      if (!importer) {
        setLoadError('Chapter file missing.')
        setTitle('Chapter Not Found')
        return
      }

      try {
        const raw = await importer()
        if (cancelled) return

        setTitle(extractTitle(raw) ?? chapterEntry.slug)
        setMarkdown(stripTopHeading(raw))
      } catch {
        if (cancelled) return
        setLoadError('Failed to load chapter.')
        setTitle('Chapter Not Found')
      }
    }

    void loadChapter()

    return () => {
      cancelled = true
    }
  }, [chapterEntry])

  if (loadError) {
    return (
      <div className="mx-auto max-w-4xl px-6 py-16 lg:px-8 text-center">
        <h1 className="font-sans text-h1 font-light text-text-primary mb-6">{title}</h1>
        <p className="text-text-secondary font-sans mb-8">{loadError}</p>
        <Link to={`/series/${effectiveBookSlug}`} className="minimal-button text-accent-silver">
          Return to Book
        </Link>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background-primary">
      {/* Reader Header */}
      <div className="sticky top-0 bg-background-primary/95 backdrop-blur-sm border-b border-text-secondary/20 z-10">
        <div className="mx-auto max-w-4xl px-6 py-4 flex items-center justify-between">
          <Link
            to={`/series/${effectiveBookSlug}`}
            className="minimal-button text-text-secondary hover:text-accent-silver transition-all duration-300"
          >
            <ChevronLeft className="w-4 h-4 mr-2" />
            Back to Book
          </Link>

          <h1 className="font-sans text-lg font-medium text-text-primary tracking-wide">
            {title}
          </h1>

          <button
            onClick={() => setShowSettings(!showSettings)}
            className="minimal-button text-text-secondary hover:text-accent-silver transition-all duration-300"
          >
            <Settings className="w-4 h-4" />
          </button>
        </div>

        {/* Settings Panel */}
        {showSettings && (
          <div className="border-t border-text-secondary/20 bg-background-secondary/50">
            <div className="mx-auto max-w-4xl px-6 py-4">
              <div className="flex items-center gap-6">
                <span className="text-sm text-text-secondary font-sans">Font Size:</span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setFontSize(Math.max(14, fontSize - 2))}
                    className="minimal-button text-text-secondary hover:text-accent-silver text-sm px-2 py-1"
                  >
                    A-
                  </button>
                  <span className="text-sm text-text-body w-8 text-center">
                    {fontSize}px
                  </span>
                  <button
                    onClick={() => setFontSize(Math.min(24, fontSize + 2))}
                    className="minimal-button text-text-secondary hover:text-accent-silver text-sm px-2 py-1"
                  >
                    A+
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Chapter Content */}
      <div className="mx-auto max-w-reading px-6 py-12">
        <div className="prose-dark" style={{ fontSize: `${fontSize}px` }}>
          {!markdown ? (
            <p className="text-text-secondary font-sans">Loading chapter...</p>
          ) : (
            <ReactMarkdown
              components={{
                hr: () => (
                  <hr className="my-12 border-0 border-t border-text-secondary/20" />
                ),
                blockquote: ({ children }) => (
                  <blockquote className="border-l border-text-secondary/20 pl-4 italic text-text-secondary">
                    {children}
                  </blockquote>
                ),
              }}
            >
              {markdown}
            </ReactMarkdown>
          )}
        </div>
      </div>

      {/* Chapter Navigation */}
      <div className="border-t border-text-secondary/20 bg-background-secondary/30">
        <div className="mx-auto max-w-4xl px-6 py-8 flex justify-between items-center">
          {prevChapterSlug ? (
            <Link
              to={`/series/${effectiveBookSlug}/read/${prevChapterSlug}`}
              className="minimal-button text-text-body hover:text-accent-silver transition-all duration-300 flex items-center"
            >
              <ChevronLeft className="w-4 h-4 mr-2" />
              Previous Chapter
            </Link>
          ) : (
            <div></div>
          )}

          {nextChapterSlug ? (
            <Link
              to={`/series/${effectiveBookSlug}/read/${nextChapterSlug}`}
              className="minimal-button text-text-body hover:text-accent-silver transition-all duration-300 flex items-center"
            >
              Next Chapter
              <ChevronRight className="w-4 h-4 ml-2" />
            </Link>
          ) : (
            <Link
              to="/download"
              className="minimal-button text-accent-silver border border-accent-silver/30 rounded-sm px-6 py-3 hover:border-accent-silver hover:bg-accent-silver/5 transition-all duration-300"
            >
              Get the Full Book
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}
