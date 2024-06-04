import { Card, Typography } from "@material-tailwind/react";
import { Property } from "../../types";
import BookingForm from "./BookingForm";
import BookingList from "./BookingList";

export interface BookingProps {
  properties: Property[];
}

const Booking: React.FC<BookingProps> = ({ properties }) => {
  return (
    <div className="container mx-auto p-4">
      <Typography
        variant="h1"
        color="indigo"
        className="text-2xl font-bold mb-4 text-center"
        textGradient
        placeholder={undefined}
        onPointerEnterCapture={undefined}
        onPointerLeaveCapture={undefined}
      >
        Booking Management
      </Typography>

      <Card
        className="p-3 mb-12"
        placeholder={undefined}
        onPointerEnterCapture={undefined}
        onPointerLeaveCapture={undefined}
      >
        <BookingForm properties={properties} />
      </Card>
      <BookingList />
    </div>
  );
};

export default Booking;
