import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Split from "react-split";
import { ArrowLeft, User, RefreshCw, Play, Upload } from "lucide-react";
import Editor from "@monaco-editor/react";
import problems from "../../../../utils/problems.json";
import DetectMobileCamera from "../../../../components/DetectMobileCamera";
import VideoFeed from "../../../../components/VideoFeed.jsx";
import DetectMultipleFaces from "../../../../components/DetectMultipleFaces";

const languages = [
  { label: "C", value: "c", id: 50 },
  { label: "C++", value: "cpp", id: 54 },
  { label: "Java", value: "java", id: 62 },
  { label: "JavaScript", value: "javascript", id: 63 },
  { label: "Python 3", value: "python", id: 71 },
  { label: "Go", value: "go", id: 60 },
  { label: "Rust", value: "rust", id: 73 },
  { label: "Kotlin", value: "kotlin", id: 78 },
  { label: "Swift", value: "swift", id: 83 },
  { label: "TypeScript", value: "typescript", id: 74 },
  { label: "C#", value: "csharp", id: 51 },
  { label: "PHP", value: "php", id: 68 },
  { label: "Ruby", value: "ruby", id: 72 },
  { label: "Perl", value: "perl", id: 85 },
  { label: "Lua", value: "lua", id: 64 },
  { label: "Haskell", value: "haskell", id: 61 },
  { label: "R", value: "r", id: 80 },
  { label: "Scala", value: "scala", id: 81 },
  { label: "Bash", value: "bash", id: 76 },
  { label: "Dart", value: "dart", id: 90 },
  { label: "Pascal", value: "pascal", id: 77 },
  { label: "Objective-C", value: "objective-c", id: 79 },
];

const Code = () => {
  const navigate = useNavigate();
  const [selectedLang, setSelectedLang] = useState(languages[0].value);
  const [code, setCode] = useState("");
  const [output, setOutput] = useState("");
  const [randomProblems, setRandomProblems] = useState([]);
  const [selectedProblem, setSelectedProblem] = useState(null);
  const [sidebar, setSidebar] = useState(true);
  const [switchCount, setSwitchCount] = useState(0);
  const videoRef = useRef(null);
  const [videoElement, setVideoElement] = useState(null);
  const getRandomProblems = () => {
    let shuffled = [...problems].sort(() => 0.5 - Math.random());
    setRandomProblems(shuffled.slice(0, 4));
  };

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === "hidden") {
        setSwitchCount((prev) => prev + 1);
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  useEffect(() => {
    if (switchCount == 1)
      alert("Don't switch tab otherwise your contest will be autoSubmitted !");
    if (switchCount > 2) {
      navigate("/submit"); // Redirect after 2+ switches
    }
  }, [switchCount, navigate]);

  useEffect(() => {
    getRandomProblems();
    const disableCopyPaste = (event) => {
      event.preventDefault(); //prevent default option(copy,paste,right-click)
    };
    document.addEventListener("contextmenu", disableCopyPaste);
    document.addEventListener("copy", disableCopyPaste);
    document.addEventListener("paste", disableCopyPaste);

    return () => {
      document.removeEventListener("contextmenu", disableCopyPaste);
      document.removeEventListener("copy", disableCopyPaste);
      document.removeEventListener("paste", disableCopyPaste);
    };
  }, [selectedLang]);
  const runCode = async () => {
    if (!selectedProblem) {
      setOutput("Please select a problem first !");
      return;
    }
    const selectedLanguage = languages.find(
      (lang) => lang.value === selectedLang
    );
    const requestData = {
      language_id: selectedLanguage?.id || 71,
      source_code: code,
      stdin: selectedProblem.example.Input || "",
      expected_output: selectedProblem.example.Output || "",
      cpu_time_limit: 2,
      memory_limit: 128000,
    };

    try {
      const response = await fetch("http://localhost:5000/api/submit-code", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestData),
      });

      const result = await response.json();
      setOutput(result.stdout || `Error:${result.stderr}`);
      console.log("Judge0 Response:", result);
    } catch (error) {
      setOutput(`Request failed:${error.message || JSON.stringify(error)}`);
      console.error("Error submitting code:", error);
    }
  };
  return (
    <div className="bg-[#131313] text-white min-h-screen py-3 px-3">
      <div className="flex items-center justify-between px-4 py-3 bg-[#111111]">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate("/")}
            className="text-white px-3 py-2 rounded-md hover:bg-gray-800"
          >
            <ArrowLeft size={20} />
          </button>
          <h1
            className="text-2xl font-bold cursor-pointer"
            onClick={() => setSidebar(!sidebar)}
          >
            Problems
          </h1>
        </div>
        <div className="flex gap-2">
          <button
            onClick={runCode}
            className="bg-[#262626] px-6 py-2 rounded-md hover:bg-gray-700 flex items-center gap-2"
          >
            <Play size={20} /> Run
          </button>
          <button className="bg-[#262626] px-6 py-2 rounded-md hover:bg-gray-700 flex items-center gap-2">
            <Upload size={20} /> Submit
          </button>
          <button
            onClick={() => setCode("// Write your code here")}
            className="bg-[#262626] px-6 py-2 rounded-md hover:bg-gray-700 flex items-center gap-2"
          >
            <RefreshCw size={20} /> Refresh
          </button>
        </div>
        <div className="cursor-pointer hover:text-gray-400">
          <User size={24} />
        </div>
      </div>
      <VideoFeed onStreamReady={setVideoElement} />
      <DetectMultipleFaces videoElement={videoElement} />
      <DetectMobileCamera videoElement={videoElement} />
      <Split
        className="flex h-[calc(100vh-60px)]"
        sizes={[40, 60]}
        minSize={300}
        gutterSize={8}
      >
        {sidebar ? (
          <div className="w-1/3 z-50 h-full bg-[#262626] px-5">
            <h2 className="text-2xl font-semibold mb-2 py-5">
              Select a Problem
            </h2>
            {randomProblems.map((prob) => (
              <p
                key={prob.id}
                className="cursor-pointer py-1 text-lg hover:bg-gray-400"
                onClick={() => {
                  setSelectedProblem(prob);
                  setSidebar(false);
                }}
              >
                {prob.title}
              </p>
            ))}
          </div>
        ) : (
          <div
            className="bg-[#262626] p-4 overflow-auto"
            style={{
              userSelect: "none",
              pointerEvents: "none",
            }}
            onCopy={(e) => e.preventDefault()}
            onCut={(e) => e.preventDefault()}
            onContextMenu={(e) => e.preventDefault()}
          >
            {selectedProblem && (
              <div className="mt-4 text-lg">
                <h1 className="text-3xl font-bold mb-3">
                  {selectedProblem.title}
                </h1>
                <button className="text-yellow-600 bg-[#E5E1A8] bg-opacity-15 rounded-md px-2">
                  {selectedProblem.difficulty}
                </button>
                <p>{selectedProblem.description}</p>
                <b>Example:</b>
                <p>
                  <b>Input:</b> {selectedProblem.example.Input}
                </p>
                <p>
                  <b>Output:</b> {selectedProblem.example.Output}
                </p>
                <p>
                  <b>Explanation:</b> {selectedProblem.example.Explanation}
                </p>
              </div>
            )}
          </div>
        )}
        <Split
          className="flex flex-col w-full h-full"
          sizes={[75, 25]}
          minSize={50}
          gutterSize={8}
          direction="vertical"
        >
          <div className="flex flex-col bg-[#1e1e1e] h-full">
            <div className="w-full">
              <select
                className="bg-[#262626] text-white px-4 py-2 rounded-md"
                value={selectedLang}
                onChange={(e) => setSelectedLang(e.target.value)}
              >
                {languages.map((lang) => (
                  <option key={lang.value} value={lang.value}>
                    {lang.label}
                  </option>
                ))}
              </select>
            </div>
            <Editor
              height="100%"
              defaultLanguage={selectedLang}
              value={code}
              onChange={(value) => setCode(value)}
              theme="vs-dark"
            />
          </div>
          <div className="bg-[#262626] min-h-[100px] p-4 overflow-auto">
            <h2 className="text-lg font-semibold">Test Cases</h2>
            {output && (
              <p>
                <strong>Result:</strong>
                {output}
              </p>
            )}
          </div>
        </Split>
      </Split>
    </div>
  );
};

export default Code;
