'use client';

import Link from 'next/link';

export default function AboutUsPage() {
  // heroContentRef removed (not used)

  return (
    <>
      <section className="social-media-section" style={{ padding: '40px 24px' }}>
        <div className="social-media-container">
          <div className="social-media-row">
            <div className="social-media-content">
              <h2>About CXO Capital</h2>

              <p className="social-media-highlight">
                <strong>CXO Capital</strong> is a premier B2B platform dedicated to connecting
                technology leaders, business executives, and solution providers through meaningful
                engagement, trusted relationships, and strategic collaboration. We bring together
                CIOs, CTOs, CISOs, CDOs, IT decision-makers, innovators, and enterprise leaders to
                exchange ideas, address emerging challenges, and shape the future of digital
                business.
              </p>

              <p>
                In today&apos;s rapidly evolving technology landscape, organizations require more
                than products and services—they need trusted partners, actionable insights, and
                access to executive communities that drive innovation. CXO Capital serves as that
                platform by creating opportunities for knowledge sharing, peer networking,
                leadership recognition, and business growth.
              </p>

              <p>
                Through thoughtfully curated executive forums, industry conferences, roundtables,
                research initiatives, and digital engagement programs, CXO Capital empowers
                organizations with strategic insights, valuable connections, and collaborative
                opportunities that enable informed decision-making and sustainable business success.
              </p>

              <p>
                Our strength lies in bringing together the right people, ideas, and opportunities.
                By combining executive communities, market intelligence, strategic events, and
                targeted marketing solutions, we help organizations strengthen their market presence
                while enabling leaders to accelerate innovation, build lasting partnerships, and
                create measurable business value.
              </p>

              <div className="social-media-back">
                <Link href="/" className="social-media-back-btn">
                  ← Back
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="social-media-section">
        <div className="social-media-container">
          <div className="social-media-row">
            <div className="social-media-content">
              <img
                src="/assets/aboutus/about-core.png"
                alt="Explore CIO Choice"
                style={{
                  width: '100%',
                  borderRadius: '20px',
                  marginBottom: '30px',
                  objectFit: 'cover',
                }}
              />

              <h2>Explore CORE Media</h2>

              <div className="social-media-back">
                <a
                  href="https://website.uatcoremedia.vebsigns.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-media-back-btn"
                >
                  Visit Website
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
