import Hero from "@/components/home/hero";
import QuickLinks from "@/components/home/quick-links";
import Features from "@/components/home/features";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export default function HomePage() {
  return (
    <>
      <Hero />
      <QuickLinks />
      <Features />

      {/* CTA Section */}
      <section className="border-t bg-primary py-16 text-white">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="mb-4 text-3xl font-bold">
            Need to Register a Burial?
          </h2>
          <p className="mx-auto mb-8 max-w-xl text-white/80">
            Municipal administrators can access the admin portal to manage
            cemetery records, register burials, and generate reports.
          </p>
          <Link href="/admin">
            <Button
              size="lg"
              className="bg-white text-primary hover:bg-white/90"
            >
              Access Admin Portal
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>
    </>
  );
}
