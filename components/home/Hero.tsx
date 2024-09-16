"use client";
import React, { FormEvent, useState } from "react";

const Hero = () => {
  const [certificateId, setCertificateId] = useState("");
  const [invalidCertificate, setInvalidCertificate] = useState(false);

  interface VerificationResult {
    firstName: string;
    lastName: string;
    certName: string;
    certExpireDate: string;
    certActiveDate: string;
    certStatus: string;
  }

  const [verificationResult, setVerificationResult] =
    useState<VerificationResult | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setInvalidCertificate(false);
    setVerificationResult(null);
    const response = await fetch(`/api/verify?cid=${certificateId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    if (data.message) {
      setInvalidCertificate(true);
      return;
    }
    setVerificationResult(data.certification);
    console.log(verificationResult);
  };
  return (
    <div className="">
      <div className="bg-white shadow-xl rounded-lg overflow-hidden lg:w-full">
        <div className="px-8 py-6 bg-indigo-600">
          <h2 className="text-2xl font-semibold text-white">
            Enter Certificate Details
          </h2>
        </div>
        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          <div>
            <label
              htmlFor="certificateId"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Certificate ID
            </label>
            <input
              type="text"
              id="certificateId"
              value={certificateId}
              onChange={(e) => setCertificateId(e.target.value)}
              placeholder="Enter your certificate ID"
              required
              className="block w-full text-black px-4 py-3 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 ease-in-out"
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition duration-150 ease-in-out transform hover:scale-105"
          >
            Verify Certificate
          </button>
        </form>
      </div>
      {verificationResult && (
        <div className="mt-8 mb-8 bg-white shadow-xl rounded-lg overflow-hidden">
          <div className="px-8 py-6 bg-green-600">
            <h2 className="text-2xl font-semibold text-white">
              Verification Result
            </h2>
          </div>
          <div className="p-8 text-gray-700">
            {verificationResult ? (
              <div className="space-y-4">
                <p className="text-lg font-semibold text-green-600">
                  Certificate is valid!
                </p>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="font-medium text-gray-600">Name:</p>
                    <p>{`${verificationResult.firstName} ${verificationResult.lastName}`}</p>
                  </div>
                  <div>
                    <p className="font-medium text-gray-600">
                      Certificate Name:
                    </p>
                    <p>{verificationResult.certName}</p>
                  </div>
                  <div>
                    <p className="font-medium text-gray-600">Expiry Date:</p>
                    <p>
                      {new Date(
                        verificationResult.certExpireDate
                      ).toLocaleString("en-GB", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                      })}
                    </p>
                  </div>
                  <div>
                    <p className="font-medium text-gray-600">Active Date:</p>
                    <p>
                      {new Date(
                        verificationResult.certActiveDate
                      ).toLocaleString("en-GB", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                      })}
                    </p>
                  </div>
                  <div>
                    <p className="font-medium text-gray-600">Status:</p>
                    <p>{verificationResult.certStatus}</p>
                  </div>
                </div>
              </div>
            ) : (
              <p className="text-lg font-semibold text-red-600">
                Certificate is invalid.
              </p>
            )}
          </div>
        </div>
      )}{
        invalidCertificate && (
          <div className="mt-8 mb-8 bg-white shadow-xl rounded-lg overflow-hidden">
            <div className="px-8 py-6 bg-red-600">
              <h2 className="text-2xl font-semibold text-white">
                Verification Result
              </h2>
            </div>
            <div className="p-8 text-gray-700">
              <p className="text-lg font-semibold text-red-600">
                Certificate is invalid.
              </p>
            </div>
          </div>
        )
      }
    </div>
  );
};

export default Hero;
