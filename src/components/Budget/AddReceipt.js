import React, { useState, useContext } from "react";
import Ocr from "./Ocr";
import Correction from "./Correction";
import { AuthContext } from "../App/Auth";

const AddReceipt = () => {
  const [items, setItems] = useState(null);
  const [step, setStep] = useState(1);
  const [store, setStore] = useState(null);
  const [totalCost, setTotalCost] = useState(null);
  const [description, setDescription] = useState(null);
  const [imageAsFile, setImageAsFile] = useState("");
  const { currentUser } = useContext(AuthContext);
  const uid = currentUser.uid;

  const handleNextStep = () => {
    setStep(step + 1);
  };

  const handlePrevStep = () => {
    setStep(step - 1);
  };

  const onSubmit = (imageAsFile, items, store, totalCost, description) => {
    setImageAsFile(imageAsFile);
    setItems([...items]);
    setStore(store);
    setTotalCost(totalCost);
    setDescription(description);
  };

  switch (step) {
    case 1:
      return (
        <Ocr nextStep={handleNextStep} getChildOnSubmit={onSubmit} uid={uid} />
      );
    case 2:
      return (
        <Correction
          prevStep={handlePrevStep}
          imageAsFile={imageAsFile}
          items={items}
          store={store}
          totalCost={totalCost}
          description={description}
          uid={uid}
        />
      );
    default:
      break;
  }
};

export default AddReceipt;
