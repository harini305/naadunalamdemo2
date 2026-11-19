"use client";

import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, ShoppingBag, Trash2, X } from "lucide-react";
import { formatPrice } from "@/data/products";
import { useStore } from "./StoreProvider";

export default function CartDrawer() {
  const { cart, cartOpen, closeCart, subtotal, updateQuantity, removeFromCart } = useStore();

  if (!cartOpen) return null;

  return (
    <div className="cart-layer" role="presentation">
      <button className="cart-backdrop" type="button" onClick={closeCart} aria-label="Close basket" />
      <aside className="cart-drawer" role="dialog" aria-modal="true" aria-labelledby="cart-title">
        <div className="cart-heading">
          <div><span>Your selection</span><h2 id="cart-title">Shopping Basket</h2></div>
          <button className="icon-button" type="button" onClick={closeCart} aria-label="Close basket"><X size={21} /></button>
        </div>
        {cart.length === 0 ? (
          <div className="empty-cart">
            <ShoppingBag size={38} strokeWidth={1.5} />
            <h3>Your basket is empty</h3>
            <p>Add a few traditional favourites from our collection.</p>
            <button className="button button-primary" type="button" onClick={closeCart}>Explore products</button>
          </div>
        ) : (
          <>
            <div className="cart-items">
              {cart.map((item) => (
                <article className="cart-item" key={item.key}>
                  <Link href={`/product/${item.slug}`} onClick={closeCart} className="cart-item-image">
                    <Image src={item.image} alt={item.name} fill sizes="76px" />
                  </Link>
                  <div className="cart-item-copy">
                    <Link href={`/product/${item.slug}`} onClick={closeCart}>{item.name}</Link>
                    <span>{item.pack} · {formatPrice(item.price)}</span>
                    <div className="cart-item-controls">
                      <div className="quantity-control small">
                        <button type="button" onClick={() => updateQuantity(item.key, item.quantity - 1)} aria-label="Decrease quantity"><Minus size={13} /></button>
                        <span>{item.quantity}</span>
                        <button type="button" onClick={() => updateQuantity(item.key, item.quantity + 1)} aria-label="Increase quantity"><Plus size={13} /></button>
                      </div>
                      <button className="remove-item" type="button" onClick={() => removeFromCart(item.key)} aria-label={`Remove ${item.name}`}><Trash2 size={15} /></button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
            <div className="cart-summary">
              <div><span>Subtotal</span><strong>{formatPrice(subtotal)}</strong></div>
              <p>Delivery is calculated when your order is confirmed.</p>
              <button className="button button-primary" type="button" onClick={closeCart}>Continue shopping</button>
            </div>
          </>
        )}
      </aside>
    </div>
  );
}
