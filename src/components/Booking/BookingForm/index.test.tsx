import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import BookingForm from "./index";
import useBookingForm from "./useBookingForm";
import { format } from "date-fns";
import { UseBookingFormReturn, Property, Booking } from "../../../types";
import { waitFor } from "@testing-library/react";

jest.mock("./useBookingForm");
const mockUseBookingForm = useBookingForm as jest.MockedFunction<
  typeof useBookingForm
>;

const properties: Property[] = [
  { id: "1", name: "Property 1", pricePerNight: 100 },
  { id: "2", name: "Property 2", pricePerNight: 150 },
];

const defaultFormData: Booking = {
  dateRange: { from: new Date("2023-01-01"), to: new Date("2023-01-05") },
  property: properties[0],
  price: 500,
  nights: 4,
  id: "1",
};

// Adjusting the mock return value to match the expected types
mockUseBookingForm.mockReturnValue({
  formData: defaultFormData,
  totalNights: 4,
  handleSubmit: jest.fn(),
  setFormData: jest.fn(),
  handleRangeChange: jest.fn((range: DateRange | undefined) => {
    mockFormData = { ...mockFormData, dateRange: range };
  }),
  handlePropertyChange: jest.fn((property: Property) => {
    mockFormData = { ...mockFormData, property };
  }),
  errorMessage: null,
  setErrorMessage: jest.fn(),
  successMessage: null,
  setSuccessMessage: jest.fn(),
} as unknown as UseBookingFormReturn);

describe("BookingForm Component", () => {
  test("renders BookingForm component", () => {
    render(<BookingForm properties={properties} />);
    expect(screen.getByLabelText("Select a property")).toBeInTheDocument();
    expect(screen.getByLabelText("check-in ~ checkout")).toBeInTheDocument();
  });

  test("disables submit button until property and dates are selected", () => {
    render(<BookingForm properties={properties} />);

    // Inicialmente, o botão de envio deve estar desativado
    let submitButton = screen.getByRole("button", { name: /submit/i });
    expect(submitButton).toBeDisabled();

    // Simula a seleção de uma propriedade
    const select = screen.getByLabelText("Select a property");
    fireEvent.change(select, { target: { value: properties[0].id } });

    // O botão de envio ainda deve estar desativado porque as datas não foram selecionadas
    expect(submitButton).toBeDisabled();

    // Simula a seleção de datas
    mockUseBookingForm().handleRangeChange({
      from: new Date(),
      to: new Date(),
    });

    // Agora o botão de envio deve estar habilitado
    submitButton = screen.getByRole("button", { name: /submit/i });
    expect(submitButton).toBeEnabled();
  });

  test("prevents overlapping bookings", () => {
    render(<BookingForm properties={properties} />);
    fireEvent.change(screen.getByLabelText("check-in ~ checkout"), {
      target: { value: "2023-01-04 ~ 2023-01-06" },
    });
    fireEvent.click(screen.getByText("Add Booking"));
    expect(screen.getByText("Bookings cannot overlap")).toBeInTheDocument();
  });

  test("displays success message on successful booking", () => {
    const onSaveSuccess = jest.fn();
    render(
      <BookingForm properties={properties} onSaveSuccess={onSaveSuccess} />
    );

    fireEvent.change(screen.getByLabelText("check-in ~ checkout"), {
      target: {
        value: `${format(new Date(), "PPP")} ~ ${format(new Date(), "PPP")}`,
      },
    });
    fireEvent.click(screen.getByText("Add Booking"));
    expect(onSaveSuccess).toHaveBeenCalled();
    expect(
      screen.getByText("Booking created successfully")
    ).toBeInTheDocument();
  });

  test("handles form submission with overlapping dates", async () => {
    const mockSaveBooking = jest.fn().mockReturnValue({
      success: false,
      message: "Overlapping dates are not allowed",
    });
    const mockSetErrorMessage = jest.fn();

    mockUseBookingForm.mockReturnValue({
      ...mockUseBookingForm({
        properties: [],
        defaultValue: null,
        onSaveSuccess: jest.fn(),
        editMode: false,
      }),
      formData: {
        ...mockUseBookingForm().formData,
        property: { id: "1", name: "Property 1", pricePerNight: 40 },
        dateRange: { from: new Date("2023-01-04"), to: new Date("2023-01-06") },
      },
      saveBooking: mockSaveBooking,
      setErrorMessage: mockSetErrorMessage,
    });

    render(<BookingForm properties={properties} />);

    const form = screen.getByRole("form");

    fireEvent.submit(form);

    await waitFor(() => {
      // Verifica se saveBooking foi chamada com os dados corretos
      expect(mockSaveBooking).toHaveBeenCalledWith({
        property: { id: "1", name: "Property 1" },
        checkInDate: new Date("2023-01-04"),
        checkOutDate: new Date("2023-01-06"),
      });

      // Verifica se setErrorMessage foi chamada com a mensagem correta
      expect(mockSetErrorMessage).toHaveBeenCalledWith(
        "Booking dates overlap with an existing booking for this property"
      );
    });
  });
});
