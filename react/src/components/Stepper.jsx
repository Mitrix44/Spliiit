function Stepper({ step }) {
  return (
    <div className="flex flex-row justify-between items-center gap-1/10 w-full pt-2 pb-2">
      <div className="bg-slate-300 w-1/5 h-2 rounded-4xl flex flex-row justify-start items-center">
        {step >= 1 &&
          <div className={step === 1 ? "h-full bg-black w-1/3 rounded-4xl" : "h-full w-full rounded-4xl bg-black"}></div>}
      </div>
      <div className="bg-slate-300 w-1/5 h-2 rounded-4xl">
        {step >= 2 &&
          <div className={step === 2 ? "h-full bg-black w-1/3 rounded-4xl" : "h-full w-full rounded-4xl bg-black"}></div>}
      </div>
      <div className="bg-slate-300 w-1/5 h-2 rounded-4xl">
        {step >= 3 &&
          <div className={step === 3 ? "h-full bg-black w-1/3 rounded-4xl" : "h-full w-full rounded-4xl bg-black"}></div>}
      </div>
      <div className="bg-slate-300 w-1/5 h-2 rounded-4xl">
        {step >= 4 &&
          <div className={step === 4 ? "h-full bg-black w-1/3 rounded-4xl" : "h-full w-full rounded-4xl bg-black"}></div>}
      </div>
    </div>
  );
}

export default Stepper;