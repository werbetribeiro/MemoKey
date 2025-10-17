import * as Clipboard from "expo-clipboard";

export const handleCopyValue = async (valueItem: string) => {
  await Clipboard.setStringAsync(valueItem);
  console.log("Copiado para a área de transferência:", valueItem);
};
