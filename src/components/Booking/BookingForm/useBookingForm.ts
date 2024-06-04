import React, { useState, useEffect } from "react";
import { useBookings } from "../../../context/useBookings";
import { Booking } from "../../../types";
import { DateRange } from "react-day-picker";
import { iProps } from ".";

const initialFormData = {
  property: { id: "", name: "", pricePerNight: 0 },
  nights: 0,
  price: 0,
  id: "",
  dateRange: { from: undefined, to: undefined },
};

const useBookingForm = ({
  properties,
  defaultValue,
  onSaveSuccess,
  editMode,
}: iProps) => {
  const { saveBooking } = useBookings();
  const [formData, setFormData] = useState<Booking>(initialFormData);
  const [totalNights, setTotalNights] = useState<number | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | undefined>(
    undefined
  );
  const [successMessage, setSuccessMessage] = useState<string | undefined>(
    undefined
  );

  useEffect(() => {
    if (defaultValue) {
      setFormData(defaultValue);
    }
  }, [defaultValue]);

  useEffect(() => {
    if (
      formData.dateRange.from &&
      formData.dateRange.to &&
      formData.property.id
    ) {
      const property = properties.find(
        (prop) => prop.id === formData.property.id
      );
      if (property) {
        const nights =
          (new Date(formData.dateRange.to).getTime() -
            new Date(formData.dateRange.from).getTime()) /
          (1000 * 3600 * 24);

        if (nights > 0) {
          const totalPrice = nights * property.pricePerNight;
          setTotalNights(nights);
          setFormData({
            ...formData,
            price: parseFloat(totalPrice.toFixed(2)),
            nights,
          });
        } else {
          setTotalNights(null);
        }
      }
    } else {
      setTotalNights(null);
    }
  }, [
    properties,
    formData.dateRange.from,
    formData.dateRange.to,
    formData.property.id,
  ]);

  const resetFormData = () => {
    setFormData(initialFormData);
    setTotalNights(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const booking = {
      ...formData,
      id: editMode ? formData.id : Date.now().toString(),
      price: formData.price,
      property: { ...formData.property },
    };

    const saveBookingResponse = saveBooking(booking);

    if (saveBookingResponse.success) {
      if (!editMode) resetFormData();
      setErrorMessage(undefined);

      setSuccessMessage(
        editMode
          ? "Booking edited successfully!"
          : "Booking created successfully!"
      );

      const timer = setTimeout(() => {
        setSuccessMessage(undefined);
        if (editMode && onSaveSuccess) {
          onSaveSuccess();
        }
      }, 2000);

      return () => clearTimeout(timer);
    } else {
      setErrorMessage(saveBookingResponse.message);
    }
  };

  const handlePropertyChange = (val: string | undefined) => {
    if (val) {
      const property = properties.find((prop) => prop.id === val);
      if (property) setFormData({ ...formData, property: property });
    }
    setErrorMessage(undefined);
  };

  const handleRangeChange = (dateRange: DateRange | undefined) => {
    if (dateRange) {
      setFormData({
        ...formData,
        dateRange,
      });
    }
  };

  return {
    formData,
    totalNights,
    handleSubmit,
    setFormData,
    handlePropertyChange,
    handleRangeChange,
    errorMessage,
    setErrorMessage,
    successMessage,
    setSuccessMessage,
  };
};

export default useBookingForm;
