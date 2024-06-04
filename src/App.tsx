import BookingProvider from "./context/BookingContext";
import Booking from "./components/Booking";
import { properties } from "./data/properties";

const App: React.FC = () => {
  return (
    <BookingProvider>
      <Booking properties={properties} />
    </BookingProvider>
  );
};

export default App;
