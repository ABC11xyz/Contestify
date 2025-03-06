import React, { Children, useState } from "react";
import axios from "axios";
const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const handleSignUp = async(e) => {
    e.preventDefault();
    //frontend side validation
    if (username == "") {
      setUsernameError("Username is required!");
      return;
    }
    if (email == "") {
      setEmailError("Email is required!");
      return;
    }
    if (password.length < 6) {
      setPasswordError("password length must be more than 6 characters");
      return;
    }
    try {
      const res = await axios.post('http://localhost:5000/api/v1/auth/signup',
        {username,email,password},
       {withCredentials : true}
      )
      console.log(res);
    } catch (error) {
      throw new error(error);
    }
  };
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-96">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Sign Up
        </h2>
        <form className="space-y-4" onSubmit={handleSignUp}>
          <div>
            <label
              className="block text-gray-700 font-medium mb-1"
              htmlFor="name"
            >
              Username
            </label>
            <input
              id="name"
              type="text"
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring focus:ring-indigo-300"
              placeholder="Enter your username"
              onChange={(e) => {
                setUsername(e.target.value);
                setUsernameError("");
              }}
            />
            {usernameError.length > 0 && (
              <p className="text-red-700">{usernameError}</p>
            )}
          </div>
          <div>
            <label
              className="block text-gray-700 font-medium mb-1"
              htmlFor="email"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring focus:ring-indigo-300"
              placeholder="Enter your email"
              onChange={(e) => {
                setEmail(e.target.value);
                setEmailError(""); //jab khali hai then error dikhega and if firse type krne lage then error ko khali kro
              }}
            />
            {emailError.length > 0 && (
              <p className="text-red-700">{emailError}</p>
            )}
          </div>
          <div>
            <label
              className="block text-gray-700 font-medium mb-1"
              htmlFor="password"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring focus:ring-indigo-300"
              placeholder="Enter your password"
              onChange={(e) => {
                setPassword(e.target.value);
                setPasswordError("");
              }}
            />
            {passwordError.length > 0 && (
              <p className="text-red-700">{passwordError}</p>
            )}
          </div>
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white p-2 rounded-lg hover:bg-indigo-700 transition"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
