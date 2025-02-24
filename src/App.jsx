import { useState } from "react";
import SelectTicket from "./components/SelectTicket";
import ConferenceAttendanceForm from "./components/ConferenceAttendanceForm";
import TicketConfirmation from "./components/TicketConfirmation";
import Header from "./components/Header";

function App() {
  const [selectedTicket, setSelectedTicket] = useState("");
  const [step, setStep] = useState(1);
  const [ticketQuantity, setTicketQuantity] = useState(1)
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
    setTicketQuantity(1); 
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
            <SelectTicket
              nextStep={nextStep}
              selectedTicket={selectedTicket}
              setSelectedTicket={setSelectedTicket}
              onCancel={handleCancel}
              ticketQuantity={ticketQuantity}
              setTicketQuantity={setTicketQuantity}
            />
          )}
          {step === 2 && (
            <ConferenceAttendanceForm
              prevStep={prevStep}
              onSubmit={handleSubmit} // Pass the onSubmit function
              formData={formData}
              setFormData={setFormData}
              onBack={handleback}
              selectedTicket={selectedTicket}
            />
          )}
          {step === 3 && (
            <TicketConfirmation
              selectedTicket={selectedTicket}
              formData={formData}
              prevStep={prevStep}
              onReset={handleBookAnother}
              ticketQuantity={ticketQuantity}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
