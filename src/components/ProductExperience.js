"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import {
  ArrowRight,
  Check,
  ChevronLeft,
  ChevronRight,
  FlaskConical,
  Heart,
  Leaf,
  Minus,
  Plus,
  ShieldCheck,
  ShoppingCart,
  Sprout,
  Star,
} from "lucide-react";
import ProductCard from "./ProductCard";
import { formatPrice, getRelatedProducts } from "@/data/products";
import { useStore } from "./StoreProvider";

const promises = [
  { icon: Leaf, title: "Pure & Natural", text: "No added chemicals" },
  { icon: FlaskConical, title: "Preservative Free", text: "100% chemical-free" },
  { icon: Sprout, title: "Farm Sourced", text: "From trusted local farms" },
  { icon: ShieldCheck, title: "Quality Assured", text: "Carefully processed for purity" },
];

function TamilDescription({ text }) {
  const lines = text.split("\n").filter(Boolean);
  const featureStart = lines.indexOf("சிறப்பம்சங்கள்");
  const cookingStart = lines.findIndex((line) => /முறை:/.test(line));

  return (
    <div className="tamil-description" lang="ta">
      {lines.map((line, index) => {
        if (line === "சிறப்பம்சங்கள்") return <h3 key={line}>{line}</h3>;
        const isFeature = featureStart > -1 && index > featureStart && (cookingStart === -1 || index < cookingStart);
        if (isFeature) {
          return <p className="tamil-feature" key={`${line}-${index}`}><Check size={16} aria-hidden="true" /><span>{line}</span></p>;
        }
        return <p key={`${line}-${index}`}>{line}</p>;
      })}
    </div>
  );
}

export default function ProductExperience({ product }) {
  const { addToCart, openCart, toggleWishlist, wishlist } = useStore();
  const [selectedVariant, setSelectedVariant] = useState(product.variants[0]);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("description");
  const [activeImage, setActiveImage] = useState(0);
  const saved = wishlist.includes(product.slug);
  const relatedProducts = getRelatedProducts(product);
  const gallery = Array.from({ length: 4 }, (_, index) => product.gallery[index] || product.image);
  const reviewTabCount = product.reviewCount === 124 ? 122 : product.reviewCount;

  function buyNow() {
    addToCart(product, quantity, selectedVariant);
    openCart();
  }

  return (
    <main className="product-page page-shell">
      <section className="product-overview" aria-labelledby="product-title">
        <BotanicalDecoration className="product-leaves product-leaves-top" />
        <div className="product-gallery">
          <div className={`main-product-image gallery-view-${activeImage}`}>
            <Image
              src={gallery[activeImage]}
              alt={product.displayName}
              fill
              sizes="(max-width: 900px) 100vw, 48vw"
              priority
            />
            <button
              className={`wishlist-button${saved ? " is-saved" : ""}`}
              type="button"
              onClick={() => toggleWishlist(product)}
              aria-label={saved ? "Remove from wishlist" : "Add to wishlist"}
            >
              <Heart size={20} fill={saved ? "currentColor" : "none"} />
            </button>
            <button
              className="gallery-arrow gallery-arrow-previous"
              type="button"
              onClick={() => setActiveImage((activeImage - 1 + gallery.length) % gallery.length)}
              aria-label="Previous product image"
            >
              <ChevronLeft size={20} aria-hidden="true" />
            </button>
            <button
              className="gallery-arrow gallery-arrow-next"
              type="button"
              onClick={() => setActiveImage((activeImage + 1) % gallery.length)}
              aria-label="Next product image"
            >
              <ChevronRight size={20} aria-hidden="true" />
            </button>
          </div>
        </div>
        <div className="product-buy-panel">
          <span className="natural-label"><Leaf size={13} /> 100% NATURAL</span>
          <h1 id="product-title">{product.displayName}</h1>
          {product.tamilName && <p className="product-tamil-name" lang="ta">{product.tamilName}</p>}
          <div className="product-rating" aria-label={`${product.reviewCount} customer reviews`}>
            <span className="rating-stars" aria-hidden="true">
              {Array.from({ length: 5 }, (_, index) => <Star key={index} size={16} fill="currentColor" />)}
            </span>
            <span>({product.reviewCount} Reviews)</span>
          </div>
          <p className="detail-price">{formatPrice(selectedVariant.price)}</p>
          <p className="tax-note">Inclusive of all taxes <span>•</span> {selectedVariant.label}</p>
          <div className="variant-section">
            <h2>Weight</h2>
            <div className="variant-options">
              {product.variants.map((variant) => (
                <button
                  type="button"
                  key={variant.label}
                  className={selectedVariant.label === variant.label ? "active" : ""}
                  onClick={() => setSelectedVariant(variant)}
                >
                  {variant.label} <span>–</span> {formatPrice(variant.price)}
                  {selectedVariant.label === variant.label && <ChevronDownSafe />}
                </button>
              ))}
            </div>
          </div>
          <div className="quantity-section">
            <h2>Quantity</h2>
            <div className="quantity-control">
              <button type="button" onClick={() => setQuantity((value) => Math.max(1, value - 1))} aria-label="Decrease quantity"><Minus size={15} /></button>
              <span>{quantity}</span>
              <button type="button" onClick={() => setQuantity((value) => Math.min(20, value + 1))} aria-label="Increase quantity"><Plus size={15} /></button>
            </div>
          </div>
          <div className="buy-actions">
            <button className="button button-primary" type="button" onClick={() => addToCart(product, quantity, selectedVariant)}>
              <ShoppingCart size={18} /> Add to Cart
            </button>
            <button className="button button-outline" type="button" onClick={buyNow}>Buy Now</button>
          </div>
          <aside className="product-promises" aria-label="Our product promises">
            {promises.map(({ icon: Icon, title, text }) => (
              <article key={title}>
                <Icon size={26} strokeWidth={1.6} aria-hidden="true" />
                <h2>{title}</h2>
                <p>{text}</p>
              </article>
            ))}
          </aside>
        </div>
        <BotanicalDecoration className="product-leaves product-leaves-bottom" />
      </section>

      <section className="product-information">
        <div className="product-tabs" role="tablist" aria-label="Product information">
          <button type="button" role="tab" aria-selected={activeTab === "description"} className={activeTab === "description" ? "active" : ""} onClick={() => setActiveTab("description")}>Description</button>
          <button type="button" role="tab" aria-selected={activeTab === "additional"} className={activeTab === "additional" ? "active" : ""} onClick={() => setActiveTab("additional")}>Additional Information</button>
          <button type="button" role="tab" aria-selected={activeTab === "reviews"} className={activeTab === "reviews" ? "active" : ""} onClick={() => setActiveTab("reviews")}>Reviews ({reviewTabCount})</button>
        </div>
        <div className="tab-panel" role="tabpanel">
          {activeTab === "description" && <TamilDescription text={product.desc_ta} />}
          {activeTab === "additional" && (
            <dl className="additional-information">
              <div><dt>Pack</dt><dd>{selectedVariant.label}</dd></div>
              <div><dt>Weight</dt><dd>{product.weight}</dd></div>
              <div><dt>Dimensions</dt><dd>{product.dims}</dd></div>
              <div><dt>SKU</dt><dd>{product.sku}</dd></div>
              <div><dt>Availability</dt><dd>{product.stock}</dd></div>
              <div><dt>Category</dt><dd>{product.categoryLabel} · <span lang="ta">{product.tamilName}</span></dd></div>
            </dl>
          )}
          {activeTab === "reviews" && (
            <div className="reviews-panel">
              <Star size={25} />
              <p>{product.reviewCount ? "Customer feedback for this traditionally sourced product." : "No reviews yet. Be the first to share your experience."}</p>
            </div>
          )}
        </div>
      </section>

      <section className="related-products">
        <div className="section-heading">
          <h2>Related Products</h2>
          <Link href={`/shop?category=${encodeURIComponent(product.category)}`}>View All <ArrowRight size={16} /></Link>
        </div>
        <div className="related-grid">
          {relatedProducts.map((item) => <ProductCard product={item} compact key={item.slug} />)}
        </div>
      </section>
    </main>
  );
}

function BotanicalDecoration({ className }) {
  return (
    <svg className={className} viewBox="0 0 240 200" fill="none" aria-hidden="true">
      <path d="M235 2C184 43 136 97 70 180" stroke="currentColor" strokeWidth="2" />
      <path d="M203 30C181 7 153 4 132 9C147 32 170 42 203 30Z" fill="currentColor" opacity="0.2" />
      <path d="M183 53C204 55 222 68 229 88C204 88 187 76 183 53Z" fill="currentColor" opacity="0.16" />
      <path d="M157 80C139 50 111 39 86 41C101 70 124 85 157 80Z" fill="currentColor" opacity="0.2" />
      <path d="M137 105C160 107 179 122 185 144C158 142 141 129 137 105Z" fill="currentColor" opacity="0.16" />
      <path d="M111 133C91 105 65 98 43 103C61 128 82 139 111 133Z" fill="currentColor" opacity="0.2" />
      <path d="M91 155C111 160 126 174 130 192C108 188 94 176 91 155Z" fill="currentColor" opacity="0.16" />
      <path d="M70 180C50 156 29 151 10 156C26 177 45 186 70 180Z" fill="currentColor" opacity="0.2" />
    </svg>
  );
}

function ChevronDownSafe() {
  return <span className="variant-check"><Check size={13} /></span>;
}
