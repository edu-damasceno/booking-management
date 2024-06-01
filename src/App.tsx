import BookingProvider from './context/BookingContext'
import Booking from './components/Booking'

const App: React.FC = () => {
  return (
    <BookingProvider>
      <Booking />
    </BookingProvider>
  )
}

export default App
