import axios from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";


const useMutationPut = (url: string, key: string) => {
  const queryClient = useQueryClient();

  const handleUpdata = async (values: any) => {
    const res = await axios.put(url, values);
    console.log(res.data);
  };

  return useMutation({
    mutationFn: handleUpdata,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [key] });
    },
  });
};

export { useMutationPut };
