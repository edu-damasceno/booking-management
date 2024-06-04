import { useState } from "react";
import { useBookings } from "../../../context/useBookings";

const useBookingList = () => {
  const { bookings, deleteBooking } = useBookings();
  const [sortBy, setSortBy] = useState<string>("recent");
  const [open, setOpen] = useState(false);
  const [currentBooking, setCurrentBooking] = useState(null);

  const handleDelete = (id: string) => {
    deleteBooking(id);
  };

  const handleSortChange = (val: string) => {
    setSortBy(val);
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
        const aCheckin = a.dateRange.from;
        const bCheckin = b.dateRange.from;
        return aCheckin - bCheckin;
      });
    } else if (sortBy === "checkout") {
      return bookings.sort((a, b) => {
        const aCheckout = a.dateRange.to;
        const bCheckout = b.dateRange.to;
        return aCheckout - bCheckout;
      });
    } else if (sortBy === "recent") {
      return bookings.sort((a, b) => {
        const aId = a.id;
        const bId = b.id;
        return aId - bId;
      });
    }
    return bookings;
  };

  const handleOpen = () => setOpen(!open);

  const handleEdit = (booking: any) => {
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
