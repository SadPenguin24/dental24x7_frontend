import { format } from "date-fns";
import { CalendarIcon, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "../ui/card";
import { useAppointment } from "@/contexts/AppointmentContext";
import { AppointmentInput } from "@/types";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

interface AppointmentCardProps {
  id: string;
  appointment: AppointmentInput;
  dentistName: string;
}
export default function AppointmentCard({
  id,
  appointment,
  dentistName,
}: AppointmentCardProps) {
  const navigate = useNavigate();
  const { updateAppointmentById, selectAppointment } = useAppointment();
  const { service, status, date, time } = appointment;

  const handleCancel = async (id: string) => {
    const data: AppointmentInput = {
      ...appointment,
      status: "Cancelled",
    };
    const cancelledAppointment = await updateAppointmentById(id, data);

    if (cancelledAppointment) {
      toast.success("Appointment Cancelled", {
        description: "Your Appointment has been Successfully Canceled",
      });
    }
  };
  const handleReschedule = (id: string) => {
    selectAppointment(id);
    navigate("/booking");
  };

  return (
    <Card className="mb-4 overflow-hidden bg-background">
      <div className="p-5">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-lg font-semibold">{service}</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              with {dentistName}
            </p>
          </div>
          <p>{status}</p>
        </div>

        <div className="mt-4 space-y-2">
          <div className="flex items-center gap-2 text-sm">
            <CalendarIcon className="h-4 w-4 text-primary" />
            <span>{format(new Date(date), "PPP")}</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Clock className="h-4 w-4 text-primary" />
            <span>{time}</span>
          </div>
        </div>

        <div className="mt-4 flex justify-end gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleReschedule(id)}
          >
            Reschedule
          </Button>
          <Button variant="outline" size="sm" onClick={() => handleCancel(id)}>
            Cancel
          </Button>
        </div>
      </div>
    </Card>
  );
}
