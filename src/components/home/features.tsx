import { Search, Shield, Map } from "lucide-react";

export default function Features() {
  const features = [
    {
      icon: Search,
      title: "Search Cemetery Records",
      description:
        "Find burial sites using our comprehensive search. Look up by name, ID number, or date of death.",
    },
    {
      icon: Map,
      title: "Interactive Map Navigation",
      description:
        "Get precise GPS coordinates and directions to any grave site with our built-in map integration.",
    },
    {
      icon: Shield,
      title: "Municipal Management",
      description:
        "Secure admin portal for municipal staff to manage cemetery records, burial registrations, and reporting.",
    },
  ];

  return (
    <section className="border-t bg-muted/30 py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <h2 className="mb-3 text-3xl font-bold tracking-tight">
            How It Works
          </h2>
          <p className="mx-auto max-w-2xl text-muted-foreground">
            Our platform simplifies the process of locating burial sites and
            managing cemetery records for South African municipalities.
          </p>
        </div>

        <div className="grid gap-8 sm:grid-cols-3">
          {features.map((feat, i) => (
            <div key={i} className="text-center">
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-accent">
                <feat.icon className="h-6 w-6 text-accent-foreground" />
              </div>
              <h3 className="mb-2 text-lg font-semibold">{feat.title}</h3>
              <p className="text-sm text-muted-foreground">
                {feat.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
