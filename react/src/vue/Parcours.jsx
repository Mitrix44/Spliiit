import { useState } from "react";
import Step1 from "../components/Step1";
import { toast } from "react-toastify";
import Step2 from "../components/Step2";
import Step3 from "../components/Step3";
import { useNavigate } from 'react-router-dom';
import Step4 from "../components/Step4";

function Parcours() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    indicatif_code: "+33",
    numero: { value: '', error: false },
    new: "?",
    code_verified: "",
    name: "",
    surname: ""
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
        const user = data.user;
        console.log(user);
        if (user.surname === null || user.name === null) {
          localStorage.setItem('user', JSON.stringify(user))
          setStep(3);
        } else {
          localStorage.setItem('user', JSON.stringify(user))
          navigate('/users/me');
        }
      } else {
        toast.error('Le code n\'est pas correct ou plus valide.');
      }
    } else {
      toast.error('Le code n\'est pas correct ou plus valide.');
    }

  }

  function step4() {
    setStep(4)
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
        <Step3 onNextStep={step4} formData={formData} setFormData={setFormData} />
      )
      break;
    case 4:
      console.log(formData)
      return (
        <Step4 onNextStep={() => { navigate('/users/me') }} />
      )
      break;
  }

}

export default Parcours
