export default function ChartPredictions() {
  return (
    <div className="bg-[#0D1F2D] rounded-3xl p-6 text-white w-full max-w-md">
      <h2 className="text-lg font-semibold mb-4">Keyakinan Prediksi (%)</h2>
      <div className="space-y-4">
        <div>
          <div className="flex justify-between mb-1">
            <span>Normal</span>
            <span className="font-semibold">99%</span>
          </div>
          <div className="w-full bg-[#1A374D] rounded-full h-2.5">
            <div
              className="bg-gradient-to-r from-[#00f5a0] to-[#00d9f5] h-2.5 rounded-full"
              style={{
                width: "99%",
              }}
            />
          </div>
        </div>
        <div>
          <div className="flex justify-between mb-1">
            <span>Tuberkulosis</span>
            <span className="font-semibold">1%</span>
          </div>
          <div className="w-full bg-[#1A374D] rounded-full h-2.5">
            <div
              className="bg-gradient-to-r from-[#00f5a0] to-[#00d9f5] h-2.5 rounded-full"
              style={{
                width: "1%",
              }}
            />
          </div>
        </div>
        <div className="mt-4">
          <p className="text-base">Is it true?</p>
          <div className="flex justify-center gap-2 mt-2">
            <button className="bg-gradient-to-r from-[#00f5a0] to-[#00d9f5] text-[#0D1F2D] rounded-md px-4 py-2 font-semibold">
              True
            </button>
            <button className="bg-gradient-to-r from-[#ff0000] to-[#ff7f7f] text-[#0D1F2D] rounded-md px-4 py-2 font-semibold">
              False
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
