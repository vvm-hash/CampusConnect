import Image from "next/image";

const projects = [
  {
    name: "Campus Navigation App",
    members: 4,
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c",
    description: "Helping students easily find rooms & departments on campus.",
  },
  {
    name: "Study Group Finder",
    members: 7,
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f",
    description: "Connect with peers preparing for the same subjects.",
  },
  {
    name: "Event Management Portal",
    members: 3,
    image: "https://images.unsplash.com/photo-1531482615713-2afd69097998",
    description: "Manage and discover campus events in one place.",
  },
  {
    name: "College Marketplace",
    members: 5,
    image: "https://images.unsplash.com/photo-1515165562835-c4c6b3d17c43",
    description: "Buy & sell used books, notes, and accessories easily.",
  },
];

export default function MyProjectsPage() {
  return (
    <div>
      <h1 className="text-4xl font-bold text-orange-800 mb-10">My Projects</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">

        {/* NEW Create Your Project Card */}
        <div className="bg-white rounded-3xl border-2 border-dashed border-orange-300 shadow-sm hover:shadow-md flex items-center justify-center p-6 cursor-pointer transition hover:bg-orange-50">
          <div className="text-center">
            <div className="text-5xl text-orange-600 mb-3">+</div>
            <p className="text-orange-700 font-semibold text-lg">Create New Project</p>
          </div>
        </div>

        {/* Original Project Cards */}
        {projects.map((project, index) => (
          <div
            key={index}
            className="bg-white rounded-3xl border border-orange-200 shadow-lg overflow-hidden hover:shadow-xl transition"
          >
            <div className="h-44 w-full relative">
              <Image
                src={project.image}
                alt={project.name}
                fill
                className="object-cover"
              />
            </div>

            <div className="p-6">
              <h3 className="text-2xl font-bold text-orange-700">
                {project.name}
              </h3>
              <p className="text-gray-600 text-sm mb-2">
                {project.description}
              </p>
              <p className="text-gray-600 mb-4">{project.members} members</p>

              <button className="w-full border border-orange-600 text-orange-700 rounded-xl py-2 hover:bg-orange-600 hover:text-white transition font-semibold">
                View Project
              </button>
            </div>
          </div>
        ))}

      </div>
    </div>
  );
}
