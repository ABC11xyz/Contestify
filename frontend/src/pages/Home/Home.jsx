// eslint-disable-next-line no-unused-vars
import React from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const Home = () => {
  const navigate = useNavigate(); // Initialize navigate hook

  const features = [
    {
      title: "Contests",
      description:
        "Participate in exciting coding contests and compete with others.",
      icon: "🚀",
      route: "/Contest/id", // Define a route for each feature
    },
    {
      title: "DSA Practice",
      description:
        "Solve DSA problems categorized by topics and track your progress.",
      icon: "📚",
      route: "/Sheet",
    },
    {
      title: "Code Editor",
      description: "Write, debug, and execute code in a seamless environment.",
      icon: "💻",
      route: "/Code",
    },
    {
      title: "Profile",
      description: "View your achievements, rankings, and contest history.",
      icon: "🏆",
      route: "/profile",
    },
  ];

  return (
    <div className="bg-blue-950 min-h-screen py-12 px-4 relative">
      <div className="flex gap-2">
        <button
          className=" bg-indigo-600 text-white px-4 py-2 rounded-lg font-semibold shadow-md hover:bg-indigo-700 transition"
          onClick={() => navigate("/profile")} // Navigate to the Profile page
        >
          Profile
        </button>
        <button
          className=" bg-indigo-600 text-white px-4 py-2 rounded-lg font-semibold shadow-md hover:bg-indigo-700 transition"
          onClick={() => navigate("/auth/signup")}
        >
          SignUp
        </button>
        <button
          className=" bg-indigo-600 text-white px-4 py-2 rounded-lg font-semibold shadow-md hover:bg-indigo-700 transition"
          onClick={() => navigate("/auth/login")}
        >
          Login
        </button>
      </div>

      <div className="max-w-7xl mx-auto text-center">
        <h1 className="text-5xl font-extrabold text-white mb-6">
          Welcome to CodeArena
        </h1>
        <p className="text-lg text-gray-100 mb-12">
          Enhance your coding skills, compete, and grow as a developer!
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              onClick={() => navigate(feature.route)} // Navigate to the feature's route
              className="bg-white p-6 rounded-lg shadow-lg transform transition hover:-translate-y-2 hover:shadow-2xl cursor-pointer"
            >
              <div className="text-4xl">{feature.icon}</div>
              <h2 className="text-2xl font-bold mt-4">{feature.title}</h2>
              <p className="text-gray-600 mt-2">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
