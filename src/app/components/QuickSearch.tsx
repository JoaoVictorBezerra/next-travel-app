import Image from "next/image";
import Link from "next/link";
import React from "react";

const QuickSearch = () => {
  return (
    <div className="container mx-auto p-5">
      <div className="flex items-center">
        <div className="w-full h-[1px] bg-customGray-light"></div>
        <h2 className="px-5 font-medium text-customGray whitespace-nowrap">Tente pesquisar por</h2>
        <div className="w-full h-[1px] bg-customGray-light"></div>
      </div>

      <div className="flex w-full flex-wrap justify-between lg:flex-nowrap mt-5 lg:mt-10 lg:justify-center lg:gap-40">
        <div className="flex flex-col items-center gap-1">
          <Link href={`/trips/search?text=hotel`} className="flex flex-col items-center hover:text-customPurple transition-all">
            <Image width={35} height={35} src="/hotel-icon.png" alt="Hotel" />
            <p className="text-sm lg:text-base text-customGray">Hotel</p>
          </Link>
        </div>

        <div className="flex flex-col items-center gap-1">
          <Link href="/trips/search?text=fazenda" className="flex flex-col items-center hover:text-customPurple transition-all">
            <Image width={35} height={35} src="/farm-icon.png" alt="Fazenda" />
            <p className="text-sm lg:text-base text-customGray">Fazenda</p>
          </Link>
        </div>

        <div className="flex flex-col items-center gap-1">
          <Link href="/trips/search?text=Chalé" className="flex flex-col items-center hover:text-customPurple transition-all">
            <Image width={35} height={35} src="/cottage-icon.png" alt="Chalé" />
            <p className="text-sm lg:text-base text-customGray">Chalé</p>
          </Link>
        </div>

        <div className="flex flex-col items-center gap-1">
          <Link href="/trips/search?text=pousada" className="flex flex-col items-center hover:text-customPurple transition-all">
            <Image width={35} height={35} src="/inn-icon.png" alt="Pousada" />
            <p className="text-sm lg:text-base text-customGray">Pousada</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default QuickSearch;
