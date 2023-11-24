import React, { useState } from "react";
import {
  IonPage,
  IonButton,
  IonIcon,
  IonCheckbox,
  IonAlert,
  IonLabel,
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
} from "@ionic/react";

import { eyeOutline } from "ionicons/icons";
import { useHistory } from "react-router-dom";
import Header from "../components/Header/Header";
import "./Terms.css";

const Terms: React.FC = () => {
  const history = useHistory();
  const [isChecked, setChecked] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  const handleCheckboxChange = () => {
    setChecked(!isChecked);
  };

  const continueToConfig = () => {
    if (isChecked) {
      history.push("/TestConfig"); // Ensure the route is correct
    } else {
      setShowAlert(true);
    }
  };

  return (
    //fix CSS by giving ionPage a class name.  Like the commented out line below
    // <IonPage id="container">
    <IonPage>
      <Header headerText="Terms and Conditions"/>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Terms and Agreements</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen className="ion-padding">
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">AI-Vision-App</IonTitle>
          </IonToolbar>
        </IonHeader>
        <h1>Please read and accept the terms of agreement to continue</h1>

        <p>
          THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
          EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
          MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
          IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
          CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
          TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
          SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.{" "}
        </p>

        <IonLabel>
          <strong>I agree to the terms and conditions.</strong>
        </IonLabel>
        <IonCheckbox checked={isChecked} onIonChange={handleCheckboxChange} />
        <IonAlert
          isOpen={showAlert}
          onDidDismiss={() => setShowAlert(false)}
          header="Terms and Conditions not accepted"
          message="Please accept the terms and conditions to continue"
          buttons={["OK"]}
        />
      </IonContent>
      <IonButton onClick={continueToConfig}>
        Continue
        <IonIcon slot="end" icon={eyeOutline}></IonIcon>
      </IonButton>
    </IonPage>
  );
};

export default Terms;
