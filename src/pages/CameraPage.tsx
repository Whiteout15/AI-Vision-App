import React, { useState } from "react";
import {
  IonPage,
  IonButton,
  IonIcon,
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
} from "@ionic/react";

import { eyeOutline } from "ionicons/icons";
import { useHistory } from "react-router-dom";

import "./Terms.css";
import PreTest from "../components/PreTest";
import "./Home.css";
import Header from "../components/Header/Header";

const CameraPage: React.FC = () => {
  const history = useHistory();

  const continueToExam = () => {
    history.push("/Test"); // Ensure the route is correct
  };

  return (
    <IonPage>
      <Header headerText="Distance Calculations"/>
      <IonContent fullscreen>
        <PreTest />
      </IonContent>
      <IonButton onClick={continueToExam}>
        Continue
        <IonIcon slot="end" icon={eyeOutline}></IonIcon>
      </IonButton>
    </IonPage>
  );
};

export default CameraPage;
