import PropTypes from "prop-types";
import { useState, useEffect, useRef } from "react";
import ticketImage from "../assets/image.png"; // Import image properly

export default function ConferenceAttendanceForm({ onBack, onSubmit }) {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [avatarFile, setAvatarFile] = useState(null); // Store the uploaded file
  const [avatarUrl, setAvatarUrl] = useState(""); // Store the Cloudinary URL
  const [errors, setErrors] = useState({});
  const fileInputRef = useRef(null); // Ref for file input

  // Load saved form data from localStorage on component mount
  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem("formData"));
    if (savedData) {
      setFullName(savedData.fullName || "");
      setEmail(savedData.email || "");
      setAvatarUrl(savedData.avatarUrl || ""); // Load the saved URL
    }
  }, []);

  // Save form data to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem(
      "formData",
      JSON.stringify({ fullName, email, avatarUrl })
    );
  }, [fullName, email, avatarUrl]);

  const validate = () => {
    let newErrors = {};
    if (!fullName || fullName.length < 3) {
      newErrors.fullName = "Full name must be at least 3 characters long";
    }
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Enter a valid email address";
    }
    if (!avatarFile && !avatarUrl) {
      newErrors.avatar = "Avatar is required. Upload a valid image.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      onSubmit({ fullName, email, avatarUrl }); // Pass Cloudinary URL to next page
    }
  };

  const handleAvatarUpload = async (event) => {
    const file = event.target.files[0];
    if (file) {
      setAvatarFile(file); // Store uploaded file
      setErrors((prev) => ({ ...prev, avatar: "Uploading image..." })); // Show uploading message

      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "attendee_upload");

      try {
        const response = await fetch(
          "https://api.cloudinary.com/v1_1/dmvd50ydu/image/upload",
          {
            method: "POST",
            body: formData,
          }
        );
        const data = await response.json();
        if (data.secure_url) {
          setAvatarUrl(data.secure_url); // Set Cloudinary URL
          setErrors((prev) => ({ ...prev, avatar: "" })); // Clear error on success
        } else {
          throw new Error("Failed to upload image to Cloudinary");
        }
      } catch (error) {
        console.error(error);
        setAvatarFile(null); // Clear invalid file
        setErrors((prev) => ({
          ...prev,
          avatar: "Failed to upload avatar. Please try again.",
        }));
      }
    }
  };

  return (
    <div className="w-5/6 mx-auto p-6 text-white  border-2 rounded-lg shadow-lg ">
      <div className="flex justify-between items-center border-[#34534a]">
        <h2 className="text-lg font-semibold">Attendee Details</h2>
        <p className="text-sm text-gray-400">Step 2/3</p>
      </div>
      <img src={ticketImage} alt="Ticket" className="w-5/6 h-1 mb-6" />

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <div>
            <label htmlFor="avatar" className="block text-sm font-medium mb-1">
              Drag & drop or click to upload
            </label>
          </div>
          <div className="flex items-center justify-center border-[1px] max-w-[508px] max-h-[200px] py-0 px-[25px] m-[20px] border-[#07373f] bg-[rgba(0, 0, 0, 0.2) ">
            <div className="bg-[#0e464f] py-3 px-6 max-w-[240px] h-[200px] rounded-[32px] flex justify-center items-center flex-col">
              <div
                className="w-full p-6 border-2 border-[#197686] rounded-md flex flex-col items-center justify-center cursor-pointer"
                onClick={() => fileInputRef.current.click()}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="40px"
                  viewBox="0 -960 960 960"
                  width="40px"
                  fill="white"
                >
                  <path d="M260-160q-91 0-155.5-63T40-377q0-78 47-139t123-78q17-72 85-137t145-65q33 0 56.5 23.5T520-716v242l64-62 56 56-160 160-160-160 56-56 64 62v-242q-76 14-118 73.5T280-520h-20q-58 0-99 41t-41 99q0 58 41 99t99 41h480q42 0 71-29t29-71q0-42-29-71t-71-29h-60v-80q0-48-22-89.5T600-680v-93q74 35 117 103.5T760-520q69 8 114.5 59.5T920-340q0 75-52.5 127.5T740-160H260Zm220-358Z" />
                </svg>
                <p className="text-lg text-white font-jeju font-bold pl-[20px]  text-left pb-[20px]">
                  Drag or upload an image
                </p>
                
              </div>
            </div>
          </div>

          <input
            ref={fileInputRef}
            id="avatar"
            type="file"
            accept="image/*"
            onChange={handleAvatarUpload}
            className="hidden"
            aria-describedby="avatarError"
            aria-invalid={!!errors.avatar}
          />
          {errors.avatar && (
            <p id="avatarError" className="text-red-500 text-sm" role="alert">
              {errors.avatar}
            </p>
          )}
          {avatarFile && (
            <div className="mt-2">
              <p className="text-sm text-white">
                Uploaded file: <strong>{avatarFile.name}</strong>
              </p>
            </div>
          )}
        </div>

        <div className="mb-4">
          <label htmlFor="fullName" className="block text-sm font-medium mb-1">
            Enter your name
          </label>
          <input
            id="fullName"
            type="text"
            className="w-full p-2 rounded-md text-white bg-transparent border border-[#197686]"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            aria-describedby="fullNameError"
            aria-invalid={!!errors.fullName}
          />
          {errors.fullName && (
            <p id="fullNameError" className="text-red-500 text-sm" role="alert">
              {errors.fullName}
            </p>
          )}
        </div>

        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium mb-1">
            Enter your email
          </label>
          <input
            id="email"
            type="email"
            className="w-full p-2 rounded-md text-white bg-transparent border border-[#197686]"
            placeholder="hello@avioflagos.io"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            aria-describedby="emailError"
            aria-invalid={!!errors.email}
          />
          {errors.email && (
            <p id="emailError" className="text-red-500 text-sm" role="alert">
              {errors.email}
            </p>
          )}
        </div>

        <div className="mb-4">
          <label htmlFor="about" className="block text-sm font-medium mb-1">
            About the project
          </label>
          <textarea
            id="about"
            placeholder="About the project"
            className="p-2 resize-none h-auto text-white bg-transparent border border-[#197686] rounded md w-full"
          ></textarea>
        </div>

        <div className="flex flex-col sm:flex-row justify-between mt-6 gap-2">
          <button
            type="button"
            className="px-4 py-2 rounded-md w-60 text-[#197686] bg-transparent border border-[#197686] sm:w-30"
            onClick={onBack}
          >
            Back
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-[#197686] w-60 text-white rounded-md sm:w-30"
          >
            Get My Free Ticket
          </button>
        </div>
      </form>
    </div>
  );
}

// PropTypes validation
ConferenceAttendanceForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onBack: PropTypes.func.isRequired,
};
