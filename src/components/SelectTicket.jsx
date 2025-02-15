import { useEffect, useState } from "react";
import ticket from "../assets/image.png";
import ticketOptions from "./ticketOptions.json";
const SelectTicket = ({
  selectedTicket,
  setSelectedTicket,
  nextStep,
  onCancel,
  setTicketQuantity,
  ticketQuantity,
}) => {
  useEffect(() => {
    const storedTicket = localStorage.getItem("selectedTicket");
    const storedQuantity = localStorage.getItem("ticketQuantity");
    if (storedTicket) {
      setSelectedTicket(storedTicket);
    }
    if (storedQuantity) {
      setTicketQuantity(parseInt(storedQuantity, 10));
    }
  }, [setSelectedTicket]);

  const handleTicketSelection = (ticketType) => {
    setSelectedTicket(ticketType);
    localStorage.setItem("selectedTicket", ticketType);
  };

  const handleQuantityChange = (event) => {
    const quantity = parseInt(event.target.value, 10);
    setTicketQuantity(quantity);
    localStorage.setItem("ticketQuantity", quantity);
  };

  return (
    <div className="md:max-w-md max-w-[400px] md:w-full mt-4 mx-auto bg-custom-gradient font-jeju text-white md:px-6  rounded-lg shadow-lg  px-4">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold">Ticket Selection</h2>
        <p className="text-sm text-gray-400">Step 1/3</p>
      </div>
      <img src={ticket} alt="Ticket" className="w-full h-2 mb-2" />

      <div className="bg-custom-gradient border-[#24A0B5] border p-4 rounded-lg mb-4">
        <h3 className="text-xl font-semibold italic">
          Techember Fest &apos;&apos;25
        </h3>
        <p className="text-sm text-white mt-2">
          Join us for an unforgettable experience at [Event Name]. Secure your
          spot now.
        </p>
        <p className="text-sm mt-2 text-white">
          📍 [Event Location] | 🗓 March 15, 2025 | 🕖 7:00 PM
        </p>
      </div>
      <div className="h-1 w-full bg-[#073F3F] mb-4"></div>

      <div className="mb-4">
        <h4 className="text-sm font-semibold mb-2">Select Ticket Type:</h4>
        <div className="bg-[#052228] border border-[#197686] p-4 rounded-lg">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            {ticketOptions.map((ticket) => (
              <button
                key={ticket.type}
                className={`p-2 font-jeju border border-[#197686] rounded-lg text-center transition-colors duration-300 ${
                  selectedTicket === ticket.type
                    ? "bg-[#197686] text-white border-[#197686]"
                    : "bg-[#052228] hover:bg-[#07373F] hover:text-white border-[#197686]"
                }`}
                onClick={() => handleTicketSelection(ticket.type)}
              >
                <span className="text-lg font-bold">{ticket.price}</span>
                <span className="block text-sm font-medium">{ticket.type}</span>
                <span className="block text-xs">{ticket.seatsLeft} left</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Ticket Quantity Selection */}
      <div className="mb-4">
        <label className="block text-sm font-semibold">Number of Tickets</label>
        <select
          className="w-full bg-[#12464E] border border-[#197686] p-2 rounded-lg mt-1 text-white"
          value={ticketQuantity}
          onChange={handleQuantityChange}
        >
          {[...Array(5)].map((_, i) => (
            <option key={i} value={i + 1}>
              {i + 1}
            </option>
          ))}
        </select>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row justify-between mt-6 gap-2">
        <button
          onClick={onCancel}
          className="bg-transparent border border-[#197686] text-white px-4 py-2 rounded-lg w-full sm:w-30 hover:bg-[#24A0B5]"
        >
          Cancel
        </button>
        <button
          className="bg-[#24A0B5] border border-[#197686] text-white px-4 py-2 rounded-lg w-full sm:w-30 hover:bg-[#0E464F]"
          onClick={nextStep}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default SelectTicket;
