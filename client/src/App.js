import { useState, useRef } from "react";
import "./App.css";

function App() {
  const fileInputRef = useRef(null);
  const [responseData, setResponseData] = useState(null);
  

  async function uploadFile() {
    try {
      const formData = new FormData();
      formData.append("image", fileInputRef.current.files[0]);
      const response = await fetch("http://localhost:8000/upload/", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      setResponseData(data);
      console.log(data);
    } catch (err) {
      console.log(err);
    }

    //if file is not uploaded then return home page
    if (!fileInputRef.current.files[0]) {
      alert("Please upload a file");
      window.location = "/";
      return;
    }

  }

  const handleSubmit = (e) => {
    e.preventDefault();
    uploadFile();
  };
  return (
    <>
      <section>
        <div className="flex items-center justify-center px-12 py-4">
          <div className="flex flex-col items-center justify-center w-full max-w-[550px] bg-[#F3F4F6] rounded-md">
            <div className="flex flex-col items-center justify-center w-full max-w-[550px] bg-white rounded-md">
                {/* Description*/}
              <div className="flex items-center justify-center w-full max-w-[550px] bg-[#6A64F1] rounded-t-md">
                <h1 className="py-6 text-2xl font-semibold text-white">
                  Alemeno - Backend(Python) Developer Hiring Assignment
                </h1>
              </div>
              <p className="py-6 px-9 text-base font-medium text-[#6B7280] text-center">
                Hello Myself Ayush Kumar, a 3rd year  student(NIT ANDHRAPRADESH) applying for Alemeno Backend Internship. 
                Submitting a project that uses Django+ openCV to analyze the colors in the urine strip and find values from them through RGB format.
              </p>
            </div>
          
          </div>
          <div className="mx-auto w-full max-w-[550px] bg-white">
            <form className="py-6 px-9">
              <div className="pt-4 mb-6">
                <label className="mb-5 block text-xl font-semibold text-[#07074D]">
                  Upload File
                </label>

                <div className="mb-8">
                  <input
                    ref={fileInputRef}
                    type="file"
                    name="urineStrip"
                    id="urineStrip"
                    className="sr-only"
                  />
                  <label
                    htmlFor="urineStrip"
                    className="relative flex min-h-[200px] items-center justify-center rounded-md border border-dashed border-[#e0e0e0] p-12 text-center"
                  >
                    <div>
                      <span className="mb-2 block text-xl font-semibold text-[#07074D]">
                        Drop files here
                      </span>
                      <span className="mb-2 block text-base font-medium text-[#6B7280]">
                        Or
                      </span>
                      <span className="inline-flex rounded border border-[#e0e0e0] py-2 px-7 text-base font-medium text-[#07074D] cursor-pointer">
                        Browse
                      </span>
                    </div>
                  </label>
                </div>
              </div>
              <div>
                <button
                  type="submit"
                  onClick={handleSubmit}
                  className="hover:shadow-form w-full rounded-md bg-[#6A64F1] py-3 px-8 text-center text-base font-semibold text-white outline-none"
                >
                  Submit
                </button>
                <p id="msg"></p>
              </div>

              {/* result*/}
              <div
                className="flex items-center justify-center w-full max-w-[550px] bg-white rounded-md"
                style={{ display: responseData ? "block" : "none" }}
              >
                <h1 className="py-6 text-2xl font-semibold text-[#07074D]">
                  Result
                </h1>
                <ul className="rules">
                  <li className="text-base font-medium text-[#6B7280] px-9">
                    {responseData}
                  </li>
                </ul>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}

export default App;
