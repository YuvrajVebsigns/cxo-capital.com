// import React from 'react';

// export default function CxoHubPage() {
//   return (
//     <main>
//       <h1>CXO Hub</h1>
//     </main>
//   );
// }

import React from 'react';
import { Eye, GraduationCap, Network, Presentation } from 'lucide-react';

const benefits = [
  {
    icon: Presentation,
    title: 'Exposure to Decision Makers',
    description:
      'Showcase your products and services to a targeted audience of CIOs, CTOs, CISOs, CDOs and ICT buyers actively seeking transformative solutions for their organizations.',
  },
  {
    icon: Network,
    title: 'Networking Opportunities',
    description:
      'Connect with potential clients, investors, industry influencers and strategic partners to expand your network and create valuable business opportunities.',
  },
  {
    icon: Eye,
    title: 'Enhanced Visibility',
    description:
      'Increase your market presence by being featured within our curated ICT ecosystem and gain access to a broad audience of enterprise technology leaders.',
  },
  {
    icon: GraduationCap,
    title: 'Educational Resources',
    description:
      'Access valuable research, industry insights and educational content to strengthen your business strategy and technological offerings.',
  },
];

const growthOpportunities = [
  {
    icon: Presentation,
    title: 'Reach Enterprise Technology Leaders',
    description:
      'Present your solutions directly to CIOs, CTOs, CISOs, CDOs and ICT decision-makers actively exploring innovative technologies and business transformation initiatives.',
  },
  {
    icon: Network,
    title: 'Build Strategic Partnerships',
    description:
      'Engage with industry leaders, investors, channel partners and enterprise organizations to create meaningful business relationships and growth opportunities.',
  },
  {
    icon: Eye,
    title: 'Showcase Innovation',
    description:
      'Highlight your products, services and success stories within a trusted ICT ecosystem designed to maximize visibility and strengthen brand credibility.',
  },
  {
    icon: GraduationCap,
    title: 'Leverage Market Intelligence',
    description:
      'Access industry research, executive insights, market trends and expert perspectives to make informed strategic decisions and stay ahead of the competition.',
  },
];

export default function CxoHubPage() {
  return (
    <main className="cxo-hub-section">
      <div className="cxo-hub-container">
        <section className="cxo-hub-hero">
          <h1>CXO HUB</h1>

          <p>
            CXO Capital provides large ICT Brands and innovative B2B startups with a powerful
            platform to showcase their technologies to a receptive audience of CXO ICT buyers and
            enterprise decision-makers.
          </p>
        </section>

        <section className="cxo-hub-benefits">
          {benefits.map((item, index) => {
            const Icon = item.icon;

            return (
              <div className="cxo-hub-row" key={item.title}>
                <div className="cxo-hub-number">{String(index + 1).padStart(2, '0')}</div>

                <div className="cxo-hub-icon">
                  <Icon size={30} />
                </div>

                <div className="cxo-hub-content">
                  <h2>{item.title}</h2>
                  <p>{item.description}</p>
                </div>
              </div>
            );
          })}
        </section>

        <section className="cxo-hub-hero" style={{ marginTop: '100px' }}>
          <h1>Accelerate Growth Through the ICT Ecosystem</h1>

          <p>
            CXO Capital helps enterprises and B2B startups connect with decision-makers, gain market
            visibility, build strategic partnerships and position their solutions in front of a
            highly engaged ICT leadership community.
          </p>
        </section>

        <section className="cxo-hub-benefits">
          {growthOpportunities.map((item, index) => {
            const Icon = item.icon;

            return (
              <div className="cxo-hub-row" key={item.title}>
                <div className="cxo-hub-number">{String(index + 5).padStart(2, '0')}</div>

                <div className="cxo-hub-icon">
                  <Icon size={30} />
                </div>

                <div className="cxo-hub-content">
                  <h2>{item.title}</h2>
                  <p>{item.description}</p>
                </div>
              </div>
            );
          })}
        </section>
      </div>
    </main>
  );
}
