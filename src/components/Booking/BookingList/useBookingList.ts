import { useState } from "react";
import { useBookings } from "../../../context/useBookings";
import { Booking } from "../../../types";

const useBookingList = () => {
  const { bookings, deleteBooking } = useBookings();
  const [sortBy, setSortBy] = useState<string>("recent");
  const [open, setOpen] = useState(false);
  const [currentBooking, setCurrentBooking] = useState<Booking | null>(null);

  const handleDelete = (id: string) => {
    deleteBooking(id);
  };

  const handleSortChange = (val: string | undefined) => {
    setSortBy(val as string);
  };

  const filterBookings = () => {
    if (sortBy === "property") {
      return bookings.sort((a, b) => {
        const aPropertyName = a.property.name;
        const bPropertyName = b.property.name;
        return aPropertyName.localeCompare(bPropertyName);
      });
    } else if (sortBy === "checkin") {
      return bookings.sort((a, b) => {
        const aCheckin = a.dateRange.from ? a.dateRange.from.getTime() : 0;
        const bCheckin = b.dateRange.from ? b.dateRange.from.getTime() : 0;
        return aCheckin - bCheckin;
      });
    } else if (sortBy === "checkout") {
      return bookings.sort((a, b) => {
        const aCheckout = a.dateRange.to ? a.dateRange.to.getTime() : 0;
        const bCheckout = b.dateRange.to ? b.dateRange.to.getTime() : 0;
        return aCheckout - bCheckout;
      });
    } else if (sortBy === "recent") {
      return bookings.sort((a, b) => {
        const aId = parseInt(a.id);
        const bId = parseInt(b.id);
        return aId - bId;
      });
    }
    return bookings;
  };

  const handleOpen = () => setOpen(!open);

  const handleEdit = (booking: Booking) => {
    setCurrentBooking(booking);
    handleOpen();
  };

  return {
    bookings,
    handleSortChange,
    sortBy,
    filterBookings,
    handleEdit,
    handleOpen,
    handleDelete,
    open,
    currentBooking,
  };
};

export default useBookingList;
