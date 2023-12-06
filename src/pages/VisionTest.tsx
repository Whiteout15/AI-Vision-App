import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { IonContent, IonPage, IonButton, IonText } from "@ionic/react";
import Header from "../components/Header/Header";
import IonIcon from "@reacticons/ionicons";
import { PiButterflyLight } from "react-icons/pi";
import { CiApple } from "react-icons/ci";
import { GiSittingDog } from "react-icons/gi";
import { PiBirdBold } from "react-icons/pi";
import { FaCat, FaHorse, FaCarSide } from "react-icons/fa";
import { WiTrain } from "react-icons/wi";
import "./VisionTest.css";

const generateRandomString = () => {
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789";
  let randomString = [];
  let usedIndices = new Set();

  while (randomString.length < 5) {
    const randomIndex = Math.floor(Math.random() * alphabet.length);
    if (!usedIndices.has(randomIndex)) {
      usedIndices.add(randomIndex);
      randomString.push({ letter: alphabet[randomIndex], recognized: false });
    }
  }

  return randomString;
};

const VisionTest: React.FC = () => {
  const history = useHistory();
  const [randomString, setRandomString] = useState(generateRandomString());
  const [buttonPressCount, setButtonPressCount] = useState(0);
  const [fontSize, setFontSize] = useState(70);
  const [recognition, setRecognition] = useState(null);
  const [isListening, setIsListening] = useState(false);

  useEffect(() => {
    if ("webkitSpeechRecognition" in window) {
      const webkitRecognition = new window.webkitSpeechRecognition();
      const speechRecognitionList = new window.webkitSpeechGrammarList();
      const grammar =
        "#JSGF V1.0; grammar lettersAndNumbers; public <letterOrNumber> = (A | B | C | D | ... | Z | 0 | 1 | 2 | ... | 9);";
      speechRecognitionList.addFromString(grammar, 1);

      webkitRecognition.grammars = speechRecognitionList;
      webkitRecognition.maxAlternatives = 1;
      webkitRecognition.continuous = true;
      webkitRecognition.interimResults = true;
      webkitRecognition.lang = "en-US";

      webkitRecognition.onresult = (event) => {
        for (let i = event.resultIndex; i < event.results.length; ++i) {
          const transcript = event.results[i][0].transcript
            .trim()
            .toUpperCase();
          console.log("Transcript:", transcript); // Log everything picked up by the microphone

          // Check if the recognized transcript matches any character in randomString
          setRandomString((currentString) =>
            currentString.map((obj) =>
              obj.letter === transcript ? { ...obj, recognized: true } : obj
            )
          );
        }
      };

      setRecognition(webkitRecognition);
    } else {
      alert(
        "Your browser does not support the Web Speech API. Please use Chrome or Safari."
      );
    }
  }, []);

  const startListening = () => {
    if (recognition) {
      recognition.start();
      setIsListening(true);
    }
  };

  const stopListening = () => {
    if (recognition) {
      recognition.stop();
      setIsListening(false);
    }
  };

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
          {randomString.map((obj, index) => (
            <span
              key={index}
              style={{ color: obj.recognized ? "green" : "black" }}
            >
              {obj.letter}
            </span>
          ))}
        </IonText>
        <IonButton onClick={startListening} disabled={isListening}>
          Start Speech Recognition
        </IonButton>
        <IonButton onClick={stopListening} disabled={!isListening}>
          Stop Speech Recognition
        </IonButton>
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
        <FaCarSide />
      </IonContent>
    </IonPage>
  );
};

export default VisionTest;
