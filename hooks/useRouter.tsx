import RootStackParamList from "@/types/rootStackParamList";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

const useRouter = () => useNavigation<StackNavigationProp<RootStackParamList>>()

export default useRouter;
