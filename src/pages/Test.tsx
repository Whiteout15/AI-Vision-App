import React, { useState, useEffect, useRef } from "react";
import { IonPage, IonContent, IonButton, IonIcon } from "@ionic/react";
import { eyeOutline } from "ionicons/icons";
import * as vision from "@mediapipe/tasks-vision";
import SampleTest from "../components/PreTest";
import { useHistory } from "react-router-dom";
import Header from "../components/Header/Header";
import Button from "../components/Button/Button";
import { useLocation } from "react-router-dom";
import "./Test.css"

interface LocationState {
  testMode?: string;
  // wearGlasses?: string;
  eyeToExamine?: string;
}

const Test: React.FC = () => {
  const location = useLocation<LocationState>();
  const { testMode, eyeToExamine } = location.state || {};
  const history = useHistory();

  const goToSampleTest = () => {
    history.push("/CameraPage", { testMode, eyeToExamine });
  };

  const webcamRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [faceLandmarker, setFaceLandmarker] = useState<any>(null);
  const [webcamRunning, setWebcamRunning] = useState(false);
  const knownDistanceInches = 12; // The known distance from the camera in inches
  const knownDistanceMm = knownDistanceInches * 25.4; // Convert inches to mm
  const knownWidthMm = 63; //mm
  const focalLengthPixels = 0.78;
  // Your calculated focal length in pixels
  // let lastVideoTime = -1;
  // let results = undefined;

  const video = webcamRef.current;
  const canvas = canvasRef.current;

  // Calculate the distance from the webcam to the face using the focal length
  function calculateDistanceFromWebcam(
    focalLengthPixels: number,
    pixelDistanceBetweenEyes: number,
    knownWidthMm: number
  ) {
    // Calculate the distance from the webcam to thsce face using the focal length
    return (focalLengthPixels * knownWidthMm) / pixelDistanceBetweenEyes;
  }

  useEffect(() => {
    createFaceLandmarker();

    // The cleanup function will handle unmounting
    return () => {
      if (webcamRef.current && webcamRef.current.srcObject) {
        const mediaStream = webcamRef.current.srcObject as MediaStream;
        const tracks = mediaStream.getTracks();
        tracks.forEach((track) => track.stop());
      }
    };
  }, []);

  const createFaceLandmarker = async () => {
    const filesetResolver = await vision.FilesetResolver.forVisionTasks(
      "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.3/wasm"
    );
    const newFaceLandmarker = await vision.FaceLandmarker.createFromOptions(
      filesetResolver,
      {
        baseOptions: {
          modelAssetPath:
            "https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/1/face_landmarker.task",
          delegate: "GPU",
        },
        outputFaceBlendshapes: true,
        runningMode: "VIDEO",
        numFaces: 1,
      }
    );
    setFaceLandmarker(newFaceLandmarker);
  };

  const enableCam = () => {
    if (!faceLandmarker) {
      console.log("Wait! faceLandmarker not loaded yet.");
      return;
    }
    setWebcamRunning(!webcamRunning);

    if (!webcamRunning) {
      const constraints = { video: true };
      navigator.mediaDevices.getUserMedia(constraints).then((stream) => {
        const video = webcamRef.current;
        if (video) {
          video.srcObject = stream;
          video.addEventListener("loadeddata", predictWebcam);
        }
      });
    } else {
      // Stop the webcam stream
      if (
        webcamRef.current &&
        webcamRef.current.srcObject instanceof MediaStream
      ) {
        const mediaStream = webcamRef.current.srcObject;
        const tracks = mediaStream.getTracks();
        tracks.forEach((track) => track.stop());
      }
    }
  };

  // const calculatePixelDistance = (
  //   x1: number,
  //   y1: number,
  //   x2: number,
  //   y2: number
  // ): number => {
  //   return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
  // };

  const predictWebcam = async () => {
    const video = webcamRef.current;
    const canvas = canvasRef.current;

    if (!video || !canvas) {
      console.error("Video or canvas element is not available");
      return;
    }

    const canvasCtx = canvas.getContext("2d");
    if (!canvasCtx) {
      console.error("Unable to get canvas context");
      return;
    }

    if (webcamRunning) {
      requestAnimationFrame(predictWebcam);
    }
  };

  return (
    //fix CSS by giving ionPage a class name.  Like the commented out line below
    // <IonPage id="container">

    <IonPage>
      <Header headerText="Instructions"/>
      
      <IonContent fullscreen className="ion-padding" scrollY={false}>
        <div className="instructions-container">
          <p className="instructions-text">
            Hold your face in front of your webcam to get real-time face
            landmarker detection. <br />
            <br />
            Grant access to the webcam if
            prompted. Face should be parallel/level with camera and environment
            should be well lit.{" "}
            <br /><br />
            If you are testing one eye, cover the eye that is not being tested.
            <br /><br />
            Wear glasses if you are looking to see if you need a new prescription.
            <br /><br />
            You will be prompted with five letters at a time. Say the letter and wait for the results.
            <br /><br />
            Ensure you are 14 inches away from the camera for correct testing conditions.
            <br /><br />
          </p>
        </div>
        <Button buttonText="Continue" onClickAction={goToSampleTest}/>
       
        <div id="liveView" className="videoView">
          {/* <IonButton id="webcamButton" onClick={enableCam}>
            {webcamRunning ? "DISABLE WEBCAM" : "ENABLE WEBCAM"}
          </IonButton> */}
          <div style={{ position: "relative" }}>
            <video
              ref={webcamRef}
              style={{ position: "absolute" }}
              autoPlay
              playsInline
            ></video>
            <canvas
              ref={canvasRef}
              className="output_canvas"
              style={{ position: "absolute", left: 0, top: 0 }}
            ></canvas>
          </div>
        </div>
        
      </IonContent>
    </IonPage>
  );
};

export default Test;
