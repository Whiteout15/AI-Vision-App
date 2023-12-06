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
import Button from "../Button/Button";

interface ContainerProps {}

const WelcomePage: React.FC<ContainerProps> = () => {
  const history = useHistory();

  const goToTermsPage = () => {
    history.push("./Terms");
  };

  return (
    <IonPage id="container">
      <body className="container">
        <h1 className="title">Welcome to the VisionAI Test</h1>
        <div>
          <p className="app-description">
            An Artificial Intelligence Based Near Vision Tester. Providing
            accurate and reliable at home vision testing.
          </p>
        </div>
        <Button buttonText="Continue" onClickAction={goToTermsPage}/>
      </body>
      
    </IonPage>
  );
};

export default WelcomePage;
