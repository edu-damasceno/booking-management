import BookingForm from "./BookingForm";
import BookingList from "./BookingList";

const Booking: React.FC = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">Booking Management</h1>
      <BookingForm />
      <BookingList />
    </div>
  );
};

export default Booking;
