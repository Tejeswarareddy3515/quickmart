import Link from "next/link";

const tiers = [
  { name: "Daily Essentials", price: "₹99/mo", description: "Perfect for core grocery needs and recurring staples." },
  { name: "Family Plus", price: "₹199/mo", description: "More savings, more convenience, and exclusive offers." },
  { name: "Premium", price: "₹299/mo", description: "Best for frequent shoppers who want premium perks." },
];

export default function SubscriptionsPage() {
  return (
    <main className="min-h-screen bg-slate-50 px-4 py-24 text-slate-900 sm:px-6 lg:px-8 dark:bg-slate-950 dark:text-white">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-indigo-500">Subscriptions</p>
          <h1 className="text-4xl font-bold sm:text-5xl">Save more with recurring plans</h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-600 dark:text-slate-400">
            Choose a subscription plan and enjoy regular delivery perks, extra discounts, and simple reordering.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {tiers.map((tier) => (
            <div key={tier.name} className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <h2 className="text-xl font-semibold">{tier.name}</h2>
              <div className="mt-4 text-3xl font-bold text-indigo-600 dark:text-indigo-300">{tier.price}</div>
              <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-400">{tier.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link href="/shop" className="rounded-full bg-indigo-600 px-6 py-3 font-semibold text-white transition hover:bg-indigo-700">
            Start shopping
          </Link>
        </div>
      </div>
    </main>
  );
}
