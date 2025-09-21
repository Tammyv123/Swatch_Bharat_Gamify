import { EcoEscapeRoom} from "@/components/EcoEscapeRoom";
import WasteSortingGame from "@/components/WasteSortingGame";

import { WasteBasicsModule } from "@/components/learning/WasteBasicsModule";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const play = () => {
  const navigate = useNavigate();

  const games = [
    { title: "Waste Basics Module", component: WasteBasicsModule },
    { title: "Waste Sorting Game", component: WasteSortingGame },
    { title: "Eco Escape Room", component: EcoEscapeRoom }
  ];

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold text-green-700">Play & Learn Games</h1>
      <p className="text-muted-foreground">
        Challenge yourself with all available eco-games and improve your waste management skills!
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {games.map((game, index) => (
          <Card key={index} className="hover:scale-105 transition-transform">
            <CardHeader>
              <CardTitle>{game.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <Button onClick={() => navigate(`/learning/${game.title.replace(/\s+/g, "-").toLowerCase()}`)}>
                Play Now
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default play;
