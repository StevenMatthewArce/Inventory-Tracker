import React, { useState } from "react";

import Ocr from "./Ocr";
import Correction from "./Correction";
import Confirmation from "./Confirmation";
import Success from "./Success";

const AddReceipt = () => {
  const [item, setItem] = useState(null);
  const [name, setName] = useState(null);
  const [cost, setCost] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const [dateRestocked, setDate] = useState(null);
  const [step, setStep] = useState(1);

  const handleNameChange = e => {
    setName(e.target.value);
    console.log(e.target.value);
  };

  const handleCostChange = e => {
    setCost(e.target.value);
    console.log(e.target.value);
  };

  const handleQuantityChange = e => {
    setQuantity(e.target.value);
    console.log(e.target.value);
  };

  const handleDateChange = (name, value) => {
    setDate(value);
    console.log(typeof value);
  };

  const handleSubmit = (n, c, q, e) => {
    e.preventDefault();
  };

  const handleItems = (n, c) => {
    setItem({
      name: n,
      cost: c
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
        <Ocr
          nextStep={handleNextStep}
          getChildItemOnSubmit={handleItems}
          items={item}
        />
      );
    case 2:
      return (
        <Correction
          nextStep={handleNextStep}
          prevStep={handlePrevStep}
          getChildItemOnSubmit={handleItems}
          items={item}
        />
      );
    case 3:
      return (
        <Confirmation
          nextStep={handleNextStep}
          prevStep={handlePrevStep}
          items={item}
        />
      );
    case 4:
      return <Success />;
    default:
      break;
  }
};

export default AddReceipt;
