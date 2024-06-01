import { Booking } from "../../../types";
import useBookingItem from "./useBookingItem";

interface BookingItemProps {
  booking: Booking;
}

const BookingItem: React.FC<BookingItemProps> = ({ booking }) => {
  const { handleDelete, handleEdit } = useBookingItem(booking);

  if (!booking) return <></>;

  return (
    <div className="border rounded p-2 mb-2">
      <p>Property: {booking.property}</p>
      <p>
        Check-in:{" "}
        {new Intl.DateTimeFormat("en").format(new Date(booking.startDate))}
      </p>
      <p>
        Checkout:{" "}
        {new Intl.DateTimeFormat("en").format(new Date(booking.endDate))}
      </p>
      <p>
        Price: U${booking.price.toFixed(2)} ({booking.nights}{" "}
        {`Night${booking.nights > 1 ? `s` : ``}`})
      </p>
      <button
        onClick={handleEdit}
        className="bg-yellow-500 text-white p-2 rounded mr-2"
      >
        Edit
      </button>
      <button
        onClick={handleDelete}
        className="bg-red-500 text-white p-2 rounded mt-2"
      >
        Delete
      </button>
    </div>
  );
};

export default BookingItem;
