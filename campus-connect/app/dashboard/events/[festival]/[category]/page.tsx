"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import InterestedPanel from "./InterestedPanel";

export default function CategoryPage() {
    const params = useParams();

    const festival = Array.isArray(params.festival) ? params.festival[0] : params.festival || "";
    const category = Array.isArray(params.category) ? params.category[0] : params.category || "";

    const [showPanel, setShowPanel] = useState(false);
    const [interested, setInterested] = useState(false);

    const handleInterested = () => {
        setInterested(true);
    };


    return (
        <div className="p-6 h-full overflow-y-auto">
            {/* Title */}
            <h1 className="text-4xl font-bold text-orange-800 mb-6">
                {category.toUpperCase()} at {festival.toUpperCase()}
            </h1>


            {/* ---------- EVENT DETAILS SECTION ---------- */}
            <div className="bg-white p-6 rounded-2xl shadow-md border border-orange-200 max-w-4xl">
                <h2 className="text-2xl font-semibold text-orange-700 mb-4">Event Details</h2>

                <div className="text-gray-700 leading-relaxed space-y-3 max-h-[40vh] overflow-y-auto pr-2">
                    <p>
                        Welcome to the {category} event at {festival}! This competition brings together
                        the brightest minds to collaborate, innovate, and build something extraordinary.
                    </p>

                    <p>
                        <strong>Rules & Requirements:</strong>
                    </p>

                    <ul className="list-disc list-inside space-y-1">
                        <li>Team size: 2-4 members</li>
                        <li>Event duration: 24 hours</li>
                        <li>Topic/theme will be announced at the venue</li>
                        <li>Bring your own laptops & chargers</li>
                        <li>Maintain discipline and respect campus rules</li>
                    </ul>

                    <p>
                        Judging will be based on creativity, implementation, teamwork, and presentation.
                        Certificates will be awarded to all participants, and exciting prizes await the winners!
                    </p>
                </div>
            </div>

            {/* ---------- INTEREST BUTTONS ---------- */}
            <div className="flex gap-4 mt-8">

                {!interested ? (
                    <button
                        onClick={handleInterested}
                        className="px-6 py-2 bg-orange-600 text-white rounded-lg font-semibold hover:bg-orange-700 transition"
                    >
                        I'm Interested
                    </button>
                ) : (
                    <button
                        disabled
                        className="px-6 py-2 bg-gray-300 text-gray-700 rounded-lg font-semibold cursor-default"
                    >
                        ✅ Interested
                    </button>
                )}

                <button
                    onClick={() => setShowPanel(true)}
                    className="px-6 py-2 border border-orange-600 text-orange-600 rounded-lg font-semibold hover:bg-orange-50 transition"
                >
                    View Interested (1)
                </button>
            </div>

            {/* ---------- SLIDE PANEL ---------- */}
            <InterestedPanel open={showPanel} onClose={() => setShowPanel(false)} />
        </div>
    );
}
