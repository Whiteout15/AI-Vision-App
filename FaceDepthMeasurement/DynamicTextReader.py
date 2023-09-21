#f = (w*d)/W
#d = (W*f)/w
#finding focal length (f) allows us to find distance (d)
#f = focal length
#w = width in pixels
#d = distance in cm
#W = width in cm
#average distance between eyes 63, object of contrast for webcam focal point 

import cv2
import cvzone
from cvzone.FaceMeshModule import FaceMeshDetector
import numpy as np

#cam number1, might be different for mobile device with multiple cameras
cap = cv2.VideoCapture(0)       
#FaceDetector creates faceMesh of points with assigned values
detector = FaceMeshDetector(maxFaces=1)

#text display in stacked image with dynamic resizing
textList = ["Welcome to ", "SCRUMptious Vision Test",
               "Would you like to test your vision?",
               " Do you wear Glasses?"]

sen = 10 #greater number is less sensitive with less shaking and slower resizing

while True:
    #read and assign videostream to sucess and img variables
    sucess, img = cap.read()
    imgText = np.zeros_like(img)

#Facenet toggle   #findFaceMesh detects points on a face from camera stream variable img
    img, faces = detector.findFaceMesh(img, draw=False) #if draw=true, shows points detector on face, draw=false removes mesh from camera view
    
    if faces:
        face = faces[0]
        #find left eye reference point (point 145 on faceMesh marks center-bottom left eye)
        pointLeft = face[145]
        #find right eye reference point ()
        pointRight = face[374]

        #calculate distance between eye reference points in pixels (active calculation)
        w, _ = detector.findDistance(pointLeft, pointRight)
        #actively print distance as it changes
        #print(w)

#Calculations and calibration        
        #f is found from calculating average output when 50cm away from the webcam
        #original code was 840
        #first test found it to be precise teste from 20-150cm, with an consistent accuracy of +5cm from the real measured distance
        W=6.3
        f=600
        d= (W*f)/w
        print(d)

        #repersent depth on screen, remove {int(d)} to {d} for decimal value,
        cvzone.putTextRect(img,f'Depth: {int(d)}cm',
                           (face[10][0]-100, face[10][1]-50), #sets location of distance tag
                           scale=2)                             #sets scale of distance representation


#Increase and decrease text variable based on distance from screen(works for sound output as well as on-screen text)
        for i, text in enumerate(textList):    #enumerate provides i'th value per iteration for use in function below
            singleHeight = 20 +int((int(d/sen)*sen)/4)  #changes gaps between letters, lower number is quicker resizing
            scale = 0.4 + int(d/sen)*sen/75#lower number is quicker resizing #dynamic scaling of text, minimum size plus some value based on change in user distance, in this case distance/100. #int(d/10)*10 only allowsincrements of 0.1 so no shaking. bigger divisor = less shaking
            #Text properties, height, font, color
            cv2.putText(imgText, text, (50,50+(i*singleHeight)),    #change imgText to img for text on same screen
                        cv2.FONT_ITALIC,
                        scale,  #scale
                        (255,255,255), #color
                        2)  #thickness

    #sstack images in camera iamge window so both images are in one window
    imgStacked = cvzone.stackImages([img,imgText],2,1)
    

    #Show camera feed in window called image
    cv2.imshow("Image",imgStacked)
    cv2.waitKey(1)
