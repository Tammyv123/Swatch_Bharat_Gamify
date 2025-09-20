import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Transparency = () => {
  return (
    <div className="min-h-screen bg-background p-6">
      <h1 className="text-4xl font-bold mb-4">Transparency</h1>
      <p className="text-lg mb-6">
        Full transparency in waste management processes. Know exactly how your waste is handled and processed.
      </p>
      <Button asChild size="lg">
        <Link to="/">Back to Home</Link>
      </Button>
    </div>
  );
};

export default Transparency;
