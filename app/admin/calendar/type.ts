// export type BookingRow =
//   | {
//       kind: "BOOKING";
//       id: string;
//       checkIn: string;   // YYYY-MM-DD
//       checkOut: string;  // YYYY-MM-DD
//       paymentStatus: "PAID" | "PENDING" | "CANCELLED";
//       guestName: string;
//       email: string;
//       phone: string;
//       total: number;
//       paymentMethod: string;
//       createdAt: string;
//     }
//   | {
//       kind: "BLOCK";
//       id: string;
//       checkIn: string;   // start_date
//       checkOut: string;  // end_date (exclusive)
//       paymentStatus: "PENDING"; // unused, but keeps UI simple
//       note?: string | null;
//       createdAt: string;
//       guestName: string;
//       email: string;
//       phone: string;
//       total: number;
//       paymentMethod: string;
//     };

// export type DaySelection = {
//   day: string;
//   items: BookingRow[];
// };
export type BookingRow =
  | {
      kind: "BOOKING";
      id: string;
      checkIn: string;
      checkOut: string;
      paymentStatus: "PAID" | "PENDING" | "CANCELLED";
      guestName: string;
      email: string;
      phone: string;
      total: number;
      paymentMethod: string;
      createdAt: string;
    }
  | {
      kind: "BLOCK";
      id: string;
      checkIn: string;
      checkOut: string;
      paymentStatus: "PENDING";
      note?: string | null;
      createdAt: string;
      guestName: string;
      email: string;
      phone: string;
      total: number;
      paymentMethod: string;
    };

export type DaySelection = {
  day: string;
  items: BookingRow[];
};
