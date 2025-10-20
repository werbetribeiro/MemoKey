import { Platform } from "react-native";

//192.168.1.110:
//172.18.0.15:
//172.18.0.15:

//ios: "http://172.18.0.15:3000",
//android: "http://10.0.2.2:3000", // Android Emulator usa 10.0.2.2 para acessar localhost do host
//default: "http://172.18.0.15:3000" // Para dispositivos físicos

// Use o IP da sua máquina na rede local, não localhost
// Para descobrir seu IP: ipconfig (Windows) e procure "Endereço IPv4"
// Se estiver usando EMULADOR Android, mude para: http://10.0.2.2:3000
// Se estiver usando DISPOSITIVO FÍSICO, use: http://192.168.1.110:3000

export const KEYS_BASE_URL = Platform.select({
  ios: "http://172.18.0.15:3000",
  android: "http://10.0.2.2:3000", // Alterado para IP da rede (dispositivo físico)
  default: "http://172.18.0.15:3000",
});
