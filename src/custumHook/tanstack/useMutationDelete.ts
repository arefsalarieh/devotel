import axios from "axios";
import {
  useMutation,
  UseMutationResult,
  useQueryClient,
} from "@tanstack/react-query";

const useMutationDelete = (
  url: string,
  key: string
): UseMutationResult<any, unknown, any> => {
  const queryClient = useQueryClient();

  const handleDeleteLike = async (data: any) => {
    const res = await axios.delete(url, data);
    console.log(res.data);
  };

  return useMutation({
    mutationFn: handleDeleteLike,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [key] });
    },
  });
};

export { useMutationDelete };
