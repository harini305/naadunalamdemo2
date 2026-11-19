import Image from "next/image";
import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";

const footerLinks = [
  ["Traditional Rice", "Traditional Rice (பாரம்பரிய அரிசி வகைகள்)"],
  ["Millets", "Millets (சிறுதானியங்கள்)"],
  ["Natural Sweeteners", "Natural Sweeteners (இயற்கை இனிப்புகள்)"],
  ["Ghee & Oil", "Ghee & Oil (நெய் & எண்ணெய் வகைகள்)"],
];

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="page-shell footer-grid">
        <div className="footer-brand">
          <Link className="brand brand-light" href="/shop">
            <Image src="/assets/naadu-nalam-logo-embedded.png" alt="" width={384} height={372} />
            <span className="brand-copy"><strong>Naadu Nalam</strong><small>fresh and organic</small></span>
          </Link>
          <p>Good Food, Brighter Tomorrow</p>
          <span>Traditional foods from local growers, gathered for your everyday kitchen.</span>
        </div>
        <div>
          <h2>Shop the collection</h2>
          <ul className="footer-links">
            {footerLinks.map(([label, category]) => (
              <li key={category}><Link href={`/shop?category=${encodeURIComponent(category)}`}>{label}</Link></li>
            ))}
          </ul>
        </div>
        <div className="footer-contact">
          <h2>Contact us</h2>
          <a href="tel:+919092114630"><Phone size={16} /> +91 90921 14630</a>
          <a href="mailto:hello@naadunalam.in"><Mail size={16} /> hello@naadunalam.in</a>
          <span><MapPin size={16} /> Chennai, Tamil Nadu 600001</span>
        </div>
      </div>
      <div className="page-shell footer-bottom">
        <span>© 2026 Naadu Nalam. All rights reserved.</span>
        <span>Good Food · Healthy People · Sustainable Tomorrow</span>
      </div>
    </footer>
  );
}
