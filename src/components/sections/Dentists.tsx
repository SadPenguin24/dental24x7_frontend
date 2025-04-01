import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { useDentist } from "@/contexts/DentistContext";

export default function Dentists() {
  const { dentistData, selectDentist } = useDentist();
  const navigate = useNavigate();

  const handleSelectDentist = (id: string) => {
    selectDentist(id);
    navigate("/booking");
  };

  return (
    <section className="py-9 md:py-18">
      <div className="container mx-auto">
        <div className="mx-auto mb-12 max-w-3xl text-center">
          <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">
            Meet Our Dentists
          </h2>
          <p className="text-muted-foreground">
            Our team of experienced dental professionals is dedicated to
            providing you with the highest quality care, day or night.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {dentistData?.dentists?.map((dentist, index) => (
            <Card key={index} className="overflow-hidden pt-0">
              <div className="aspect-square overflow-hidden">
                <img
                  src={dentist.image}
                  alt={dentist.name}
                  className="h-full w-full object-cover transition-transform hover:scale-105"
                />
              </div>
              <CardHeader className="pb-2">
                <h3 className="text-xl font-semibold">{dentist.name}</h3>
                <p className="text-sm font-medium text-primary">
                  {dentist.specialty}
                </p>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{dentist.bio}</p>
              </CardContent>
              <CardFooter>
                <Link to="/booking" className="w-full">
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => handleSelectDentist(dentist.id)}
                  >
                    Book Appointment
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
