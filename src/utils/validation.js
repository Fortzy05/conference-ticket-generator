export const validateForm = (name, email, avatar) => {
  const errors = {};

  // Full Name validation
  if (!name.trim()) {
    errors.name = "Full name is required.";
  }

  // Email validation
  if (!email.trim()) {
    errors.email = "Email is required.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.email = "Invalid email format.";
  }

  // Avatar validation (ensuring it's a valid URL)
  if (!avatar.trim()) {
    errors.avatar = "Avatar URL is required.";
  } else if (!/^https?:\/\/.*\.(jpg|jpeg|png|gif|svg|webp)$/i.test(avatar)) {
    errors.avatar = "Enter a valid image URL (JPG, PNG, GIF, SVG, or WebP).";
  }

  return errors;
};
