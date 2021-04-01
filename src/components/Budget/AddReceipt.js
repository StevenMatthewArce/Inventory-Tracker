import React, { useState } from "react";
import Ocr from "./Ocr";
import Correction from "./Correction";

const AddReceipt = () => {
  const [items, setItems] = useState(null);
  const [step, setStep] = useState(1);
  const [store, setStore] = useState(null);
  const [totalCost, setTotalCost] = useState(null);
  const [description, setDescription] = useState(null);

  const handleNextStep = () => {
    setStep(step + 1);
  };

  const handlePrevStep = () => {
    setStep(step - 1);
  };

  const onSubmit = (items, store, totalCost, description) => {
    setItems([...items]);
    setStore(store);
    setTotalCost(totalCost);
    setDescription(description);
  };

  switch (step) {
    case 1:
      return <Ocr nextStep={handleNextStep} getChildOnSubmit={onSubmit} />;
    case 2:
      return (
        <Correction
          prevStep={handlePrevStep}
          items={items}
          store={store}
          totalCost={totalCost}
          description={description}
        />
      );
    default:
      break;
  }
};

export default AddReceipt;
