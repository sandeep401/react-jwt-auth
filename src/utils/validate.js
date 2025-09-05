export const validate = (name, value, allValues) => {
  switch (name) {
    case "username":
      if (!value) return "Username is required";
      else if (value.length < 3) return "Username must be at least 3 characters";
      break;
    case "email":
      if (!value) return "Email is required";
      else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) return "Invalid email address";
      break;
    case "password":
      if (!value) return "Password is required";
      else if (value.length < 6) return "Password must be at least 6 characters";
      break;
    case "confirmPassword":
      if (!value) return "Please confirm password";
      else if (value !== allValues.password) return "Passwords do not match";
      break;
    default:
      return "";
  }
};
