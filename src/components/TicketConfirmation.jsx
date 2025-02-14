import PropTypes from "prop-types";
import ticket from "../assets/image.png";
import barcode from "../assets/BarCode.png";
const TicketConfirmation = ({ formData, onReset, selectedTicket }) => {
  return (
    <div className="max-w-md font-jeju mb-10 flex flex-col items-center justify-center bg-transparent text-white px-4">
      <div className="flex justify-between items-center w-3/4 border-[#34534a]">
        <h2 className="text-lg font-semibold ">Ready</h2>
        <p className="text-sm text-gray-400">Step 3/3</p>
      </div>
      <img src={ticket} alt="Ticket" className="w-auto h-1 mb-6" />
      {/* Header */}
      <h2 className="text-2xl font-semibold mb-2">Your Ticket is Booked!</h2>
      <p className="text-gray-400 text-sm mb-6">
        Check your email for a copy or <strong>download</strong>
      </p>

      <div className="bg-ticket border rounded-lg shadow-lg h-auto w-[90%] relative">
        <div className="bg-transparent border border-[#197686]">
          <h3 className="text-center text-xl font-bold text-white mb-2">
            Techember Fest &apos;25
          </h3>
          <p className="text-center text-white text-sm mb-4">
            📍 Tech Arena, NY <br />
            📅 Dec 15, 2025 | 10:00 AM - 6:00 PM
          </p>

          <div className="flex justify-center mb-4">
            <img
              src={formData.avatar || "https://via.placeholder.com/100"}
              alt="Attendee"
              className="w-24 h-24 rounded-lg border border-[#1B2A3B]"
            />
          </div>
          <p className="mt-4 text-[16px] text-center  font-bold text-white font-jeju"> 
            Ticket Type: {selectedTicket}
          </p>

          <div className="border border-[#197686] bg-teal-950 p-4 rounded-lg text-sm w-5/6 mx-auto">
            <div className="flex justify-between border-b border-[#1B2A3B] pb-2 mb-2">
              <p className="text-gray-400">Full Name</p>
              <p>{formData.fullName || "John Doe"}</p>
            </div>
            <div className="flex justify-between border-b border-[#1B2A3B] pb-2 mb-2">
              <p className="text-gray-400">Email</p>
              <p>{formData.email || "user@email.com"}</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center mt-6">
          <div className="w-30 h-12 bg-transparent mx-auto">
            <img src={barcode}></img>
          </div>
        </div>
      </div>
      {/* Action Buttons */}
      <div className="flex justify-between w-full max-w-lg mt-6">
        <button
          className="w-1/2 py-3 text-white border border-[#1B2A3B] rounded-lg hover:bg-[#0E464F]"
          onClick={onReset}
        >
          Book Another Ticket
        </button>
        <button className="px-4 py-4 bg-[#197686] w-60 text-white rounded-md hover:bg-[#02191D] ml-2">
          Download Ticket
        </button>
      </div>
    </div>
  );
};

TicketConfirmation.propTypes = {
  formData: PropTypes.shape({
    fullName: PropTypes.string,
    email: PropTypes.string,
    avatar: PropTypes.string,
  }).isRequired,
  onBookAnother: PropTypes.func.isRequired,
};

export default TicketConfirmation;
