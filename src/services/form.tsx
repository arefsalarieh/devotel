import { useGetQuery } from "../custumHook/tanstack/useGetQuery";
import { useMutationPost } from "../custumHook/tanstack/useMutationPost";
import type { InsuranceFormsResponse } from "../types/form";

const baseUrl = "https://assignment.devotel.io";

const getFormData = () => {
  const result = useGetQuery<InsuranceFormsResponse>(
    `${baseUrl}/api/insurance/forms`,
    ["form-data"]
  );
  return result;
};

const submitFormData = () => {
  return useMutationPost<any, any>(
    `${baseUrl}/api/insurance/forms/submit`,
    "form-submission"
  );
};

export { getFormData, submitFormData };
