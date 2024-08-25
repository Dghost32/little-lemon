import Input from "@/components/Form/Input";
import ProfilePicture from "@/components/Profile/ProfilePicture";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import Button from "@/components/UI/Button";
import useAuth from "@/contexts/auth/useAuth";
import useForm from "@/hooks/useForm";
import { useThemeColor } from "@/hooks/useThemeColor";
import BouncyCheckbox from "react-native-bouncy-checkbox";

const ProfileForm = () => {
  const { user, changeUser, updateUserField, logout } = useAuth();
  const color = useThemeColor({}, "text");
  const secondary = useThemeColor({}, "secondary");
  const { values, handleChange, clear } = useForm({
    defaultValues: {
      username: {
        value: user?.username || "",
        error: false,
        optional: false,
        label: "Name",
        placeholder: "Name",
        keyboardType: "default",
        autoComplete: "name",
      },
      lastName: {
        value: user?.lastName || "",
        error: false,
        optional: false,
        label: "Last Name",
        placeholder: "Last Name",
        keyboardType: "default",
        autoComplete: "name",
      },
      email: {
        value: user?.email || "",
        error: false,
        optional: false,
        label: "Email",
        placeholder: "Email",
        keyboardType: "email-address",
        autoComplete: "email",
      },
      phoneNumber: {
        value: user?.phoneNumber || "",
        error: false,
        optional: false,
        label: "Phone Number",
        placeholder: "Phone Number",
        keyboardType: "phone-pad",
        autoComplete: "tel",
      },
    },
  });

  const {
    values: notifyValues,
    handleChange: handleNotifyValuesChange,
    clear: clearNotifyValues,
  } = useForm<Boolean>({
    defaultValues: {
      orders: {
        value: user?.notify?.orders ?? false,
        error: false,
        optional: false,
        label: "Orders",
        placeholder: "Orders",
        keyboardType: "default",
        autoComplete: "name",
      },
      password: {
        value: user?.notify?.password ?? false,
        error: false,
        optional: false,
        label: "Passwords",
        placeholder: "Passwords",
        keyboardType: "default",
        autoComplete: "name",
      },
      offers: {
        value: user?.notify?.offers ?? false,
        error: false,
        optional: false,
        label: "Offers",
        placeholder: "Offers",
        keyboardType: "default",
        autoComplete: "name",
      },
      newsletters: {
        value: user?.notify?.newsletters ?? false,
        error: false,
        optional: false,
        label: "Newsletters",
        placeholder: "Newsletters",
        keyboardType: "default",
        autoComplete: "name",
      },
    },
  });

  function save() {
    let newUser = {
      ...user,
      ...Object.fromEntries(
        Object.entries(values).map(([key, value]) => [key, value.value]),
      ),
      notify: Object.fromEntries(
        Object.entries(notifyValues).map(([key, value]) => [key, value.value]),
      ),
    } as typeof user;

    if (newUser) changeUser(newUser);

    alert("Saved!");
  }

  function discard() {
    clear();
    clearNotifyValues();
  }

  return (
    <ThemedView style={{ gap: 16 }}>
      <ThemedText type="subtitle">Personal Information</ThemedText>
      <ThemedText type="defaultSemiBold">Avatar</ThemedText>
      <ThemedView
        style={{
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 8,
        }}
      >
        <ProfilePicture />
        <ThemedText
          type="captionSemiBold"
          style={{
            textAlign: "center",
            color: user?.profilePicture ? secondary : color,
          }}
          onPress={() => {
            if (user?.profilePicture) {
              updateUserField("profilePicture", "");
            }
          }}
        >
          {!user?.profilePicture && "Hint: Click the avatar to change it!"}
          {user?.profilePicture && "Clear Avatar"}
        </ThemedText>
      </ThemedView>
      {Object.entries(values).map(([key, value], index) => (
        <ThemedView key={`${key}-${index}`}>
          <ThemedText type="defaultSemiBold">{value.label}</ThemedText>
          <Input
            key={key}
            value={value.value}
            error={value.error}
            placeholder={value.placeholder}
            keyboardType={value.keyboardType}
            autoComplete={value.autoComplete as any}
            onChangeText={(text) => handleChange(key, text)}
            placeholderTextColor={color}
          />
        </ThemedView>
      ))}

      <ThemedText type="subtitle">Email notifications</ThemedText>

      {Object.entries(notifyValues).map(([key, value], index) => (
        <ThemedView key={`${key}-${index}`}>
          <BouncyCheckbox
            key={key}
            isChecked={value.value === true}
            text={value.label}
            textStyle={{ color: color, textDecorationLine: "none" }}
            fillColor={color}
            onPress={(value) => {
              handleNotifyValuesChange(key, value);
            }}
          />
        </ThemedView>
      ))}

      <ThemedView
        style={{
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "space-around",
          alignItems: "center",
          gap: 16,
        }}
      >
        <Button
          type="primary"
          text="Save changes"
          onPress={save}
          style={{
            width: "95%",
            maxWidth: 600,
          }}
        />
        <Button
          type="primary"
          text="Discard changes"
          onPress={discard}
          style={{
            width: "95%",
            maxWidth: 600,
          }}
        />
        <Button
          type="danger"
          text="Logout"
          onPress={logout}
          style={{
            width: "95%",
            maxWidth: 600,
          }}
        />
      </ThemedView>
    </ThemedView>
  );
};

export default ProfileForm;
