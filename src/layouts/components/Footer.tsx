import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-[#050505] text-white">

      {/* Background Glow */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-0 h-80 w-80 -translate-x-1/2 rounded-full bg-violet-600/10 blur-[140px]" />
        <div className="absolute right-0 bottom-0 h-64 w-64 rounded-full bg-emerald-500/5 blur-[120px]" />
      </div>

      <div className="mx-auto max-w-7xl px-6 py-20">

        <div className="grid gap-16 md:grid-cols-[1.4fr_1fr_1fr_1fr]">

          {/* Brand */}
          <div>

            <h2 className="text-3xl font-bold tracking-tight">
              Four<span className="text-violet-400">X</span>Club
            </h2>

            <p className="mt-6 max-w-sm leading-7 text-zinc-400">
              Live trading • Real discussions • No signals • No hype
            </p>

          </div>

          {/* Product */}
          <div>

            <h3 className="mb-5 text-sm font-semibold uppercase tracking-widest text-zinc-500">
              Product
            </h3>

            <div className="space-y-3">

              <Link
                to="/courses"
                className="block text-zinc-300 transition hover:text-white"
              >
                Courses
              </Link>

              <Link
                to="/community"
                className="block text-zinc-300 transition hover:text-white"
              >
                Community
              </Link>

              <Link
                to="/pricing"
                className="block text-zinc-300 transition hover:text-white"
              >
                Pricing
              </Link>

            </div>

          </div>

          {/* Contact */}
          <div>

            <h3 className="mb-5 text-sm font-semibold uppercase tracking-widest text-zinc-500">
              Contact
            </h3>

            <div className="space-y-3">

              <a
                href="#"
                className="block text-zinc-300 transition hover:text-white"
              >
                Instagram
              </a>

              <a
                href="https://discord.gg/vrHwGxE3VA"
                target="_blank"
                rel="noreferrer"
                className="block text-zinc-300 transition hover:text-white"
              >
                Discord
              </a>

              <a
                href="mailto:contact@fourxclub.com"
                className="block text-zinc-300 transition hover:text-white"
              >
                Email
              </a>

            </div>

          </div>

          {/* Legal */}
          <div>

            <h3 className="mb-5 text-sm font-semibold uppercase tracking-widest text-zinc-500">
              Legal
            </h3>

            <div className="space-y-3">

              <Link
                to="/terms"
                className="block text-zinc-300 transition hover:text-white"
              >
                Terms & Conditions
              </Link>

              <Link
                to="/privacy"
                className="block text-zinc-300 transition hover:text-white"
              >
                Privacy Policy
              </Link>

            </div>

          </div>

        </div>

        {/* Bottom */}

        <div className="mt-16 flex flex-col items-center justify-between gap-6 border-t border-white/10 pt-8 text-sm text-zinc-500 md:flex-row">

          <p>
            © 2026 FourXClub. All rights reserved.
          </p>

          <div className="flex items-center gap-5">

            <span className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-emerald-400" />
              Community First
            </span>

            <span className="hidden md:block">
              Built for Serious Traders
            </span>

          </div>

        </div>

      </div>
    </footer>
  );
}