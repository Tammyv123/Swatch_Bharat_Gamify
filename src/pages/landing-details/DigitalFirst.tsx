import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const DigitalFirst = () => {
  return (
    <div className="min-h-screen bg-background p-6">
      <h1 className="text-4xl font-bold mb-4">Digital First</h1>
      <p className="text-lg mb-6">
        Modern digital platform for seamless experience. Access all features, track progress, and participate in challenges online.
      </p>
      <Button asChild size="lg">
        <Link to="/">Back to Home</Link>
      </Button>
    </div>
  );
};

export default DigitalFirst;
