import React, { useState, useEffect } from "react";
import {
  IonPage,
  IonContent,
  IonIcon,
  IonCheckbox,
  IonAlert,
} from "@ionic/react";
import { eyeOutline } from "ionicons/icons";
import { useHistory } from "react-router-dom";
import Header from "../components/Header/Header";
import "./Terms.css";
import Button from "../components/Button/Button";

const Terms: React.FC = () => {
  const history = useHistory();
  const [isChecked, setChecked] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    // Check if it's the first launch
    const isFirstLaunch = localStorage.getItem("firstLaunch") === null;

    // If it's not the first launch, navigate to the next page
    if (!isFirstLaunch) {
      history.push("./TestConfig");
    }
  }, [history]);

  const handleCheckboxChange = () => {
    setChecked(!isChecked);
  };

  const continueToConfig = () => {
    if (isChecked) {
      // Set the first launch flag in localStorage and navigate to the next page
      localStorage.setItem("firstLaunch", "false");

      history.push("./TestConfig");
    } else {
      setShowAlert(true);
    }
  };

  // If it's not the first launch, return null to skip rendering the entire component
  if (localStorage.getItem("firstLaunch") === null) {
    return (
      <IonPage>
        <Header headerText="Terms and Conditions" />
        <IonContent fullscreen className="ion-padding">
          <div>
            <h1>
              <strong>
                Please read and accept the terms of agreement to continue
              </strong>
            </h1>

            <p>
              THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
              EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
              MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
              NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
              HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
              WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
              OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
              DEALINGS IN THE SOFTWARE.{" "}
            </p>

            <label className="checkbox-label">
              <h1>
                <strong>I agree.</strong>
              </h1>
              <input
                type="checkbox"
                className="checkbox"
                checked={isChecked}
                onChange={handleCheckboxChange}
              />
            </label>
          </div>

          <Button buttonText="Continue" onClickAction={continueToConfig} />

          <IonAlert
            isOpen={showAlert}
            onDidDismiss={() => setShowAlert(false)}
            header="Terms and Conditions not accepted"
            message="Please accept the terms and conditions to continue"
            buttons={["OK"]}
          />
        </IonContent>
      </IonPage>
    );
  }

  // If it's the first launch, return null to skip rendering the entire component
  return null;
};

export default Terms;
