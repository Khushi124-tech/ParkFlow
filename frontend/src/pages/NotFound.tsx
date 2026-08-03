import { Link } from "react-router-dom";
import { CircleParking } from "lucide-react";
import Button from "../components/ui/Button";
import { ROUTES } from "../utils/constants";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-white px-4 text-center">
      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
        <CircleParking className="h-7 w-7" />
      </div>
      <h1 className="text-4xl font-semibold text-slate-900">404</h1>
      <p className="max-w-sm text-sm text-slate-500">
        This spot doesn&apos;t exist. The page you&apos;re looking for may have been moved or
        removed.
      </p>
      <Link to={ROUTES.DASHBOARD}>
        <Button className="mt-2">Back to Dashboard</Button>
      </Link>
    </div>
  );
}
