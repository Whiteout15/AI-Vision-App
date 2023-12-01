import {
    IonContent,
    IonHeader,
    IonPage,
    IonTitle,
    IonToolbar,
  } from "@ionic/react";
  
  import React from "react";
  import IonIcon from '@reacticons/ionicons';
  import { useHistory } from 'react-router-dom';
  import "./Header.css";

  interface HeaderProps {
    headerText: string;
  }
  
  const Header: React.FC<HeaderProps> = ({ headerText }) => {
    const history = useHistory();

    const goBack = () => {
      history.goBack();
    };

    return (
    <IonHeader className="header">
        <header>
            <IonIcon size="large" name="chevron-back-outline" className="arrow" onClick={goBack}/>
            <p className="header-text">{headerText}</p>
        </header>
    </IonHeader>
    );
  };
  
  export default Header;