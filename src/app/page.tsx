import Calculator from "@/components/Calculator";
import FruitSelector from "@/components/OfferSelector";
// import ResultsDisplay from "@/components/ResultDisplay";

export default function Home() {
  return (
    <main className="min-h-screen py-8 px-4 bg-[#0A061D] text-white">
      <div className="container mx-auto">
        <Calculator />
      </div>
    </main>
  );
}
