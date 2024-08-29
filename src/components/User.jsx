import React, { useState } from "react";
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
import LinearProgress from "@mui/material/LinearProgress";

import { handleFileUpload } from "../services/api";
import { Accordion, AccordionSummary, AccordionDetails } from "@mui/material";

const User = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [filePreview, setFilePreview] = useState(null);
  const [uploadResponse, setUploadResponse] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = React.useState(0);

  const handleFileChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      setSelectedFile(file);

      // Check if the uploaded file is a PDF or image
      if (file.type.includes("pdf") || file.type.startsWith("image/")) {
        const reader = new FileReader();

        reader.onload = (e) => {
          // Set the file preview for PDF or image
          setFilePreview(e.target.result);
        };

        reader.readAsDataURL(file);
      } else {
        // Handle other file types if needed
        setFilePreview(null);
      }
    } else {
      // Reset the file and preview if no file is selected
      setSelectedFile(null);
      setFilePreview(null);
    }
  };

  const handleUpload = () => {
    // You can implement your file upload logic here
    console.log("Uploading file:", selectedFile);
  };

  const handleSubmit = async () => {
    // You can implement your submission logic here
    console.log("Submitting file:", selectedFile);
    setIsLoading(true);

    try {
      if (!selectedFile) {
        console.error("No file selected");
        return;
      }

      const uploadResponse = await handleFileUpload(selectedFile);
      setIsLoading(false);

      setUploadResponse(uploadResponse);
      console.log("response:", uploadResponse);
    } catch (error) {
      console.error("Error uploading file:", error);
      setIsLoading(false);
    }
  };
  React.useEffect(() => {
    const timer = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress === 100) {
          return 0;
        }
        const diff = Math.random() * 10;
        return Math.min(oldProgress + diff, 100);
      });
    }, 500);

    return () => {
      clearInterval(timer);
    };
  }, []);
  return (
    <>
      <>
        <div className="text-white h-[90vh]">
          <div className="flex h-full w-full">
            <div className="text-black w-[30%] flex-col justify-end">
              <div className="h-full p-4 overflow-y-auto">
                {filePreview ? (
                  <img
                    src={filePreview}
                    alt="File Preview"
                    className="max-w-full max-h-full"
                  />
                ) : (
                  <div className="rounded-md bg-slate-200 h-full text-black flex items-center justify-center">
                    No preview available
                  </div>
                )}
              </div>
            </div>
            <div className="flex-col text-black h-[100%] w-[100%]">
              <div className="h-full p-5 ">
                <div className=" p-5 rounded-md h-full border w-full">
                  <div>
                    <div className="bg-slate-100 rounded-md ">
                      <div className="p-5">
                        <div className="text-center text-2xl font-bold">
                          <div>LLM + OCR</div>
                        </div>
                      </div>
                      {isLoading && (
                        <div className="w-full mt-2">
                          <LinearProgress
                            variant="determinate"
                            value={progress}
                          />
                        </div>
                      )}
                    </div>
                    <div className="p-5 h-[34rem]">
                      {uploadResponse && (
                        <div className="">
                          {Object.keys(uploadResponse).map((key) => (
                            <div
                              key={key}
                              className="mt-4 p-2 w-full rounded-sm bg-gray-200 overflow-y-auto"
                            >
                              <strong>{key}:</strong> {uploadResponse[key]}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                    <div class="border border-gray-300 bg-slate-100 p-6 flex items-center justify-between rounded-md">
                      <div className="flex items-center space-x-4">
                        <label
                          for="fileInput"
                          className="cursor-pointer bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded inline-flex items-center"
                        >
                          <svg
                            className="w-4 h-4 mr-2"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2"
                              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                            ></path>
                          </svg>
                          Upload File
                        </label>
                        <input
                          id="fileInput"
                          type="file"
                          accept=".pdf, image/*"
                          className="hidden"
                          onChange={handleFileChange}
                        />
                      </div>

                      <button
                        onClick={handleSubmit}
                        class="bg-green-500 rounded-xl text-white px-4 py-2"
                      >
                        Submit
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    </>
  );
};

export default User;
