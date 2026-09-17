export default function Home() {
  const year = new Date().getFullYear();

  return (
    <>
      <header className="hero">
        <h1>Tyler</h1>
        <p className="subtitle">a junior at UH Manoa studying cognitive science</p>
      </header>

      <main>
        <section className="about">
          <h2>About</h2>
          <p>
            I&apos;m a junior at UH Manoa studying cognitive science, drawn to the
            questions at the intersection of the mind, language, and computation.
            I&apos;m especially interested in how people learn and reason, and how
            that understanding can inform the way we design technology.
            When I&apos;m not in class, I&apos;m usually reading about neuroscience or
            tinkering with small side projects on campus.
          </p>
        </section>

        <section className="this-semester">
          <h2>This semester</h2>
          {/* Placeholders — Tyler will replace these three items with his real ones. */}
          <ul>
            <li>Cognitive Psychology (COGS 320)</li>
            <li>Research assistant in a campus perception lab</li>
            <li>Reading up on computational models of memory</li>
          </ul>
        </section>
      </main>

      <footer className="footer">
        <p>Tyler &copy; {year}</p>
      </footer>
    </>
  );
}
