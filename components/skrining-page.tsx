import ChartPredictions from "@/components/chart-matrix";
import { Card, CardContent } from "@/components/ui/card";
import Image from "@/components/image";
import Dropzone from "@/components/dropzone";
import { ApiModelResult } from "@/types/file";
import { base64ToImageUrl } from "@/lib/utils";

interface SkriningPageProps {
  result: ApiModelResult;
}

export default function SkriningPage({ result }: SkriningPageProps) {

  return (
    <>
      <div className="flex justify-center items-center ">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-[1200px] mx-auto">
          <Card className="flex justify-center">
            <Image
              src={base64ToImageUrl(result.image_clahe_base64)}
              alt=""
              width={1000}
              height={1000}
              rounded="rounded"
              className="w-full h-auto object-cover rounded-lg"
            />
          </Card>
          <Card className="flex justify-center">
            <Image
              src={base64ToImageUrl(result.image_attention_map_base64)}
              alt=""
              width={1000}
              height={1000}
              rounded="rounded"
              className="w-full h-auto object-cover rounded-lg"
            />
          </Card>
        </div>
      </div>

      <Card className="fixed bottom-0 mb-4 left-1/2 transform -translate-x-1/2 text-slate-900 w-3/4 md:w-2/3 lg:w-1/4 rounded-lg p-2 font-poppins">
        <CardContent>
          <h2 className="text-sm font-semibold mb-1">Keyakinan Prediksi (%)</h2>
          <div className="space-y-1">
            <div>
              <div className="flex justify-between text-xs">
                <span>Normal</span>
                <span className="font-semibold">{result.negative.toFixed(2)}%</span>
              </div>
              <div className="w-full bg-[#1A374D] rounded-full h-1.5">
                <div
                  className="bg-gradient-to-r from-[#00f5a0] to-[#00d9f5] h-1.5 rounded-full"
                  style={{
                    width: `${result.negative.toFixed(2)}%`,
                  }}
                />
              </div>
            </div>
            <div>
              <div className="flex justify-between text-xs">
                <span>Tuberkulosis</span>
                <span className="font-semibold">{result.positive.toFixed(2)}%</span>
              </div>
              <div className="w-full bg-[#1A374D] rounded-full h-1.5">
                <div
                  className="bg-gradient-to-r from-[#00f5a0] to-[#00d9f5] h-1.5 rounded-full"
                  style={{
                    width: `${result.positive.toFixed(2)}%`,
                  }}
                />
              </div>
            </div>
            {/* <div className="flex justify-between items-center text-xs">
              <p>Is it true?</p>
              <div className="flex gap-1">
                <button className="bg-gradient-to-r from-[#00f5a0] to-[#00d9f5] text-[#0D1F2D] rounded-md px-2 py-0.5 font-semibold">
                  True
                </button>
                <button className="bg-gradient-to-r from-[#ff0000] to-[#ff7f7f] text-[#0D1F2D] rounded-md px-2 py-0.5 font-semibold">
                  False
                </button>
              </div>
            </div> */}
          </div>
        </CardContent>
      </Card>
    </>
  );
}
