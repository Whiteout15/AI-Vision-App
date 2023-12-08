import React, { useState } from "react";
import {
  IonPage,
  IonContent,
  IonDatetime,
  IonItem,
  IonLabel,
  IonInput,
  IonModal,
  IonButton,
  IonToggle,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonIcon,
  IonSelect,
  IonSelectOption,
  IonAlert,
} from "@ionic/react";
import { eyeOutline } from "ionicons/icons";
import { useHistory } from "react-router-dom";
import Header from "../components/Header/Header";
import Button from "../components/Button/Button";
import Results from "./Results";
import "./TestConfig.css";

const TestConfig: React.FC = () => {
  const history = useHistory();
  const [showDatePicker, setShowDatePicker] = useState(false); 
  const [testMode, setTestMode] = useState("");
  // const [wearGlasses, setWearGlasses] = useState<string>("");
  const [eyeToExamine, setEyeToExamine] = useState<string>("");
  const [showAlert, setShowAlert] = useState(false);

  const continueToPreTest = () => {
    if (!testMode || !eyeToExamine) {
      setShowAlert(true);
    } else {
      history.push("/Test", { testMode, eyeToExamine });
    }
  };

  return (
    //fix CSS by giving ionPage a class name.  Like the commented out line below
    // <IonPage id="container">

    <IonPage>
      <Header headerText="Personal Configuration"/>
      <IonContent scrollY={false}>
      <IonItem>
          <IonLabel position="stacked">
            <h1 className="question">Letters or Shapes?</h1>
          </IonLabel>
          <IonSelect
            value={testMode}
            placeholder="Select Alphanumerical or Images"
            onIonChange={(e) => setTestMode(e.detail.value)}
          >
            <IonSelectOption value="Letters">Letters</IonSelectOption>
            <IonSelectOption value="Images">Shapes</IonSelectOption>
          </IonSelect>
        </IonItem>
        {/* <IonItem onClick={() => setShowDatePicker(true)}>
          <IonLabel position="stacked">
            <h1 className="question">What is your birth year?</h1>
          </IonLabel>
          <IonInput
            readonly
            value={
              birthYear ? new Date(birthYear).getFullYear().toString() : ""
            }
            placeholder="Select Birth Year"
          />
        </IonItem> */}
        {/* <IonItem>
          <IonLabel position="stacked">
            <h1 className="question">Do you wear glasses?</h1>
          </IonLabel>
          <IonSelect
            value={wearGlasses}
            placeholder="Select Yes or No"
            onIonChange={(e) => setWearGlasses(e.detail.value)}
          >
            <IonSelectOption value="Yes">Yes</IonSelectOption>
            <IonSelectOption value="No">No</IonSelectOption>
          </IonSelect>
        </IonItem> */}

        <IonItem>
          <IonLabel position="stacked">
            <h1 className="question">Which eye will you be testing?</h1>
          </IonLabel>
          <IonSelect
            value={eyeToExamine}
            placeholder="Select an eye"
            onIonChange={(e) => setEyeToExamine(e.detail.value)}
          >
            <IonSelectOption value="Left Eye">Left Eye</IonSelectOption>
            <IonSelectOption value="Right Eye">Right Eye</IonSelectOption>
            <IonSelectOption value="Both">Both</IonSelectOption>
          </IonSelect>
        </IonItem>
        <div className="padding"></div>
        <Button buttonText="Continue" onClickAction={continueToPreTest} />

        {/* <IonModal
          isOpen={showDatePicker}
          onDidDismiss={() => setShowDatePicker(false)}
        >
          <IonDatetime
            presentation="year"
            onIonChange={handleBirthYearChange}
          />
          <IonButton onClick={() => setShowDatePicker(false)}>Done</IonButton>
        </IonModal> */}
        <IonAlert
          isOpen={showAlert}
          onDidDismiss={() => setShowAlert(false)}
          header="Incomplete Information"
          message="Please fill in all the fields before continuing."
          buttons={["OK"]}
        />
      </IonContent>
      
    </IonPage>
  );
};

export default TestConfig;
