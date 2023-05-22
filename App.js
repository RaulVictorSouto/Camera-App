import React, {useEffect, useState, useRef} from 'react';
import { View, StyleSheet, Button, TouchableOpacity, Text, Image} from 'react-native';
import {Camera, useCameraDevices} from 'react-native-vision-camera';

function App() {

  const camera = useRef<Camera>(null);
  const devices = useCameraDevices();
  const device = devices.back;

  const [showCamera, setShowCamera] = useState(false);
  const [imageSource, setImageSource] = useState('');

  useEffect(() => {
    async function getPermission(){
      const newCameraPermission = await
    Camera.requestCameraPermission();
    console.log(newCameraPermission);
    }
    getPermission();
  }, []);

  async function capturePhoto(){
    if (camera.current !== null){
    const photo = await camera.current.take({});
    setImageSource(photo.path);
    setShowCamera(false);
    console.log(photo.path);
    }
  }

  if(device == null){
    return <Text>Camera not available</Text>
  }

  return(
    <View style = {StyleSheet.container}>
      {showCamera ? (
        <>
          <Camera
            ref={camera}
            style={StyleSheet.absoluteFill}
            devide = {device}
            isActive = {showCamera}
            photo = {true}
          />

          <View style = {StyleSheet.buttonContainer}>
            <TouchableOpacity
              style={StyleSheet.camButton}
              onPress = {() => capturePhoto()}
            />
          </View>
        </>
      ) : (
        <>
          <Button title = "Launch Camera" onPress = {() =>
          setShowCamera(true)}/>
          {imageSource !== ''? (
            <Image
              style = {StyleSheet.image}
              source = {{
                uri: `file://'${imageSource}`,
              }}
            />
          ) : null}
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: 'gray',
  },
  buttonContainer: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    bottom: 0,
    padding: 20,
  },
  camButton: {
    height: 80,
    width: 80,
    borderRadius: 40,
    backgroundColor: 'white',
    alignSelf: 'center',
  },
  image: {
    width: '100%',
    height: 'auto',
    aspectRatio: 9 / 16,
  },
});

export default App;
