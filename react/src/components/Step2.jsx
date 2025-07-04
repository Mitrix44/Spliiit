import OtpInput from "react-otp-input";
import Stepper from "./stepper";

function Step2({ formData, setFormData, onNextStep }) {
  const handleChange = (code) => setFormData((prev) => ({ ...prev, code_verified: code }));

  function handleSubmit() {
    onNextStep();
  }

  return (
    <div className="m-0 pt-5 pb-5 pl-5 pr-5 h-screen w-screen flex flex-col justify-between items-center">
      <div className="flex flex-col justify-center items-center">
        <Stepper step={2} />
        <h1 className="text-3xl font-bold mb-7 mt-5 p-0">Confirmez votre numéro</h1>
        <p className="text-xs pb-5">Entrez le code reçu au {formData.indicatif_code}{formData.numero.value.slice(1)}.</p>
        <OtpInput
          value={formData.code_verified}
          onChange={handleChange}
          numInputs={6}
          renderSeparator={<span style={{ width: "8px" }}></span>}
          renderInput={(props) => <input {...props} />}
          inputType="number"
          shouldAutoFocus={true}
          inputStyle={{
            borderColor: "#cad5e2 !important",
            borderStyle: 'solid !important',
            borderWidth: '2px',
            borderRadius: "8px",
            padding: 'calc(0.25rem * 3)',
            width: '16.6%',
            fontSize: "12px",
            color: "#000",
            fontWeight: "400"
          }}
          focusStyle={{
            border: "2px solid #000000",
            outline: "none"
          }}
          skipDefaultStyles={true}
        />
      </div>
      <button onClick={() => { handleSubmit() }} className="w-full bg-black rounded-4xl text-white text-lg p-3">Continuer</button>
    </div>
  );
}

export default Step2;