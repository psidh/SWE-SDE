"use client";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { FaGoogle } from "react-icons/fa";
import { FaMicrosoft } from "react-icons/fa";
import { FaApple } from "react-icons/fa";
import { FaMeta } from "react-icons/fa6";
import { FaAmazon } from "react-icons/fa";

export default function Page() {
  const [data, setData] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [localEditData, setLocalEditData] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/api/v1", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      setData(data);
    };

    fetchData();
  }, []);

  const handleEditClick = (index) => {
    setEditIndex(index);
    setLocalEditData(data[index]);
  };

  const handleChange = (field, value) => {
    setLocalEditData({ ...localEditData, [field]: value });
  };

  const handleUpdateClick = async () => {
    try {
      await fetch("/api/v1", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify([localEditData]),
      });
      const updatedData = [...data];
      updatedData[editIndex] = localEditData;
      setData(updatedData);
      setEditIndex(null);
      toast.success("Data updated successfully!");
    } catch (error) {
      toast.error("Failed to update data!");
      console.error("Failed to update data:", error);
    }
  };

  const groupByTopic = (questions) => {
    const grouped = {};
    ["Graph", "Tree", "Recursion", "DP"].forEach((topic) => {
      grouped[topic] = questions.filter((q) => q.topic === topic);
    });
    return grouped;
  };

  const groupedData = groupByTopic(data);
  return (
    <div>
        <div className="py-24 px-4 md:px-16">
          <Toaster />
          <h1 className="text-2xl text-center flex-1 md:text-4xl py-6 px-4 font-medium">
            Software (Developer) Engineer
          </h1>
          <div className="flex space-x-4 py-4 text-3xl w-full items-center justify-center">
            <FaGoogle />
            <FaApple />
            <FaMeta />
            <FaAmazon />
            <FaMicrosoft />
          </div>
          {Object.entries(groupedData).map(([topic, questions]) => (
            <div key={topic} className="py-6">
              <h2 className="font-mono mb-8 text-xl py-2 px-4 rounded-lg mx-4 text-center md:text-2xl">
                {topic === "DP" ? "Dynamic Programming" : topic}
              </h2>
              <div className="grid grid-cols-1 gap-x-8 gap-y-4">
                {questions.map((question, index) => (
                  <div
                    key={question._id}
                    className="flex items-center border border-neutral-800 rounded-xl p-4"
                  >
                    {editIndex === index ? (
                      <>
                        <input
                          type="text"
                          className="flex-1 mr-4 py-2 px-4 bg-neutral-900 text-white rounded"
                          value={localEditData.name}
                          onChange={(e) => handleChange("name", e.target.value)}
                        />
                        <input
                          type="number"
                          className="flex-1 mr-4 py-2 px-4 bg-neutral-900 text-white rounded"
                          value={localEditData.times}
                          onChange={(e) =>
                            handleChange("times", e.target.value)
                          }
                        />
                        <input
                          type="text"
                          className={`flex-1 py-2 px-4 bg-neutral-900 rounded ${
                            localEditData.difficulty === "Easy"
                              ? "text-neutral-100"
                              : localEditData.difficulty === "Medium"
                              ? "text-neutral-400"
                              : "text-neutral-600"
                          }`}
                          value={localEditData.difficulty}
                          onChange={(e) =>
                            handleChange("difficulty", e.target.value)
                          }
                        />
                        <button
                          className="bg-white text-black py-2 px-4 rounded ml-4"
                          onClick={handleUpdateClick}
                        >
                          Update
                        </button>
                      </>
                    ) : (
                      <>
                        <p className="flex-1 mr-4 py-2 px-4">{question.name}</p>
                        <p className="flex-1 mr-4 py-2 px-4">
                          {question.times}
                        </p>
                        <p
                          className={`flex-1 py-2 px-4 ${
                            question.difficulty === "Easy"
                              ? "text-neutral-50"
                              : question.difficulty === "Medium"
                              ? "text-neutral-400"
                              : "text-neutral-600"
                          }`}
                        >
                          {question.difficulty}
                        </p>
                        <button
                          className="bg-neutral-800 text-white py-2 px-4 rounded"
                          onClick={() => handleEditClick(index)}
                        >
                          Edit
                        </button>
                      </>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
    </div>
  );
}
