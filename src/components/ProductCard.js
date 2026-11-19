"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Heart, Minus, Plus, ShoppingCart } from "lucide-react";
import { formatPrice } from "@/data/products";
import { useStore } from "./StoreProvider";

export default function ProductCard({ product, compact = false }) {
  const { addToCart, toggleWishlist, wishlist } = useStore();
  const [quantity, setQuantity] = useState(1);
  const saved = wishlist.includes(product.slug);

  function handleAddToCart() {
    addToCart(product, quantity);
    setQuantity(1);
  }

  return (
    <article className={`product-card${compact ? " product-card-compact" : ""}`}>
      <div className="product-image-wrap">
        <Link href={`/product/${product.slug}`} aria-label={`View ${product.displayName}`}>
          <Image
            src={product.image}
            alt={product.displayName}
            fill
            sizes={compact ? "(max-width: 700px) 45vw, 25vw" : "(max-width: 700px) 45vw, (max-width: 1100px) 30vw, 22vw"}
            className="product-image"
          />
        </Link>
        <button
          className={`wishlist-button${saved ? " is-saved" : ""}`}
          type="button"
          onClick={() => toggleWishlist(product)}
          aria-label={saved ? `Remove ${product.baseName} from wishlist` : `Add ${product.baseName} to wishlist`}
        >
          <Heart size={18} fill={saved ? "currentColor" : "none"} />
        </button>
        {!compact && <span className="product-pack">{product.pack}</span>}
      </div>
      <h3><Link href={`/product/${product.slug}`}>{product.displayName}</Link></h3>
      <div className="product-purchase-row">
        <p className="product-price">{formatPrice(product.price)}</p>
        <div className="card-quantity" role="group" aria-label={`Quantity for ${product.displayName}`}>
          <button
            type="button"
            onClick={() => setQuantity((value) => Math.max(1, value - 1))}
            disabled={quantity === 1}
            aria-label={`Decrease quantity for ${product.displayName}`}
          >
            <Minus size={13} aria-hidden="true" />
          </button>
          <span aria-live="polite">{quantity}</span>
          <button
            type="button"
            onClick={() => setQuantity((value) => Math.min(20, value + 1))}
            disabled={quantity === 20}
            aria-label={`Increase quantity for ${product.displayName}`}
          >
            <Plus size={13} aria-hidden="true" />
          </button>
        </div>
      </div>
      <button className="add-to-cart" type="button" onClick={handleAddToCart}>
        <ShoppingCart size={16} aria-hidden="true" />
        <span>Add to Cart</span>
      </button>
    </article>
  );
}
