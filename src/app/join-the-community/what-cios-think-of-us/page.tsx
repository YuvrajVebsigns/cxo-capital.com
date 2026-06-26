// import React from 'react';

// export default function CIOthikPage() {
//   return (
//     <main>
//       <h1>CXO Hub</h1>
//     </main>
//   );
// }

// import Link from 'next/link';

// import { ArrowUpRight } from 'lucide-react';

const testimonials = [
  {
    name: 'John Smith',
    designation: 'Group CIO',
    company: 'ABC Technologies',
    feedback:
      'CXO Capital has created a unique platform that genuinely connects technology leaders and enables meaningful business collaborations.',
  },
  {
    name: 'Sarah Williams',
    designation: 'Chief Digital Officer',
    company: 'Global Enterprises',
    feedback:
      'The networking opportunities and industry insights have been extremely valuable in helping us stay ahead of digital transformation.',
  },
  {
    name: 'David Brown',
    designation: 'Chief Technology Officer',
    company: 'Innovate Systems',
    feedback:
      'A highly professional community that brings together ICT leaders, enterprises and innovative startups under one ecosystem.',
  },
  {
    name: 'Emily Johnson',
    designation: 'Chief Information Security Officer',
    company: 'SecureTech',
    feedback:
      'The events, discussions and curated ecosystem have helped us build valuable partnerships across the region.',
  },
];

export default function CIOthikPage() {
  return (
    <main className="cio-think-page">
      {/* Hero */}
      <section className="cio-think-hero">
        <div className="cio-think-container">
          <span className="cio-think-label">Testimonials</span>

          <h1>What CIOs Think of Us</h1>

          <p>
            Hear directly from technology leaders who have experienced the value of the CXO Capital
            ecosystem and our commitment to fostering collaboration, innovation, and business
            growth.
          </p>
        </div>
      </section>

      {/* Testimonials */}
      <section className="cio-testimonials">
        <div className="cio-think-container">
          <div className="cio-testimonial-grid">
            {testimonials.map((item) => (
              <div key={`${item.name}-${item.company}`} className="cio-testimonial-card">
                <div className="testimonial-quote">“</div>

                <p className="testimonial-text">{item.feedback}</p>

                <div className="testimonial-user">
                  <div className="testimonial-avatar">{item.name.charAt(0)}</div>

                  <div>
                    <h3>{item.name}</h3>

                    <span>{item.designation}</span>

                    <small>{item.company}</small>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cio-think-cta">
        <div className="cio-think-container">
          <h2>Join Our Growing ICT Community</h2>

          <p>
            Become part of an exclusive network connecting CIOs, CTOs, CISOs, CDOs and technology
            innovators across the Middle East.
          </p>

          {/* <Link href="/#contact-section" className="talk-btn">
            <span>Join the Community</span>
            <div className="talk-btn-icon">
              <ArrowUpRight size={18} />
            </div>
          </Link> */}
        </div>
      </section>
    </main>
  );
}
