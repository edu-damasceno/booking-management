import React, { createContext, useState } from "react";
import { Booking } from "../types";

interface BookingContextType {
  bookings: Booking[];
  saveBooking: (booking: Booking) => boolean;
  deleteBooking: (id: number) => void;
}

export const BookingContext = createContext<BookingContextType | undefined>(
  undefined
);

const BookingProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [bookings, setBookings] = useState<Booking[]>([]);

  const isOverlapping = (newBooking: Booking, existingBookings: Booking[]) => {
    return existingBookings.some(
      (booking) =>
        booking.property === newBooking.property &&
        new Date(newBooking.startDate) < new Date(booking.endDate) &&
        new Date(newBooking.endDate) > new Date(booking.startDate)
    );
  };

  const saveBooking = (booking: Booking) => {
    const filteredBookings = bookings.filter((b) => b.id !== booking.id);
    if (isOverlapping(booking, filteredBookings)) {
      alert(
        "Booking dates overlap with an existing booking for this property."
      );
      return false;
    }
    if (bookings.some((b) => b.id === booking.id)) {
      setBookings(bookings.map((b) => (b.id === booking.id ? booking : b)));
    } else {
      setBookings([...bookings, booking]);
    }
    return true;
  };

  const deleteBooking = (id: number) => {
    setBookings(bookings.filter((booking) => booking.id !== id));
  };

  return (
    <BookingContext.Provider value={{ bookings, saveBooking, deleteBooking }}>
      {children}
    </BookingContext.Provider>
  );
};

export default BookingProvider;
