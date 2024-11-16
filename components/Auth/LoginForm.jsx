"use client";
import { useState } from "react";
import { InputField } from "../Gen/InputField";
import MagicButton from "../Gen/Button";

const LoginForm = () => {
  const [spinner, setSpinner] = useState("hidden");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [selectedIndex, setSelectedIndex] = useState(-1); // Track the currently selected suggestion

  const emailSuggestions = [
    "students.cuisahiwal.edu.pk",
    "faculty.cuisahiwal.edu.pk",
    "admin.cuisahiwal.edu.pk",
  ];

  const SpinnerSvg = () => (
    <svg
      className={`h-5 w-5 animate-spin ${spinner}`}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      ></circle>
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      ></path>
    </svg>
  );

  const handleInput = (e) => {
    const { name, value } = e.target;

    setUser((prevVal) => ({
      ...prevVal,
      [name]: value,
    }));

    // Show suggestions when "@" is typed in the email field
    if (name === "email" && value.includes("@")) {
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
      setSelectedIndex(-1); // Reset selected index
    }
  };

  const handleSuggestionClick = (suggestion) => {
    const atIndex = user.email.indexOf("@");
    const updatedEmail = user.email.slice(0, atIndex + 1) + suggestion;
    setUser((prevVal) => ({
      ...prevVal,
      email: updatedEmail,
    }));
    setShowSuggestions(false); // Hide suggestions after selection
    setSelectedIndex(-1); // Reset selected index
  };

  const handleKeyDown = (e) => {
    if (showSuggestions) {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((prev) =>
          prev < emailSuggestions.length - 1 ? prev + 1 : prev
        );
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex((prev) => (prev > 0 ? prev - 1 : prev));
      } else if (e.key === "Enter" && selectedIndex >= 0) {
        handleSuggestionClick(emailSuggestions[selectedIndex]);
      }
    }
  };

  const handleSubmit = (e) => {
    // e.preventDefault();
    if (user.email === "" || user.password === "") {
      return;
    }
    setSpinner("block");
  };

  return (
    <div
      className="w-full h-[100vh] text-white flex justify-center items-center relative overflow-hidden"
      aria-label="Login FormComponent"
    >
      <div className="w-full max-w-96 bg-white/20 p-8 md:py-12 text-sm text-white flex flex-col gap-6 rounded-lg">
        <div className="text-left font-semibold text-3xl">Login</div>
        <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
          <div className="relative">
            <InputField
              id="email"
              name="email"
              title="Email"
              type="email"
              placeholder="Enter Your Email"
              value={user.email}
              onChange={handleInput}
              onKeyDown={handleKeyDown} // Add keydown handler
            />
            {/* Suggestions Dropdown */}
            {showSuggestions && (
              <ul className="absolute bg-white text-black w-full mt-1 border border-gray-300 rounded-md z-10">
                {emailSuggestions.map((suggestion, index) => (
                  <li
                    key={index}
                    className={`p-2 cursor-pointer hover:bg-gray-300 ${
                      selectedIndex === index ? "bg-gray-300" : ""
                    }`}
                    onClick={() => handleSuggestionClick(suggestion)}
                  >
                    {suggestion}
                  </li>
                ))}
              </ul>
            )}
          </div>
          <InputField
            id={"password"}
            name="password"
            title={"Password"}
            type={"password"}
            placeholder={"Enter Your Password"}
            value={user.password}
            onChange={handleInput}
          />

          <MagicButton
            title="Sign In"
            icon={<SpinnerSvg />}
            position="left"
            type="submit"
            otherClasses="!w-full"
          />
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
