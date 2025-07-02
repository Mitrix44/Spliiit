import OtpInput from "react-otp-input";
import Stepper from "./stepper";

function Step2({ formData, setFormData }) {
  const handleChange = (code) => setFormData((prev) => ({ ...prev, code_verified: code }));

  return (
    <div className="m-0 pt-20 pb-20 pl-5 pr-5 h-screen w-screen flex flex-col justify-start items-center">
      <Stepper step={2} />
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
  );
}

export default Step2;