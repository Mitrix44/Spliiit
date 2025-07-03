function Step3({ formData, setFormData }) {
  function handleChange(event) {
    setFormData((prev) => ({ ...prev, [event.target.name]: event.target.value }))
  }

  async function handleSubmit() {
    console.log(formData)
  }

  return (
    <div className="m-0 pt-20 pb-10 pl-5 pr-5 h-screen w-screen flex flex-col justify-between  items-center">
      <div className="flex flex-col items-center justify-center">
        <Stepper step={3} />
        <h1 className="text-3xl font-bold mb-8">Votre nom et prénom</h1>
        <p className="font-xs">Tous les champs sont obligatoires.</p>
        <input
          onChange={(event) => { handleChange(event) }}
          name="nom"
          type="text"
          placeholder="Nom"
          className="mb-4 p-2 border border-gray-300 rounded-md w-full"
        />
        <input
          onChange={(event) => { handleChange(event) }}
          name="prenom"
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