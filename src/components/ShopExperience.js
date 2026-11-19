"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { ArrowUpDown, ChevronDown, ChevronLeft, ChevronRight, LayoutGrid, Search, SlidersHorizontal, X } from "lucide-react";
import ProductCard from "./ProductCard";
import { categories, products } from "@/data/products";
import { useStore } from "./StoreProvider";

const PAGE_SIZE = 12;

function PriceRange({ value, onChange }) {
  const [minimum, maximum] = value;
  const start = ((minimum - 40) / 660) * 100;
  const end = ((maximum - 40) / 660) * 100;

  return (
    <div className="dual-range" style={{ "--range-start": `${start}%`, "--range-end": `${end}%` }}>
      <div className="range-line" />
      <input
        type="range"
        min="40"
        max="700"
        step="10"
        value={minimum}
        onChange={(event) => onChange([Math.min(Number(event.target.value), maximum - 10), maximum])}
        aria-label="Minimum price"
      />
      <input
        type="range"
        min="40"
        max="700"
        step="10"
        value={maximum}
        onChange={(event) => onChange([minimum, Math.max(Number(event.target.value), minimum + 10)])}
        aria-label="Maximum price"
      />
    </div>
  );
}

function FilterPanel({
  search,
  setSearch,
  category,
  chooseCategory,
  price,
  setPrice,
  applyPrice,
  clearAll,
  searchRef,
  open,
  close,
}) {
  return (
    <aside className={`filters-panel${open ? " is-open" : ""}`} aria-label="Product filters">
      <div className="filters-heading">
        <h2><SlidersHorizontal size={19} /> Filters</h2>
        <button type="button" onClick={clearAll}>Clear All</button>
        <button className="filters-close" type="button" onClick={close} aria-label="Close filters"><X size={19} /></button>
      </div>
      <div className="filter-group search-filter">
        <label htmlFor="product-search">Search</label>
        <div className="search-field">
          <Search size={16} aria-hidden="true" />
          <input
            ref={searchRef}
            id="product-search"
            type="search"
            placeholder="Search products..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
        </div>
      </div>
      <fieldset className="filter-group category-filter">
        <legend>Category</legend>
        <label className="category-option">
          <input type="checkbox" checked={category === "all"} onChange={() => chooseCategory("all")} />
          <span>All Products</span><small>({products.length})</small>
        </label>
        {categories.map((item) => (
          <label className="category-option" key={item.value}>
            <input type="checkbox" checked={category === item.value} onChange={() => chooseCategory(item.value)} />
            <span>{item.label}</span><small>({item.count})</small>
          </label>
        ))}
      </fieldset>
      <div className="filter-group price-filter">
        <h3>Price Range</h3>
        <p>₹{price[0]} – ₹{price[1]}</p>
        <PriceRange value={price} onChange={setPrice} />
      </div>
      <button className="apply-filters" type="button" onClick={applyPrice}>Apply Filters</button>
    </aside>
  );
}

function pageNumbers(current, total) {
  if (total <= 7) return Array.from({ length: total }, (_, index) => index + 1);
  if (current <= 3) return [1, 2, 3, 4, 5, "end-ellipsis", total];
  if (current >= total - 2) return [1, "start-ellipsis", total - 4, total - 3, total - 2, total - 1, total];
  return [1, "start-ellipsis", current - 1, current, current + 1, "end-ellipsis", total];
}

export default function ShopExperience({ initialCategory, initialWishlist, focusSearch }) {
  const { wishlist } = useStore();
  const [search, setSearchValue] = useState("");
  const [category, setCategory] = useState(initialCategory);
  const [price, setPriceValue] = useState([40, 700]);
  const [appliedPrice, setAppliedPrice] = useState([40, 700]);
  const [sort, setSort] = useState("featured");
  const [page, setPage] = useState(1);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [showWishlist, setShowWishlist] = useState(initialWishlist);
  const [largeGrid, setLargeGrid] = useState(false);
  const searchRef = useRef(null);

  useEffect(() => {
    if (focusSearch) searchRef.current?.focus();
  }, [focusSearch]);

  const filteredProducts = useMemo(() => {
    const query = search.trim().toLocaleLowerCase();
    const result = products.filter((product) => {
      const matchesSearch = !query || `${product.name} ${product.desc_ta}`.toLocaleLowerCase().includes(query);
      const matchesCategory = category === "all" || product.category === category;
      const matchesPrice = product.price >= appliedPrice[0] && product.price <= appliedPrice[1];
      const matchesWishlist = !showWishlist || wishlist.includes(product.slug);
      return matchesSearch && matchesCategory && matchesPrice && matchesWishlist;
    });

    return [...result].sort((a, b) => {
      if (sort === "price-low") return a.price - b.price;
      if (sort === "price-high") return b.price - a.price;
      if (sort === "name") return a.baseName.localeCompare(b.baseName);
      return a.featuredRank - b.featuredRank || a.baseName.localeCompare(b.baseName);
    });
  }, [search, category, appliedPrice, sort, showWishlist, wishlist]);

  const totalPages = Math.max(1, Math.ceil(filteredProducts.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const visibleProducts = filteredProducts.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  function setSearch(value) {
    setSearchValue(value);
    setPage(1);
  }

  function chooseCategory(value) {
    setCategory(value);
    setPage(1);
  }

  function setPrice(value) {
    setPriceValue(value);
  }

  function applyPrice() {
    setAppliedPrice(price);
    setPage(1);
    setFiltersOpen(false);
  }

  function clearAll() {
    setSearchValue("");
    setCategory("all");
    setPriceValue([40, 700]);
    setAppliedPrice([40, 700]);
    setShowWishlist(false);
    setSort("featured");
    setPage(1);
  }

  function goToPage(nextPage) {
    setPage(nextPage);
    document.getElementById("shop-products")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <main className="shop-page page-shell">
      <h1 className="sr-only">Shop all organic products</h1>
      <button className="mobile-filter-button" type="button" onClick={() => setFiltersOpen(true)}>
        <SlidersHorizontal size={18} /> Filters
      </button>
      {filtersOpen && <button className="filter-backdrop" type="button" onClick={() => setFiltersOpen(false)} aria-label="Close filters" />}
      <FilterPanel
        search={search}
        setSearch={setSearch}
        category={category}
        chooseCategory={chooseCategory}
        price={price}
        setPrice={setPrice}
        applyPrice={applyPrice}
        clearAll={clearAll}
        searchRef={searchRef}
        open={filtersOpen}
        close={() => setFiltersOpen(false)}
      />
      <section className="shop-results" id="shop-products" aria-label="Product catalogue">
        <div className="shop-toolbar">
          <div className="results-title">
            <button
              className="results-icon"
              type="button"
              onClick={() => setLargeGrid((value) => !value)}
              aria-label={largeGrid ? "Show standard product grid" : "Show larger product cards"}
              aria-pressed={largeGrid}
              title={largeGrid ? "Standard grid view" : "Large grid view"}
            >
              <LayoutGrid size={20} aria-hidden="true" />
            </button>
            <div>
              <strong>{filteredProducts.length} Products</strong>
              <small>Page {currentPage} of {totalPages}</small>
            </div>
            {showWishlist && <span className="wishlist-label">My wishlist</span>}
          </div>
          <label className="sort-control">
            <span>Sort by</span>
            <span className="select-wrap">
              <ArrowUpDown className="sort-icon" size={15} aria-hidden="true" />
              <select value={sort} onChange={(event) => { setSort(event.target.value); setPage(1); }} aria-label="Sort products">
                <option value="featured">Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="name">Name: A to Z</option>
              </select>
              <ChevronDown className="select-chevron" size={14} aria-hidden="true" />
            </span>
          </label>
        </div>
        {visibleProducts.length > 0 ? (
          <div className={`products-grid${largeGrid ? " products-grid-large" : ""}`}>
            {visibleProducts.map((product) => <ProductCard product={product} key={product.slug} />)}
          </div>
        ) : (
          <div className="empty-results">
            <Search size={30} />
            <h2>No products found</h2>
            <p>Try a different search or clear your filters.</p>
            <button className="button button-primary" type="button" onClick={clearAll}>Clear all filters</button>
          </div>
        )}
        {filteredProducts.length > PAGE_SIZE && (
          <nav className="pagination" aria-label="Product pages">
            <button type="button" onClick={() => goToPage(currentPage - 1)} disabled={currentPage === 1} aria-label="Previous page"><ChevronLeft size={17} /></button>
            {pageNumbers(currentPage, totalPages).map((item) =>
              typeof item === "number" ? (
                <button
                  type="button"
                  key={item}
                  className={item === currentPage ? "active" : ""}
                  onClick={() => goToPage(item)}
                  aria-current={item === currentPage ? "page" : undefined}
                >{item}</button>
              ) : <span key={item}>···</span>,
            )}
            <button type="button" onClick={() => goToPage(currentPage + 1)} disabled={currentPage === totalPages} aria-label="Next page"><ChevronRight size={17} /></button>
          </nav>
        )}
      </section>
    </main>
  );
}
