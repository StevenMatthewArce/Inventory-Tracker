import React, { useState } from "react";
import Ocr from "./Ocr";
import Correction from "./Correction";

const AddReceipt = () => {
  const [items, setItems] = useState(null);
  const [step, setStep] = useState(1);

  const handleNextStep = () => {
    setStep(step + 1);
  };

  const handlePrevStep = () => {
    setStep(step - 1);
  };

  const handleItems = items => {
    setItems([...items]);
  };

  switch (step) {
    case 1:
      return (
        <Ocr nextStep={handleNextStep} getChildItemOnSubmit={handleItems} />
      );
    case 2:
      return <Correction prevStep={handlePrevStep} items={items} />;
    default:
      break;
  }
};

export default AddReceipt;
