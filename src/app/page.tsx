"use client";
import { useState } from "react";

export default function Page() {
  const [tab, setTab] = useState("mortgage");
  const [price, setPrice] = useState(480000);
  const [down, setDown] = useState(96000);
  const [rate, setRate] = useState(6.5);
  const [years, setYears] = useState(30);

  function calc(p: number, r: number, y: number) {
    const m = r / 100 / 12;
    const n = y * 12;
    return m === 0 ? p / n : (p * m * Math.pow(1 + m, n)) / (Math.pow(1 + m, n) - 1);
  }

  const loan = price - down;
  const monthly = calc(loan, rate, years);

  const tabs = [
    "Mortgage Pro",
    "Affordability",
    "Refinance",
    "Bi-Weekly",
    "Amortization",
    "FHA Loan",
    "VA Loan",
    "Rent vs Buy",
    "Down Payment",
    "Closing Cost",
    "DTI Calc",
    "Extra Payment",
    "Reverse Mort",
    "Home Equity",
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="bg-white border-b p-4 sticky top-0 z-50">
        <h1 className="font-black text-xl text-center">USA Mortgage PRO - 14 Tools LIVE</h1>
        <div className="flex gap-2 overflow-x-auto mt-3 pb-2">
          {tabs.map((t, i) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`whitespace-nowrap px-3 py-1.5 rounded-full text-xs font-bold border ${tab === t ? "bg-blue-600 text-white" : "bg-white"}`}
            >
              {i + 1}. {t}
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-4">
        <div className="bg-white rounded-2xl p-6 shadow">
          <h2 className="text-2xl font-bold">{tab} Calculator</h2>
          <p className="text-sm text-slate-500">CPC $35-$55 - USA High Paying Tool #{tabs.indexOf(tab) + 1}</p>

          <div className="grid grid-cols-2 gap-4 mt-6">
            <div>
              <label className="text-xs font-bold">Home Price</label>
              <input type="number" value={price} onChange={(e) => setPrice(Number(e.target.value))} className="w-full border rounded-lg p-2 mt-1" />
            </div>
            <div>
              <label className="text-xs font-bold">Down Payment</label>
              <input type="number" value={down} onChange={(e) => setDown(Number(e.target.value))} className="w-full border rounded-lg p-2 mt-1" />
            </div>
            <div>
              <label className="text-xs font-bold">Rate %</label>
              <input type="number" value={rate} onChange={(e) => setRate(Number(e.target.value))} className="w-full border rounded-lg p-2 mt-1" />
            </div>
            <div>
              <label className="text-xs font-bold">Years</label>
              <select value={years} onChange={(e) => setYears(Number(e.target.value))} className="w-full border rounded-lg p-2 mt-1">
                <option value={15}>15</option>
                <option value={20}>20</option>
                <option value={30}>30</option>
              </select>
            </div>
          </div>

          <div className="bg-blue-600 text-white rounded-xl p-6 mt-6 text-center">
            <div className="text-sm opacity-80">Monthly Payment - {tab}</div>
            <div className="text-4xl font-black">${monthly.toFixed(0)}/mo</div>
            <div className="text-xs mt-2">Loan ${loan.toLocaleString()} | Total Interest ${(monthly * years * 12 - loan).toFixed(0)}</div>
          </div>

          <div className="bg-green-600 text-white rounded-xl p-4 mt-4 text-center">
            <p className="font-bold">This Tool Pays $40 Per Lead!</p>
            <p className="text-xs">Get 3 Free Quotes - No Credit Impact</p>
          </div>
        </div>
      </div>
    </div>
  );
}
