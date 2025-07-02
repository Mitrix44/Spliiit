import { useState } from "react";
import Step1 from "../components/Step1";
import { toast } from "react-toastify";
import Step2 from "../components/Step2";

function Parcours() {
  //TODO init->1
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    indicatif_code: "+33",
    numero: { value: '', error: false },
    code_verfied: ""
  });

  async function step2() {
    console.log(formData)
    const response = await fetch(`${import.meta.env.VITE_API_URL}/api/user/auth/me`, {
      method: 'POST',
      body: JSON.stringify({ indicatif_code: formData.indicatif_code, numero: formData.numero.value })
    });
    console.log(response)
    if (response.ok) {
      setStep(2);
    } else {
      toast.error('Un problème est servenu dans l\'envoie du SMS');
      //TODO enlever la ligne en dessous
      setStep(2);
    }
  }

  async function validateForm() {
    console.log(formData);
  }

  switch (step) {
    case 1:
      return (
        <Step1 onNextStep={step2} formData={formData} setFormData={setFormData} />
      )
      break;
    case 2:
      return (
        <Step2 onNextStep={validateForm} formData={formData} setFormData={setFormData} />
      )
  }

}

export default Parcours
