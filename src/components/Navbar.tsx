'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Menu, X, ChevronDown, ArrowUpRight } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const pathname = usePathname();

  const [isHidden, setIsHidden] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [advisoryOpen, setAdvisoryOpen] = useState(false);
  const [redCarpetOpen, setRedCarpetOpen] = useState(false);
  // const [recognizedOpen, setRecognizedOpen] = useState(false);
  const [mediaOpen, setMediaOpen] = useState(false);
  // const [processOpen, setProcessOpen] = useState(false);
  // const [coverageHovered, setCoverageHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  // const [winnerHovered, setWinnerHovered] = useState(false);

  const lastScrollY = useRef(0);
  const hideTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const dropdownTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // const advisoryYears = [
  //   2026, 2025, 2024, 2023, 2022, 2021, 2020, 2019, 2018, 2017, 2016, 2015, 2014, 2013,
  // ];
  // const redCarpetYears = [
  //   2027, 2026, 2025, 2024, 2023, 2022, 2021, 2020, 2019, 2018, 2017, 2016, 2015, 2014, 2013,
  // ];
  // const mediaYears = [2019, 2017];
  // const recognizedBrandYears = [
  //   2026, 2025, 2024, 2023, 2022, 2021, 2020, 2019, 2018, 2017, 2016, 2015, 2014, 2013,
  // ];

  // const resetMediaMenu = () => {
  //   setCoverageHovered(false);
  //   setWinnerHovered(false);
  // };

  const closeMobileMenu = () => {
    if (dropdownTimer.current) clearTimeout(dropdownTimer.current);
    if (hideTimer.current) clearTimeout(hideTimer.current);
    setMobileOpen(false);
    setAdvisoryOpen(false);
    setRedCarpetOpen(false);
    // setRecognizedOpen(false);
    setMediaOpen(false);
    // setProcessOpen(false);
    // resetMediaMenu();
    setIsHidden(false);
  };

  const openDropdown = (type: 'advisory' | 'redCarpet' | 'recognized' | 'media' | 'process') => {
    if (dropdownTimer.current) clearTimeout(dropdownTimer.current);
    setAdvisoryOpen(type === 'advisory');
    setRedCarpetOpen(type === 'redCarpet');
    // setRecognizedOpen(type === 'recognized');
    setMediaOpen(type === 'media');
    // setProcessOpen(type === 'process');
    // if (type !== 'media') resetMediaMenu();
  };

  const closeDropdowns = () => {
    if (dropdownTimer.current) clearTimeout(dropdownTimer.current);
    dropdownTimer.current = setTimeout(() => {
      setAdvisoryOpen(false);
      setRedCarpetOpen(false);
      // setRecognizedOpen(false);
      setMediaOpen(false);
      // setProcessOpen(false);
      // resetMediaMenu();
    }, 140);
  };

  useEffect(() => {
    const updateIsMobile = () => setIsMobile(window.innerWidth <= 992);
    updateIsMobile();
    window.addEventListener('resize', updateIsMobile);
    return () => window.removeEventListener('resize', updateIsMobile);
  }, []);

  useEffect(() => {
    lastScrollY.current = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const diff = currentScrollY - lastScrollY.current;

      if (Math.abs(diff) < 8) return;
      if (hideTimer.current) clearTimeout(hideTimer.current);
      if (diff < 0) setIsHidden(false);

      if (diff > 0 && currentScrollY > 140 && !mobileOpen) {
        hideTimer.current = setTimeout(() => setIsHidden(true), 180);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (hideTimer.current) clearTimeout(hideTimer.current);
      if (dropdownTimer.current) clearTimeout(dropdownTimer.current);
    };
  }, [mobileOpen]);

  return (
    <header
      className={`navbar ${isHidden ? 'navbar-hide' : ''} ${mobileOpen ? 'mobile-open' : ''}`}
    >
      <div className="navbar-container">
        <Link href="/" className="navbar-logo" onClick={closeMobileMenu}>
          <Image
            src="/assets/logo/Headingg.png"
            alt="CORE Media"
            width={150}
            height={100}
            priority
          />
        </Link>

        <nav className={`navbar-menu ${mobileOpen ? 'open' : ''}`}>
          <Link
            href="/"
            className={`nav-link ${pathname === '/' ? 'active' : ''}`}
            onClick={closeMobileMenu}
          >
            Home
          </Link>

          <Link
            href="/aboutus"
            className={`nav-link ${pathname?.startsWith('/aboutus') ? 'active' : ''}`}
            onClick={closeMobileMenu}
          >
            About Us
          </Link>

          <div
            className={`nav-dropdown advisory-dropdown ${advisoryOpen ? 'open' : ''}`}
            onMouseEnter={() => !isMobile && openDropdown('advisory')}
            onMouseLeave={() => !isMobile && closeDropdowns()}
          >
            <button
              type="button"
              className={`nav-link ${pathname?.startsWith('/our-brands') ? 'active' : ''}`}
              aria-expanded={advisoryOpen}
              onClick={() => {
                setAdvisoryOpen((s) => !s);
                setRedCarpetOpen(false);
                // setRecognizedOpen(false);
                setMediaOpen(false);
              }}
            >
              Brands
              <ChevronDown
                size={16}
                style={{
                  transform: advisoryOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                  transition: '0.3s ease',
                }}
              />
            </button>

            <div className="mega-panel nav-year-dropdown">
              <ul>
                <li>
                  <Link
                    href="/our-brands/cio-powerlist-mea"
                    className="mega-item"
                    onClick={closeMobileMenu}
                  >
                    CIO Powerlist
                  </Link>
                </li>

                <li>
                  <Link
                    href="/our-brands/dialogues"
                    className="mega-item"
                    onClick={closeMobileMenu}
                  >
                    CIO Dialogues
                  </Link>
                </li>

                <li>
                  <Link
                    href="/our-brands/cio-crown"
                    className="mega-item"
                    onClick={closeMobileMenu}
                  >
                    CIO Crown
                  </Link>
                </li>

                <li>
                  <Link
                    href="/our-brands/cio-choice-mea"
                    className="mega-item"
                    onClick={closeMobileMenu}
                  >
                    CIO Choice
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* <div
              className={`nav-dropdown advisory-dropdown ${advisoryOpen ? 'open' : ''}`}
              onMouseEnter={() => !isMobile && openDropdown('advisory')}
              onMouseLeave={() => !isMobile && closeDropdowns()}
            >
              <button
                type="button"
                className={`nav-link ${pathname?.startsWith('/advisory-panel') ? 'active' : ''}`}
                aria-expanded={advisoryOpen}
                onClick={() => {
                  setAdvisoryOpen((s) => !s);
                  setRedCarpetOpen(false);
                  setRecognizedOpen(false);
                  setMediaOpen(false);
                }}
              >
                ICT Ecosystem
                <ChevronDown
                  size={16}
                  style={{
                    transform: advisoryOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                    transition: '0.3s ease',
                  }}
                />
              </button>

              <div className="mega-panel nav-year-dropdown">
                <ul>
                  <li>
                    <Link href="/advisory-panel/2026" className="mega-item" onClick={closeMobileMenu}>
                      CXO Hub
                    </Link>
                  </li>

                  <li>
                    <Link href="/advisory-panel/2025" className="mega-item" onClick={closeMobileMenu}>
                      Industry Giants & B2B Startups
                    </Link>
                  </li>
                </ul>
              </div>
            </div> */}

          <div
            className={`nav-dropdown ${redCarpetOpen ? 'open' : ''}`}
            onMouseEnter={() => !isMobile && openDropdown('redCarpet')}
            onMouseLeave={() => !isMobile && closeDropdowns()}
          >
            <button
              type="button"
              className={`nav-link ${pathname?.startsWith('/ict-echo-system') ? 'active' : ''}`}
              aria-expanded={redCarpetOpen}
              onClick={() => {
                setRedCarpetOpen((s) => !s);
                setAdvisoryOpen(false);
                // setRecognizedOpen(false);
                setMediaOpen(false);
              }}
            >
              ICT Ecosystem
              <ChevronDown
                size={16}
                style={{
                  transform: redCarpetOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                  transition: '0.3s ease',
                }}
              />
            </button>

            <div className="mega-panel nav-year-dropdown">
              <ul>
                <li>
                  <Link
                    href="/ict-echo-system/cxo-hub"
                    className="mega-item"
                    onClick={closeMobileMenu}
                  >
                    CXO Hub
                  </Link>
                </li>

                <li>
                  <Link
                    href="/ict-echo-system/industry-giants"
                    className="mega-item"
                    onClick={closeMobileMenu}
                  >
                    Industry Giants & B2B Startups
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* <div
            className={`nav-dropdown ${recognizedOpen ? 'open' : ''}`}
            onMouseEnter={() => !isMobile && openDropdown('recognized')}
            onMouseLeave={() => !isMobile && closeDropdowns()}
          >
            <button
              type="button"
              className={`nav-link ${pathname?.startsWith('/recognized-brands') ? 'active' : ''}`}
              aria-expanded={recognizedOpen}
              onClick={() => {
                setRecognizedOpen((s) => !s);
                setAdvisoryOpen(false);
                setRedCarpetOpen(false);
                setMediaOpen(false);
                setProcessOpen(false);
              }}
            >                    
              Recognized Brands
              <ChevronDown
                size={16}
                style={{
                  transform: recognizedOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                  transition: '0.3s ease',
                }}
              />
            </button>

            <div className="mega-panel nav-year-dropdown">
              <ul>
                {recognizedBrandYears.map((year) => (
                  <li key={year}>
                    <Link
                      href={`/recognized-brands/${year}`}
                      className="mega-item"
                      onClick={closeMobileMenu}
                    >
                      Recognized Brands {year}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div> */}

          {/* <div
            className={`nav-dropdown ${processOpen ? 'open' : ''}`}
            onMouseEnter={() => !isMobile && openDropdown('process')}
            onMouseLeave={() => !isMobile && closeDropdowns()}
          >
            <button
              type="button"
              className={`nav-link ${pathname === '/process' || pathname === '/enter' ? 'active' : ''}`}
              aria-expanded={processOpen}
              onClick={() => {
                setProcessOpen((s) => !s);
                setAdvisoryOpen(false);
                setRedCarpetOpen(false);
                setRecognizedOpen(false);
                setMediaOpen(false);
              }}
            >
              Process
              <ChevronDown
                size={16}
                style={{
                  transform: processOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                  transition: '0.3s ease',
                }}
              />
            </button>

            <div className="mega-panel nav-year-dropdown">
              <ul>
                <li>
                  <Link href="/process-flow" className="mega-item" onClick={closeMobileMenu}>
                    Process and Flow
                  </Link>
                </li>
                <li>
                  <Link href="/enter" className="mega-item" onClick={closeMobileMenu}>
                    Enter
                  </Link>
                </li>
              </ul>
            </div>
          </div> */}

          <Link href="/blog" className="nav-link" onClick={closeMobileMenu}>
            Blogs
          </Link>

          <Link href="/events" className="nav-link" onClick={closeMobileMenu}>
            Events
          </Link>

          <Link href="/CXOUnfiltered" className="nav-link" onClick={closeMobileMenu}>
            CXO Unfiltered
          </Link>

          <div
            className={`nav-dropdown media-nav-dropdown ${mediaOpen ? 'open' : ''}`}
            onMouseEnter={() => !isMobile && openDropdown('media')}
            onMouseLeave={() => !isMobile && closeDropdowns()}
          >
            <button
              type="button"
              className={`nav-link ${pathname?.startsWith('/join-the-community') ? 'active' : ''}`}
              aria-expanded={mediaOpen}
              onClick={() => {
                setMediaOpen((s) => !s);
                setAdvisoryOpen(false);
                setRedCarpetOpen(false);
                // setRecognizedOpen(false);
              }}
            >
              Join the Community
              <ChevronDown
                size={16}
                style={{
                  transform: mediaOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                  transition: '0.3s ease',
                }}
              />
            </button>

            <div className="mega-panel nav-year-dropdown media-mega-panel">
              <ul className="media-main-list">
                <li>
                  <Link
                    href="/join-the-community/cxo-connect"
                    className="mega-item"
                    onClick={closeMobileMenu}
                  >
                    The CXO Connect
                  </Link>
                </li>

                <li>
                  <Link
                    href="/join-the-community/what-cios-think-of-us"
                    className="mega-item"
                    onClick={closeMobileMenu}
                  >
                    What CIOs think of us
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* <Link
            href="/contact"
            className={`nav-link ${pathname === '/contact' ? 'active' : ''}`}
            onClick={closeMobileMenu}
          >
            Contact
          </Link> */}
        </nav>

        <div className="navbar-actions">
          <Link href="/#contact-section" className="talk-btn" onClick={closeMobileMenu}>
            <span>Let’s Talk</span>
            <div className="talk-btn-icon">
              <ArrowUpRight size={18} />
            </div>
          </Link>

          <button
            className={`menu-btn ${mobileOpen ? 'open' : ''}`}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
            onClick={() => {
              setMobileOpen((s) => !s);
              setIsHidden(false);
            }}
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>
    </header>
  );
}
