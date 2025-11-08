import Image from "next/image";

export default function Home() {
  return (
    <div className="bg-white text-gray-900">

      {/* FULL SCREEN HERO IMAGE */}
      <section className="relative h-screen w-full flex items-center justify-center text-center">
        <Image
          src="https://images.unsplash.com/photo-1532614338840-ab30cf10ed36"
          alt="Campus Students"
          fill
          priority
          className="object-cover"
        />

        {/* Soft overlay tint */}
        <div className="absolute inset-0 bg-orange-200/20"></div>

        {/* HERO TEXT & BUTTONS */}
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

      {/* ABOUT SECTION */}
      <section id="about" className="px-8 py-24 text-center bg-gradient-to-b from-amber-50 to-orange-100">
        <h2 className="text-5xl font-extrabold text-orange-800 mb-6">What is Campus Connect?</h2>
        <p className="text-2xl max-w-4xl mx-auto text-gray-700 leading-relaxed">
          A cozy student community space where collaboration thrives.
          Join clubs, explore events, meet new people, and grow together.
        </p>
      </section>

      {/* FEATURES */}
      <section id="features" className="px-10 py-24 bg-white text-center">
        <h2 className="text-4xl font-bold text-orange-700 mb-12">What Can You Do?</h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 max-w-6xl mx-auto">
          <div className="p-8 bg-amber-50 border border-orange-200 rounded-2xl shadow">
            <h3 className="text-xl font-semibold text-orange-700 mb-2">Join Clubs</h3>
            <p className="text-gray-600">Find your people. Explore hobbies and passions.</p>
          </div>

          <div className="p-8 bg-amber-50 border border-orange-200 rounded-2xl shadow">
            <h3 className="text-xl font-semibold text-orange-700 mb-2">Attend Events</h3>
            <p className="text-gray-600">Stay updated with fests, workshops and competitions.</p>
          </div>

          <div className="p-8 bg-amber-50 border border-orange-200 rounded-2xl shadow">
            <h3 className="text-xl font-semibold text-orange-700 mb-2">Find Teammates</h3>
            <p className="text-gray-600">Team up for hackathons, projects, or fun collabs.</p>
          </div>
        </div>
      </section>

    </div>
  );
}
