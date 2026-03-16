"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import {
  MapPin,
  Calendar,
  Navigation,
  ChevronLeft,
  Copy,
  Hash,
  User,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import GraveMap from "@/components/grave/grave-map";
import { getGraveById } from "@/services/mock-api";
import { formatDate } from "@/lib/utils";
import type { Grave } from "@/data/types";

export default function GraveDetailPage() {
  const params = useParams();
  const [grave, setGrave] = useState<Grave | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (params.id) {
      getGraveById(params.id as string).then((data) => {
        setGrave(data || null);
        setLoading(false);
      });
    }
  }, [params.id]);

  if (loading) {
    return (
      <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="space-y-4">
          <div className="h-8 w-48 animate-pulse rounded bg-muted" />
          <div className="h-64 animate-pulse rounded-xl bg-muted" />
          <div className="h-96 animate-pulse rounded-xl bg-muted" />
        </div>
      </div>
    );
  }

  if (!grave) {
    return (
      <div className="mx-auto max-w-5xl px-4 py-10 text-center sm:px-6 lg:px-8">
        <h1 className="mb-4 text-2xl font-bold">Grave Not Found</h1>
        <p className="mb-6 text-muted-foreground">
          The record you are looking for does not exist or has been removed.
        </p>
        <Link href="/search">
          <Button>
            <ChevronLeft className="mr-2 h-4 w-4" />
            Back to Search
          </Button>
        </Link>
      </div>
    );
  }

  const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${grave.lat},${grave.lng}`;

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
      {/* Breadcrumb */}
      <div className="mb-6 flex items-center gap-2 text-sm text-muted-foreground">
        <Link href="/search" className="hover:text-foreground">
          Search
        </Link>
        <span>/</span>
        <span className="text-foreground">
          {grave.firstName} {grave.surname}
        </span>
      </div>

      {/* Header */}
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold">
            {grave.firstName} {grave.surname}
          </h1>
          {grave.maidenName && (
            <p className="text-lg text-muted-foreground">
              née {grave.maidenName}
            </p>
          )}
          <div className="mt-2 flex flex-wrap items-center gap-2">
            <Badge variant="secondary">{grave.cemeteryName}</Badge>
            <Badge variant="outline">
              Section {grave.section} · {grave.graveNumber}
            </Badge>
          </div>
        </div>
        <a href={googleMapsUrl} target="_blank" rel="noopener noreferrer">
          <Button className="gap-2">
            <Navigation className="h-4 w-4" />
            Get Directions
          </Button>
        </a>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Personal Details */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Personal Details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs font-medium uppercase text-muted-foreground">
                  Full Name
                </p>
                <p className="font-medium">
                  {grave.firstName} {grave.surname}
                </p>
              </div>
              {grave.maidenName && (
                <div>
                  <p className="text-xs font-medium uppercase text-muted-foreground">
                    Maiden Name
                  </p>
                  <p className="font-medium">{grave.maidenName}</p>
                </div>
              )}
              {grave.idNumber && (
                <div>
                  <p className="text-xs font-medium uppercase text-muted-foreground">
                    ID Number
                  </p>
                  <p className="font-mono text-sm">{grave.idNumber}</p>
                </div>
              )}
            </div>

            <Separator />

            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-start gap-2">
                <Calendar className="mt-0.5 h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-xs font-medium uppercase text-muted-foreground">
                    Date of Birth
                  </p>
                  <p className="font-medium">{formatDate(grave.dateOfBirth)}</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <Calendar className="mt-0.5 h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-xs font-medium uppercase text-muted-foreground">
                    Date of Death
                  </p>
                  <p className="font-medium">{formatDate(grave.dateOfDeath)}</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <Calendar className="mt-0.5 h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-xs font-medium uppercase text-muted-foreground">
                    Date of Burial
                  </p>
                  <p className="font-medium">
                    {formatDate(grave.dateOfBurial)}
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Grave Details */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5" />
              Grave Location
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs font-medium uppercase text-muted-foreground">
                  Cemetery
                </p>
                <p className="font-medium">{grave.cemeteryName}</p>
              </div>
              <div>
                <p className="text-xs font-medium uppercase text-muted-foreground">
                  Section
                </p>
                <p className="font-medium">{grave.section}</p>
              </div>
              <div className="flex items-start gap-2">
                <Hash className="mt-0.5 h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-xs font-medium uppercase text-muted-foreground">
                    Grave Number
                  </p>
                  <p className="font-mono font-medium">{grave.graveNumber}</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="mt-0.5 h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-xs font-medium uppercase text-muted-foreground">
                    GPS Coordinates
                  </p>
                  <p className="font-mono text-sm">
                    {grave.lat.toFixed(6)}, {grave.lng.toFixed(6)}
                  </p>
                </div>
              </div>
            </div>

            <Separator />

            <div className="flex gap-2">
              <a
                href={googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1"
              >
                <Button variant="outline" className="w-full gap-2">
                  <Navigation className="h-4 w-4" />
                  Google Maps
                </Button>
              </a>
              <Button
                variant="outline"
                className="gap-2"
                onClick={() =>
                  navigator.clipboard.writeText(
                    `${grave.lat.toFixed(6)}, ${grave.lng.toFixed(6)}`,
                  )
                }
              >
                <Copy className="h-4 w-4" />
                Copy GPS
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Map */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Map Location</CardTitle>
        </CardHeader>
        <CardContent>
          <GraveMap
            lat={grave.lat}
            lng={grave.lng}
            name={`${grave.firstName} ${grave.surname}`}
            cemetery={grave.cemeteryName}
          />
        </CardContent>
      </Card>

      {/* Photo Gallery */}
      {grave.photos.length > 0 && (
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Photos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {grave.photos.map((photo, idx) => (
                <div key={idx} className="overflow-hidden rounded-lg border">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={photo}
                    alt={`Photo ${idx + 1} of ${grave.firstName} ${grave.surname}`}
                    className="h-48 w-full object-cover"
                  />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
