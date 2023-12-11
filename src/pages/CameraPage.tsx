import React, { useState } from "react";
import { IonPage, IonButton, IonIcon, IonContent } from "@ionic/react";

import { eyeOutline } from "ionicons/icons";
import { useHistory } from "react-router-dom";

import "./Terms.css";
import PreTest from "../components/PreTest";
import "./Home.css";
import "./CameraPage.css";
import Header from "../components/Header/Header";
import Button from "../components/Button/Button";
import { useLocation } from "react-router-dom";

interface LocationState {
  testMode?: string;
  // wearGlasses?: string;
  eyeToExamine?: string;
  numberOfCharacters?: number;
}

const CameraPage: React.FC = () => {
  const location = useLocation<LocationState>();
  const { testMode, eyeToExamine, numberOfCharacters } = location.state || {};
  const history = useHistory();

  const continueToExam = () => {
    console.log(
      "Test Mode:",
      testMode,
      "Eye to Examine:",
      eyeToExamine,
      "Number of Characters:",
      numberOfCharacters
    );

    if (testMode === "Letters") {
      history.push("/LetterTest", {
        testMode,
        eyeToExamine,
        numberOfCharacters,
      });
    } else if (testMode === "Images") {
      history.push("/ShapeTest", {
        testMode,
        eyeToExamine,
        numberOfCharacters,
      });
    } else {
      console.error("Invalid test mode:", testMode);
    }
  };
  console.log("Current numberOfCharacters value:", numberOfCharacters);

  return (
    <IonPage>
      <Header headerText="Distance Calculations" />
      <IonContent fullscreen scrollY={false}>
        <PreTest />
        <div className="distance-button">
          <Button buttonText="Continue" onClickAction={continueToExam} />
        </div>

        {/* {testMode} */}
      </IonContent>
    </IonPage>
  );
};

export default CameraPage;
