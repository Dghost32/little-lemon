import React from "react";
import HomeScreen from "./(home)";
import ExploreScreen from "./explore";
import OnboardingScreen from "./onboarding";
import { createStackNavigator } from "@react-navigation/stack";
import Loading from "@/components/UI/Loading";
import ProfileScreen from "./profile";
import useAuth from "@/contexts/auth/useAuth";

const Stack = createStackNavigator();

export default function ScreensLayout() {
  const { user, loading } = useAuth();

  if (loading) {
    return <Loading />;
  }

  if (!user?.username)
    return (
      <Stack.Navigator
        initialRouteName="Onboarding"
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Onboarding" component={OnboardingScreen} />
      </Stack.Navigator>
    );

  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Explore" component={ExploreScreen} />
      <Stack.Screen name="Profile" component={ProfileScreen} />
    </Stack.Navigator>
  );
}
