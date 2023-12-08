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
import { FaSailboat } from "react-icons/fa6";
import { WiTrain } from "react-icons/wi";
import { useLocation } from "react-router-dom";
import "./LetterTest.css";

interface LocationState {
  testMode?: string;
  wearGlasses?: string;
  eyeToExamine?: string;
}


const iconMap = {
  home: <IonIcon name="home-outline" />,
  flower: <IonIcon name="flower-outline" />,
  butterfly: <PiButterflyLight />,
  umbrella: <IonIcon name="umbrella-outline" />,
  apple: <CiApple />,
  dog: <GiSittingDog />,
  bird: <PiBirdBold />,
  cat: <FaCat />,
  horse: <FaHorse />,
  train: <WiTrain />,
  sailboat: <FaSailboat />,
  car: <FaCarSide />,
};

const icons = Object.values(iconMap);

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

const LetterTest: React.FC = () => {
  const location = useLocation<LocationState>();
  const { testMode, wearGlasses, eyeToExamine } = location.state || {};
  const history = useHistory();
  const [randomString, setRandomString] = useState(generateRandomString());
  const [buttonPressCount, setButtonPressCount] = useState(0);
  const [fontSize, setFontSize] = useState(70);
  const [recognition, setRecognition] = useState(null);
  const [isListening, setIsListening] = useState(false);
  const [iconsToShow, setIconsToShow] = useState(shuffleArray(icons).slice(0, 5));

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

  const updateRandomIcons = () => {
    const newCount = buttonPressCount + 1;
    setButtonPressCount(newCount);

    if (newCount === 6) {
      history.push("./Results", {testMode, wearGlasses, eyeToExamine });
    } else {
      setRandomString(generateRandomString());
      const shuffledIcons = shuffleArray(icons);
      setIconsToShow(shuffledIcons.slice(0, 5));
    }
  };

  function shuffleArray<T>(array: T[]): T[] {
    const shuffledArray = [...array];
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [
        shuffledArray[j],
        shuffledArray[i],
      ];
    }
    return shuffledArray;
  }

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

        <div className="imageContainer">
          {iconsToShow.map((icon, index) => (
            <IonText key={index} className="testImages" style={{ fontSize: fontSize }}>
              {icon}
            </IonText>
          ))}
        </div>

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

        <IonButton expand="full" onClick={updateRandomIcons}>
          Next
        </IonButton>
        <IonText style={{ textAlign: "center" }}>
          Vision Test: {buttonPressCount}/5
        </IonText>
      </IonContent>
    </IonPage>
  );
};

export default LetterTest;