import { FaceMesh } from "@mediapipe/face_mesh";

import * as cam from "@mediapipe/camera_utils";
import Webcam from "react-webcam";
import React, { useRef, useEffect } from "react";
import { useHistory } from "react-router-dom";
import "./Pretest.css";

const PreTest: React.FC = () => {
  const history = useHistory();
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);

  var camera = null;
  const connect = window.drawConnectors;

  const knownDistanceInches = 12; // The known distance from the camera in inches
  const knownDistanceMm = knownDistanceInches * 25.4; // Convert inches to mm
  const knownWidthMm = 63; //mm
  const focalLengthPixels: number = 0.78; // Your calculated focal length in pixels

  let distanceFromWebcamInches = 0;

  function calculateDistanceFromWebcam(
    focalLengthPixels: number,
    pixelDistanceBetweenEyes: number,
    knownWidthMm: number
  ) {
    // Calculate the distance from the webcam to the face using the focal length
    return (focalLengthPixels * knownWidthMm) / pixelDistanceBetweenEyes;
  }

  function calculatePixelDistance(
    x1: number,
    y1: number,
    x2: number,
    y2: number
  ) {
    return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
  }

  // This function calculates the distance in mm based on the pixel distance and the known distance
  function calculateDistanceInMm(
    pixelDistance: number,
    knownDistanceInMm: number,
    referencePixelDistance: number
  ) {
    return (pixelDistance * knownDistanceInMm) / referencePixelDistance;
  }

  function calculateEyeDistanceFromWebcam(
    pixelDistanceBetweenEyes: number,
    knownDistanceInMm: number,
    videoWidth: number,
    FOV: number
  ) {
    // Calculate the number of pixels per millimeter
    const pixelsPerMm = pixelDistanceBetweenEyes / knownDistanceInMm;
    // Assuming the video width represents the full FOV, calculate the FOV in mm
    const fovWidthMm = videoWidth / pixelsPerMm;
    // Use trigonometry to estimate the distance from the camera to the face
    // This is a simplification and assumes a flat plane and central positioning
    const distanceFromCameraMm =
      fovWidthMm / 2 / Math.tan((FOV / 2) * (Math.PI / 180));
    return distanceFromCameraMm;
  }

  //setting height and width of the canvas by giving the webcam video height and width
  function onResults(results) {
    canvasRef.current.width = webcamRef.current.video.videoWidth;
    canvasRef.current.height = webcamRef.current.video.videoHeight;

    const canvasElement = canvasRef.current;
    const canvasCtx = canvasElement.getContext("2d");
    canvasCtx.save();

    canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height);
    canvasCtx.drawImage(
      results.image,
      0,
      0,
      canvasElement.width,
      canvasElement.height
    );

    if (results.multiFaceLandmarks) {
      for (const landmarks of results.multiFaceLandmarks) {
        //The commented out code hides the face mesh but can still do calculations.
        //uncomment to see the face mesh

        // connect(canvasCtx, landmarks, Facemesh.FACEMESH_TESSELATION, {
        //   color: "#C0C0C070",
        //   lineWidth: 1,
        // });
        // connect(canvasCtx, landmarks, Facemesh.FACEMESH_RIGHT_EYE, {
        //   color: "#FF3030",
        //   lineWidth: 1,
        // });
        // connect(canvasCtx, landmarks, Facemesh.FACEMESH_RIGHT_EYEBROW, {
        //   color: "#FF3030",
        //   lineWidth: 1,
        // });
        // connect(canvasCtx, landmarks, Facemesh.FACEMESH_LEFT_EYE, {
        //   color: "#30FF30",
        //   lineWidth: 1,
        // });
        // connect(canvasCtx, landmarks, Facemesh.FACEMESH_LEFT_EYEBROW, {
        //   color: "#30FF30",
        //   lineWidth: 1,
        // });
        // connect(canvasCtx, landmarks, Facemesh.FACEMESH_FACE_OVAL, {
        //   color: "#E0E0E0",
        //   lineWidth: 1,
        // });
        // connect(canvasCtx, landmarks, Facemesh.FACEMESH_LIPS, {
        //   color: "#E0E0E0",
        //   lineWidth: 1,
        // });

        try {
          const pointLeft = { x: landmarks[133].x, y: landmarks[246].y }; // Left eye keypoint
          const pointRight = { x: landmarks[263].x, y: landmarks[362].y }; // Right eye keypoint

          const pixelDistanceBetweenEyes = calculatePixelDistance(
            pointLeft.x,
            pointLeft.y,
            pointRight.x,
            pointRight.y
          );
          console.log("pixelDistanceBetweenEyes: ", pixelDistanceBetweenEyes);

          const distanceFromWebcamMm = calculateDistanceFromWebcam(
            focalLengthPixels,
            pixelDistanceBetweenEyes,
            knownWidthMm
          );
          // Convert the distance to inches
          const distanceFromWebcamInches = distanceFromWebcamMm / 25.4;

          canvasCtx.font = "30px Arial";
          canvasCtx.fillStyle = "black";
          canvasCtx.save(); // Save the current state
          canvasCtx.scale(-1, 1); // Flip the context horizontally

          canvasCtx.translate(-canvasElement.width, 0);

          // // Calculate the position for the rectangle and clear it
          const margin = 186; // Margin from the edge
          const rectWidth = 280;
          const rectX = canvasElement.width - rectWidth - margin; // X position for rectangle
          canvasCtx.clearRect(rectX, 0, rectWidth, 40);

          // // Restore the context to draw text in non-mirrored state
          canvasCtx.restore();

          // // Save it again before drawing the text
          canvasCtx.save();

          canvasCtx.fillText(
            `Distance: ${distanceFromWebcamInches.toFixed(0)} inches`,
            188,
            30
          );
          canvasCtx.restore();
          // Log the distance to the console or display it on the page in inches
          // console.log(
          //   `Distance from webcam: ${distanceFromWebcamInches.toFixed(
          //     2
          //   )} inches`
          // );
        } catch (error) {
          console.error("error calculating distance: ", error);
        }
      }
    }
  }

  useEffect(() => {
    const faceMesh = new FaceMesh({
      // The URL string is dynamically
      // created by embedding the file parameter within a base URL: https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh/${file}.
      // The ${file} within the template literal is a placeholder that gets replaced with the actual value of the file parameter when the function is called.
      locateFile: (file) => {
        console.log("Requested file:", file); // Add this line to debug
        return `https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh/${file}`;
      },
    });

    faceMesh.setOptions({
      maxNumFaces: 1,
      // if you are 50% sure there is a face, then draw the connectors.
      //change the number to change the accuracy
      minDetectionConfidence: 0.5,
      minTrackingConfidence: 0.5,
      //selfie mode is for mobile devices. It flips the camera to the front facing camera
      selfieMode: true,
    });

    faceMesh.onResults(onResults);

    if (
      typeof webcamRef.current !== "undefined" &&
      webcamRef.current !== null
    ) {
      camera = new cam.Camera(webcamRef.current.video, {
        onFrame: async () => {
          await faceMesh.send({ image: webcamRef.current.video });
        },
        width: 640,
        height: 480,
      });
      camera.start();
    }
  });

  return (
    <div className="PreTest">
      <Webcam className="webcam" hidden={true} ref={webcamRef} />
      <canvas className="webcam-canvas" ref={canvasRef}></canvas>
    </div>
    
  );
};

export default PreTest;
