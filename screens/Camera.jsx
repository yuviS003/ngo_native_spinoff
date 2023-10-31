import { StyleSheet, Text, View, SafeAreaView, Image } from "react-native";
import { useEffect, useRef, useState } from "react";
import { Camera } from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import { useAppContext } from "../context/AppContext";
import { TouchableOpacity } from "react-native";
import { Button } from "react-native-paper";

export default function CameraScreen({ navigation }) {
  let cameraRef = useRef();
  const [hasCameraPermission, setHasCameraPermission] = useState();
  const [hasMediaLibraryPermission, setHasMediaLibraryPermission] = useState();
  const [photo, setPhoto] = useState();
  const { state, dispatch } = useAppContext(); // Access the context and state

  useEffect(() => {
    (async () => {
      const cameraPermission = await Camera.requestCameraPermissionsAsync();
      const mediaLibraryPermission =
        await MediaLibrary.requestPermissionsAsync();
      setHasCameraPermission(cameraPermission.status === "granted");
      setHasMediaLibraryPermission(mediaLibraryPermission.status === "granted");
    })();
  }, []);

  if (hasCameraPermission === undefined) {
    return <Text>Requesting permissions...</Text>;
  } else if (!hasCameraPermission) {
    return (
      <Text>
        Permission for camera not granted. Please change this in settings.
      </Text>
    );
  }

  let takePic = async () => {
    let options = {
      quality: 1,
      base64: true,
      exif: false,
    };

    let newPhoto = await cameraRef.current.takePictureAsync(options);
    setPhoto(newPhoto);
  };

  if (photo) {
    let savePhoto = () => {
      // MediaLibrary.saveToLibraryAsync(photo.uri).then(() => {
      //   setPhoto(undefined);
      // });
      console.log(photo);
      // You can update the photo variable in your context like this
      dispatch({ type: "UPDATE_PHOTO", payload: photo.base64 });
      navigation.navigate("createDogStrl");
    };

    return (
      <SafeAreaView style={styles.container}>
        <Image
          style={styles.preview}
          source={{ uri: "data:image/jpg;base64," + photo.base64 }}
        />
        <View
          style={{
            flexDirection: "row",
            gap: 40,
            marginTop: -80,
            height: 80,
            alignItems: "center",
          }}
        >
          <Button
            mode="text"
            onPress={savePhoto}
            labelStyle={{ fontSize: 20, color: "white", fontWeight: "800" }}
          >
            Save
          </Button>
          <Button
            mode="text"
            onPress={() => setPhoto(undefined)}
            labelStyle={{ fontSize: 20, color: "white", fontWeight: "800" }}
          >
            Discard
          </Button>
        </View>
      </SafeAreaView>
    );
  }
  return (
    <View style={{ flex: 1 }}>
      <Camera
        style={{ flex: 1 }}
        // type={Camera.Constants.Type.back}
        ref={cameraRef}
      >
        <View
          style={{
            flex: 1,
            justifyContent: "flex-end",
            alignItems: "center",
            marginBottom: 40,
          }}
        >
          <TouchableOpacity
            style={{
              width: 70,
              height: 70,
              backgroundColor: "white",
              borderRadius: 35,
            }}
            activeOpacity={0.6}
            onPress={takePic}
          />
        </View>
      </Camera>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonContainer: {
    backgroundColor: "#fff",
    alignSelf: "flex-end",
  },
  preview: {
    alignSelf: "stretch",
    flex: 1,
  },
});
