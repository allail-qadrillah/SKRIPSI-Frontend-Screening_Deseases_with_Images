"use client";

import { useState } from "react";
import ChartPredictions from "@/components/chart-matrix";
import { Card, CardContent } from "@/components/ui/card";
import Image from "@/components/image";
import Dropzone from "@/components/dropzone";
import SkriningPage from "@/components/skrining-page";
import { ApiModelResult } from "@/types/file";

export default function Home() {
  const [result, setResult] = useState<ApiModelResult | null>(null);

  const handleOnResultApiReceived = (result: ApiModelResult) => {
    console.log(result);
    setResult(result);
  };
  return (
    <main>
      <header className="self-stretch flex flex-row items-start justify-end py-0 px-0 box-border max-w-full text-center text-[96px] text-gray-200 font-poppins">
        <h1 className="m-0 flex-1 relative text-inherit tracking-[0.01em] leading-[140%] font-semibold font-inherit inline-block max-w-full whitespace-nowrap">
          <span className="text-slate-900">Skrining</span>
          <span className="text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#00f5a0] to-[#00d9f5]">
            {" "}
            Tuberkulosis
          </span>
        </h1>
      </header>

      {result ? (
        <SkriningPage result={result} />
      ) : (
        <Dropzone onResultApiReceived={handleOnResultApiReceived} />
      )}
    </main>
  );
}
