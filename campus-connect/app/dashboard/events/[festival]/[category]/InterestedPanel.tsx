"use client";

export default function InterestedPanel({ open, onClose }: any) {
  if (!open) return null;

  return (
    <div className="fixed top-0 right-0 h-full w-72 bg-white border-l shadow-lg p-5 z-50 flex flex-col">
      <h2 className="text-lg font-bold mb-4 text-orange-700">Interested People</h2>

      <div className="flex-1 overflow-y-auto space-y-3">
        <div className="p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
          <p className="font-medium">Anonymous Student</p>
        </div>
      </div>

      <button
        onClick={onClose}
        className="mt-4 bg-orange-600 text-white py-2 rounded-lg hover:bg-orange-700 transition"
      >
        Close
      </button>
    </div>
  );
}
