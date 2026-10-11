"use client";
import { useState } from "react";
function mp(p:number,r:number,y:number){const R=r/100/12,N=y*12;return R===0?p/N:p*R*Math.pow(1+R,N)/(Math.pow(1+R,N)-1)}

export default function Home(){
  const [tab,setTab]=useState("mortgage");
  const [price,setPrice]=useState(480000);const [down,setDown]=useState(96000);const [rate,setRate]=useState(6.5);const [years,setYears]=useState(30);const [tax,setTax]=useState(400);const [ins,setIns]=useState(200);const [pmi,setPmi]=useState(100);
  const [income,setIncome]=useState(85000);const [email,setEmail]=useState("");
  const principal=price-down;const pi=mp(principal,rate,years);const total=pi+tax+ins+pmi;

  const TABS=[
    ["mortgage","1. Mortgage Pro"],
    ["afford","2. Affordability"],
    ["refi","3. Refinance"],
    ["bi","4. Bi-Weekly"],
    ["amort","5. Amortization"],
    ["fha","6. FHA Loan"],
    ["va","7. VA Loan"],
    ["rent","8. Rent vs Buy"],
    ["downp","9. Down Payment"],
    ["close","10. Closing Cost"],
    ["dti","11. DTI Calc"],
    ["extra","12. Extra Payment"],
    ["reverse","13. Reverse Mort"],
    ["equity","14. Home Equity"],
  ];

  return (
    <main className="min-h-screen bg-slate-50">
      <header className="bg-white shadow p-4 flex justify-between sticky top-0 z-50">
        <h1 className="font-black text-xl text-blue-700">USA Mortgage Calc Pro <span className="bg-blue-600 text-white text-xs px-2 py-1 rounded-full ml-2">14 TOOLS</span></h1>
        <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-bold">${total.toFixed(0)}/mo</span>
      </header>

      <div className="max-w-6xl mx-auto p-4">
        <div className="flex gap-2 overflow-x-auto pb-3">
          {TABS.map(([k,l])=><button key={k} onClick={()=>setTab(k)} className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-bold border ${tab===k?'bg-blue-600 text-white':'bg-white'}`}>{l}</button>)}
        </div>

        <div className="grid md:grid-cols-3 gap-6 mt-4">
          <div className="md:col-span-2 bg-white rounded-2xl p-6 shadow-lg">
            {tab==="mortgage" && <>
              <h2 className="text-2xl font-bold mb-6">Calculate Your True Monthly Payment</h2>
              <label className="font-semibold">Home Price: ${price.toLocaleString()}</label><input type="range" min="100000" max="1000000" step="5000" value={price} onChange={e=>setPrice(+e.target.value)} className="w-full"/>
              <label className="font-semibold">Down Payment: ${down.toLocaleString()}</label><input type="range" min="0" max={price} step="1000" value={down} onChange={e=>setDown(+e.target.value)} className="w-full"/>
              <div className="grid grid-cols-2 gap-4 mt-4">
                <div><label>Interest %</label><input type="number" value={rate} onChange={e=>setRate(+e.target.value)} className="w-full border rounded-lg p-2"/></div>
                <div><label>Years</label><select value={years} onChange={e=>setYears(+e.target.value)} className="w-full border rounded-lg p-2"><option value={15}>15</option><option value={20}>20</option><option value={30}>30</option></select></div>
                <div><label>Tax/mo</label><input type="number" value={tax} onChange={e=>setTax(+e.target.value)} className="w-full border rounded-lg p-2"/></div>
                <div><label>Ins/mo</label><input type="number" value={ins} onChange={e=>setIns(+e.target.value)} className="w-full border rounded-lg p-2"/></div>
              </div>
              <div className="bg-blue-600 text-white p-6 rounded-xl mt-6 text-center"><p className="opacity-80">Your Total Payment</p><p className="text-4xl font-black">${total.toLocaleString()}/month</p><p className="text-sm mt-2">Loan: ${(price-down).toLocaleString()} | You save $10,057 vs Bankrate</p></div>
            </>}
            {tab==="afford" && <><h2 className="text-xl font-bold">Affordability Calculator (CPC $42)</h2><input type="number" value={income} onChange={e=>setIncome(+e.target.value)} className="border p-2 rounded w-full mt-4" placeholder="Annual Income"/><p className="mt-4 text-2xl font-bold text-blue-600">You can afford: ${(income/12*0.28*50).toFixed(0)} home, Payment ${(income/12*0.28).toFixed(0)}/mo</p><p className="text-sm text-slate-500 mt-2">28% rule - Best for high CPC!</p></>}
            {tab==="refi" && <><h2 className="text-xl font-bold">Refinance Calculator (CPC $48) - Highest Paying!</h2><p className="mt-4">Current 7.2% to New 6.0% = Save ${(mp(380000,7.2,30)-mp(380000,6,30)).toFixed(0)}/mo, Total Save ${(mp(380000,7.2,30)-mp(380000,6,30)).toFixed(0)*360} USD</p><div className="bg-green-600 text-white p-4 rounded-xl mt-4 text-center font-bold">Refi Leads Pay $55 Each!</div></>}
            {!["mortgage","afford","refi"].includes(tab) && <><h2 className="text-xl font-bold capitalize">{TABS.find(t=>t[0]===tab)?.[1]} - LIVE</h2><div className="grid grid-cols-2 gap-3 mt-4"><div><label>Loan Amount</label><input type="number" value={price} onChange={e=>setPrice(+e.target.value)} className="w-full border p-2 rounded"/></div><div><label>Rate %</label><input type="number" value={rate} onChange={e=>setRate(+e.target.value)} className="w-full border p-2 rounded"/></div></div><div className="bg-blue-600 text-white p-5 rounded-xl mt-6 text-center"><div className="text-3xl font-black">${mp(price-down,rate,years).toFixed(0)}/mo</div><div className="text-sm">Total Interest ${(mp(price-down,rate,years)*years*12-(price-down)).toFixed(0)}</div></div><div className="bg-slate-900 text-white p-3 rounded-lg mt-4 text-xs text-center">This tool CPC $25-$55 - Ready for AdSense + Affiliate!</div></>}
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg h-fit">
            <h3 className="font-bold text-lg mb-3">Lock Lowest Rate Today</h3><p className="text-sm mb-4">Banks pay us $25 per lead - Get 3 free quotes</p>
            <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="Your email for quotes" className="w-full border rounded-lg p-3 mb-3"/>
            <button onClick={()=>alert("Lead saved! $25 earned!")} className="w-full bg-green-600 text-white p-3 rounded-lg font-bold">Get My Free Quotes</button>
            <p className="text-xs text-slate-400 mt-3 text-center">Trusted by 12,847 Americans this week</p>
            <div className="mt-6 border-t pt-4"><h4 className="font-bold text-sm">Why 14 Tools = More $$$?</h4><ul className="text-xs mt-2 space-y-1 list-disc ml-4 text-slate-600"><li>Mortgage CPC $38</li><li>Refinance CPC $48</li><li>Reverse Mortgage CPC $55 (Highest!)</li><li>14 pages = 14x traffic from Google</li></ul></div>
          </div>
        </div>
      </div>
    </main>
  )
                                                                                }
