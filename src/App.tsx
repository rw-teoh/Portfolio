import { Button } from './components/Button'
import { Container } from './components/Container'
import { Navbar } from './components/Navbar'
import { SectionHeading } from './components/SectionHeading'

function App() {
  return (
    <>
      <Navbar />
      <main className="site-shell">
        <Container>
          <section
            className="foundation"
            id="home"
            aria-labelledby="foundation-title"
          >
            <SectionHeading
              id="foundation-title"
              eyebrow="Stage 2"
              title="Foundation and design system"
              description="Neutral surfaces, Solar Amber accents, and reusable layout primitives."
            />
            <div className="foundation-actions">
              <Button>Primary action</Button>
              <Button variant="secondary">Secondary action</Button>
            </div>
          </section>
        </Container>
      </main>
    </>
  )
}

export default App
