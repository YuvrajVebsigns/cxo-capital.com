// import React from 'react';
// import {
//   Eye,
//   GraduationCap,
//   Network,
//   Presentation,
// } from 'lucide-react';

// const benefits = [
//   {
//     icon: Presentation,
//     title: 'Exposure to Decision Makers',
//     description:
//       'Showcase your products and services to a targeted audience of CXO ICT buyers actively seeking transformative solutions.',
//   },
//   {
//     icon: Network,
//     title: 'Networking Opportunities',
//     description:
//       'Connect with potential clients, investors, and industry influencers to expand your network and build valuable partnerships.',
//   },
//   {
//     icon: Eye,
//     title: 'Enhanced Visibility',
//     description:
//       'Increase your enterprise visibility through our curated ecosystem and gain access to a broad audience of ICT professionals.',
//   },
//   {
//     icon: GraduationCap,
//     title: 'Educational Resources',
//     description:
//       'Access valuable resources and educational content to strengthen your business strategy and technological offerings.',
//   },
// ];

// export default function CxoHubPage() {
//   return (
//     <main className="industry-giants-section">
//       <div className="industry-giants-container">
//         <div className="industry-giants-header">
//           <h1>Industry Giants &amp; B2B Startups</h1>

//           <p>
//             CXO Capital provides large ICT Brands and B2B startups with a
//             platform to showcase their innovative technologies to a receptive
//             audience of CXO ICT buyers.
//           </p>
//         </div>

//         <div className="industry-giants-grid">
//           {benefits.map((item) => {
//             const Icon = item.icon;

//             return (
//               <div key={item.title} className="industry-giants-card">
//                 <div className="industry-giants-icon">
//                   <Icon size={30} />
//                 </div>

//                 <div className="industry-giants-content">
//                   <h3>{item.title}</h3>
//                   <p>{item.description}</p>
//                 </div>
//               </div>
//             );
//           })}
//         </div>
//       </div>
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
      'Showcase your products and services to CXO ICT buyers actively seeking transformative solutions.',
  },
  {
    icon: Network,
    title: 'Networking Opportunities',
    description:
      'Connect with potential clients, investors, and industry influencers to build valuable partnerships.',
  },
  {
    icon: Eye,
    title: 'Enhanced Visibility',
    description:
      'Increase your enterprise visibility through our curated ecosystem and access a broad ICT audience.',
  },
  {
    icon: GraduationCap,
    title: 'Educational Resources',
    description:
      'Access resources and educational content to strengthen your business strategy and offerings.',
  },
];

export default function CxoHubPage() {
  return (
    <main className="cxo-hub-section">
      <div className="cxo-hub-container">
        <section className="cxo-hub-hero">
          {/* <span>CXO Capital Advantage</span> */}
          <h1>Industry Giants &amp; B2B Startups</h1>
          <p>
            CXO Capital provides large ICT Brands and B2B startups with a platform to showcase their
            innovative technologies to a receptive audience of CXO ICT buyers.
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
      </div>
    </main>
  );
}
