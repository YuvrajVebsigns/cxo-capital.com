import Link from 'next/link';
import Image from 'next/image';
import { Home, Mail } from 'lucide-react';

export default function NotFound() {
  return (
    <main className="notfound-page">
      <div className="notfound-card">
        {/* <div className="notfound-badge">404</div> */}

        <Image
          src="/assets/404.png"
          alt="Page Not Found"
          width={300}
          height={300}
          className="notfound-image"
          priority
        />

        <h1 className="notfound-title">Oops! Page Not Found</h1>

        <p className="notfound-description">This page is unavailable or has been removed.</p>

        <div className="notfound-actions">
          <Link href="/" className="notfound-btn-primary">
            <Home size={18} />
            Back to Home
          </Link>

          <Link href="/#contact-section" className="notfound-btn-secondary">
            <Mail size={18} />
            Contact Us
          </Link>
        </div>

        {/* <Link href="/" className="notfound-back">
          <ArrowUpLeft size={18} />
          Return to Homepage
        </Link> */}
      </div>
    </main>
  );
}
