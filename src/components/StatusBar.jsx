import PropTypes from "prop-types";

export default function StatusBar({ step }) {
  const steps = ["Step 1", "Step 2", "Step 3"];

  return (
    <div className="flex justify-between mb-4">
      {steps.map((label, index) => (
        <div
          key={index}
          className={step >= index + 1 ? "text-blue-500" : "text-white"}
        >
          {label}
        </div>
      ))}
    </div>
  );
}

StatusBar.propTypes = {
  step: PropTypes.number.isRequired,
};
