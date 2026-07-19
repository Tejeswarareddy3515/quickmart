import Link from "next/link";

const categories = [
  { slug: "fresh-fruits", name: "Fresh Fruits", description: "Seasonal fruit, organic picks, and daily essentials." },
  { slug: "vegetables", name: "Vegetables", description: "Leafy greens, roots, herbs, and pantry staples." },
  { slug: "dairy-eggs", name: "Dairy & Eggs", description: "Milk, yogurt, butter, eggs, and more." },
  { slug: "bakery", name: "Bakery", description: "Fresh bread, cakes, buns, and breakfast treats." },
  { slug: "beverages", name: "Beverages", description: "Juices, sparkling drinks, tea, and coffee." },
  { slug: "snacks", name: "Snacks", description: "Chips, cookies, namkeen, and sweet cravings." },
  { slug: "household", name: "Household", description: "Cleaning, laundry, storage, and everyday needs." },
  { slug: "personal-care", name: "Personal Care", description: "Bath, skincare, hygiene, and wellness items." },
];

export default function CategoriesPage() {
  return (
    <main className="min-h-screen bg-slate-50 px-4 py-24 text-slate-900 sm:px-6 lg:px-8 dark:bg-slate-950 dark:text-white">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-indigo-500">Shop by category</p>
          <h1 className="text-4xl font-bold sm:text-5xl">Browse everything you need</h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-600 dark:text-slate-400">
            Discover fresh groceries, home essentials, and curated picks across all the categories you love.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {categories.map((category) => (
            <Link
              key={category.slug}
              href={`/categories/${category.slug}`}
              className="group rounded-3xl border border-slate-200 bg-white p-8 shadow-sm transition hover:-translate-y-1 hover:shadow-xl dark:border-slate-800 dark:bg-slate-900"
            >
              <div className="mb-4 inline-flex rounded-full bg-indigo-500/10 px-3 py-1 text-sm font-medium text-indigo-600 dark:text-indigo-300">
                {category.name}
              </div>
              <h2 className="text-xl font-semibold">{category.name}</h2>
              <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-400">{category.description}</p>
              <span className="mt-6 inline-flex items-center text-sm font-semibold text-indigo-600 dark:text-indigo-300">
                Explore products →
              </span>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
