import { useState } from "react";
import Stepper from "./stepper";
import { toast } from "react-toastify";

function Step4({ onNextStep }) {
  const [error, setError] = useState(true);
  const [checked, setChecked] = useState(false);
  function handleSubmit() {
    if (checked) {
      onNextStep();
    } else {
      setError(true);
      toast.error('Vous devez valider les CGU pour passer a l\'étape suivante');
    }
  }
  return (
    <div className="m-0 pt-20 pb-10 pl-5 pr-5 h-screen w-screen flex flex-col justify-start  items-center">
      <div className="w-full flex flex-col justify-start items-center">
        <Stepper step={4} />
        <h1 className="text-2xl font-bold m-0">A un clic de vos economies...</h1>
        <img src="/validation.png" className="w-4/5 m-5" />
        <label className="text-md flex flex-row items-center gap-[20px] text-md font-semibold">
          <input
            checked={checked}
            onChange={() => {
              setChecked(!checked);
              setError(false);
            }}
            type="checkbox"
            className={error === true ? "w-[15px] h-[15px] border-red-600 border-2 border-solid" : "w-[15px] h-[15px]"}
          />
          <span>En vous inscrivant, vous reconnaissez <br /> avoir pris connaissance et acceptez nos <br /> <a href="#" className="underline">Conditions Générales d'utilisation</a></span>
        </label>
        <p className="text-xs mt-3">Les données sont collectées par Spliit, responsable de traitement, et sont nécessaires à la création de votre compte et à la fourniture de nos services. Pour plus d’infirmations sur le traitement de vos données et sur vos droits, consulter notre Politique de confidentialité. </p>
      </div>
      <button onClick={() => { handleSubmit() }} className="w-full bg-black rounded-4xl text-white text-lg p-3">Terminer</button>
    </div >
  );
}

export default Step4;