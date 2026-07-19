import Link from "next/link";

const categoryMeta: Record<string, { name: string; description: string }> = {
  "fresh-fruits": { name: "Fresh Fruits", description: "Fresh produce, seasonal fruits, and healthy picks delivered fast." },
  vegetables: { name: "Vegetables", description: "Leafy greens, roots, herbs, and pantry staples for every meal." },
  "dairy-eggs": { name: "Dairy & Eggs", description: "Daily essentials like milk, yogurt, butter, and eggs." },
  bakery: { name: "Bakery", description: "Fresh bread, buns, cakes, and breakfast favorites." },
  beverages: { name: "Beverages", description: "Juices, cool drinks, teas, coffees, and more." },
  snacks: { name: "Snacks", description: "Crunchy bites, cookies, namkeen, and sweet treats." },
  household: { name: "Household", description: "Cleaning, detergent, storage, and everyday home needs." },
  "personal-care": { name: "Personal Care", description: "Bath, skincare, hygiene, and wellness essentials." },
};

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-24 text-slate-900 sm:px-6 lg:px-8 dark:bg-slate-950 dark:text-white">
      <div className="mx-auto max-w-4xl rounded-3xl border border-slate-200 bg-white p-10 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-indigo-500">Category</p>
        <h1 className="text-4xl font-bold sm:text-5xl">{categoryMeta[slug]?.name ?? "Category"}</h1>
        <p className="mt-4 text-lg text-slate-600 dark:text-slate-400">
          {categoryMeta[slug]?.description ?? "This category is ready for your curated product collection."}
        </p>
        <div className="mt-8 flex flex-wrap gap-4">
          <Link href="/shop" className="rounded-full bg-indigo-600 px-6 py-3 font-semibold text-white transition hover:bg-indigo-700">
            Browse products
          </Link>
          <Link href="/categories" className="rounded-full border border-slate-300 px-6 py-3 font-semibold text-slate-700 transition hover:border-indigo-500 hover:text-indigo-600 dark:border-slate-700 dark:text-slate-200">
            View all categories
          </Link>
        </div>
      </div>
    </main>
  );
}
