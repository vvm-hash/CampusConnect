import Image from "next/image";

export default function Home() {
  return (
    <div className="bg-white text-gray-900">

      {/* NAVBAR */}
      <nav className="absolute top-0 left-0 w-full flex items-center justify-between px-8 py-5 z-20 bg-black/20 backdrop-blur-sm">
        <div className="flex items-center gap-3">
          <Image
            src="/logo.png"
            alt="Campus Connect Logo"
            width={48}
            height={48}
            className="rounded-md"
          />
          <span className="text-3xl font-bold text-white drop-shadow-md">
            Campus Connect
          </span>
        </div>

        <div className="flex gap-6 text-white text-lg font-medium drop-shadow">
          <a href="/login" className="hover:opacity-80 transition">Login</a>
          <a href="/signup" className="hover:opacity-80 transition">Sign Up</a>
        </div>
      </nav>

      {/* FULL SCREEN HERO IMAGE */}
      <section className="relative h-screen w-full flex items-center justify-center text-center">
        <Image
          src="https://images.unsplash.com/photo-1532614338840-ab30cf10ed36"
          alt="Campus Students"
          fill
          priority
          className="object-cover"
        />

        <div className="absolute inset-0 bg-orange-200/20"></div>

        <div className="relative z-10">
          <h1 className="text-6xl font-extrabold text-white drop-shadow-xl mb-6">
            Campus Connect
          </h1>
          <p className="text-2xl text-white max-w-3xl mx-auto drop-shadow">
            A warm and friendly digital campus hub to collaborate, join events,
            find groups, and build memories.
          </p>

          <div className="mt-8 flex gap-4 justify-center">
            <a
              href="/login"
              className="bg-orange-600 hover:bg-orange-700 text-white px-15 py-5 rounded-xl text-2xl font-semibold transition shadow-lg"
            >
              Login
            </a>
            <a
              href="/signup"
              className="bg-white hover:bg-orange-100 text-orange-700 border border-orange-600 px-15 py-5 rounded-xl text-2xl font-semibold transition shadow-lg"
            >
              Sign Up
            </a>
          </div>
        </div>
      </section>

    </div>
  );
}
