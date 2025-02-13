"use client";
import { useState } from "react";
import {
  ArrowRightLeft,
  CirclePlus,
  DollarSign,
  Plus,
  Quote,
  X,
} from "lucide-react";
import { useAtom } from "jotai";
import { selectedOfferFruitsAtom } from "@/lib/store";
import { Card } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "../ui/input";
import { Fruit, fruits } from "@/lib/fruits";

// Fruit Data

export default function OfferSelector() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFruits, setSelectedFruits] = useAtom(selectedOfferFruitsAtom);

  const handleAddFruit = (fruit: Fruit) => {
    setSelectedFruits((prev: any) => [...prev, fruit]);
    setIsDialogOpen(false);
  };

  const handleRemoveFruit = (index: number) => {
    setSelectedFruits((prev: any) =>
      prev.filter((_: any, i: any) => i !== index)
    );
  };

  const filteredFruits = fruits.filter((fruit) =>
    fruit.name.toLowerCase().startsWith(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto py-2">
      <div className="relative">
        {Array.from({ length: Math.ceil((selectedFruits.length + 1) / 4) }).map(
          (_, rowIndex) => (
            <div key={rowIndex} className="w-full">
              {rowIndex > 0 && (
                <div className="relative flex items-center my-4">
                  <hr className="border-t-2 border-gray-500 w-full opacity-50 my-8" />
                  <span className="absolute left-1/2 transform -translate-x-1/2 bg-[#0a061d] px-3 py-1 text-white">
                    <Quote fill="gray" color="#0a061d" />
                  </span>
                </div>
              )}

              <div className="flex items-center">
                <div className="grid grid-cols-2 md:grid-cols-2 gap-4 mb-4 px-4 flex-grow">
                  {Array.from({ length: 4 }).map((_, colIndex) => {
                    const index = rowIndex * 4 + colIndex;
                    const fruit = selectedFruits[index];

                    if (fruit) {
                      return (
                        <Card
                          key={index}
                          className="relative p-4 bg-black border-[#2D2B5A] h-[200px] md:h-32 flex flex-col md:flex-row justify-start items-center space-y-2 gap-2 md:gap-8"
                        >
                          <img
                            src={fruit.image}
                            alt={fruit.name}
                            className="w-16 h-16 rounded-md"
                          />
                          <div className="flex flex-col items-center text-sm lg:text-base">
                            <h3 className="font-semibold text-white">
                              {fruit.name}
                            </h3>
                            <div className="text-white text-xs md:text-sm">
                              {fruit.price}
                            </div>
                            <div className="flex justify-center items-center">
                              <DollarSign className="w-4 h-4 text-green-300" />
                              <div className="text-white">{fruit.value}</div>
                            </div>
                            <button
                              className="absolute top-2 right-2 bg-black border-[1px] border-white rounded-full"
                              onClick={() => handleRemoveFruit(index)}
                            >
                              <X className="w-4 h-4 text-white" />
                            </button>
                          </div>
                        </Card>
                      );
                    }

                    return index === selectedFruits.length ? (
                      <Card
                        key={index}
                        className="bg-[#03011d] border-[#14f1b6] transition-colors cursor-pointer h-[200px] md:h-32 flex items-center justify-center"
                        onClick={() => setIsDialogOpen(true)}
                      >
                        <CirclePlus className="w-12 h-12 text-[#14f1b6] font-extrabold" />
                      </Card>
                    ) : (
                      <Card
                        key={index}
                        className="bg-[#120b4e] border-[#120b4e] h-[200px] md:h-32"
                      />
                    );
                  })}
                </div>
                <div className="hidden lg:flex items-center justify-center px-4 absolute -right-[42px]">
                  <ArrowRightLeft className=" text-white" />
                </div>
              </div>
            </div>
          )
        )}
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="bg-[#232830] text-white max-w-3xl border-0 ring-0 !h-fit">
          <DialogHeader>
            <DialogTitle className="text-center text-2xl">
              Add Items to calculate offer value
            </DialogTitle>
          </DialogHeader>
          <div className="w-full flex flex-col items-center justify-center">
            <div>Value Difference:</div>
            <div>Max:</div>
          </div>

          <div className="px-4 pt-5">
            <div className="relative w-full flex justify-center items-center ">
              <Input
                type="text"
                placeholder="Search"
                className="rounded-xl max-w-lg text-black bg-white border-[1px] border-black outline-offset-2 outline-whitex focus:outline-2  px-3 py-2"
                value={searchTerm}
                onChange={(e: any) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <ScrollArea className="h-[400px] p-0 md:p-4">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 p-0 md:p-4">
              {filteredFruits.length > 0 ? (
                filteredFruits.map((fruit) => (
                  <Card
                    key={fruit.id}
                    className="px-1 md:px-4 py-6 cursor-pointer transition-all duration-300 transform bg-black border-[#2D2B5A] hover:scale-105"
                    onClick={() => handleAddFruit(fruit)}
                  >
                    <div className="flex justify-between items-center space-y-2 p-2">
                      <img
                        src={fruit.image}
                        alt={fruit.name}
                        className="w-16 h-16 rounded-md"
                      />
                      <div>
                        <h3 className="font-semibold text-white text-center">
                          {fruit.name}
                        </h3>
                        <div className="flex justify-center items-center">
                          <DollarSign className="w-4 h-4 text-green-300" />
                          <div className="text-white">{fruit.value}</div>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))
              ) : (
                <p className="text-center text-gray-400">
                  No matching fruits found
                </p>
              )}
            </div>
          </ScrollArea>
        </DialogContent>
      </Dialog>
    </div>
  );
}
