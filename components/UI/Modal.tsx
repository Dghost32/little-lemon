import { PropsWithChildren, useEffect } from "react";
import { Modal, StyleSheet, ModalProps, Keyboard } from "react-native";
import { ThemedView } from "@/components/ThemedView";

type Props = ModalProps &
  PropsWithChildren<{
    handleClose: () => void;
  }>;

export default function ThemedModal({
  visible,
  handleClose,
  children,
  animationType = "slide",
  transparent = true,
  ...rest
}: Props) {
  useEffect(() => {
    if( Keyboard.isVisible()) {

    }
  });
  return (
    <Modal
      animationType={animationType}
      transparent={transparent}
      visible={visible}
      onRequestClose={handleClose}
      {...rest}
    >
      <ThemedView style={styles.centeredView}>
        <ThemedView style={styles.modalView}>{children}</ThemedView>
      </ThemedView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    marginTop: 22,
    flex: 1,
    justifyContent: "center",
    backgroundColor: "transparent",
  },
  modalView: {
    margin: 16,
    borderRadius: 10,
    padding: 35,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});
