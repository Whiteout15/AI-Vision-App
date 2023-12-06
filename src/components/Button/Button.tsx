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
  import React, { ReactNode } from "react";
  import { useHistory } from "react-router-dom";
  import "./Button.css";

  interface ButtonProps {
    buttonText: string;
    onClickAction?: () => string | void;
  }

  const Button: React.FC<ButtonProps> = ({ buttonText, onClickAction }) => {
    const history = useHistory();

    const handleClick = () => {
        if (onClickAction) {
            const result = onClickAction();
            if (typeof result === 'string') {
                history.push(result);
              }
        }
    };
  
    return (
          <div className="button-container">
            <button className="button" onClick={handleClick}>
              <h1>{buttonText}</h1>
              <IonIcon className="eye" slot="end" size="large" icon={eyeOutline}></IonIcon>
            </button>
          </div>
    );
  };
  
  export default Button;
  