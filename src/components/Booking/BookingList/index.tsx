import { useBookings } from "../../../context/useBookings";
import BookingItem from "../BookingItem";

const BookingList: React.FC = () => {
  const { bookings } = useBookings();
  return (
    <div>
      <h2>Booking List</h2>

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
