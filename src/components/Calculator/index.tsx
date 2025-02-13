"use client";

import OfferSelector from "../OfferSelector";
import RequestSelector from "../RequestSelector";
import ResultDisplay from "../ResultDisplay";

export default function Calculator() {
  return (
    <div className="container mx-auto px-0 md:px-12 ">
      <h1 className="text-4xl font-bold text-center  text-white">Calculator</h1>

      <div className="flex justify-center items-start lg:flex-row flex-col gap-6 w-full mt-5">
        <div className=" border-2 border-[#364051] rounded-lg w-full lg:w-1/2">
          <h2 className="text-xl font-semibold text-center text-white mb-4 border-b-[1px] border-b-[#364051] py-2">
            Offer ( You )
          </h2>
          <OfferSelector />
        </div>
        <div className=" border-2 border-[#364051] rounded-lg w-full lg:w-1/2">
          <h2 className="text-xl font-semibold text-center text-white mb-4 border-b-[1px] border-b-[#364051] py-2">
            Request ( Them )
          </h2>
          <RequestSelector />
        </div>
      </div>

      <div className="mt-8 space-y-4 px-0 md:px-8">
        <ResultDisplay />
      </div>
    </div>
  );
}
