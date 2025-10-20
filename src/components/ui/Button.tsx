import Colors from "@/constants/theme/Colors";
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    TouchableOpacityProps,
} from "react-native";

type Props = TouchableOpacityProps & {
  title: string;
};

export default function MyButton({ title, ...rest }: Props) {
  return (
    <TouchableOpacity style={styles.button} activeOpacity={0.7} {...rest}>
      <Text style={styles.label}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  label: {
    color: Colors.primary.gray100,
  },
  button: {
    backgroundColor: Colors.primary.tint,
    padding: 10,
    borderRadius: 8,
    alignItems: "center",
    color: Colors.primary.white,
  },
});
