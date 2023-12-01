import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";

import React from "react";
import IonIcon from '@reacticons/ionicons';
import "./Home.css";
import WelcomePage from "../components/Welcome/WelcomePage";
import Header from "../components/Header/Header";

const Home: React.FC = () => {
  return (
    //fix CSS by giving ionPage a class name.  Like the commented out line below
    // <IonPage id="container">

    // <IonPage>
    //   <IonHeader>
    //     <IonToolbar>
    //       <IonTitle size="large" className="header">AI Vision App</IonTitle>
    //     </IonToolbar>
    //   </IonHeader>
    //   <IonContent fullscreen>
    //     <IonHeader collapse="condense">
    //       <IonToolbar>
    //         <IonTitle size="large">AI Vision App</IonTitle>
    //       </IonToolbar>
    //     </IonHeader>
    //     <WelcomePage />
    //   </IonContent>
    // </IonPage>

    <IonPage>
      <WelcomePage/>
    </IonPage>
  );
};

export default Home;
