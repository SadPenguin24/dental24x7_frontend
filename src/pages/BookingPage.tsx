import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Calendar } from "lucide-react";
import { format } from "date-fns";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useDentist } from "@/contexts/DentistContext";
import { useAuth } from "@/contexts/AuthContext";
import { useAppointment } from "@/contexts/AppointmentContext";
import { AppointmentData, AppointmentInput } from "@/types";
import { toast } from "sonner";

// Services data
export const services = [
  {
    id: "1",
    name: "General Dentistry",
  },
  {
    id: "2",
    name: "Cosmetic Dentistry",
  },
  {
    id: "3",
    name: "Orthodontics",
  },
  {
    id: "4",
    name: "Pediatric Dentistry",
  },
  {
    id: "5",
    name: "Emergency Care",
  },
  {
    id: "6",
    name: "Preventive Care",
  },
];
export default function BookingPage() {
  const navigate = useNavigate();
  const { dentistData } = useDentist();
  const { user } = useAuth();
  const { updateAppointmentById, createAppointment, appointmentData } =
    useAppointment();
  const [appointment, setAppointmentData] = useState<AppointmentData | null>(
    null
  );

  const [selectedDentist, setSelectedDentist] = useState(
    dentistData?.dentist?.id ?? undefined
  );
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [selectedTime, setSelectedTime] = useState("");
  const [selectedService, setSelectedService] = useState("");

  useEffect(() => {
    if (appointmentData?.appointment) {
      setAppointmentData(appointmentData?.appointment);
      setSelectedTime(appointment?.time ?? "");
      setSelectedService(appointment?.service ?? "");
      setSelectedDentist(appointment?.Dentist.id ?? undefined);
      setSelectedDate(appointment?.date ?? undefined);
    }
  }, [appointment]);

  // Generate time slots from 8 AM to 6 PM
  const timeSlots = [
    "8:00 AM",
    "9:00 AM",
    "10:00 AM",
    "11:00 AM",
    "12:00 PM",
    "1:00 PM",
    "2:00 PM",
    "3:00 PM",
    "4:00 PM",
    "5:00 PM",
    "6:00 PM",
  ];

  const handleBookAppointment = async () => {
    if (
      !selectedDentist ||
      !selectedDate ||
      !selectedTime ||
      !selectedService
    ) {
      toast.warning("Missing Information", {
        description:
          "Please fill in all required fields to book your appointment.",
      });
      return;
    }

    const data: AppointmentInput = {
      status: appointment ? "Rescheduled" : "Booked",
      service: selectedService,
      date: selectedDate,
      time: selectedTime,
      userId: user?.id!,
      dentistId: selectedDentist!,
    };

    // In a real app, you would send this data to your backend
    let responseAppointment;

    if (appointment) {
      responseAppointment = await updateAppointmentById(appointment.id, data);
    } else {
      responseAppointment = await createAppointment(data);
    }

    if (responseAppointment) {
      toast.success("Appointment Booked!", {
        description: `Your appointment with ${selectedDentist} on ${format(
          selectedDate,
          "PPP"
        )} at ${selectedTime} has been confirmed.`,
      });
    }

    // Redirect to dashboard after successful booking
    setTimeout(() => navigate("/dashboard"), 2000);
  };

  return (
    <div>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold">Book an Appointment</h1>
          <p className="mt-2 text-muted-foreground">
            Schedule your dental appointment with our experienced professionals.
          </p>
        </div>

        <Card className="mx-auto max-w-3xl bg-white">
          <CardHeader>
            <CardTitle>Appointment Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Dentist and Service Selection - Side by Side on Desktop */}
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="dentist">Select Dentist</Label>
                <Select
                  // defaultValue={dentistData?.dentist?.id ?? undefined}
                  value={selectedDentist}
                  onValueChange={setSelectedDentist}
                >
                  <SelectTrigger
                    disabled={!!appointment?.Dentist.id}
                    id="dentist"
                    className="bg-white"
                  >
                    <SelectValue placeholder="Choose a dentist" />
                  </SelectTrigger>
                  <SelectContent className="bg-white">
                    {dentistData?.dentists?.map((dentist) => (
                      <SelectItem key={dentist.id} value={dentist.id}>
                        {dentist.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="service">Select Service</Label>
                <Select
                  disabled={!!appointment?.service}
                  value={selectedService}
                  onValueChange={setSelectedService}
                >
                  <SelectTrigger id="service" className="bg-white">
                    <SelectValue placeholder="Choose a service" />
                  </SelectTrigger>
                  <SelectContent className="bg-white">
                    {services.map((service) => (
                      <SelectItem key={service.id} value={service.name}>
                        {service.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Date and Time Selection - Side by Side on Desktop */}
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <Label>Select Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full rounded justify-start text-left font-normal"
                    >
                      <Calendar className="mr-2 h-4 w-4" />
                      {selectedDate ? (
                        format(selectedDate, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <CalendarComponent
                      className="bg-white"
                      mode="single"
                      selected={selectedDate}
                      onSelect={setSelectedDate}
                      initialFocus
                      disabled={(date) =>
                        date < new Date() || date.getDay() === 0
                      }
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div className="space-y-2">
                <Label htmlFor="time">Select Time</Label>
                <Select
                  disabled={!selectedDate}
                  value={selectedTime}
                  onValueChange={setSelectedTime}
                >
                  <SelectTrigger id="time" className="bg-white">
                    <SelectValue placeholder="Choose a time" />
                  </SelectTrigger>
                  <SelectContent className="bg-white">
                    {timeSlots.map((time) => (
                      <SelectItem key={time} value={time}>
                        {time}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Button
              onClick={handleBookAppointment}
              variant="outline"
              className="w-full rounded"
              size="lg"
            >
              Book Appointment
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
