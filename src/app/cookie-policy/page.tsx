export default function CookiePolicyPage() {
  return (
    <main style={{ padding: '4rem 2rem', maxWidth: '980px', margin: '0 auto' }}>
      <section>
        <p
          style={{
            color: '#8e0101',
            fontWeight: 700,
            marginBottom: '1rem',
            textTransform: 'uppercase',
            letterSpacing: '0.14em',
          }}
        >
          Cookie Policy
        </p>
        <h1
          style={{ fontSize: 'clamp(2rem, 3vw, 3rem)', marginBottom: '1.5rem', color: '#111827' }}
        >
          How we use cookies
        </h1>
        <p style={{ color: '#475569', lineHeight: 1.8, marginBottom: '1rem' }}>
          We use cookies to improve your experience on our website, to personalize content, to
          provide social media features, and to analyze our traffic. By accepting cookies, you help
          us make the site faster and better.
        </p>
        <p style={{ color: '#475569', lineHeight: 1.8 }}>
          Essential cookies are always active and are required for the site to function. Analytics
          cookies are optional and help us understand how our visitors use the website so we can
          improve performance and content.
        </p>
      </section>
    </main>
  );
}
