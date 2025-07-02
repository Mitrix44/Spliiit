import { useState } from "react"

import { toast } from "react-toastify";
import indicatifs from "../indicatifs";
import Stepper from "./stepper";

function Step1({ onNextStep, formData, setFormData }) {

  function handleSubmit(event) {
    event.preventDefault();
    const regexPays = indicatifs.find(indicatif => indicatif.indicatif === formData.indicatif_code).phoneRegex
    const regex = new RegExp(regexPays);
    if (regex.test(formData.numero.value)) {
      toast.dismiss();
      onNextStep();
    } else {
      toast.dismiss()
      toast.error('Le numéro ne correspond pas au format du Pays');
      setFormData((prev) => ({ ...prev, numero: { value: formData.numero.value, error: true } }))
    }
  }
  return (
    <div className="m-0 pt-20 pb-20 pl-5 pr-5 h-screen w-screen flex flex-col justify-start items-center">
      <Stepper step={1} />
      <h1 className="text-3xl font-bold mb-8">Inscription</h1>
      <form className="p-0 m-0 gap-5 flex flex-col justify-start items-center w-full" onSubmit={(event) => { handleSubmit(event) }}>
        <select onChange={(event) => { setFormData((prev) => ({ ...prev, indicatif_code: event.target.value })) }} className="border-slate-300 w-full border-2 p-3 rounded-lg">
          {indicatifs.map(indicatif =>
            <option key={indicatif.indicatif} className="p-1 border-slate-300" value={indicatif.indicatif}>{indicatif.longName} ({indicatif.indicatif})</option>)}
        </select>
        <input type="text" onChange={(event) => { setFormData((prev) => ({ ...prev, numero: { value: event.target.value, error: false } })) }} className={formData.numero.error ? 'w-full border-2 p-3 rounded-lg border-red-500' : 'w-full border-2 p-3 rounded-lg border-slate-300'} placeholder="Numéro de téléphone" />
        <p className="text-xs">Nous vous appellerons ou vous enverrons un SMS pour confirmer votre numéro. Aucun frais ne sera facturé.</p>
        <button className="w-full bg-black rounded-4xl text-white text-lg p-3">Continuer</button>
      </form>
    </div>
  );
}

export default Step1;