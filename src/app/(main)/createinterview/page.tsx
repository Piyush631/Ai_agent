"use client";
import { useState } from "react";
import CreateInterview from "../component/createInterview";
import { GenerateLink } from "../component/GenerateLink";
import Heading from "../component/Heading";

export default function createInterview() {
  const [step, setStep] = useState(0);
  const [interviewId, setInterviewId] = useState("");
  return (
    <div className="">
      <Heading />

      {step === 0 && (
        <CreateInterview
          step={step}
          setStep={setStep}
          setInterviewId={setInterviewId}
        />
      )}
      {step === 1 && <GenerateLink interviewId={interviewId} />}
    </div>
  );
}
