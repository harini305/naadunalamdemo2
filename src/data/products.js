import catalogue from "../../docs/source-audit/data/products.json";

const featuredOrder = [
  "organic-turmeric-powder",
  "cold-pressed-coconut-oil",
  "toor-dal",
  "tulsi-infused-honey",
  "barnyard-millet-kuthiraivali",
  "foxtail-millet-thinai",
];

const relatedMillets = ["cholam", "kambu", "samai-arisi", "kodo-millet-varagu"];

const latinNames = {
  "barnyard-millet-kuthiraivali": "Barnyard Millet (Kuthiraivali)",
  "foxtail-millet-thinai": "Foxtail Millet (Thinai)",
  cholam: "Sorghum (Jowar)",
  kambu: "Pearl Millet (Bajra)",
  "samai-arisi": "Little Millet (Samai)",
  "kodo-millet-varagu": "Kodo Millet (Varagu)",
};

const categoryOrder = [
  "Traditional Rice (பாரம்பரிய அரிசி வகைகள்)",
  "Aval / Flakes (அவல் வகைகள்)",
  "Millets (சிறுதானியங்கள்)",
  "Natural Sweeteners (இயற்கை இனிப்புகள்)",
  "Ghee & Oil (நெய் & எண்ணெய் வகைகள்)",
  "Health Mixes (ஆரோக்கிய மாவுகள்)",
  "Lentils and Pulses (பருப்பு வகைகள்)",
  "Masala & Powders (மசாலா & பொடி வகைகள்)",
  "Other Rice (மற்ற அரிசி வகைகள்)",
  "Herbal & Wellness (மூலிகை & நலவாழ்வு பொருட்கள்)",
  "Honey (தேன்)",
];

const categoryLabels = {
  "Traditional Rice (பாரம்பரிய அரிசி வகைகள்)": "Traditional Rice",
  "Aval / Flakes (அவல் வகைகள்)": "Aval / Flakes",
  "Millets (சிறுதானியங்கள்)": "Millets",
  "Natural Sweeteners (இயற்கை இனிப்புகள்)": "Natural Sweeteners",
  "Ghee & Oil (நெய் & எண்ணெய் வகைகள்)": "Ghee & Oil",
  "Health Mixes (ஆரோக்கிய மாவுகள்)": "Health Mixes",
  "Lentils and Pulses (பருப்பு வகைகள்)": "Lentils and Pulses",
  "Masala & Powders (மசாலா & பொடி வகைகள்)": "Masala & Powders",
  "Other Rice (மற்ற அரிசி வகைகள்)": "Other Rice",
  "Herbal & Wellness (மூலிகை & நலவாழ்வு பொருட்கள்)": "Personal Care",
  "Honey (தேன்)": "Honey",
};

function localImage(url) {
  return `/assets/${url.split("/").pop()}`;
}

function englishName(name) {
  return name.replace(/\s*\([^)]*[\u0b80-\u0bff][^)]*\)/g, "").trim();
}

function tamilName(name) {
  return name.match(/\(([^()]*[\u0b80-\u0bff][^()]*)\)/)?.[1] || "";
}

const allProducts = Object.entries(catalogue).map(([key, item]) => {
  const slug = key.replace(/^product-/, "");
  const category = item.categories[0];
  const baseName = englishName(item.name);
  const variants = slug === "organic-turmeric-powder"
    ? [{ label: "100 g", price: 40 }, { label: "250 g", price: 90 }]
    : slug === "cold-pressed-coconut-oil"
      ? [{ label: "500 ml", price: 280 }, { label: "1 L", price: 520 }]
      : [{ label: item.pack, price: Number(item.price) }];

  if (slug === "barnyard-millet-kuthiraivali") {
    variants.push({ label: "1 kg", price: 260 });
  }

  return {
    ...item,
    slug,
    baseName,
    displayName: latinNames[slug] || baseName,
    tamilName: tamilName(item.name),
    price: Number(item.price),
    image: localImage(item.image),
    gallery: item.gallery.map(localImage),
    category,
    categoryLabel: categoryLabels[category] || category,
    featuredRank: featuredOrder.includes(slug) ? featuredOrder.indexOf(slug) : 100,
    variants,
    reviewCount: slug === "cold-pressed-coconut-oil"
      ? 10
      : ["barnyard-millet-kuthiraivali", "organic-turmeric-powder"].includes(slug) ? 124 : 0,
  };
});

export const products = allProducts.sort((a, b) => {
  if (a.featuredRank !== b.featuredRank) return a.featuredRank - b.featuredRank;
  return a.baseName.localeCompare(b.baseName);
});

export const categories = categoryOrder.map((value) => ({
  value,
  label: categoryLabels[value],
  count: products.filter((product) => product.category === value).length,
}));

export function getProduct(slug) {
  return products.find((product) => product.slug === slug);
}

export function getRelatedProducts(product) {
  const preferred = product.slug === "barnyard-millet-kuthiraivali" ? relatedMillets : [];
  const preferredProducts = preferred.map(getProduct).filter(Boolean);
  const sameCategory = products.filter(
    (item) => item.category === product.category && item.slug !== product.slug,
  );
  return [...new Map([...preferredProducts, ...sameCategory].map((item) => [item.slug, item])).values()].slice(0, 4);
}

export function formatPrice(price) {
  return `₹${Number(price).toFixed(2)}`;
}
