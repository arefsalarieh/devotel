// src/types/list.d.ts

export interface InsuranceFormData {
    id: string;
    "Full Name": string;
    Age: number;
    Gender: string;
    "Insurance Type": string;
    City: string;
  }
  
  export interface InsuranceFormsResponse {
    columns: string[];
    data: InsuranceFormData[];
  }