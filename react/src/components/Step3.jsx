import { toast } from "react-toastify";
import Stepper from "./stepper";

function Step3({ formData, setFormData, onNextStep }) {
  function handleChange(event) {
    console.log({ [event.target.name]: event.target.value })
    setFormData((prev) => ({ ...prev, [event.target.name]: event.target.value }))
  }

  async function handleSubmit(event) {
    if (formData.name !== "" && formData.surname !== "") {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/user/auth/adduser`, {
        method: "POST",
        body: JSON.stringify({ numero: formData.numero.value, name: formData.name, surname: formData.surname }
        ),
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          'Host': 'localhost:3000',
          'Content-Length': JSON.stringify({ numero: formData.numero.value, name: formData.name, surname: formData.surname }).length.toString()
        }
      })

      if (response.ok) {
        const data = await response.json()
        if (data.success === true) {
          toast.success('Votre compte a été créé avec succès')
          localStorage.setItem('user', JSON.stringify(data.user))
          onNextStep()
        } else {
          toast.error('Une erreur est survenu lors de l\'enregistrement')
        }
      }
    } else {
      toast.error('Les champs prénom et nom ne peuvent pas être vides.')
    }
  }

  return (
    <div className="m-0 pt-20 pb-10 pl-5 pr-5 h-screen w-screen flex flex-col justify-between  items-center">
      <div className="flex flex-col items-center justify-center">
        <Stepper step={3} />
        <h1 className="text-3xl font-bold mb-8">Votre nom et prénom</h1>
        <p className="font-xs">Tous les champs sont obligatoires.</p>
        <input
          onChange={(event) => { handleChange(event) }}
          name="name"
          type="text"
          placeholder="Nom"
          className="mb-4 p-2 border border-gray-300 rounded-md w-full"
        />
        <input
          onChange={(event) => { handleChange(event) }}
          name="surname"
          type="text"
          placeholder="Prénom"
          className="mb-4 p-2 border border-gray-300 rounded-md w-full"
        />

      </div>
      <button onClick={() => { handleSubmit() }} className="w-full bg-black rounded-4xl text-white text-lg p-3">Continuer</button>
    </div>
  );
}

export default Step3;