import "./WelcomePage.css";
import {
  IonCard,
  IonCardContent,
  IonHeader,
  IonTitle,
  IonPage,
  IonButton,
  IonIcon,
} from "@ionic/react";
import { eyeOutline } from "ionicons/icons";
import React from "react";
import { useHistory } from "react-router-dom";

interface ContainerProps {}

const WelcomePage: React.FC<ContainerProps> = () => {
  const history = useHistory();

  const goToTermsPage = () => {
    history.push("./Terms");
  };

  return (
    <IonPage id="container">
      <body className="container">
        <h1 className="title">Welcome to the VisionAI App</h1>
        <div>
          <p className="app-description">
            An Artificial Intelligence Based Near Vision Tester. Providing
            accurate and reliable at home vision testing.
          </p>
        </div>
        <div className="button-container">
          <button className="home-button" onClick={goToTermsPage}>
            <h1>Continue</h1>
            <IonIcon className="eye" slot="end" size="large" icon={eyeOutline}></IonIcon>
          </button>
        </div>
      </body>
    </IonPage>
  );
};

export default WelcomePage;
