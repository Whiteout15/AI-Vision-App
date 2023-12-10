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
import "./ShapeTest.css";

interface LocationState {
  testMode?: string;
  wearGlasses?: string;
  eyeToExamine?: string;
}

const keywordIconMap = {
  house: <IonIcon name="home-outline" />,
  flower: <IonIcon name="flower-outline" />,
  butterfly: <PiButterflyLight />,
  umbrella: <IonIcon name="umbrella-outline" />,
  apple: <CiApple />,
  dog: <GiSittingDog />,
  bird: <PiBirdBold />,
  cat: <FaCat />,
  horse: <FaHorse />,
  train: <WiTrain />,
  boat: <FaSailboat />,
  car: <FaCarSide />,
};

const ShapeTest: React.FC = () => {
  const location = useLocation<LocationState>();
  const { testMode, wearGlasses, eyeToExamine } = location.state || {};
  const history = useHistory();
  const [fontSize, setFontSize] = useState(60);
  const [recognition, setRecognition] = useState(null);
  const [isListening, setIsListening] = useState(false);
  const [recognizedKeywords, setRecognizedKeywords] = useState(
    new Set<string>()
  );
  const [iconsToShow, setIconsToShow] = useState([]);
  const [buttonPressCount, setButtonPressCount] = useState(0);

  useEffect(() => {
    setIconsToShow(selectRandomIcons());

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
          console.log("Transcript:", transcript);
          setRecognizedKeywords((prev) => new Set(prev).add(transcript));
        }
      };

      setRecognition(webkitRecognition);
    } else {
      alert(
        "Your browser does not support the Web Speech API. Please use Chrome or Safari."
      );
    }
  }, []);

  const selectRandomIcons = () => {
    const allKeywords = Object.keys(keywordIconMap);
    const shuffled = allKeywords.sort(() => 0.5 - Math.random());
    return shuffled
      .slice(0, 5)
      .map((keyword) => ({ keyword, icon: keywordIconMap[keyword] }));
  };

  const isKeywordRecognized = (keyword) => recognizedKeywords.has(keyword);

  const toggleListening = () => {
    if (recognition) {
      if (isListening) {
        recognition.stop();
      } else {
        recognition.start();
      }
      setIsListening(!isListening);
    }
  };

  const increaseFontSize = () => {
    setFontSize(fontSize + 2);
  };

  const decreaseFontSize = () => {
    setFontSize(fontSize - 2);
  };

  const updateRandomIcons = () => {
    let newCount = buttonPressCount + 1;
    setButtonPressCount(newCount);
    if (newCount > 5) {
      setButtonPressCount(0);
      history.push("./Results", { testMode, eyeToExamine });
    } else {
      setButtonPressCount(newCount);
      setRecognizedKeywords(new Set());

      // Update the icons
      setIconsToShow(selectRandomIcons());
    }
  };

  const endTest = () => {
    history.push("./Results", { testMode, eyeToExamine });
  };

  return (
    <IonPage>
      <Header headerText="Vision Test" />
      <IonContent className="ion-padding" scrollY={false}>
        <div className="imageContainer">
          {iconsToShow.map(({ keyword, icon }, index) => (
            <IonText
              key={index}
              className="testImages"
              style={{
                fontSize: fontSize,
                color: isKeywordRecognized(keyword.toUpperCase())
                  ? "green"
                  : "black",
              }}
            >
              {icon}
            </IonText>
          ))}
        </div>
        <IonButton expand="full" onClick={toggleListening}>
          {isListening ? "Stop Speech Recognition" : "Start Speech Recognition"}
        </IonButton>
        <IonButton expand="full" onClick={increaseFontSize}>
          Increase Font Size
        </IonButton>
        <IonButton expand="full" onClick={decreaseFontSize}>
          Decrease Font Size
        </IonButton>
        <IonButton
          className="App-Button"
          expand="full"
          onClick={updateRandomIcons}
        >
          Next
        </IonButton>

        <IonButton className="App-Button" expand="full" onClick={endTest}>
          End Test
        </IonButton>
        <IonText style={{ textAlign: "center" }}>
          Vision Test: {buttonPressCount}/5
        </IonText>
      </IonContent>
    </IonPage>
  );
};

export default ShapeTest;
