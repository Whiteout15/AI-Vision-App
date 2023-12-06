import { Redirect, Route } from "react-router-dom";
import { IonApp, IonRouterOutlet, setupIonicReact } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import Home from "./pages/Home";
import Terms from "./pages/Terms";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */
import "./theme/variables.css";
import TestConfig from "./pages/TestConfig";
import Test from "./pages/Test";
import Sample from "./components/PreTest";
import SampleTest from "./components/PreTest";
import PreTest from "./components/PreTest";
import CameraPage from "./pages/CameraPage";
import VisionTest from "./pages/VisionTest";
import Results from "./pages/Results";
import VoiceTest from "./pages/VoiceTest";

setupIonicReact();

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonRouterOutlet>
        <Route exact path="/home">
          <Home />
        </Route>
        <Route exact path="/">
          <Redirect to="/home" />
        </Route>
        <Route path="/Terms" component={Terms} exact />
        <Route path="/TestConfig" component={TestConfig} exact />
        <Route path="/Test" component={Test} exact />
        <Route path="/CameraPage" component={CameraPage} exact />
        <Route path="/VisionTest" component={VisionTest} exact />
        <Route path="/Results" component={Results} exact />
        <Route path="/VoiceTest" component={VoiceTest} exact />
      </IonRouterOutlet>
    </IonReactRouter>
  </IonApp>
);

export default App;
