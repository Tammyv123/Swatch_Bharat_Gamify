import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const RewardsSystem = () => {
  return (
    <div className="min-h-screen bg-background p-6">
      <h1 className="text-4xl font-bold mb-4">Rewards System</h1>
      <p className="text-lg mb-6">
        Earn points and rewards for sustainable actions. Incentivizing responsible behavior to encourage more participation.
      </p>
      <Button asChild size="lg">
        <Link to="/">Back to Home</Link>
      </Button>
    </div>
  );
};

export default RewardsSystem;
