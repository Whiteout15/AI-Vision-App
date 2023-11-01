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


#cam number1, might be different for mobile device with multiple cameras
cap = cv2.VideoCapture(0)       
#FaceDetector creates faceMesh of points with assigned values
detector = FaceMeshDetector(maxFaces=1)


while True:
    #read and assign videostream to sucess and img variables
    sucess, img = cap.read()
#Facenet toggle   #findFaceMesh detects points on a face from camera stream variable img
    img, faces = detector.findFaceMesh(img, draw=True) #if draw=true, shows points detector on face, draw=false removes mesh from camera view
    
    if faces:
        face = faces[0]
        #find left eye reference point (point 145 on faceMesh marks center-bottom left eye)
        pointLeft = face[145]
        #find right eye reference point ()
        pointRight = face[374]
#drawing
        #draw circle on left eye for reference
        cv2.circle(img,pointLeft,5,(255,0,255),cv2.FILLED)
        #draw circle on right eye for reference
        cv2.circle(img,pointRight,5,(255,0,255),cv2.FILLED)
        #draw a line to represent distance between two reference points
        cv2.line(img,pointLeft,pointRight,(0,200,0),2)

        #calculate distance between eye reference points in pixels (active calculation)
        w, _ = detector.findDistance(pointLeft, pointRight)
        #actively print distance as it changes
        #print(w)

#Calculations and calibration        
        #Focal Length Calculation (distance between the eyes), average 62 for women, 64 for men, average 63 for both (mm)
        #represented in cm
        #50cm away from screen to find accurate f value, use this value for distance calculation
        W=6.3
        #d=50
        #f=(w*d)/W
        #print(f)
        
        #f is found from calculating average output when 50cm away from the webcam
        #original code was 840
        #first test found it to be precise teste from 20-150cm, with an consistent accuracy of +5cm from the real measured distance
        f=600
        d= (W*f)/w
        print(d)

        #repersent depth on screen, remove typecast {int(d)} to {d} for decimal value,
        cvzone.putTextRect(img,f'Depth: {int(d)}cm',
                           (face[10][0]-100, face[10][1]-50), #sets location of distance tag
                           scale=2)                             #sets scale of distance representation


    #Show camera feed in window called image
    cv2.imshow("Image",img)
    cv2.waitKey(1)
