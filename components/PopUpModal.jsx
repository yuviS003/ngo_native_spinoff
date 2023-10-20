import { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  StyleSheet,
  Animated,
  Image,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import dogImg from "../assets/dogImg.png";
import catImg from "../assets/catImg.png";

const PopUpModal = ({ visible, onClose }) => {
  const [fadeAnim] = useState(new Animated.Value(0));

  // Function to handle modal visibility and fade-in animation
  const handleModalVisibility = (isVisible) => {
    if (isVisible) {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 150,
        useNativeDriver: false, // This is required for the Animated API to work in React Native
      }).start();
    } else {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 150,
        useNativeDriver: false,
      }).start(() => onClose()); // Close the modal after the fade-out animation
    }
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onShow={() => handleModalVisibility(true)}
      onDismiss={() => handleModalVisibility(false)}
    >
      <View style={styles.modalBackground}>
        <Animated.View
          style={[
            styles.modalContainer,
            { opacity: fadeAnim },
            {
              transform: [
                {
                  translateY: fadeAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [200, 0],
                  }),
                },
              ],
            },
          ]}
        >
          <View style={styles.headerContainer}>
            <TouchableOpacity onPress={() => handleModalVisibility(false)}>
              <Icon name="arrow-left" size={20} />
            </TouchableOpacity>
            <Text style={styles.headerText}>Choose animal type</Text>
          </View>
          <View style={styles.selectBox}>
            <TouchableOpacity>
              <Image
                source={dogImg}
                style={{ height: 200, width: 160, objectFit: "scale-down" }}
              />
            </TouchableOpacity>
            <TouchableOpacity>
              <Image
                source={catImg}
                style={{ height: 200, width: 150, objectFit: "scale-down" }}
              />
            </TouchableOpacity>
          </View>
        </Animated.View>
      </View>
    </Modal>
  );
};

export default PopUpModal;

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  modalContainer: {
    width: "100%",
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    borderBottomEndRadius: 0,
  },
  headerContainer: {
    flexDirection: "row",
    gap: 15,
    alignItems: "center",
  },
  headerText: {
    fontSize: 30,
    fontWeight: "800",
  },
  selectBox: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 35,
    marginTop: 30,
    marginBottom: 20,
  },
});
