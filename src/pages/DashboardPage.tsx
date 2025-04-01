import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import AppointmentCard from "@/components/cards/AppointmentCard";
import { useAppointment } from "@/contexts/AppointmentContext";
import { useEffect, useState } from "react";

export default function DashboardPage() {
  const { appointmentData } = useAppointment();
  const [appointments, setAppointments] = useState(
    appointmentData?.appointments
  );

  useEffect(() => {
    setAppointments(appointmentData?.appointments);
  }, [appointmentData]);

  return (
    <div>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold">Patient Dashboard</h1>
          <p className="mt-2 text-muted-foreground">
            Manage your appointments and dental records in one place.
          </p>
        </div>

        <div>
          <div>
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-xl font-semibold">Your Appointments</h2>
              <Link to="/booking">
                <Button size="sm">
                  <Plus className="mr-1 h-4 w-4" />
                  New Appointment
                </Button>
              </Link>
            </div>
            <div className="grid gap-8 grid-cols-1 md:grid-cols-2">
              {appointments !== undefined && appointments.length > 0 ? (
                appointments.map((appointment) => (
                  <AppointmentCard
                    key={appointment.id}
                    id={appointment.id}
                    appointment={appointment}
                    dentistName={appointment.Dentist.name}
                  />
                ))
              ) : (
                <div className="rounded-lg border p-8 text-center">
                  <p className="mb-4 text-muted-foreground">
                    You don't have any upcoming appointments.
                  </p>
                  <Link to="/booking">
                    <Button>
                      <Plus className="mr-2 h-4 w-4" />
                      Book Appointment
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
