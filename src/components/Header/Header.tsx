import React from "react";
import { useHistory, useLocation } from "react-router-dom";
import { IonHeader } from "@ionic/react";
import IonIcon from '@reacticons/ionicons';
import "./Header.css";
interface HeaderProps {
  headerText: string;
}
const Header: React.FC<HeaderProps> = ({ headerText }) => {
  const history = useHistory();
  const location = useLocation();
  const goBack = () => {
    history.goBack();
  };

  const goHome = () => {
    history.replace("/Home"); // Replace with the actual home route
  };

  const isTestConfig = location.pathname === "/TestConfig";
  const isFirstLaunch = localStorage.getItem("firstLaunch") === null;
  return (
    <IonHeader className="header">
      <header>
        {isTestConfig && !isFirstLaunch && (
          <IonIcon
          size="large"
          name="chevron-back-outline"
          className="arrow"
          color="white"
          onClick={goHome}
        />
        )}

        {!isTestConfig && (
          <IonIcon
          size="large"
          name="chevron-back-outline"
          className="arrow"
          onClick={goBack}
        />
        )}
        
        {isFirstLaunch && (
          <IonIcon
          size="large"
          name="chevron-back-outline"
          className="arrow"
          color="white"
          onClick={goBack}
        />
        )}
          
          
        <p className="header-text">{headerText}</p>
      </header>
    </IonHeader>
  );
};
export default Header;
