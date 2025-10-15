import { KeysService } from "@/services/KeysService";
import { useQuery, useQueryClient } from "@tanstack/react-query";

export function useKeysViewModel() {
  const queryClient = useQueryClient();

  const useGetKeys = useQuery({
    queryKey: ["keys"],
    queryFn: () => KeysService.getKeys(),
  });

  const useGetKeyById = (id: string) =>
    useQuery({
      queryKey: ["key", id],
      queryFn: () => KeysService.getKeyById(id),
    });

  return {
    useGetKeys,
    useGetKeyById,
  };
}
