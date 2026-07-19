import Link from "next/link";

const offers = [
  { title: "Weekend Flash Sale", description: "Up to 40% off on essentials and pantry staples.", tag: "Today only" },
  { title: "Free delivery over ₹499", description: "Enjoy zero delivery fees on orders above the threshold.", tag: "New" },
  { title: "Subscribe & Save", description: "Get recurring benefits and extra savings on your favorites.", tag: "Popular" },
];

export default function OffersPage() {
  return (
    <main className="min-h-screen bg-slate-50 px-4 py-24 text-slate-900 sm:px-6 lg:px-8 dark:bg-slate-950 dark:text-white">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-indigo-500">Offers</p>
          <h1 className="text-4xl font-bold sm:text-5xl">Fresh deals for every order</h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-600 dark:text-slate-400">
            Unlock special pricing, quick delivery perks, and member-only savings on your next order.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {offers.map((offer) => (
            <div key={offer.title} className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <div className="mb-4 inline-flex rounded-full bg-amber-500/10 px-3 py-1 text-sm font-semibold text-amber-600 dark:text-amber-300">
                {offer.tag}
              </div>
              <h2 className="text-xl font-semibold">{offer.title}</h2>
              <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-400">{offer.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link href="/shop" className="rounded-full bg-indigo-600 px-6 py-3 font-semibold text-white transition hover:bg-indigo-700">
            Shop now
          </Link>
        </div>
      </div>
    </main>
  );
}
