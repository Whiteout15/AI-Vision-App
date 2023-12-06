import React, { useState, useEffect } from "react";
import { IonPage, IonContent, IonButton } from "@ionic/react";
import Header from "../components/Header/Header";

const VoiceTest: React.FC = () => {
  const [recognition, setRecognition] = useState(null);
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("Say a letter or a number...");

  useEffect(() => {
    if ("webkitSpeechRecognition" in window) {
      const webkitRecognition = new window.webkitSpeechRecognition();
      const speechRecognitionList = new window.webkitSpeechGrammarList();
      const grammar =
        "#JSGF V1.0; grammar lettersAndNumbers; public <letterOrNumber> = (A | B | C | D | ... | Z | 0 | 1 | 2 | ... | 9);";
      speechRecognitionList.addFromString(grammar, 1);

      webkitRecognition.grammars = speechRecognitionList;
      webkitRecognition.maxAlternatives = 1;
      webkitRecognition.continuous = true;
      webkitRecognition.interimResults = true;
      webkitRecognition.lang = "en-US";

      webkitRecognition.onresult = (event) => {
        // Loop through all the results in the event
        for (let i = event.resultIndex; i < event.results.length; ++i) {
          // Check if the current result is final or interim
          if (event.results[i].isFinal) {
            const result = event.results[i][0].transcript.trim().toUpperCase();
            console.log("Final result:", result); // Log final result

            if (result.length === 1 && /[A-Z0-9]/.test(result)) {
              setTranscript(result);
            }
          } else {
            const interimResult = event.results[i][0].transcript
              .trim()
              .toUpperCase();
            console.log("Interim result:", interimResult); // Log interim result
          }
        }
      };

      webkitRecognition.onerror = (event) => {
        console.error("Recognition error:", event.error);
        setTranscript("Error occurred in recognition: " + event.error);
      };

      setRecognition(webkitRecognition);
    } else {
      alert(
        "Your browser does not support the Web Speech API. Please use Chrome or Safari."
      );
    }
  }, []);

  const startListening = () => {
    if (recognition) {
      (recognition as SpeechRecognition).start();
      setIsListening(true);
    }
  };

  const stopListening = () => {
    if (recognition) {
      (recognition as SpeechRecognition).stop();
      setIsListening(false);
    }
  };

  return (
    <IonPage>
      <Header headerText="Speech Recognition" />
      <IonContent fullscreen className="ion-padding">
        <div>
          <h1>Vision Eye Exam</h1>
          <IonButton onClick={startListening} disabled={isListening}>
            Start Speech Recognition
          </IonButton>
          <IonButton onClick={stopListening} disabled={!isListening}>
            Stop Speech Recognition
          </IonButton>
          <p>{isListening ? "Listening..." : "Click Start to speak."}</p>
          <p id="transcript">{transcript}</p>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default VoiceTest;
