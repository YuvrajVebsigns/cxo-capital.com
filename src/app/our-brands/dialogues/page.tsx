// import React from 'react';

// export default function CIOdialoguesPage() {
//   return (
//     <main>
//       <h1>CXO Hub</h1>
//     </main>
//   );
// }

'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { fetchWebsiteEvents, type WebsiteEvent } from '@/services/events.service';

const cards = [
  {
    title: 'Events',
    description:
      'Participate in exclusive conferences, leadership summits, networking forums and executive roundtables designed for ICT decision-makers.',
    image: '/assets/aboutus/event.png',
  },
  {
    title: 'Winners',
    description:
      'Celebrating outstanding CIOs, technology leaders and organizations driving innovation and digital transformation across industries.',
    image: '/assets/aboutus/winner.png',
  },
  {
    title: 'Speakers',
    description:
      'Learn from renowned CIOs, CTOs, CISOs and industry experts sharing real-world experiences, trends and strategic insights.',
    image: '/assets/aboutus/speaker.png',
  },
  {
    title: 'Partners',
    description:
      'Connect with leading technology companies, solution providers and strategic partners to build lasting business relationships.',
    image: '/assets/aboutus/partner.png',
  },
];

export default function CIOpowerlistPage() {
  const [events, setEvents] = useState<WebsiteEvent[] | null>(null);

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

  const customLeftRef = useScrollAnimation<HTMLDivElement>({
    animationClass: 'animate-fade-in-left',
    initialTransform: 'translateX(-40px)',
    threshold: 0.12,
  });

  const customRightRef = useScrollAnimation<HTMLDivElement>({
    animationClass: 'animate-fade-in-right',
    initialTransform: 'translateX(40px)',
    threshold: 0.12,
  });

  const cardRefs = [cardRef1, cardRef2, cardRef3, cardRef4];

  useEffect(() => {
    fetchWebsiteEvents()
      .then((data) => {
        if (Array.isArray(data) && data.length) setEvents(data);
        else setEvents([]);
      })
      .catch(() => setEvents([]));
  }, []);

  return (
    <main>
      <section className="hero-section">
        <Image
          src="/assets/hero/hero-dialogues.png"
          alt="CIO Powerlist"
          width={1400}
          height={800}
          priority
          className="hero-image"
        />
        <div className="hero-overlay" />
      </section>

      <section ref={sectionRef} className="aboutsection1-section">
        <div className="aboutsection1-container">
          <div className="aboutsection1-heading">
            <div className="aboutsection1-label">
              <Image
                src="/assets/icon.png"
                alt="About Us"
                width={20}
                height={20}
                className="aboutsection1-label-icon"
              />
              <span className="aboutsection1-label-text">About Us</span>
            </div>

            <h2 className="aboutsection1-title">
              ABOUT <span>CIO DIALOGUES</span>
            </h2>

            <p className="aboutsection1-description">
              CIO Dialogues is a powerful recognition platform for ICT brands to promote their
              products, services and solutions among CIOs and digital leaders.
            </p>
          </div>

          <div className="aboutsection1-grid">
            {cards.map((card, index) => (
              <div key={card.title} ref={cardRefs[index]} className="aboutsection1-card">
                <div className="aboutsection1-image-wrap">
                  <Image
                    src={card.image}
                    alt={card.title}
                    width={320}
                    height={220}
                    className="aboutsection1-card-img"
                  />
                </div>

                <h3 className="aboutsection1-card-title">{card.title}</h3>
                <p className="aboutsection1-card-description">{card.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="project-section">
        <div className="project-container">
          <div className="project-heading">
            <h2 className="project-title">
              Our Work <span>Highlights.</span>
            </h2>
          </div>

          <div className="project-top-bar">
            <h6 className="project-subtitle">
              <Image
                src="/assets/icon.png"
                alt="Custom Events"
                width={20}
                height={20}
                className="expertise-label-icon"
              />
              <span>CUSTOM EVENTS</span>
            </h6>

            <Link href="/events" className="talk-btn">
              <span>More Events</span>
              <div className="talk-btn-icon">
                <ArrowUpRight size={18} />
              </div>
            </Link>
          </div>

          <div className="project-grid">
            {events === null ? (
              <div className="events-loading">Loading events…</div>
            ) : events.length === 0 ? (
              <div className="events-empty">No events available.</div>
            ) : (
              events.slice(0, 2).map((item: WebsiteEvent, index: number) => {
                const title = String(
                  item.title ??
                    (item['name'] as unknown) ??
                    (item['eventName'] as unknown) ??
                    'Event',
                );

                const slug =
                  item.id && typeof item.id === 'string'
                    ? String(item.id)
                    : title
                        .toLowerCase()
                        .replace(/\s+/g, '-')
                        .replace(/[^a-z0-9-]/g, '');

                const imageSrc = String(
                  item.image ?? item.heroImage ?? item.banner ?? '/assets/blogs/blog-1.webp',
                );

                const category = String(item.category ?? 'Events');

                return (
                  <Link key={slug} href={`/events/${slug}`}>
                    <div
                      className="project-card"
                      ref={index === 0 ? customLeftRef : customRightRef}
                    >
                      <div className="project-image-wrap">
                        <Image src={imageSrc} alt={title} fill className="project-image" />
                      </div>

                      <div className="project-overlay">
                        <span className="project-category">{category}</span>

                        <div className="project-content">
                          <h3>{title}</h3>
                        </div>
                      </div>
                    </div>
                  </Link>
                );
              })
            )}
          </div>
        </div>
      </section>

      <section className="website-cta-section">
        <div className="website-cta-container">
          <span className="website-cta-label">Explore More</span>

          <h2>
            Want to Explore the Complete <br /> <span>CIO Dialogues</span> Experience?
          </h2>

          <p>
            Visit the official CIO Dialogues website to discover award categories, winners, events,
            speakers, partners, photo galleries, videos and much more.
          </p>

          <a
            href="https://ciodialogues.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="website-cta-btn"
          >
            Visit Full Website
          </a>
        </div>
      </section>
    </main>
  );
}
