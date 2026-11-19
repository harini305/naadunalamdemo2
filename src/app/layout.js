import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";
import { StoreProvider } from "@/components/StoreProvider";

export const metadata = {
  title: {
    default: "Naadu Nalam | Fresh and Organic",
    template: "%s | Naadu Nalam",
  },
  description: "Traditional rice, millets, pulses, cold-pressed oils and natural foods from Tamil Nadu.",
  icons: {
    icon: "/assets/naadu-nalam-logo-embedded.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <StoreProvider>
          <Header />
          <div className="site-content">{children}</div>
          <Footer />
          <CartDrawer />
        </StoreProvider>
      </body>
    </html>
  );
}
