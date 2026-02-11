import { Link } from 'react-router-dom'

const books = [
  {
    id: 1,
    slug: 'book-one',
    title: 'The Thread Seers: Book One',
    subtitle: 'Book One of The Thread Seers',
    blurb: 'Teen artist Lyra Chen sketches “relationship maps” in the margins of her notebooks until the lines begin glowing in the air: luminous threads binding people, places, and secrets. Recruited to Threadweaver Academy, Lyra learns her gift has a name, and that the institution is failing as students collapse with their connections hollowed out by an ashen black-silver contamination. With her father dying and her mother’s disappearance tied to the Academy’s hidden extraction research, Lyra must choose what kind of power she will become: control, or communion.',
    available: true,
    freeToRead: true,
    coverImage: '/img/the_thread_seer_book1.jpg',
  },
  {
    id: 2,
    slug: 'book-two',
    title: 'The Weaver\'s Shadow',
    subtitle: 'Book Two of The Thread Seers',
    blurb: 'As Lyra develops her unique tactile communion with the Weave, new threats emerge from the shadows. Ancient thread traditions clash with modern methods, and the Academy faces its greatest challenge yet. The awakening network grows stronger, but so do those who would exploit its power.',
    available: false,
    freeToRead: false,
  },
  {
    id: 3,
    slug: 'book-three',
    title: 'The Convergence Protocol',
    subtitle: 'Book Three of The Thread Seers',
    blurb: 'The thread dimension itself is evolving, developing consciousness beyond human understanding. As global thread phenomena threaten to expose the hidden world, Lyra and her friends must bridge ancient wisdom and modern innovation to prevent catastrophic dimensional collapse.',
    available: false,
    freeToRead: false,
  },
  {
    id: 4,
    slug: 'book-four',
    title: 'The Silver Path',
    subtitle: 'Book Four of The Thread Seers',
    blurb: 'Coming Soon',
    available: false,
    freeToRead: false,
  },
  {
    id: 5,
    slug: 'book-five',
    title: 'The Communion Wars',
    subtitle: 'Book Five of The Thread Seers',
    blurb: 'Coming Soon',
    available: false,
    freeToRead: false,
  },
  {
    id: 6,
    slug: 'book-six',
    title: 'The Dimensional Bridge',
    subtitle: 'Book Six of The Thread Seers',
    blurb: 'Coming Soon',
    available: false,
    freeToRead: false,
  },
  {
    id: 7,
    slug: 'book-seven',
    title: 'The Awakening Network',
    subtitle: 'Book Seven of The Thread Seers',
    blurb: 'Coming Soon',
    available: false,
    freeToRead: false,
  },
]

export default function SeriesPage() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-16 lg:px-8">
      {/* Page Header */}
      <div className="text-center mb-16">
        <h1 className="font-sans text-h1 font-light tracking-wider text-text-primary mb-6 luminous-text">
          The Thread Seers
        </h1>
        <div className="prose-dark">
          <p className="text-xl leading-relaxed max-w-3xl mx-auto">
            A literary fantasy masterpiece that weaves together three millennia of cultural wisdom in a narrative
            that transcends genre boundaries. Following Lyra Chen from age 16 to 18 as she inherits her family's
            ancient ability to perceive the luminous threads connecting all existence, this series honors the
            philosophical traditions of Buddhism, the cultural heritage of Asian diaspora communities, and the
            universal human struggle between control and compassion.
          </p>
        </div>
      </div>

      {/* Books List */}
      <div className="elegant-spacing">
        {books.map((book, index) => (
          <div key={book.id} className="border-b border-text-secondary/20 pb-12 last:border-b-0">
            <div className="flex flex-col lg:flex-row lg:items-start lg:gap-12">
              {/* Book Info */}
              <div className="flex-1">
                <div className="mb-4">
                  <p className="text-caption text-text-secondary font-sans tracking-wide mb-2">
                    {book.subtitle}
                  </p>
                  <h2 className="font-sans text-h2 font-normal text-text-primary mb-4 luminous-text">
                    <Link
                      to={`/series/${book.slug}`}
                      className="hover:text-accent-silver transition-colors duration-300"
                    >
                      {book.title}
                    </Link>
                  </h2>
                </div>

                <div className="prose-dark mb-6">
                  <p>{book.blurb}</p>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4">
                  {book.freeToRead && (
                    <Link
                      to="/download"
                      className="minimal-button text-accent-silver border border-accent-silver/30 rounded-sm px-6 py-3 hover:border-accent-silver hover:bg-accent-silver/5 transition-all duration-300 text-center"
                    >
                      Download Free
                    </Link>
                  )}

                  {book.available ? (
                    <Link
                      to={`/series/${book.slug}`}
                      className="minimal-button text-text-body hover:text-accent-silver transition-all duration-300 text-center"
                    >
                      Details & Downloads
                    </Link>
                  ) : (
                    <span className="minimal-button text-text-secondary cursor-not-allowed text-center">
                      Coming Soon
                    </span>
                  )}
                </div>
              </div>

              {/* Book Cover */}
              <div className="mt-8 lg:mt-0 lg:w-48 lg:flex-shrink-0">
                <div className="aspect-[2/3] rounded-sm border border-text-secondary/20 overflow-hidden">
                  {book.coverImage ? (
                    <img
                      src={book.coverImage}
                      alt={`${book.title} - ${book.subtitle}`}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-text-secondary/20 to-text-secondary/5 flex items-center justify-center">
                      <span className="text-text-secondary text-sm font-sans tracking-wide">
                        Book {index + 1}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Literary Themes */}
      <div className="mt-20">
        <h2 className="font-sans text-h2 font-normal text-text-primary mb-8 text-center luminous-text">
          Literary Themes & Cultural Significance
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="prose-dark">
            <h3 className="font-sans text-h3 font-medium text-text-primary mb-4">
              Philosophical Foundation
            </h3>
            <p>
              Built on the Buddhist concept of dependent origination (pratītyasamutpāda), the series explores
              how all phenomena arise in dependence upon multiple causes and conditions. This philosophical
              framework transforms the magic system from mere fantasy into a profound meditation on
              interconnectedness and the nature of reality itself.
            </p>
          </div>

          <div className="prose-dark">
            <h3 className="font-sans text-h3 font-medium text-text-primary mb-4">
              Cultural Authenticity
            </h3>
            <p>
              From the resistance networks of 1943 Saigon to contemporary Asian American experiences,
              the series demonstrates extraordinary historical research and cultural sensitivity. Each
              thread tradition—Korean, Indian, Chinese, Egyptian, African, Indigenous—is portrayed
              with respect and authenticity, creating a truly multicultural approach to fantasy literature.
            </p>
          </div>

          <div className="prose-dark">
            <h3 className="font-sans text-h3 font-medium text-text-primary mb-4">
              Healing vs. Control
            </h3>
            <p>
              The central conflict between Professor Harlow's extractive approach and Lin Chen's communion
              philosophy reflects broader themes about how we relate to power, nature, and each other.
              The series advocates for healing over control, connection over dominance, and love over fear.
            </p>
          </div>

          <div className="prose-dark">
            <h3 className="font-sans text-h3 font-medium text-text-primary mb-4">
              Intergenerational Wisdom
            </h3>
            <p>
              Through Lyra's connection to her great-great-grandmother Mei-Hua and her grandmother Nai Nai,
              the series explores how wisdom passes through generations, how cultural knowledge survives
              trauma and displacement, and how young people can honor their heritage while forging new paths.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
