import Screen from "@/components/Screen";
import Header from "@/components/UI/Header";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import ProfileForm from "./profileForm";
import { ThemedView } from "@/components/ThemedView";

const ProfileScreen = () => {
  return (
    <Screen>
      <KeyboardAwareScrollView keyboardShouldPersistTaps="never">
        <Header/>
        <ProfileForm />
      </KeyboardAwareScrollView>
    </Screen>
  );
};

export default ProfileScreen;
