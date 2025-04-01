import {
  SmileIcon as Tooth,
  Smile,
  Stethoscope,
  Baby,
  Clock,
  Shield,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
const services = [
  {
    icon: Tooth,
    title: "General Dentistry",
    description:
      "Comprehensive dental care including cleanings, fillings, and preventive treatments.",
  },
  {
    icon: Smile,
    title: "Cosmetic Dentistry",
    description:
      "Enhance your smile with whitening, veneers, and other aesthetic procedures.",
  },
  {
    icon: Stethoscope,
    title: "Orthodontics",
    description:
      "Straighten your teeth with braces, aligners, and other orthodontic treatments.",
  },
  {
    icon: Baby,
    title: "Pediatric Dentistry",
    description:
      "Specialized dental care for children in a comfortable, friendly environment.",
  },
  {
    icon: Clock,
    title: "Emergency Care",
    description:
      "24x7 emergency dental services for immediate pain relief and urgent treatments.",
  },
  {
    icon: Shield,
    title: "Preventive Care",
    description:
      "Regular check-ups and cleanings to maintain optimal oral health and prevent issues.",
  },
];
export default function Services() {
  return (
    <section id="services" className="py-9 md:py-18">
      <div className="container mx-auto">
        <div className="mx-auto mb-12 max-w-3xl text-center">
          <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">
            Our Services
          </h2>
          <p className="text-muted-foreground">
            We offer a comprehensive range of dental services to meet all your
            oral health needs, available 24x7.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <Card key={index} className="transition-all hover:shadow-md">
              <CardHeader className="pb-2">
                <CardTitle className="text-xl">{service.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  {service.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
