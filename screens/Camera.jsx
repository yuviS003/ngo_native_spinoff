import React, { useState, useRef, useEffect } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { Camera } from "expo-camera";

const CameraScreen = () => {
  const [hasPermission, setHasPermission] = useState(null);
  const [photoUri, setPhotoUri] = useState(null);
  const cameraRef = useRef(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const takePicture = async () => {
    if (cameraRef.current) {
      const { uri } = await cameraRef.current.takePictureAsync();
      setPhotoUri(uri);
    }
  };

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  if (photoUri) {
    return (
      <View style={{ flex: 1 }}>
        <Image source={{ uri: photoUri }} style={{ flex: 1 }} />
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <Camera
        style={{ flex: 1 }}
        type={Camera.Constants.Type.back}
        ref={cameraRef}
      >
        <View
          style={{ flex: 1, justifyContent: "flex-end", alignItems: "center" }}
        >
          <TouchableOpacity
            style={{
              width: 70,
              height: 70,
              backgroundColor: "white",
              borderRadius: 35,
            }}
            onPress={takePicture}
          />
        </View>
      </Camera>
    </View>
  );
};

export default CameraScreen;
