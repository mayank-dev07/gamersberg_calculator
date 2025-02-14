"use client";

import { ChevronDown, Info, MapPin } from "lucide-react";
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
import { useState } from "react";

export default function ResultDisplay() {
  const [totalOfferPrice] = useAtom(totalOfferPriceAtom);
  const [totalOfferValue] = useAtom(totalOfferValueAtom);
  const [totalRequestedPrice] = useAtom(totalRequestedPriceAtom);
  const [totalRequestedValue] = useAtom(totalRequestedValueAtom);
  const [selectedProvider, setSelectedProvider] = useState("Gamersberg");
  const providers = ["Gamersberg", "fruityblox.com", "Blox Fruit"];

  const valueDifference =
    ((totalRequestedValue - totalOfferValue) /
      Math.min(totalOfferValue, totalRequestedValue)) *
    100;

  const Max = 40;
  const maxDifference = 100;
  const clampedValueDifference = Math.min(
    Math.abs(valueDifference),
    maxDifference
  );
  const isFair = Math.abs(valueDifference) <= Max;
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
    <div className="min-h-[200px] bg-[#0A061D] text-white rounded-lg">
      <div className="container py-6 px-0 md:px-10">
        <div className="flex  justify-between items-start  gap-2 md:gap-8">
          <div className="w-full">
            <ResultButton>Price: ${totalOfferPrice}</ResultButton>
          </div>
          <div className="text-center space-y-1 w-full">
            <div className="flex items-center gap-2 justify-center text-gray-400 text-xs md:text-sm">
              <Info className="w-4 h-4" />
              <span>Value Difference:</span>
            </div>
            {totalOfferValue !== 0 && totalRequestedValue !== 0 && (
              <>
                <div className="text-red-600 text-xs md:text-sm">
                  {totalOfferValue === totalRequestedValue
                    ? "0.00%"
                    : `${clampedValueDifference.toFixed(2)}%`}
                </div>
                <div className="text-sm text-gray-400">Max: {Max}%</div>
              </>
            )}
          </div>
          <div className="w-full flex justify-end">
            <ResultButton>Price: ${totalRequestedPrice}</ResultButton>
          </div>
        </div>

        <div className="flex justify-between items-start gap-2 md:gap-8 w-full pt-12 md:pt-28">
          <div className="w-full">
            <ResultButton>Price: ${totalRequestedPrice}</ResultButton>
          </div>
          <div className="w-full max-w-[200px] space-y-2 relative">
            <div
              className="absolute top-[-15px] transform -translate-x-1/2 z-10"
              style={{
                left:
                  totalOfferValue === 0 || totalRequestedValue === 0
                    ? "50%"
                    : isRightProgress
                    ? `calc(50% + ${progressStyle.width})`
                    : `calc(50% - ${progressStyle.width})`,
              }}
            >
              <MapPin className="text-white" size={20} />
            </div>

            <div className="relative h-2 bg-[#2D2B5A] rounded-full overflow-hidden">
              <div
                className="absolute top-0 w-0.5 h-full bg-white/50"
                style={{ left: "50%" }}
              />
              {totalOfferValue !== 0 && totalRequestedValue !== 0 && (
                <div
                  className={`absolute h-full transition-all duration-300 ${
                    isFair ? "bg-green-500" : "bg-red-500"
                  }`}
                  style={{
                    width: progressStyle.width,
                    left: isRightProgress
                      ? "50%"
                      : `calc(50% - ${progressStyle.width})`,
                  }}
                />
              )}
            </div>

            <div className="text-center">
              {totalOfferValue === 0 || totalRequestedValue === 0 ? (
                <div className="text-base md:text-lg">No items selected</div>
              ) : (
                <div
                  className={`${
                    isFair ? "text-green-500" : "text-red-500"
                  } text-xs sm:text-base md:text-lg`}
                >
                  {isFair
                    ? `${clampedValueDifference.toFixed(2)}% fair`
                    : "Overpaid, not tradeable on Blox Fruits"}
                </div>
              )}
            </div>
          </div>
          <div className="w-full flex justify-end">
            <ResultButton>Value: ${totalRequestedValue}</ResultButton>
          </div>
        </div>
      </div>
      {/* <div className="container py-6">
        <div className="flex flex-col md:flex-row justify-between items-center md:items-stretch gap-6 md:gap-8">
          <div className="flex md:flex-col justify-between w-full md:w-auto gap-4 md:gap-32">
            <ResultButton>Value: ${totalOfferValue}</ResultButton>
          </div>

          <div className="space-y-6 flex flex-col items-center justify-center w-full md:w-auto">

            <div className="flex items-center gap-2 text-gray-400 text-sm">
              <span className="whitespace-nowrap">Value Provider:</span>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    className="bg-[#12103A] hover:bg-[#12103A] text-white hover:text-white rounded-full border-2 border-white text-sm"
                  >
                    {selectedProvider}
                    <ChevronDown className="ml-1 h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-transparent backdrop-blur-md text-white">
                  {providers.map((provider) => (
                    <DropdownMenuItem
                      key={provider}
                      className="pl-6 cursor-pointer"
                      onClick={() => setSelectedProvider(provider)}
                    >
                      {provider}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            <div className="w-full max-w-[200px] space-y-2 relative">
              <div
                className="absolute top-[-15px] transform -translate-x-1/2 z-10"
                style={{
                  left:
                    totalOfferValue === 0 || totalRequestedValue === 0
                      ? "50%"
                      : isRightProgress
                      ? `calc(50% + ${progressStyle.width})`
                      : `calc(50% - ${progressStyle.width})`,
                }}
              >
                <MapPin className="text-white" size={20} />
              </div>

              <div className="relative h-2 bg-[#2D2B5A] rounded-full overflow-hidden">
                <div
                  className="absolute top-0 w-0.5 h-full bg-white/50"
                  style={{ left: "50%" }}
                />
                {totalOfferValue !== 0 && totalRequestedValue !== 0 && (
                  <div
                    className={`absolute h-full transition-all duration-300 ${
                      isFair ? "bg-green-500" : "bg-red-500"
                    }`}
                    style={{
                      width: progressStyle.width,
                      left: isRightProgress
                        ? "50%"
                        : `calc(50% - ${progressStyle.width})`,
                    }}
                  />
                )}
              </div>

              <div className="text-center">
                {totalOfferValue === 0 || totalRequestedValue === 0 ? (
                  <div className="text-base md:text-lg">No items selected</div>
                ) : (
                  <div
                    className={`${isFair ? "text-green-500" : "text-red-500"}`}
                  >
                    {isFair
                      ? `${clampedValueDifference.toFixed(2)}% fair`
                      : "Overpaid, not tradeable on Blox Fruits"}
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="flex md:flex-col justify-between w-full md:w-auto gap-4 md:gap-32">
            <ResultButton>Value: ${totalRequestedValue}</ResultButton>
          </div>
        </div>
      </div> */}
    </div>
  );
}
