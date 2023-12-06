import React, { useState } from "react";
import { IonPage, IonButton, IonIcon, IonContent } from "@ionic/react";

import { eyeOutline } from "ionicons/icons";
import { useHistory } from "react-router-dom";

import "./Terms.css";
import PreTest from "../components/PreTest";
import "./Home.css";
import "./CameraPage.css"
import Header from "../components/Header/Header";
import Button from "../components/Button/Button";

const CameraPage: React.FC = () => {
  const history = useHistory();

  const continueToExam = () => {
    history.push("/VisionTest"); // Ensure the route is correct
  };

  return (
    <IonPage>
      <Header headerText="Distance Calculations" />
      <IonContent fullscreen>
        <PreTest />
        <Button buttonText="Continue" onClickAction={continueToExam} />        
      </IonContent>
      
    </IonPage>
  );
};

export default CameraPage;
