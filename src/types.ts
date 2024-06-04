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
