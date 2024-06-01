import React, { useState, useEffect } from "react";
import { useBookings } from "../../../context/useBookings";
import { properties } from "../../../data/properties";

const useBookingForm = () => {
  const { saveBooking } = useBookings();
  const initialFormData = {
    propertyId: "",
    startDate: "",
    endDate: "",
    nights: 0,
    price: "",
    id: null,
  };
  const [formData, setFormData] = useState(initialFormData);
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
        

        if (nights > 0) {
          const totalPrice = nights * property.pricePerNight;
          setTotalNights(nights);
          setFormData((prevFormData) => ({
            ...prevFormData,
            price: totalPrice.toFixed(2),
            nights,
          }));
        } else {
          setTotalNights(null);
        }
      }
    }
  }, [formData.startDate, formData.endDate, formData.propertyId]);

  const resetFormData = () => {
    setFormData(initialFormData);
    setTotalNights(null);
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

  return {
    properties,
    formData,
    totalNights,
    handleChange,
    handleDateChange,
    handleSubmit,
  };
};

export default useBookingForm;
