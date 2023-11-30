import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import {
  IonContent,
  IonPage,
  IonButton,
  IonText,
} from "@ionic/react";
import Header from "../components/Header/Header";

//Icons
import IonIcon from '@reacticons/ionicons';
import { PiButterflyLight } from "react-icons/pi";
import { CiApple } from "react-icons/ci";
import { GiSittingDog } from "react-icons/gi";
import { PiBirdBold } from "react-icons/pi";
import { FaCat } from "react-icons/fa";
import { FaHorse } from "react-icons/fa";
import { WiTrain } from "react-icons/wi";
import { FaSailboat } from "react-icons/fa6";
import { FaCarSide } from "react-icons/fa";


import "./VisionTest.css"

const generateRandomString = () => {
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789";
  let randomString = "";

  for (let i = 0; i < 5; i++) {
    const randomIndex = Math.floor(Math.random() * alphabet.length);
    randomString += alphabet[randomIndex];
  }

  return randomString;
};

const VisionTest: React.FC = () => {
  const history = useHistory();
  const [randomString, setRandomString] = useState(generateRandomString());
  const [buttonPressCount, setButtonPressCount] = useState(0);
  const [fontSize, setFontSize] = useState(70);

  const increaseFontSize = () => {
    setFontSize(fontSize + 2);
  };

  const decreaseFontSize = () => {
    setFontSize(fontSize - 2);
  };

  const updateRandomString = () => {
    const newCount = buttonPressCount + 1;
    setButtonPressCount(newCount);

    if (newCount === 6) {
        history.push("./Results");
      
    } else {
      setRandomString(generateRandomString());
    }
  };

  return (
    <IonPage>
      <Header headerText="Vision Test" />

      <IonContent className="ion-padding">
      <IonText className="testText" style={{ fontSize: fontSize }}>
  {randomString}
</IonText>

        <IonButton expand="full" onClick={increaseFontSize}>
          Increase Font Size
        </IonButton>

        <IonButton expand="full" onClick={decreaseFontSize}>
          Decrease Font Size
        </IonButton>

        <IonButton expand="full" onClick={updateRandomString}>
          Next
        </IonButton>

        <IonText style={{ textAlign: "center" }}>
          Vision Test: {buttonPressCount}/5
        </IonText>
        <IonIcon name="home-outline"></IonIcon>
        <IonIcon name="flower-outline"></IonIcon>
        <PiButterflyLight />
        <IonIcon name="umbrella-outline"></IonIcon>
        <CiApple />
        <GiSittingDog />
        <PiBirdBold />
        <FaCat />
        <FaHorse />
        <WiTrain />
        <FaSailboat />
        <FaCarSide />
      </IonContent>
    </IonPage>
  );
};

export default VisionTest;
