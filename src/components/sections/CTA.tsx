import { Link } from "react-router-dom";
import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";

export default function CtaSection() {
  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto">
        <Card className="overflow-hidden border bg-background text-foreground">
          <CardContent className="p-6 md:p-10">
            <div className="flex flex-col">
              <h2 className="mb-4 text-center text-3xl font-bold tracking-tight sm:text-4xl">
                Ready to Schedule Your Appointment?
              </h2>
              <p className="mb-8 text-center mx-auto max-w-2xl">
                Take the first step towards a healthier smile. Our team is
                available 24/7 to provide you with exceptional dental care.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center ">
                <Link to="/booking">
                  <Button
                    size="lg"
                    className="font-medium bg-foreground text-background hover:bg-foreground/90"
                  >
                    Book Now
                  </Button>
                </Link>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-foreground/20 font-medium"
                >
                  <a href="tel:+11234567890">Call Us</a>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
