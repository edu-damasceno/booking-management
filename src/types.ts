import { DateRange } from "react-day-picker";

export interface Property {
  id: string;
  name: string;
  pricePerNight: number;
}

export interface Booking {
  property: Property;
  nights: number;
  price: number;
  id: string;
  dateRange: DateRange;
}

export interface UseBookingFormReturn {
  formData: Booking;
  totalNights: number | null;
  handleSubmit: (e: React.FormEvent<Element>) => (() => void) | undefined;
  setFormData: React.Dispatch<React.SetStateAction<Booking>>;
  handleRangeChange: (range: DateRange) => void;
  handlePropertyChange: (val: string | undefined) => void;
  errorMessage: string | undefined;
  setErrorMessage: React.Dispatch<React.SetStateAction<string | null>>;
  successMessage: string | undefined;
  setSuccessMessage: React.Dispatch<React.SetStateAction<string | null>>;
}
