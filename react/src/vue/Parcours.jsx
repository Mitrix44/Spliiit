import { useState } from "react";
import Step1 from "../components/Step1";
import { toast } from "react-toastify";
import Step2 from "../components/Step2";
import Step3 from "../components/Step3";
import { useNavigate } from 'react-router-dom';

function Parcours() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    indicatif_code: "+33",
    numero: { value: '', error: false },
    new: "?",
    code_verified: ""
  });

  const navigate = useNavigate();

  async function step2() {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/api/user/auth/me`, {
      method: 'POST',
      body: JSON.stringify({ indicatif_code: formData.indicatif_code, numero: formData.numero.value }
      ),
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'Host': 'localhost:3000',
        'Content-Length': JSON.stringify({ indicatif_code: formData.indicatif_code, numero: formData.numero.value }).length.toString()
      }
    });
    if (response.ok) {
      const data = await response.json();
      setFormData((prev) => ({ ...prev, new: data.news }))
      setStep(2);
    } else {
      toast.error('Un problème est servenu dans l\'envoie du SMS');
    }
  }

  async function step3() {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/api/OPT/auth/verify-otp`, {
      method: 'POST',
      body: JSON.stringify({ numero: formData.numero.value, code_verified: formData.code_verified }),
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'Host': 'localhost:3000',
        'Content-Length': JSON.stringify({ numero: formData.numero.value, code_verified: formData.code_verified }).length.toString()
      }
    })
    if (response.ok) {
      const data = await response.json();
      console.log(data)
      if (data.success === true) {
        if (formData.new === true) {
          setStep(3);
        } else {
          localStorage.setItem('user', JSON.stringify(formData))
          navigate('/users/me');
        }
      } else {
        toast.error('Le code n\'est pas correct ou plus valide.');
      }
    } else {
      toast.error('Le code n\'est pas correct ou plus valide.');
    }

  }

  switch (step) {
    case 1:
      return (
        <Step1 onNextStep={step2} formData={formData} setFormData={setFormData} />
      )
      break;
    case 2:
      return (
        <Step2 onNextStep={step3} formData={formData} setFormData={setFormData} />
      )
      break;
    case 3:
      return (
        <Step3 />
      )
  }

}

export default Parcours
