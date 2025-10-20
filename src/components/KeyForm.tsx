import Colors from "@/constants/theme/Colors";
import { KeysLocalService } from "@/services/KeysLocalService";
import { KeyFormData, keySchema } from "@/types/KeysSchema";
import { Feather } from "@expo/vector-icons";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, Resolver, useForm } from "react-hook-form";
import {
  Alert,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import 'react-native-get-random-values';
import { v4 as uuidv4 } from "uuid";
import MyButton from "./ui/Button";

interface KeyFormProps {
  modalVisible: boolean;
  setModalVisible: (visible: boolean) => void;
}

export default function KeyForm() {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<KeyFormData>({
    resolver: zodResolver(keySchema) as Resolver<KeyFormData>,
    defaultValues: {
      id: uuidv4(),
      key: [""],
      value: "",
      secret: false,
    },
  });

  const onSubmit = async (data: KeyFormData) => {
    try {
      await KeysLocalService.saveKeys({
        id: data.id,
        key: data.key,
        value: data.value,
        secret: data.secret,
      });
      Alert.alert(
        "Deseja Salvar?",
        `Chaves: ${data.key.join(", ")}\nValor: ${data.value}`,
        [
          {
            text: "Cancel",
            style: "cancel",
            onPress: () => {
              console.log("Cancel Pressed");
            },
          },
          {
            text: "OK",
            onPress: () => {
              console.log("Form Data:", data);
              reset();
            },
          },
        ]
      );
    } catch (error) {
      throw `Não foi possível salvar a chave: ${error}`;
    }

    return;
  };

  return (
    <View
      style={{
        gap: 10,
        padding: 10,
      }}
    >
      {/* KEY */}
      <Text style={styles.label}>Chaves</Text>
      <Controller
        control={control}
        name="key"
        render={({ field: { onChange, value } }) => (
          <View style={{ gap: 6 }}>
            {value.map((k, i) => (
              <View key={`key-input-${i}`} style={styles.inputContainer}>
                <TextInput
                  placeholder={`Chave: ${i + 1}`}
                  value={k}
                  onChangeText={(text) => {
                    const updated = [...value];
                    updated[i] = text;
                    onChange(updated);
                  }}
                  style={[styles.input, { flex: 1 }]}
                />
                {value.length > 1 && (
                  <TouchableOpacity
                    onPress={() => {
                      const updated = value.filter((_, index) => index !== i);
                      onChange(updated);
                    }}
                    style={styles.removeButton}
                  >
                    <Feather name="x" size={20} color={Colors.primary.tint} />
                  </TouchableOpacity>
                )}
              </View>
            ))}
            <MyButton
              title="Adicionar chave"
              onPress={() => onChange([...value, ""])}
            />
          </View>
        )}
      />
      {errors.key && (
        <Text style={{ color: Colors.primary.tint }}>
          {errors.key.root?.message ||
            errors.key.message ||
            "Pelo menos uma chave é obrigatória"}
        </Text>
      )}

      {/* VALUE */}
      <Text style={styles.label}>Valor</Text>
      <Controller
        control={control}
        name="value"
        render={({ field: { onChange, value } }) => (
          <TextInput
            placeholder="Valor"
            value={value}
            onChangeText={onChange}
            style={styles.input}
          />
        )}
      />
      {errors.value && (
        <Text style={{ color: Colors.primary.tint }}>
          {errors.value.message}
        </Text>
      )}

      {/* SECRET */}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <Text style={styles.label}>É secreto?</Text>
        <Controller
          control={control}
          name="secret"
          render={({ field: { onChange, value } }) => (
            <Switch
              value={value}
              onValueChange={onChange}
              thumbColor={Colors.primary.tint}
              trackColor={{
                true: Colors.primary.gray200,
                false: Colors.primary.gray200,
              }}
            />
          )}
        />
      </View>

      {/* SUBMIT */}
      <MyButton onPress={handleSubmit(onSubmit)} title="Salvar" />
    </View>
  );
}

const styles = StyleSheet.create({
  label: {
    color: Colors.primary.gray100,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  input: {
    backgroundColor: Colors.primary.gray100,
    color: Colors.primary.black,
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  removeButton: {
    backgroundColor: Colors.primary.gray100,
    borderRadius: 8,
    padding: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    backgroundColor: Colors.primary.tint,
    padding: 10,
    borderRadius: 8,
    alignItems: "center",
    color: Colors.primary.white,
  },
});
