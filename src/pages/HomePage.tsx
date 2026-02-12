import { Link } from 'react-router-dom'

export default function HomePage() {
  return (
    <div className="relative isolate">
      {/* Hero Section */}
      <div className="mx-auto max-w-4xl px-6 py-24 sm:py-32 lg:px-8 lg:py-40">
        <div className="text-center elegant-spacing">
          {/* Main Title */}
          <h1 className="font-sans text-hero font-light tracking-wider text-text-primary mb-8 luminous-text animate-luminous-pulse">
            THE THREAD SEERS
          </h1>

          {/* Tagline */}
          <p className="text-xl sm:text-2xl font-serif text-text-body leading-relaxed mb-12 max-w-3xl mx-auto">
            Teen artist Lyra Chen sketches “relationship maps” in the margins of her notebooks until the lines begin
            glowing in the air: luminous threads binding people, places, and secrets.
          </p>

          {/* Call to Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Link
              to="/download"
              className="minimal-button text-lg font-medium bg-transparent border border-accent-silver/30 rounded-sm px-8 py-4 hover:border-accent-silver hover:bg-accent-silver/5 transition-all duration-300"
            >
              Download Book One (Free)
            </Link>

            <Link
              to="/series/book-one/read/prologue"
              className="minimal-button text-lg text-text-secondary hover:text-accent-silver transition-all duration-300"
            >
              Read Online
            </Link>
          </div>

          <div className="mt-6">
            <Link
              to="/series"
              className="minimal-button text-sm text-text-secondary hover:text-accent-silver transition-all duration-300"
            >
              Explore the series →
            </Link>
          </div>
        </div>

        {/* Literary Description */}
        <div className="mt-20 max-w-4xl mx-auto">
          <div className="prose-dark text-center">
            <p className="text-lg leading-relaxed mb-8">
              Recruited to Threadweaver Academy, Lyra learns her gift has a name, and that the institution is failing
              as students collapse with their connections hollowed out by an ashen black-silver contamination.
            </p>
            <p className="text-lg leading-relaxed">
              With her father dying and her mother’s disappearance tied to the Academy’s hidden extraction research,
              Lyra must choose what kind of power she will become: control, or communion.
            </p>
          </div>
        </div>
      </div>

      {/* Subtle background effect */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-accent-silver/5 via-transparent to-transparent rounded-full blur-3xl"></div>
      </div>
    </div>
  )
}
