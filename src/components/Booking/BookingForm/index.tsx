import React from "react";
import useBookingForm from "./useBookingForm";
import { Booking, Property } from "../../../types";
import DatePicker from "../../DatePicker";
import { format } from "date-fns";
import { Button, Select, Option, Alert, Chip } from "@material-tailwind/react";

export interface iProps {
  properties: Property[];
  defaultValue?: Booking | null;
  onSaveSuccess?: () => void;
  editMode?: boolean | null;
}

const BookingForm: React.FC<iProps> = ({
  properties,
  defaultValue,
  onSaveSuccess,
  editMode
}) => {
  const {
    formData,
    totalNights,
    handleSubmit,
    handlePropertyChange,
    handleRangeChange,
    errorMessage,
    setErrorMessage,
    successMessage,
  } = useBookingForm({ properties, defaultValue, onSaveSuccess, editMode });

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <Select
          name="property"
          label="Select a property"
          value={formData.property.id}
          onChange={handlePropertyChange}
        >
          {properties.map((prop) => (
            <Option key={prop.id} value={prop.id.toString()}>
              {prop.name}
            </Option>
          ))}
        </Select>
      </div>

      <div className="mb-4">
        <DatePicker
          mode="range"
          value={
            formData.dateRange.from && formData.dateRange.to
              ? `${format(formData.dateRange.from, "PPP")} ~ ${format(
                  formData.dateRange.to,
                  "PPP"
                )}`
              : ""
          }
          selected={formData.dateRange}
          onHandleChange={handleRangeChange}
          label="check-in ~ checkout"
        />

        {totalNights && totalNights > 0 && formData.price && (
          <Chip
            value={`Total Price: U$ ${formData.price} for ${totalNights} Night${
              totalNights > 1 ? "s" : ""
            }
          `}
            className="mt-2 mb-4 text-center"
            variant="outlined"
            color="indigo"
          />
        )}
      </div>

      {successMessage && (
        <Alert
          open={true}
          className="mb-4 text-center"
          color="green"
          animate={{
            mount: { y: 0 },
            unmount: { y: 100 },
          }}
        >
          {successMessage}
        </Alert>
      )}

      {errorMessage && (
        <Alert
          open={true}
          onClose={() => setErrorMessage(undefined)}
          className="mb-4"
          color="red"
          animate={{
            mount: { y: 0 },
            unmount: { y: 100 },
          }}
        >
          {errorMessage}
        </Alert>
      )}

      <Button
        type="submit"
        className="rounded-full disabled:bg-gray-600"
        disabled={!totalNights}
        fullWidth
        size="lg"
        color="indigo"
      >
        <>{console.log("editMode", editMode)}</>
        {editMode ? "Save Booking" : "Add Booking"}
      </Button>
    </form>
  );
};

export default BookingForm;
