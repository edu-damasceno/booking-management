import React, { useState, useEffect } from "react";
import { useBookings } from "../../context/useBookings";
import { properties } from "../../data/properties";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const BookingForm: React.FC = () => {
  const { saveBooking } = useBookings();
  const initialFormData = {
    propertyId: "",
    startDate: "",
    endDate: "",
    price: "",
    id: null,
  };
  const [formData, setFormData] = useState(initialFormData);
  const [pricePerNight, setPricePerNight] = useState<string | null>(null);
  const [totalNights, setTotalNights] = useState<number | null>(null);

  useEffect(() => {
    if (formData.startDate && formData.endDate && formData.propertyId) {
      const property = properties.find(
        (prop) => prop.id === parseInt(formData.propertyId)
      );
      if (property) {
        const nights =
          (new Date(formData.endDate).getTime() -
            new Date(formData.startDate).getTime()) /
          (1000 * 3600 * 24);
        const totalPrice = nights * property.pricePerNight;
        setTotalNights(nights);
        setFormData((prevFormData) => ({
          ...prevFormData,
          price: totalPrice.toFixed(2),
        }));
      }
    }
  }, [formData.startDate, formData.endDate, formData.propertyId]);

  useEffect(() => {
    if (formData.propertyId) {
      const property = properties.find(
        (prop) => prop.id === parseInt(formData.propertyId)
      );

      if (property) {
        setPricePerNight(`${property.pricePerNight.toFixed(2)}`);
      }
    } else {
      setPricePerNight(null);
    }
  }, [formData.propertyId]);

  const resetFormData = () => {
    setFormData(initialFormData);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const property = properties.find(
      (prop) => prop.id === parseInt(formData.propertyId)
    );
    const booking = {
      ...formData,
      id: formData.id ?? Date.now(),
      price: parseFloat(formData.price),
      property: property ? property.name : "",
    };

    if (saveBooking(booking)) {
      resetFormData();

      setPricePerNight(null);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    if (e.target.value) {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    } else {
      resetFormData();
    }
  };

  const handleDateChange = (date: Date | null, name: string) => {
    setFormData({ ...formData, [name]: date });
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="mb-4">
        <div className="mb-2">
          <label className="block" htmlFor="propertyId">
            Property
          </label>
          <select
            name="propertyId"
            id="propertyId"
            value={formData.propertyId}
            onChange={handleChange}
            className="border rounded p-2 w-full"
            required
          >
            <option value="">Select a property</option>
            {properties.map((prop) => (
              <option key={prop.id} value={prop.id}>
                {prop.name}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-2">
          {pricePerNight && <p>U$ {pricePerNight} per night</p>}
        </div>
        <div className="mb-2">
          <label className="block" htmlFor="startDate">
            Check-in
          </label>
          <DatePicker
            id="startDate"
            selected={formData.startDate ? new Date(formData.startDate) : null}
            onChange={(date) => handleDateChange(date, "startDate")}
            className="border rounded p-2 w-full"
            placeholderText="mm/dd/yyyy"
            autoComplete="off"
            required
          />
        </div>
        <div className="mb-2">
          <label className="block" htmlFor="endDate">
            Check-out
          </label>
          <DatePicker
            id="endDate"
            selected={formData.endDate ? new Date(formData.endDate) : null}
            onChange={(date) => handleDateChange(date, "endDate")}
            className="border rounded p-2 w-full"
            placeholderText="mm/dd/yyyy"
            autoComplete="off"
            required
          />
        </div>
        {formData.price && (
          <div className="mb-2">
            <p>{totalNights} Nights</p>
            <p>Total Price: U$ {formData.price}</p>
          </div>
        )}
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          Add Booking
        </button>
      </form>
    </>
  );
};

export default BookingForm;
