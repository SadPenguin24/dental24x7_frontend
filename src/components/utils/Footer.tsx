import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
export default function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="container py-8 md:pt-12 md:pb-6">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <h3 className="mb-4 text-lg font-semibold">24x7 Dental</h3>
            <p className="mb-4 text-sm text-muted-foreground">
              Your trusted partner for comprehensive dental care, available
              around the clock for all your dental needs.
            </p>
          </div>

          <div>
            <h3 className="mb-4 text-lg font-semibold">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  to="/"
                  className="text-muted-foreground hover:text-primary"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/booking"
                  className="text-muted-foreground hover:text-primary"
                >
                  Book Appointment
                </Link>
              </li>
              <li>
                <Link
                  to="/dashboard"
                  className="text-muted-foreground hover:text-primary"
                >
                  Dashboard
                </Link>
              </li>
              <li>
                <Link
                  to="#services"
                  className="text-muted-foreground hover:text-primary"
                >
                  Services
                </Link>
              </li>
              <li>
                <Link
                  to="#about"
                  className="text-muted-foreground hover:text-primary"
                >
                  About Us
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-lg font-semibold">Services</h3>
            <ul className="space-y-2 text-sm">
              <li className="text-muted-foreground hover:text-primary">
                General Dentistry
              </li>
              <li className="text-muted-foreground hover:text-primary">
                Cosmetic Dentistry
              </li>
              <li className="text-muted-foreground hover:text-primary">
                Orthodontics
              </li>
              <li className="text-muted-foreground hover:text-primary">
                Pediatric Dentistry
              </li>
              <li className="text-muted-foreground hover:text-primary">
                Emergency Care
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-lg font-semibold">Contact Us</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <MapPin className="mt-0.5 h-4 w-4 text-primary" />
                <span className="text-muted-foreground">
                  123 Dental Street, Medical District, City, 12345
                </span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-primary" />
                <span className="text-muted-foreground">(123) 456-7890</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-primary" />
                <span className="text-muted-foreground">
                  contact@24x7dental.com
                </span>
              </li>
              <li className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-primary" />
                <span className="text-muted-foreground">
                  Open 24 hours, 7 days a week
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t pt-8 text-center text-sm text-muted-foreground">
          <p>
            &copy; {new Date().getFullYear()} 24x7 Dental. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
