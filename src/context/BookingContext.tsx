import React, { createContext, useState } from "react";
import { Booking } from "../types";

interface BookingContextType {
  bookings: Booking[];
  saveBooking: (booking: Booking) => { success: boolean; message?: string };
  deleteBooking: (id: string) => void;
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
        booking.property.id === newBooking.property.id &&
        newBooking.dateRange.from &&
        booking.dateRange.from &&
        newBooking.dateRange.to &&
        booking.dateRange.to &&
        new Date(newBooking.dateRange.from).getTime() <
          new Date(booking.dateRange.to).getTime() &&
        new Date(newBooking.dateRange.to).getTime() >
          new Date(booking.dateRange.from).getTime()
    );
  };

  const saveBooking = (booking: Booking) => {
    const filteredBookings = bookings.filter((b) => b.id !== booking.id);
    if (isOverlapping(booking, filteredBookings)) {
      return {
        success: false,
        message:
          "Booking dates overlap with an existing booking for this property.",
      };
    }
    console.log('bookings', bookings)
    console.log(
      bookings.some((b) => {
        console.log("b.id", b.id, "booking.id", booking.id);
      })
    );
    console.log(
      "ookings.some((b) => b.id === booking.id",
      bookings.some((b) => b.id === booking.id)
    );

    if (bookings.some((b) => b.id === booking.id)) {
      setBookings(bookings.map((b) => (b.id === booking.id ? booking : b)));
    } else {
      setBookings([...bookings, booking]);
    }

    return {
      success: true,
    };
  };

  const deleteBooking = (id: string) => {
    setBookings(bookings.filter((booking) => booking.id !== id));
  };

  return (
    <BookingContext.Provider value={{ bookings, saveBooking, deleteBooking }}>
      {children}
    </BookingContext.Provider>
  );
};

export default BookingProvider;
