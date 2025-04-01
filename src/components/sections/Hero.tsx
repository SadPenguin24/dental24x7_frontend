import { Link } from "react-router-dom";
import { Button } from "../ui/button";
export default function Hero() {
  return (
    <section className="py-9 md:py-18">
      <div className="container mx-auto px-4 text-center">
        <h1 className="mx-auto max-w-4xl text-4xl font-serif font-bold leading-tight md:text-5xl lg:text-6xl">
          Dentists who are <br />
          Different by <span className="italic">Design</span>
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-lg text-foreground/80">
          Welcome to the friendliest dentist office in Chicago and Seattle.
          Let's get you smiling.
        </p>

        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link to="/booking">
            <Button
              variant="outline"
              className="min-w-[200px] rounded-full border-foreground/20 hover:bg-background/90"
            >
              Book Online
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
