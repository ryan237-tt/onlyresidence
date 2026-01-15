import AdminBookingsTable from "./table";

export default function AdminBookingsPage() {
  return (
    <main className="min-h-screen bg-white p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl font-semibold">Bookings</h1>
        <p className="text-sm text-gray-600 mt-1">
          Mark payments as PAID when confirmed via WhatsApp / Mobile Money / Card.
        </p>

        <div className="mt-6">
          <AdminBookingsTable />
        </div>
      </div>
    </main>
  );
}
