import React, { useEffect, useState } from "react";
import {
  FilesetResolver,
  FaceDetector,
  Detection,
} from "@mediapipe/tasks-vision";

const PreTest: React.FC = () => {
  const [faceDetector, setFaceDetector] = useState<FaceDetector | null>(null);
  const [runningMode, setRunningMode] = useState<string>("IMAGE");
  const [video, setVideo] = useState<HTMLVideoElement | null>(null);
  const [children, setChildren] = useState<JSX.Element[]>([]);
  const [enableWebcamButton, setEnableWebcamButton] = useState<boolean>(true);

  useEffect(() => {
    const initializeFaceDetector = async () => {
      const vision = await FilesetResolver.forVisionTasks(
        "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.0/wasm"
      );
      const detector = await FaceDetector.createFromOptions(vision, {
        baseOptions: {
          modelAssetPath:
            "https://storage.googleapis.com/mediapipe-models/face_detector/blaze_face_short_range/float16/1/blaze_face_short_range.tflite",
          delegate: "GPU",
        },
        runningMode: runningMode,
      });
      setFaceDetector(detector);
    };

    initializeFaceDetector();
  }, [runningMode]);

  const hasGetUserMedia = () => !!navigator.mediaDevices?.getUserMedia;

  const enableCam = async () => {
    if (!faceDetector) {
      alert("Face Detector is still loading. Please try again..");
      return;
    }

    setEnableWebcamButton(false);

    const constraints = {
      video: true,
    };

    try {
      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      if (video) {
        video.srcObject = stream;
        video.addEventListener("loadeddata", predictWebcam);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const predictWebcam = () => {
    if (runningMode === "IMAGE" && faceDetector) {
      setRunningMode("VIDEO");
      faceDetector.setOptions({ runningMode: "VIDEO" });
    }

    if (video && video.currentTime !== -1) {
      const startTimeMs = performance.now();
      if (faceDetector) {
        const detections = faceDetector.detectForVideo(
          video,
          startTimeMs
        ).detections;
        displayVideoDetections(detections);
      }
    }

    window.requestAnimationFrame(predictWebcam);
  };

  const displayVideoDetections = (detections: Detection[]) => {
    const newChildren: JSX.Element[] = [];
    for (let detection of detections) {
      const confidence =
        Math.round(parseFloat(detection.categories[0].score) * 100) + "%";
      const left = video
        ? video.offsetWidth -
          detection.boundingBox.width -
          detection.boundingBox.originX +
          "px"
        : "0px";
      const top = detection.boundingBox.originY - 30 + "px";
      const width = detection.boundingBox.width - 10 + "px";

      const highlighterStyle = {
        left: left,
        top: detection.boundingBox.originY + "px",
        width: width,
        height: detection.boundingBox.height + "px",
      };

      const textStyle = {
        left: left,
        top: top,
        width: width,
      };

      newChildren.push(
        <div className="highlighter" style={highlighterStyle}></div>,
        <p className="info" style={textStyle}>
          Confidence: {confidence}
        </p>
      );

      for (let keypoint of detection.keypoints) {
        const keypointStyle = {
          top: keypoint.y * video?.offsetHeight - 3 + "px",
          left:
            video?.offsetWidth -
            keypoint.x * (video?.offsetWidth || 0) -
            3 +
            "px",
        };
        newChildren.push(
          <span className="key-point" style={keypointStyle}></span>
        );
      }
    }

    setChildren(newChildren);
  };

  return (
    <div className="App">
      <h1>Face detection using MediaPipe Face Detector task</h1>

      <section id="demos" className="invisible">
        {/* ... */}
      </section>

      <button
        id="webcamButton"
        className={`mdc-button mdc-button--raised ${
          enableWebcamButton ? "" : "removed"
        }`}
        onClick={enableCam}
      >
        <span className="mdc-button__ripple"></span>
        <span className="mdc-button__label">ENABLE WEBCAM</span>
      </button>

      <video
        id="webcam"
        autoPlay
        playsInline
        ref={(el) => setVideo(el)}
      ></video>
      <div id="liveView" className="videoView">
        {children}
      </div>
    </div>
  );
};

export default PreTest;
