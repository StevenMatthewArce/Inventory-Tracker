import React, { useState } from "react";

import Ocr from "./Ocr";
import Correction from "./Correction";

const AddReceipt = () => {
  const [item, setItem] = useState(null);
  const [step, setStep] = useState(1);

  const handleItems = (n, c, q, d) => {
    setItem({
      name: n,
      cost: c,
      quantity: q,
      dateRestocked: d
    });
  };

  const handleNextStep = () => {
    setStep(step + 1);
  };

  const handlePrevStep = () => {
    setStep(step - 1);
  };

  switch (step) {
    case 1:
      return (
        <Ocr nextStep={handleNextStep} getChildItemOnSubmit={handleItems} />
      );
    case 2:
      return (
        <Correction
          nextStep={handleNextStep}
          prevStep={handlePrevStep}
          items={item}
        />
      );
    default:
      break;
  }
};

export default AddReceipt;
