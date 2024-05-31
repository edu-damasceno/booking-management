import React from "react";
import { useBookings } from "../../context/useBookings";
import BookingItem from "../BookingItem";

const BookingList: React.FC = () => {
  const { bookings } = useBookings();
  return (
    <div>
      {bookings.length > 0 ? (
        bookings.map((booking) => (
          <BookingItem key={booking.id} booking={booking} />
        ))
      ) : (
        <p>No bookings available.</p>
      )}
    </div>
  );
};

export default BookingList;
