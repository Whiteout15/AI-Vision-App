import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ElementRef, ViewChild, OnDestroy } from '@angular/core';

import { IonicModule } from '@ionic/angular';

import { Category, DrawingUtils, FaceLandmarker, FilesetResolver } from '@mediapipe/tasks-vision';
import * as vision from '@mediapipe/tasks-vision';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonicModule],
})
export class HomePage implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('webcam') webcamElement!: ElementRef<HTMLVideoElement>;
  @ViewChild('outputCanvas') canvasElement!: ElementRef<HTMLCanvasElement>;

  private faceLandmarker: any;
  private runningMode: 'IMAGE' | 'VIDEO' = 'VIDEO';
  private webcamRunning: boolean = false;
  private videoWidth: number = 480;
  private knownDistanceInches: number = 12;
  private knownDistanceMm: number = this.knownDistanceInches * 25.4;
  private knownWidthMm: number = 63;
  private focalLengthPixels: number = 0.78;
  private lastVideoTime: number = -1;
  private results: any;
  private drawingUtils: any;

  constructor() {}

  async ngOnInit() {
    await this.createFaceLandmarker();
  }
  async ngAfterViewInit() {
    // This is where you would initialize the webcam, if necessary
  }
  ngOnDestroy() {
    // Clean up: stop the webcam stream
    if (this.webcamElement.nativeElement.srcObject) {
      const tracks = (this.webcamElement.nativeElement.srcObject as MediaStream).getTracks();
      tracks.forEach(track => track.stop());
    }
  }
  // ML Model and properties (WASM & Model provided by Google, you can place your own).
  async createFaceLandmarker() {
    const { FaceLandmarker, FilesetResolver } = vision;
    const filesetResolver = await FilesetResolver.forVisionTasks(
      'https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.3/wasm'
    );
    this.faceLandmarker = await FaceLandmarker.createFromOptions(filesetResolver, {
      baseOptions: {
        modelAssetPath: 'https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/1/face_landmarker.task',
        delegate: 'GPU',
      },
      outputFaceBlendshapes: true,
      runningMode: this.runningMode,
      numFaces: 1,
    });
  }

  hasGetUserMedia() {
    return !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia);
  }

  enableCam() {
    if (!this.faceLandmarker) {
      console.log('Wait! faceLandmarker not loaded yet.');
      return;
    }
    this.webcamRunning = !this.webcamRunning;

    if (this.webcamRunning) {
      const constraints = {
        video: true,
      };
      navigator.mediaDevices.getUserMedia(constraints).then((stream) => {
        const video: HTMLVideoElement = this.webcamElement.nativeElement;
        video.srcObject = stream;
        video.addEventListener('loadeddata', () => this.predictWebcam());
      });
    }
  }

  calculatePixelDistance(x1: number, y1: number, x2: number, y2: number): number {
    return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
  }

  async predictWebcam() {
    const video: HTMLVideoElement = this.webcamElement.nativeElement;
    const canvas: HTMLCanvasElement = this.canvasElement.nativeElement;
    const canvasCtx = this.canvasElement.nativeElement.getContext('2d');
    if (!canvasCtx) {
      console.error('Unable to get canvas context');
      return;
    }
    this.drawingUtils = new vision.DrawingUtils(canvasCtx);
    
    if (!video) {
      return;
    }

    const maxWidth = Math.min(window.innerWidth, 640);
    const ratio = video.videoHeight / video.videoWidth;
    video.style.width = `${maxWidth}px`;
    video.style.height = `${maxWidth * ratio}px`;
    canvas.width = maxWidth;
    canvas.height = maxWidth * ratio;

    if (this.runningMode === 'IMAGE') {
      this.runningMode = 'VIDEO';
      await this.faceLandmarker.setOptions({ runningMode: this.runningMode });
    }

    const startTimeMs = performance.now();
    if (this.lastVideoTime !== video.currentTime) {
      this.lastVideoTime = video.currentTime;
      this.results = await this.faceLandmarker.detectForVideo(video, startTimeMs);
    }

    if (this.results && this.results.faceLandmarks) {
      for (const landmarks of this.results.faceLandmarks) {
        // Draw the landmarks onto the canvas
        this.drawingUtils.drawConnectors(
          canvasCtx, landmarks, vision.FaceLandmarker.FACE_LANDMARKS_TESSELATION,
          { color: '#C0C0C070', lineWidth: 2 }
        );
        try {
          const pointLeft = landmarks[468]; // Left eye keypoint
          const pointRight = landmarks[473]; // Right eye keypoint
          const pixelDistanceBetweenEyes = this.calculatePixelDistance(
            pointLeft.x, pointLeft.y,
            pointRight.x, pointRight.y
          );

          const distanceFromWebcamMm = (this.focalLengthPixels * this.knownWidthMm) / pixelDistanceBetweenEyes;
          const distanceFromWebcamInches = distanceFromWebcamMm / 25.4;

          canvasCtx.clearRect(0, 0, canvas.width, 50); // Clear the area where we will display the text
          canvasCtx.font = '30px Arial';
          canvasCtx.fillStyle = 'Purple';
          canvasCtx.fillText(`Distance: ${distanceFromWebcamInches.toFixed(2)} inches`, 10, 30);

          console.log(`Distance from camera: ${distanceFromWebcamInches.toFixed(2)} inches`);
        } catch (error) {
          console.error("Error calculating distance: ", error);
        }
      }
    }
    // Continue the loop
    if (this.webcamRunning) {
      requestAnimationFrame(() => this.predictWebcam());
    }
  }
}