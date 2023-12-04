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



const generateRandomString = () => {
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789";
  let randomString = "";

  for (let i = 0; i < 5; i++) {
    const randomIndex = Math.floor(Math.random() * alphabet.length);
    randomString += alphabet[randomIndex];
  }

  return randomString;
};

const Results: React.FC = () => {
  const history = useHistory();

  return (
    <IonPage>
      <Header headerText="Results" />
      <IonContent className="ion-padding">
        <h1>Eye Tested: </h1>
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
