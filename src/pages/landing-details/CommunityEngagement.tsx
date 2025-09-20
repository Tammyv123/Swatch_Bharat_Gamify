import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const CommunityEngagement = () => {
  return (
    <div className="min-h-screen bg-background p-6">
      <h1 className="text-4xl font-bold mb-4">Community Engagement</h1>
      <p className="text-lg mb-6">
        Join millions of Indians in the clean India mission. Participate in local clean-up drives, awareness campaigns, and community programs to create a lasting impact.
      </p>
      <Button asChild size="lg">
        <Link to="/">Back to Home</Link>
      </Button>
    </div>
  );
};

export default CommunityEngagement;
