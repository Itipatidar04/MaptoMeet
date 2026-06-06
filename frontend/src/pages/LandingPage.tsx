function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <header className="flex items-center justify-between px-6 py-5 sm:px-10">
        <span className="text-lg font-bold tracking-tight text-text-primary">
          MapToMeet
        </span>
      </header>

      <main className="flex flex-1 flex-col items-center justify-center px-6 pb-24 text-center">
        <h1 className="max-w-xl text-4xl font-bold tracking-tight text-text-primary sm:text-5xl">
          Find the perfect place to meet
        </h1>
        <p className="mt-4 max-w-md text-base text-text-secondary sm:text-lg">
          Plan routes, discover midpoints, and meet up smarter.
        </p>

        <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:gap-4">
          <button
            type="button"
            className="min-w-[140px] rounded-button border border-border bg-transparent px-8 py-3 text-sm font-medium text-text-primary transition-colors duration-200 hover:bg-surface"
          >
            Log in
          </button>
          <button
            type="button"
            className="min-w-[140px] rounded-button bg-primary px-8 py-3 text-sm font-medium text-text-primary transition-opacity duration-200 hover:opacity-90"
          >
            Sign up
          </button>
        </div>
      </main>
    </div>
  );
}

export default LandingPage;
