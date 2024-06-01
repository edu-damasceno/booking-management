import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import useBookingForm from "./useBookingForm";

const BookingForm: React.FC = () => {
  const {
    properties,
    formData,
    totalNights,
    handleChange,
    handleDateChange,
    handleSubmit,
  } = useBookingForm();

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <div className="mb-2">
        <label className="block" htmlFor="propertyId">
          Property
        </label>
        <div className="inline-block relative w-full">
          <select
            name="propertyId"
            id="propertyId"
            value={formData.propertyId}
            onChange={handleChange}
            className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-1 pr-8 rounded shadow focus:outline-none focus:shadow-outline"
            required
          >
            <option value="">Choose a property</option>
            {properties.map((prop) => (
              <option key={prop.id} value={prop.id}>
                {prop.name}
              </option>
            ))}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
            <svg
              className="fill-current h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
            </svg>
          </div>
        </div>
      </div>
      <div className="flex pb-4">
        <div className="w-full w-1/2 pr-2">
          <label className="block" htmlFor="startDate">
            Check-in
          </label>
          <DatePicker
            id="startDate"
            selected={formData.startDate ? new Date(formData.startDate) : null}
            onChange={(date) => handleDateChange(date, "startDate")}
            className="w-full border border-gray-400 hover:border-gray-500 p-4 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
            startDate={formData.startDate ? new Date(formData.startDate) : null}
            endDate={formData.endDate ? new Date(formData.endDate) : null}
            minDate={new Date()}
            placeholderText={"Select a date"}
            autoComplete="off"
            locale={"en"}
            withPortal
            required
            showIcon
          />
        </div>
        <div className="w-full w-1/2 pl-2">
          <label className="block" htmlFor="endDate">
            Checkout
          </label>
          <DatePicker
            id="endDate"
            selected={formData.endDate ? new Date(formData.endDate) : null}
            onChange={(date) => handleDateChange(date, "endDate")}
            className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
            minDate={formData.startDate ? new Date(formData.startDate) : null}
            startDate={formData.startDate ? new Date(formData.startDate) : null}
            endDate={formData.endDate ? new Date(formData.endDate) : null}
            placeholderText={"Select a date"}
            autoComplete="off"
            locale={"en"}
            withPortal
            required
            showIcon
          />
        </div>
      </div>
      {totalNights && totalNights > 0 && formData.price ? (
        <div className="mb-2 text-center">
          <p>
            Total Price: U$ {formData.price} ({totalNights}{" "}
            {`Night${totalNights > 1 ? `s` : ``}`})
          </p>
        </div>
      ) : (
        <></>
      )}
      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full w-full"
        disabled={
          !formData.propertyId || !formData.startDate || !formData.endDate
        }
      >
        Save Booking
      </button>
    </form>
  );
};

export default BookingForm;
