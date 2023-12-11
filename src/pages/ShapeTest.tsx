import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { IonContent, IonPage, IonButton, IonText, IonIcon } from "@ionic/react";
import Header from "../components/Header/Header";
import { useLocation } from "react-router-dom";
import { PiButterflyLight } from "react-icons/pi";
import { CiApple } from "react-icons/ci";
import { GiSittingDog } from "react-icons/gi";
import { PiBirdBold } from "react-icons/pi";
import { FaCat, FaHorse, FaCarSide } from "react-icons/fa";
import { FaSailboat } from "react-icons/fa6";
import { WiTrain } from "react-icons/wi";
import { eyeOutline } from "ionicons/icons";
import Button from "../components/Button/Button";
import "./ShapeTest.css";

interface LocationState {
  testMode?: string;
  eyeToExamine?: string;
  eyeStrength?: string;
}

function getDynamicFontSize(physicalSizeMm) {
  function getDevicePixelRatio() {
    if (window.screen.systemXDPI !== undefined && window.screen.logicalXDPI !== undefined && window.screen.systemXDPI > window.screen.logicalXDPI) {
      return window.screen.systemXDPI / window.screen.logicalXDPI;
    } else if (window.devicePixelRatio !== undefined) {
      return window.devicePixelRatio;
    }
    return 1;
  }

  let physicalSizeInches = physicalSizeMm / 25.4;
  let basePpi = 96;
  let effectivePpi = basePpi * getDevicePixelRatio();
  return physicalSizeInches * effectivePpi;
}

const generateRandomString = () => {
  const icons = [
    { icon: <CiApple />, keyword: "apple" },
    { icon: <PiBirdBold />, keyword: "bird" },
    { icon: <FaSailboat />, keyword: "boat" },
    { icon: <PiButterflyLight />, keyword: "butterfly" },
    { icon: <FaCarSide />, keyword: "car" },
    { icon: <GiSittingDog />, keyword: "dog" },
    { icon: <FaCat />, keyword: "cat" },
    { icon: <FaHorse />, keyword: "horse" },
    { icon: <WiTrain />, keyword: "train" },
  ];

  let randomString = [];
  let usedKeywords = new Set();

  while (randomString.length < 5) {
    const randomIndex = Math.floor(Math.random() * icons.length);
    const selectedIcon = icons[randomIndex];

    if (!usedKeywords.has(selectedIcon.keyword)) {
      usedKeywords.add(selectedIcon.keyword);
      randomString.push({ icon: selectedIcon.icon, keyword: selectedIcon.keyword, recognized: false });
    }
  }

  return randomString;
};


const ShapeTest: React.FC = () => {
  const location = useLocation<LocationState>();
  const { testMode, eyeToExamine } = location.state || {};
  const history = useHistory();
  const [randomString, setRandomString] = useState(generateRandomString());
  const [buttonPressCount, setButtonPressCount] = useState(0);
  const [recognition, setRecognition] = useState(null);
  const [isListening, setIsListening] = useState(false);
  const [visualAcuityIndex, setVisualAcuityIndex] = useState(7);
  const visualAcuityMeasurements = [0.8, 1, 1.2, 1.5, 2, 2.8, 4, 8];
  const eyeStrengthValues = ['20/20', '20/25', '20/30', '20/40', '20/50', '20/70', '20/100', '20/200'];

  const getFontSizePx = (mm) => {
    return getDynamicFontSize(mm);
  };

  const fontSizePx = getFontSizePx(visualAcuityMeasurements[visualAcuityIndex]);

  useEffect(() => {
    if ("webkitSpeechRecognition" in window) {
      const webkitRecognition = new window.webkitSpeechRecognition();
      const speechRecognitionList = new window.webkitSpeechGrammarList();
      const grammar =
      "#JSGF V1.0; grammar keywords; public <keyword> = (apple | bird | butterfly | car | dog | cat | horse | train | boat);";
      speechRecognitionList.addFromString(grammar, 1);
  
      webkitRecognition.grammars = speechRecognitionList;
      webkitRecognition.maxAlternatives = 1;
      webkitRecognition.continuous = true;
      webkitRecognition.interimResults = true;
      webkitRecognition.lang = "en-US";
  
      webkitRecognition.onresult = (event) => {
        for (let i = event.resultIndex; i < event.results.length; ++i) {
          let transcript = event.results[i][0].transcript.trim().toLowerCase();
  
          console.log("Transcript:", transcript);
  
          setRandomString((currentString) =>
            currentString.map((obj) =>
              obj.keyword === transcript ? { ...obj, recognized: true } : obj
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

  const updateRandomIcons = () => {
    const newCount = buttonPressCount + 1;
    setButtonPressCount(newCount);
  
    if (newCount > 7) {
      endTest();
    } else {
      const currentGreenIconCount = randomString.filter((obj) => obj.recognized).length;
  
      if (currentGreenIconCount >= 3) {
        decreaseFontSize();
      }
  
      setRandomString(generateRandomString());
    }
  };

  const endTest = () => {
    setButtonPressCount(0);
    const selectedEyeStrength = eyeStrengthValues[visualAcuityIndex];
    history.push("./Results", { testMode, eyeToExamine, eyeStrength: selectedEyeStrength });
  };

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
    if (visualAcuityIndex < visualAcuityMeasurements.length - 1) {
      setVisualAcuityIndex(visualAcuityIndex + 1);
      setRandomString(generateRandomString());
    }
  };

  const decreaseFontSize = () => {
    if (visualAcuityIndex > 0) {
      setVisualAcuityIndex(visualAcuityIndex - 1);
      setRandomString(generateRandomString());
    }
  };

  return (
    <IonPage>
      <Header headerText="Vision Test" />
      <IonContent className="ion-padding" scrollY={false}>
        <IonText className="testIcon" style={{ fontSize: `${fontSizePx}px` }}>
          <div className="icons-div">
            {randomString.map((obj, index) => (
              <span
                key={index}
                style={{ color: obj.recognized ? "green" : "black", marginRight: "5px", marginLeft: "5px" }}
              >
                {obj.icon}
              </span>
            ))}
          </div>
          
        </IonText>

        {/* <IonButton expand="full" onClick={toggleListening}>
          {isListening ? "Stop Speech Recognition" : "Start Speech Recognition"}
        </IonButton> */}
        {/* <Button buttonText={isListening ? "Stop Speech Recognition" : "Start Speech Recognition"} onClickAction={toggleListening}>

        </Button> */}
        <div className="speech-button-container">
          <button className="speech-button" onClick={toggleListening}>
            <h1>{isListening ? "Stop Speech Recognition" : "Start Speech Recognition"}</h1>
            <IonIcon className="eye" slot="end" size="large" icon={eyeOutline}></IonIcon>
          </button>
        </div>
        <div className="speech-next-button-container">
          <button className="speech-next-button" onClick={updateRandomIcons}>
            <h1>Next</h1>
            <IonIcon className="eye" slot="end" size="large" icon={eyeOutline}></IonIcon>
          </button>
        </div>
        <div className="speech-end-button-container">
          <button className="speech-end-button" onClick={endTest}>
            <h1>End Test</h1>
            <IonIcon className="eye" slot="end" size="large" icon={eyeOutline}></IonIcon>
          </button>
        </div>

        <IonText style={{ textAlign: "center" }}>
          <h1>Shape Test: {buttonPressCount}/7</h1>
        </IonText>
      </IonContent>
    </IonPage>
  );
};

export default ShapeTest;