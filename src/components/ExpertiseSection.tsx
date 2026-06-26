'use client';

import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import Image from 'next/image';

export default function AboutCioChoiceSection() {
  const sectionRef = useScrollAnimation<HTMLDivElement>({
    animationClass: 'animate-fade-in-up',
    initialTransform: 'translateY(40px)',
  });

  const cardRef1 = useScrollAnimation<HTMLDivElement>({
    animationClass: 'animate-fade-in-left',
    initialTransform: 'translateX(-40px)',
    threshold: 0.2,
  });

  const cardRef2 = useScrollAnimation<HTMLDivElement>({
    animationClass: 'animate-fade-in-left',
    initialTransform: 'translateX(-40px)',
    threshold: 0.2,
  });

  const cardRef3 = useScrollAnimation<HTMLDivElement>({
    animationClass: 'animate-fade-in-left',
    initialTransform: 'translateX(-40px)',
    threshold: 0.2,
  });

  const cardRef4 = useScrollAnimation<HTMLDivElement>({
    animationClass: 'animate-fade-in-left',
    initialTransform: 'translateX(-40px)',
    threshold: 0.2,
  });

  const cards = [
    {
      title: 'Market Intelligence',
      description:
        'Providing data-driven research, market analysis and strategic insights that help technology leaders make informed decisions.',
      image: '/assets/aboutus/IMG1.png',
    },
    {
      title: 'Industry Insights',
      description:
        'Delivering thought leadership, trends and expert perspectives across the ICT and digital transformation landscape.',
      image: '/assets/aboutus/IMG2.png',
    },
    {
      title: 'Advisory & Consulting',
      description:
        'Enabling enterprises and technology providers with strategic guidance, business advisory and growth consulting services.',
      image: '/assets/aboutus/IMG3.png',
    },
    {
      title: 'Marketing Strategies',
      description:
        'Creating targeted marketing programs and engagement initiatives that drive visibility, awareness and business outcomes.',
      image: '/assets/aboutus/IMG4.png',
    },
    {
      title: 'Targeted Marketing for Maximum ROI',
      description:
        'Executing focused campaigns designed to reach the right decision-makers and maximize return on marketing investments.',
      image: '/assets/aboutus/IMG5.png',
    },
    {
      title: 'Tailored Engagements & Events for ICT Markets',
      description:
        'Designing customized events, networking platforms and community engagements specifically for the ICT ecosystem.',
      image: '/assets/aboutus/IMG6.png',
    },
  ];

  const cardRefs = [cardRef1, cardRef2, cardRef3, cardRef4];

  return (
    <section ref={sectionRef} className="about-cio-section">
      <div className="about-cio-container">
        <div className="about-cio-heading">
          <div className="about-cio-label">
            <Image
              src="/assets/icon.png"
              alt="Key Clients"
              width={20}
              height={20}
              className="expertise-label-icon"
            />
            <span className="about-cio-label-text">About Us</span>
          </div>

          <h2 className="about-cio-title">
            ABOUT <span>CIO CHOICE</span>
          </h2>

          <p className="about-cio-description">
            CIO Choice is a powerful recognition platform for ICT brands to promote their products,
            services and solutions among CIOs and digital leaders.
          </p>
        </div>

        <div className="about-cio-grid">
          {cards.map((card, index) => (
            <div key={card.title} ref={cardRefs[index]} className="about-cio-card">
              <div className="about-cio-image-wrap">
                <img src={card.image} alt={card.title} className="about-cio-card-img" />
              </div>

              <h3 className="about-cio-card-title">{card.title}</h3>

              <p className="about-cio-card-description">{card.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
