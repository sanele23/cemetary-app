import Link from "next/link";
import { MapPin, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { Cemetery } from "@/data/types";

interface CemeteryCardProps {
  cemetery: Cemetery;
}

export default function CemeteryCard({ cemetery }: CemeteryCardProps) {
  return (
    <Card className="group overflow-hidden transition-all hover:shadow-lg">
      <div className="relative h-48 overflow-hidden">
        <img
          src={cemetery.image}
          alt={cemetery.name}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        <Badge className="absolute right-3 top-3 bg-white/90 text-foreground hover:bg-white">
          Est. {cemetery.established}
        </Badge>
      </div>

      <CardContent className="space-y-3 p-5">
        <div>
          <h3 className="text-lg font-semibold">{cemetery.name}</h3>
          <p className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <MapPin className="h-3.5 w-3.5" />
            {cemetery.city}, {cemetery.province}
          </p>
        </div>

        <p className="line-clamp-2 text-sm text-muted-foreground">
          {cemetery.description}
        </p>

        <div className="flex gap-4 text-sm">
          <div>
            <span className="font-semibold text-foreground">
              {cemetery.totalGraves.toLocaleString()}
            </span>{" "}
            <span className="text-muted-foreground">graves</span>
          </div>
          <div>
            <span className="font-semibold text-emerald-600">
              {cemetery.availablePlots.toLocaleString()}
            </span>{" "}
            <span className="text-muted-foreground">available</span>
          </div>
        </div>
      </CardContent>

      <CardFooter className="border-t px-5 py-3">
        <Link href={`/search?cemeteryId=${cemetery.id}`} className="w-full">
          <Button
            variant="ghost"
            className="w-full justify-between text-primary hover:text-primary"
          >
            View Cemetery
            <ArrowRight className="h-4 w-4" />
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
