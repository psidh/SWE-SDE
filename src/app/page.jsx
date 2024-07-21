"use client";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { FaGoogle, FaMicrosoft, FaApple, FaAmazon } from "react-icons/fa";
import { FaMeta } from "react-icons/fa6";

export default function Page() {
  const [data, setData] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [localEditData, setLocalEditData] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const ROUTE = process.env.PRODUCTION_URL ? process.env.PRODUCTION_URL : "http://localhost:3000/api/v1";
  console.log(ROUTE);


  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(ROUTE, {
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
      const response = await fetch(ROUTE, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify([localEditData]),
      });
      console.log(response);
      if (!response.ok) {
        throw new Error("Failed to update data");
      }
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

  const filteredData = data
    .map((question, index) => ({ ...question, originalIndex: index }))
    .filter((question) =>
      question.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

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
        <div className="flex justify-center mb-8">
          <input
            type="text"
            placeholder="Search questions..."
            className="py-2 px-4 border bg-black text-white border-neutral-800 rounded w-full max-w-md"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="grid grid-cols-1 gap-x-1 lg:gap-x-8 gap-y-4">
          {filteredData.map((question) => (
            <div key={question._id} className="">
              {editIndex === question.originalIndex ? (
                <div className="flex flex-col sm:p-0 p-2 sm:flex-row items-start sm:items-center border border-neutral-800 rounded-xl  md:p-4 text-sm md:text-lg">
                  <input
                    type="text"
                    className="flex-1 lg:mr-4 p-2 bg-neutral-900 text-white rounded my-2"
                    value={localEditData.name}
                    onChange={(e) => handleChange("name", e.target.value)}
                  />
                  <input
                    type="number"
                    className="flex-1 lg:mr-4 p-2 bg-neutral-900 text-white rounded my-2"
                    value={localEditData.times}
                    onChange={(e) => handleChange("times", e.target.value)}
                  />
                  <select
                    className={`flex-1 py-2 px-4 bg-neutral-900 rounded my-2 ${
                      localEditData.difficulty === "Easy"
                        ? "text-neutral-100"
                        : localEditData.difficulty === "Medium"
                        ? "text-neutral-400"
                        : "text-neutral-600"
                    }`}
                    value={localEditData.difficulty}
                    onChange={(e) => handleChange("difficulty", e.target.value)}
                  >
                    <option value="Easy">Easy</option>
                    <option value="Medium">Medium</option>
                    <option value="Hard">Hard</option>
                  </select>
                  <button
                    className="bg-white text-black py-2 px-4 rounded lg:ml-4 my-2"
                    onClick={handleUpdateClick}
                  >
                    Update
                  </button>
                </div>
              ) : (
                <div className="flex flex-col sm:p-0 p-2 sm:flex-row items-start sm:items-center border border-neutral-800 rounded-xl  md:p-4 text-sm md:text-lg">
                  <p className="flex-1 md:mr-4 py-2 px-4">{question.name}</p>
                  <p className="flex-1 md:mr-4 py-2 px-4">{question.topic}</p>
                  <p className="flex-1 md:mr-4 py-2 px-4">{question.times}</p>
                  <p
                    className={`flex-1 py-2 px-4  ${
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
                    className="bg-neutral-800 text-white py-2 px-4 rounded mr-1 w-full sm:w-auto"
                    onClick={() => handleEditClick(question.originalIndex)}
                  >
                    Edit
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
