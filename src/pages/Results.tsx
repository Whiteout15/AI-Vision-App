import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import {
  IonContent,
  IonPage,
  IonButton,
  IonText,
  IonIcon,
} from "@ionic/react";
import Header from "../components/Header/Header";
import "./Results.css";
import { eyeOutline } from "ionicons/icons";
import { useLocation } from "react-router-dom";

interface LocationState {
  testMode?: string;
  // wearGlasses?: string;
  eyeToExamine?: string;
}

const Results: React.FC = () => {
  const location = useLocation<LocationState>();
  const { testMode, eyeToExamine } = location.state || {};
  const history = useHistory();

  return (
    <IonPage>
      <Header headerText="Results" />
      <IonContent className="ion-padding" scrollY={false}>
        <h1>Test Mode: {testMode} </h1>
        <h1>Eye Tested: {eyeToExamine} </h1>
        <h1>Eye Strength: </h1>

        <div className="result-button-container">
          <button className="result-button">
            <h1>Save as Image</h1>
            <IonIcon className="eye" slot="end" size="large" icon={eyeOutline}></IonIcon>
          </button>
        </div>


      </IonContent>
    </IonPage>
  );
};

export default Results;
