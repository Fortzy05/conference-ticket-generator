import { useState } from "react";
import TicketSelection from "./components/SelectTicket";
import ConferenceAttendanceForm from "./components/ConferenceAttendanceForm";
import TicketConfirmation from "./components/TicketConfirmation";
import Header from "./components/Header";

function App() {
  const [selectedTicket, setSelectedTicket] = useState("");
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    avatar: "",
  });

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);
 

  const handleback = () => {
    if (step > 1) {
      setStep((prevStep) => prevStep - 1);
    }
  };
  // Define the onSubmit function
  const handleSubmit = (data) => {
    
    setFormData((prevData) => ({
      ...prevData,
      fullName: data.fullName,
      email: data.email,
      avatar: data.avatarUrl, 
    }));

    
    nextStep();
  };
  const handleCancel = () => {
    setFormData({ fullName: "", email: "", avatar: "" }); 
    setSelectedTicket(""); 
    localStorage.removeItem("selectedTicket"); 
    localStorage.removeItem("ticketQuantity"); 
    setStep(1); 
  };

  const handleBookAnother = () => {
    setFormData({ fullName: "", email: "", avatar: "" }); 
    setSelectedTicket(""); 
    localStorage.removeItem("selectedTicket"); 
    localStorage.removeItem("ticketQuantity"); 
    setStep(1); 
  };

  return (
    <div className=" px-5 md:px-0 mb-10 flex flex-col items-center justify-center">
      <Header />
      <div className="bg-custom-gradient border-[#24A0B5] border rounded-lg shadow-lg max-w-xl w-full mt-8">
        <div className="flex justify-center items-center mb-4">
          {step === 1 && (
            <TicketSelection
              nextStep={nextStep}
              selectedTicket={selectedTicket}
              setSelectedTicket={setSelectedTicket}
              onCancel={handleCancel}
            />
          )}
          {step === 2 && (
            <ConferenceAttendanceForm
              prevStep={prevStep}
              onSubmit={handleSubmit} // Pass the onSubmit function
              formData={formData}
              setFormData={setFormData}
              onBack={handleback}
            />
          )}
          {step === 3 && (
            <TicketConfirmation
              selectedTicket={selectedTicket}
              formData={formData}
              prevStep={prevStep}
              onReset={handleBookAnother}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
