import { useThemeColor } from "@/hooks/useThemeColor";
import { MediaTypeOptions, launchImageLibraryAsync } from "expo-image-picker";
import { ThemedView } from "@/components/ThemedView";
import { Image } from "expo-image";
import Icon from "@/components/UI/Icon";
import useAuth from "@/contexts/auth/useAuth";

const ProfilePicture = () => {
  const { user, updateUserField } = useAuth();

  const color = useThemeColor({}, "text");

  const pickImage = async () => {
    let result = await launchImageLibraryAsync({
      mediaTypes: MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      updateUserField("profilePicture", result.assets[0].uri);
    }
  };

  return (
    <ThemedView
      style={{
        flexDirection: "row",
        gap: 10,
      }}
    >
      <ThemedView
        onTouchEnd={pickImage}
        style={{
          width: 150,
          height: 150,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "lightgray",
          borderRadius: 100,
          borderColor: color,
          borderWidth: 5,
        }}
      >
        {user?.profilePicture  ? (
          <Image
            source={user.profilePicture}
            contentFit="cover"
            transition={500}
            style={{
              width: "100%",
              height: "100%",
              borderRadius: 100,
              borderColor: color,
            }}
          />
        ) : (
          <Icon
            name="user"
            size={52}
            onPress={() => {
              console.log("pressed");
            }}
            style={{ color }}
          />
        )}
      </ThemedView>
    </ThemedView>
  );
};

export default ProfilePicture;
