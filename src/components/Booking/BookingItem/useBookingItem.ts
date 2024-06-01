import { useBookings } from "../../../context/useBookings";
import { Booking } from "../../../types";

const useBookingItem = (booking: Booking) => {
  const { deleteBooking } = useBookings();

  const handleDelete = () => {
    deleteBooking(booking.id);
  };

  const handleEdit = () => {
    console.log("edit booking", booking);
  };

  return {
    handleDelete,
    handleEdit,
  };
};

export default useBookingItem;
