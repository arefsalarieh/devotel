// src/services/list.ts

import { useGetQuery } from "../custumHook/tanstack/useGetQuery";
import type { InsuranceFormsResponse } from "../types/list";

const baseUrl = "https://assignment.devotel.io";

const getListData = () => {
  const result = useGetQuery<InsuranceFormsResponse>(
    `${baseUrl}/api/insurance/forms/submissions`,
    ["form-data"]
  );
  return result;
};

export { getListData };