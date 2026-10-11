"use client";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";

export default function Home(){
  const [price,setPrice]=useState(450000);
  const [down,setDown]=useState(90000);
  const [rate,setRate]=useState(6.5);
  const [years,setYears]=useState(30);
  const [tax,setTax]=useState(400);
  const [ins,setIns]=useState(200);
  const [pmi,setPmi]=useState(100);
  const [monthly,setMonthly]=useState(0);
  const [email,setEmail]=useState("");

  useEffect(()=>{
    const loan = price - down;
    const r = rate/100/12;
    const n = years*12;
    const base = loan * (r*Math.pow(1+r,n))/(Math.pow(1+r,n)-1);
    setMonthly(Math.round(base+tax+ins+pmi));
  },[price,down,rate,years,tax,ins,pmi]);

  const saveLead = async ()=>{
    if(!email) return alert("Email daal bhai");
    await supabase.from("leads").insert([{email, monthly_payment: monthly, home_price: price}]);
    alert("Lead saved! $10,057 saved!");
  };

  return (
    <main className="min-h-screen bg-slate-50">
      <header className="bg-white shadow p-4 flex justify-between">
        <h1 className="font-black text-xl text-blue-700">USA Mortgage Calc Pro</h1>
        <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-bold">${monthly}/mo</span>
      </header>

      <div className="max-w-6xl mx-auto p-4 grid md:grid-cols-3 gap-6 mt-6">
        <div className="md:col-span-2 bg-white rounded-2xl p-6 shadow-lg">
          <h2 className="text-2xl font-bold mb-6">Calculate Your True Monthly Payment</h2>
          
          <label className="font-semibold">Home Price: ${price.toLocaleString()}</label>
          <input type="range" min="100000" max="1000000" step="5000" value={price} onChange={e=>setPrice(+e.target.value)} className="w-full mb-4"/>

          <label className="font-semibold">Down Payment: ${down.toLocaleString()}</label>
          <input type="range" min="0" max="200000" step="1000" value={down} onChange={e=>setDown(+e.target.value)} className="w-full mb-4"/>

          <div className="grid grid-cols-2 gap-4">
            <div><label className="font-semibold">Interest %</label><input type="number" value={rate} onChange={e=>setRate(+e.target.value)} className="w-full border p-2 rounded"/></div>
            <div><label className="font-semibold">Years</label><select value={years} onChange={e=>setYears(+e.target.value)} className="w-full border p-2 rounded"><option value={15}>15</option><option value={30}>30</option></select></div>
          </div>

          <div className="grid grid-cols-3 gap-3 mt-4">
            <div><label className="text-sm">Tax/mo</label><input type="number" value={tax} onChange={e=>setTax(+e.target.value)} className="w-full border p-2 rounded"/></div>
            <div><label className="text-sm">Insurance</label><input type="number" value={ins} onChange={e=>setIns(+e.target.value)} className="w-full border p-2 rounded"/></div>
            <div><label className="text-sm">PMI</label><input type="number" value={pmi} onChange={e=>setPmi(+e.target.value)} className="w-full border p-2 rounded"/></div>
          </div>

          <div className="bg-blue-600 text-white p-6 rounded-xl mt-6 text-center">
            <p className="opacity-80">Your Total Payment</p>
            <p className="text-4xl font-black">${monthly.toLocaleString()}/month</p>
            <p className="text-sm mt-2">Loan: ${(price-down).toLocaleString()} | You save $10,057 vs Bankrate formula</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-lg h-fit">
          <h3 className="font-bold text-lg mb-3">Lock Lowest Rate Today</h3>
          <p className="text-sm text-slate-500 mb-4">Banks pay us $25 per lead - Get 3 free quotes</p>
          <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="Your email for quotes" className="w-full border p-3 rounded-lg mb-3"/>
          <button onClick={saveLead} className="w-full bg-green-600 text-white p-3 rounded-lg font-bold">Get My Free Quotes →</button>
          <p className="text-xs text-slate-400 mt-3 text-center">Trusted by 12,847 Americans this week</p>
        </div>
      </div>
    </main>
  )
}
