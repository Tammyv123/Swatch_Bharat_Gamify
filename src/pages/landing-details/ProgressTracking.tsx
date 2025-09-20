import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const ProgressTracking = () => {
  return (
    <div className="min-h-screen bg-background p-6">
      <h1 className="text-4xl font-bold mb-4">Progress Tracking</h1>
      <p className="text-lg mb-6">
        Monitor your environmental impact in real-time. See how your actions contribute to a cleaner, greener India.
      </p>
      <Button asChild size="lg">
        <Link to="/">Back to Home</Link>
      </Button>
    </div>
  );
};

export default ProgressTracking;
