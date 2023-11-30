import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import {
  IonContent,
  IonPage,
  IonButton,
  IonText,
} from "@ionic/react";
import Header from "../components/Header/Header";
import "./Results.css";



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

      <IonText>Hello</IonText>

      <IonContent className="ion-padding">

      </IonContent>
    </IonPage>
  );
};

export default Results;
