import { Platform } from "react-native";

// Use o IP da sua máquina na rede local, não localhost
// Para descobrir seu IP: ipconfig (Windows) e procure "Endereço IPv4"
export const KEYS_BASE_URL = Platform.select({
  ios: "http://172.18.0.15:3000",
  android: "http://10.0.2.2:3000", // Android Emulator usa 10.0.2.2 para acessar localhost do host
  default: "http://172.18.0.15:3000" // Para dispositivos físicos
});
