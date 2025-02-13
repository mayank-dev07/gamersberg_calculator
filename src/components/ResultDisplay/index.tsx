"use client";

import { ChevronDown, Clock, MapPin } from "lucide-react";
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

  // Calculate value difference percentage
  const valueDifference =
    ((totalRequestedValue - totalOfferValue) /
      Math.min(totalOfferValue, totalRequestedValue)) *
    100;

  const Max = 40; // Fair trade threshold
  const maxDifference = 100; // Maximum scale for progress bar

  // Clamp the value difference for display
  const clampedValueDifference = Math.min(
    Math.abs(valueDifference),
    maxDifference
  );

  // Determine if the difference is within fair range
  const isFair = Math.abs(valueDifference) <= Max;

  // Determine direction of progress bar
  const isRightProgress = totalRequestedValue > totalOfferValue;

  const calculateProgress = () => {
    const percentage = (clampedValueDifference / maxDifference) * 50;
    return {
      width: `${percentage}%`,
      left: isRightProgress ? "50%" : `${50 - percentage}%`,
    };
  };

  const progressStyle = calculateProgress();

  return (
    <div className="min-h-[200px] bg-[#0A061D] text-white ">
      <div className="container ">
        <div className="flex justify-between items-stretch gap-8">
          <div className="space-y-32 flex flex-col">
            <ResultButton>Price: ${totalOfferPrice}</ResultButton>
            <ResultButton>Price: ${totalOfferValue}</ResultButton>
          </div>

          <div className="space-y-6 flex flex-col items-center justify-center">
            <div className="text-center space-y-1">
              <div className="flex items-center gap-2 justify-center text-gray-400 text-xs md:text-sm">
                <Clock className="w-4 h-4" />
                <span>Value Difference :</span>
              </div>
              {totalOfferValue !== 0 && totalRequestedValue !== 0 && (
                <>
                  <div className="text-white">
                    {totalOfferValue === totalRequestedValue
                      ? "0.00%"
                      : `${clampedValueDifference.toFixed(2)}%`}
                  </div>
                  <div className="text-sm text-gray-400">Max: {Max}%</div>
                </>
              )}
            </div>

            <div className="flex items-center gap-2 text-gray-400 text-sm">
              <span>Value&nbsp;Provider:</span>
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
                <DropdownMenuContent className="bg-transparent backdrop-blur-md text-white">
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

            <div className="w-full max-w-[200px] space-y-2 relative">
              {/* Map Pin Icon */}
              <div
                className="absolute top-[-15px] left-1/2 transform -translate-x-1/2 z-10"
                style={{
                  left: `calc(${progressStyle.left} + (${progressStyle.width} / 2))`,
                }}
              >
                <MapPin className="text-white" size={20} />
              </div>

              {/* Progress Bar */}
              <div className="relative h-2 bg-[#2D2B5A] rounded-full overflow-hidden">
                {/* Background Line */}
                <div
                  className="absolute top-0 w-0.5 h-full bg-white/50"
                  style={{ transform: "translateX(-100%)" }}
                />

                {/* Progress Fill */}
                <div
                  className={`absolute h-full transition-all duration-300 ${
                    isFair ? "bg-green-500" : "bg-red-500"
                  }`}
                  style={{
                    width: progressStyle.width,
                    left: progressStyle.left,
                  }}
                />
              </div>

              {/* Trade Status */}
              {totalOfferValue !== 0 && totalRequestedValue !== 0 && (
                <div
                  className={`text-center ${
                    isFair ? "text-green-500" : "text-red-500"
                  }`}
                >
                  {isFair
                    ? `${clampedValueDifference.toFixed(2)}% fair`
                    : "Overpaid, not tradeable on Blox Fruits"}
                </div>
              )}

              {/* No Items Selected Message */}
              {(totalOfferValue == 0 || totalRequestedValue == 0) && (
                <div className="text-center text-lg">No items selected</div>
              )}
            </div>
          </div>

          <div className="space-y-32 flex flex-col">
            <ResultButton>Price: ${totalRequestedPrice}</ResultButton>
            <ResultButton>Price: ${totalRequestedValue}</ResultButton>
          </div>
        </div>
      </div>
    </div>
  );
}
