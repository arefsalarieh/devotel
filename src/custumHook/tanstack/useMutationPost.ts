import axios from "axios";
import {
  useMutation,
  UseMutationResult,
  useQueryClient,
} from "@tanstack/react-query";

const useMutationPost = <T, V>(
  url: string,
  key: string
): UseMutationResult<void, unknown, V> => {
  const queryClient = useQueryClient();

  const handleAdd = async (values: V) => {
    const res = await axios.post(url, values && values);
    console.log(res.data);
  };

  return useMutation({
    mutationFn: handleAdd,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [key] });
    },
  });
};

export { useMutationPost };
