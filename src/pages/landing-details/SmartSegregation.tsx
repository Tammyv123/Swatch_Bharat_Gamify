import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const SmartSegregation = () => {
  return (
    <div className="min-h-screen bg-background p-6">
      <h1 className="text-4xl font-bold mb-4">Smart Segregation</h1>
      <p className="text-lg mb-6">
        Learn proper waste sorting with AI-powered guidance. Discover best practices for reducing landfill waste and improving recycling efficiency.
      </p>
      <Button asChild size="lg">
        <Link to="/">Back to Home</Link>
      </Button>
    </div>
  );
};

export default SmartSegregation;
