import { useGetQuery } from './tanstack/useGetQuery';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { InsuranceFormsResponse, FormSubmissionData } from '../types/form';
import { getInsuranceForms, submitInsuranceForm, getFormSubmissions } from '../services/insuranceApi';

// Hook برای دریافت لیست فرم‌ها
export const useInsuranceForms = () => {
  return useGetQuery<InsuranceFormsResponse>(
    'https://assignment.devotel.io/api/insurance/forms',
    ['insurance-forms']
  );
};

// Hook برای ارسال فرم
export const useSubmitForm = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (data: FormSubmissionData) => {
      return await submitInsuranceForm(data);
    },
    onSuccess: () => {
      // Invalidate submissions to refetch
      queryClient.invalidateQueries({ queryKey: ['form-submissions'] });
    },
  });
};

// Hook برای دریافت submission ها
export const useFormSubmissions = () => {
  return useGetQuery<any>(
    'https://assignment.devotel.io/api/insurance/forms/submissions',
    ['form-submissions']
  );
}; 