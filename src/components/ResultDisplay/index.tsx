"use client";

import { ChevronDown, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAtom } from "jotai";
import {
  totalOfferPriceAtom,
  totalOfferValueAtom,
  totalRequestedPriceAtom,
  totalRequestedValueAtom,
} from "@/lib/store";
import ResultButton from "../ResultButton";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function ResultDisplay() {
  const [totalOfferPrice] = useAtom(totalOfferPriceAtom);
  const [totalOfferValue] = useAtom(totalOfferValueAtom);
  const [totalRequestedPrice] = useAtom(totalRequestedPriceAtom);
  const [totalRequestedValue] = useAtom(totalRequestedValueAtom);

  const valueDifference =
    ((totalRequestedValue - totalOfferValue) / totalOfferValue) * 100;

  const maxDifference = 40;
  const clampedValueDifference = Math.min(
    Math.abs(valueDifference),
    maxDifference
  );

  let fairnessPercentage;
  if (totalOfferValue === totalRequestedValue) {
    fairnessPercentage = 100;
  } else {
    fairnessPercentage = 100 - (clampedValueDifference / maxDifference) * 100;
  }

  return (
    <div className="min-h-[200px] bg-[#0A061D] text-white ">
      <div className="container ">
        <div className="flex justify-between items-stretch gap-8">
          <div className="space-y-32 flex flex-col">
            <ResultButton children={`Price: ${totalOfferPrice}`} />
            <ResultButton children={`Price: ${totalOfferValue}`} />
          </div>

          <div className="space-y-6 flex flex-col items-center justify-center">
            <div className="text-center space-y-1">
              <div className="flex items-center gap-2 justify-center text-gray-400 text-xs md:text-sm">
                <Clock className="w-4 h-4" />
                <span>Value Difference :</span>
              </div>
              <div className="text-white">
                {totalOfferValue === totalRequestedValue
                  ? "0.00%"
                  : `${clampedValueDifference.toFixed(2)}%`}
              </div>
              <div className="text-sm text-gray-400">Max: {maxDifference}%</div>
            </div>

            <div className="flex items-center gap-2 text-gray-400">
              <span>Value Provider:</span>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    className="bg-[#12103A] hover:bg-[#12103A] text-white hover:text-white rounded-full border-2 border-white"
                  >
                    Gamersberg
                    <ChevronDown className="-ml-2 h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-transparent backdrop-blur-sm text-white">
                  <DropdownMenuItem className="pl-6">
                    Gamersberg
                  </DropdownMenuItem>
                  <DropdownMenuItem className="pl-6">
                    fruityblox.com
                  </DropdownMenuItem>
                  <DropdownMenuItem className="pl-6">
                    Blox Fruit
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            <div className="w-full max-w-[200px] space-y-2">
              <div className="h-2 bg-[#2D2B5A] rounded-full overflow-hidden">
                <div
                  className="h-full bg-green-500"
                  style={{ width: `${fairnessPercentage}%` }}
                />
              </div>
              <div className="text-center text-green-500">
                {`${fairnessPercentage.toFixed(2)}% fair`}
              </div>
            </div>
          </div>

          <div className="space-y-32 flex flex-col">
            <ResultButton children={`Price: ${totalRequestedPrice}`} />
            <ResultButton children={`Price: ${totalRequestedValue}`} />
          </div>
        </div>
      </div>
    </div>
  );
}
