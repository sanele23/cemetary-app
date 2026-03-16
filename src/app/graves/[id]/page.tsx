import { graves } from "@/data/graves";
import GraveDetail from "@/components/grave/grave-detail";

export function generateStaticParams() {
  return graves.map((grave) => ({
    id: grave.id,
  }));
}

export default function GraveDetailPage() {
  return <GraveDetail />;
}
