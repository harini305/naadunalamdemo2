"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart, Leaf, Phone, Search, ShoppingBag } from "lucide-react";
import { useStore } from "./StoreProvider";

export default function Header() {
  const { cartCount, wishlist, openCart } = useStore();

  return (
    <>
      <div className="announcement">
        <div className="page-shell announcement-inner">
          <span><Leaf size={13} aria-hidden="true" /> Welcome to Naadu Nalam Organic Store</span>
          <a href="tel:+919092114630"><Phone size={13} aria-hidden="true" /> +91 90921 14630</a>
        </div>
      </div>
      <header className="site-header">
        <div className="page-shell header-inner">
          <Link className="brand" href="/shop" aria-label="Naadu Nalam shop">
            <Image
              src="/assets/naadu-nalam-logo-embedded.png"
              alt="Naadu Nalam"
              width={384}
              height={372}
              priority
            />
            <span className="brand-copy">
              <strong>Naadu Nalam</strong>
              <small>fresh and organic</small>
            </span>
          </Link>
          <nav className="simple-nav" aria-label="Main navigation">
            <Link href="/shop">Shop</Link>
            <span>Traditional. Natural. Authentic.</span>
          </nav>
          <div className="header-actions">
            <Link className="icon-button" href="/shop?focus=search" aria-label="Search products">
              <Search size={20} />
            </Link>
            <Link className="icon-button count-button" href="/shop?wishlist=1" aria-label={`Wishlist with ${wishlist.length} products`}>
              <Heart size={20} />
              {wishlist.length > 0 && <span>{wishlist.length}</span>}
            </Link>
            <button className="icon-button count-button" type="button" onClick={openCart} aria-label={`Basket with ${cartCount} items`}>
              <ShoppingBag size={20} />
              {cartCount > 0 && <span>{cartCount}</span>}
            </button>
          </div>
        </div>
      </header>
    </>
  );
}
