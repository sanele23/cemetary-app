"use client";

import { useEffect, useRef, useState } from "react";

interface GraveMapProps {
  lat: number;
  lng: number;
  name: string;
  cemetery: string;
}

export default function GraveMap({ lat, lng, name, cemetery }: GraveMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted || !mapRef.current) return;

    let map: L.Map | null = null;

    const initMap = async () => {
      const L = (await import("leaflet")).default;

      // Fix default icon paths
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      delete (L.Icon.Default.prototype as any)._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconRetinaUrl:
          "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
        iconUrl:
          "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
        shadowUrl:
          "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
      });

      if (!mapRef.current) return;

      map = L.map(mapRef.current).setView([lat, lng], 17);

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(map);

      const marker = L.marker([lat, lng]).addTo(map);
      marker.bindPopup(`<strong>${name}</strong><br/>${cemetery}`).openPopup();
    };

    initMap();

    return () => {
      if (map) {
        map.remove();
      }
    };
  }, [mounted, lat, lng, name, cemetery]);

  if (!mounted) {
    return (
      <div className="flex h-[400px] items-center justify-center rounded-lg bg-muted">
        <span className="text-muted-foreground">Loading map...</span>
      </div>
    );
  }

  return (
    <div
      ref={mapRef}
      className="h-[400px] w-full rounded-lg border"
      style={{ zIndex: 1 }}
    />
  );
}
