import BookingForm from "../BookingForm";
import { format } from "date-fns";
import { properties } from "../../../data/properties";
import {
  Button,
  Card,
  Option,
  Select,
  Typography,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import useBookingList from "./useBookingList";

const BookingList: React.FC = () => {
  const {
    bookings,
    handleSortChange,
    sortBy,
    filterBookings,
    handleEdit,
    handleOpen,
    handleDelete,
    currentBooking,
    open,
  } = useBookingList();

  return (
    <div>
      {bookings.length > 0 && (
        <>
          <Typography
            variant="h2"
            color="indigo"
            className="text-xl font-bold mb-4 text-center"
            textGradient
            placeholder={undefined}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
          >
            Bookings List
          </Typography>

          <div className="mb-4">
            <Select
              name="property"
              label="Sort list by"
              onChange={(val) => handleSortChange(val)}
              value={sortBy}
              placeholder={undefined}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
            >
              <Option value="recent">Recent Bookings</Option>
              <Option value="property">Property name</Option>
              <Option value="checkin">Check-in date</Option>
              <Option value="checkout">Checkout date</Option>
            </Select>
          </div>

          <div className="md:grid md:grid-cols-2 gap-4">
            {filterBookings().map((booking, index) => (
              <Card
                key={index}
                className="p-4 mb-4 bg-blue-gray-50 flex-row justify-between items-center"
                placeholder={undefined}
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
              >
                <div>
                  <Typography
                    variant="h3"
                    color="indigo"
                    className="font-bold text-xl"
                    placeholder={undefined}
                    onPointerEnterCapture={undefined}
                    onPointerLeaveCapture={undefined}
                  >
                    {booking.property.name}{" "}
                    <small className="text-gray-500">#{booking.id}</small>
                  </Typography>
                  {booking.dateRange.from && booking.dateRange.to && (
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                      placeholder={undefined}
                      onPointerEnterCapture={undefined}
                      onPointerLeaveCapture={undefined}
                    >
                      {format(booking.dateRange.from, "PPP")} ~{" "}
                      {format(booking.dateRange.to, "PPP")}
                    </Typography>
                  )}

                  {booking.nights && (
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                      placeholder={undefined}
                      onPointerEnterCapture={undefined}
                      onPointerLeaveCapture={undefined}
                    >
                      U${booking.price.toFixed(2)} ({booking.nights}{" "}
                      {`Night${booking.nights > 1 ? `s` : ``}`})
                    </Typography>
                  )}
                </div>

                <div className="flex flex-col sm:flex-row md:flex-col lg:flex-row">
                  <div>
                    <Button
                      className="flex items-center mb-2 sm:mb-0 sm:mr-2 md:mb-2 mb-mr-0 lg:mb-0 bg-gray-300 text-gray"
                      size="sm"
                      onClick={() => handleEdit(booking)}
                      placeholder={undefined}
                      onPointerEnterCapture={undefined}
                      onPointerLeaveCapture={undefined}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="size-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                        />
                      </svg>
                    </Button>
                  </div>
                  <div>
                    <Button
                      className="flex items-center mt-2 sm:mt-0 sm:ml-2 md:mt-2 md:ml-0 lg:mt-0 bg-gray-300 text-gray"
                      size="sm"
                      onClick={() => handleDelete(booking.id)}
                      placeholder={undefined}
                      onPointerEnterCapture={undefined}
                      onPointerLeaveCapture={undefined}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="size-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                        />
                      </svg>
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </>
      )}

      <Dialog
        open={open}
        handler={handleOpen}
        size="sm"
        placeholder={undefined}
        onPointerEnterCapture={undefined}
        onPointerLeaveCapture={undefined}
      >
        <DialogHeader
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        >
          <Typography
            variant="h1"
            color="indigo"
            className="text-2xl font-bold mb-0 text-center w-full"
            textGradient
            placeholder={undefined}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
          >
            Edit Booking
          </Typography>
        </DialogHeader>
        <DialogBody
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        >
          <BookingForm
            properties={properties}
            defaultValue={currentBooking}
            onSaveSuccess={handleOpen}
            editMode
          />
        </DialogBody>
        <DialogFooter
          className="pt-0"
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        >
          <Button
            variant="text"
            color="red"
            onClick={handleOpen}
            className="mx-auto"
            placeholder={undefined}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
          >
            <span>Cancel</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </div>
  );
};

export default BookingList;
