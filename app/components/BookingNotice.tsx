"use client";

export default function BookingNotice() {
  return (
    <div className="relative -mt-20 z-20 max-w-3xl mx-auto px-4">
      <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6">
        <div className="flex items-start gap-3">
          <span className="text-blue-500 text-xl">ℹ️</span>
          <div>
            <h3 className="font-semibold text-lg mb-2">
              Before You Book
            </h3>

            <p className="text-gray-600 text-sm mb-3">
              Vita Resort is a boutique suite hotel. We do not have:
            </p>

            <div className="flex flex-wrap gap-2 mb-3">
              <span className="px-3 py-1 rounded-full bg-gray-100 text-sm">
                ❌ Restaurant
              </span>
              <span className="px-3 py-1 rounded-full bg-gray-100 text-sm">
                ❌ Swimming pool
              </span>
              <span className="px-3 py-1 rounded-full bg-gray-100 text-sm">
                ❌ Reception hall
              </span>
            </div>

            <p className="text-sm text-green-600">
              ✅ We focus entirely on delivering an exceptional suite experience.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
