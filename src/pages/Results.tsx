import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import {
  IonContent,
  IonPage,
  IonButton,
  IonText,
  IonIcon,
} from "@ionic/react";
import Header from "../components/Header/Header";
import { eyeOutline } from "ionicons/icons";
import { useLocation } from "react-router-dom";
import html2canvas from "html2canvas";
import "./Results.css";

interface LocationState {
  testMode?: string;
  eyeToExamine?: string;
  eyeStrength?: string;
}

const Results: React.FC = () => {
  const location = useLocation<LocationState>();
  const { testMode, eyeToExamine, eyeStrength } = location.state || {};
  const history = useHistory();
  const [screenshotData, setScreenshotData] = useState<string | null>(null);

  const takeAndSaveScreenshot = async () => {
    try {
      const content = document.getElementById("screenshot-content");
      if (content) {
        const canvas = await html2canvas(content);
        const imageData = canvas.toDataURL("image/png");
        console.log('Screenshot taken', imageData);

        // Set the screenshot data in the state
        setScreenshotData(imageData);

        // Save the screenshot
        const link = document.createElement('a');
        link.href = imageData;
        link.download = 'screenshot.png';
        link.click();
      } else {
        console.error("Screenshot content not found");
      }
    } catch (e) {
      console.error('Error taking or saving screenshot', e);
    }
  };

  return (
    <IonPage>
      <Header headerText="Results" />
      <IonContent className="ion-padding" scrollY={false}>
        <div className="results-container">
          <div className="screenshot" id="screenshot-content">
            <h1>Test Mode: {testMode} </h1>
            <h1>Eye Tested: {eyeToExamine} </h1>
            <h1>Eye Strength: {eyeStrength}</h1>
          </div>
          <div className="result-button-container">
            <button className="result-button" onClick={takeAndSaveScreenshot}>
              <h1>Save as Image</h1>
              <IonIcon className="eye" slot="end" size="large" icon={eyeOutline}></IonIcon>
            </button>
          </div>
        </div>
       
      </IonContent>
    </IonPage>
  );
};

export default Results;