import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView, Platform } from "react-native";

const AppGradient = ({
  children,
  colors,
}: {
  children: any;
  colors: string[];
}) => {
  return (
    <LinearGradient colors={colors} className="flex-1">
      <SafeAreaView
        style={{ paddingTop: Platform.OS === "android" ? 65 : 0 }}
        className="flex-1 px-5 py-3"
      >
        {children}
      </SafeAreaView>
    </LinearGradient>
  );
};

export default AppGradient;
