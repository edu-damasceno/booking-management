import React from "react";
import useBookingForm from "./useBookingForm";
import { Booking, Property } from "../../../types";
import { format } from "date-fns";
import { Button, Select, Option, Alert, Chip } from "@material-tailwind/react";
import {
  Input,
  Popover,
  PopoverHandler,
  PopoverContent,
} from "@material-tailwind/react";

import {
  ChevronRightIcon,
  ChevronLeftIcon,
  CalendarDaysIcon,
} from "@heroicons/react/24/outline";

import { DayPicker } from "react-day-picker";

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
  editMode,
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
          placeholder="Select a property"
          onPointerEnterCapture={() => {}}
          onPointerLeaveCapture={() => {}}
        >
          {properties
            .sort((a, b) => {
              const aPropertyName = a.name;
              const bPropertyName = b.name;
              return aPropertyName.localeCompare(bPropertyName);
            })
            .map((prop) => (
              <Option key={prop.id} value={prop.id.toString()}>
                {prop.name}
              </Option>
            ))}
        </Select>
      </div>

      <div className="mb-4">
        <Popover placement="bottom">
          <PopoverHandler>
            <Input
              label="check-in ~ checkout"
              onChange={() => null}
              value={
                formData.dateRange.from && formData.dateRange.to
                  ? `${format(formData.dateRange.from, "PPP")} ~ ${format(
                      formData.dateRange.to,
                      "PPP"
                    )}`
                  : ""
              }
              icon={<CalendarDaysIcon />}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
              crossOrigin={undefined}
            />
          </PopoverHandler>
          <PopoverContent
            placeholder={undefined}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
          >
            <DayPicker
              mode="range"
              selected={formData.dateRange}
              onSelect={handleRangeChange}
              showOutsideDays
              className="border-0"
              classNames={{
                caption: "flex justify-center py-2 mb-4 relative items-center",
                caption_label: "text-sm font-medium text-gray-900",
                nav: "flex items-center",
                nav_button:
                  "h-6 w-6 bg-transparent hover:bg-blue-gray-50 p-1 rounded-md transition-colors duration-300",
                nav_button_previous: "absolute left-1.5",
                nav_button_next: "absolute right-1.5",
                table: "w-full border-collapse",
                head_row: "flex font-medium text-gray-900",
                head_cell: "m-0.5 w-9 font-normal text-sm",
                row: "flex w-full mt-2",
                cell: "text-gray-600 rounded-md h-9 w-9 text-center text-sm p-0 m-0.5 relative [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-outside)]:bg-gray-900/20 [&:has([aria-selected].day-outside)]:text-white [&:has([aria-selected])]:bg-gray-900/50 first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
                day: "h-9 w-9 p-0 font-normal",
                day_range_end: "day-range-end",
                day_selected:
                  "rounded-md bg-indigo-400 text-white hover:bg-gray-900 hover:text-white focus:bg-gray-900 focus:text-white",
                day_today: "rounded-md bg-gray-200 text-gray-900",
                day_outside:
                  "day-outside text-gray-500 opacity-50 aria-selected:bg-gray-500 aria-selected:text-gray-900 aria-selected:bg-opacity-10",
                day_disabled: "text-gray-500 opacity-50",
                day_hidden: "invisible",
              }}
              components={{
                IconLeft: ({ ...props }) => (
                  <ChevronLeftIcon {...props} className="h-4 w-4 stroke-2" />
                ),
                IconRight: ({ ...props }) => (
                  <ChevronRightIcon {...props} className="h-4 w-4 stroke-2" />
                ),
              }}
            />
          </PopoverContent>
        </Popover>

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
        placeholder={undefined}
        onPointerEnterCapture={undefined}
        onPointerLeaveCapture={undefined}
      >
        {editMode ? "Save Booking" : "Add Booking"}
      </Button>
    </form>
  );
};

export default BookingForm;
