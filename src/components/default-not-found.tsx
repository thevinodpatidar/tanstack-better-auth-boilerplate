import { Link } from "@tanstack/react-router";
import { Button } from "./ui/button";

export function DefaultNotFound() {
  return (
    <div className="flex h-screen flex-col items-center justify-center space-y-2 p-2">
      <p>The page you are looking for does not exist.</p>
      <p className="flex flex-wrap items-center gap-2">
        <Button onClick={() => window.history.back()} type="button">
          Go back
        </Button>
        <Button asChild variant="secondary">
          <Link to="/">Home</Link>
        </Button>
      </p>
    </div>
  );
}
