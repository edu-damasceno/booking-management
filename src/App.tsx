import React from 'react'
import BookingProvider from './context/BookingContext'
import BookingForm from './components/BookingForm'
import BookingList from './components/BookingList'

const App: React.FC = () => {
  return (
    <BookingProvider>
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Booking Management</h1>
      </div>
      <BookingForm />
      <BookingList />
    </BookingProvider>
  )
}

export default App
