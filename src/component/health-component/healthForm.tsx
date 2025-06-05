import React, { useEffect, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { getFormData, submitFormData } from "../../services/form";
import type { InsuranceFormData, FormFieldType } from "../../types/form";

const HealthForm = () => {
  const [formStructure, setFormStructure] = useState<InsuranceFormData | null>(
    null
  );
  const [dynamicOptionsMap, setDynamicOptionsMap] = useState<
    Record<string, Record<string, string[]>>
  >({});

  const { data, isLoading, error } = getFormData();

  const {
    control,
    handleSubmit,
    register,
    setValue,
    formState: { errors },
  } = useForm();

  const watchAll = useWatch({ control });

  const { mutate } = submitFormData();

  useEffect(() => {
    if (data && data.length > 0) {
      setFormStructure(data[0]);
    }
  }, [data]);

  const onSubmit = (formData: any) => {
    mutate(formData);
  };

  const fetchDynamicOptions = async (
    fieldId: string,
    endpoint: string,
    dependsOn: string,
    value: string
  ) => {
    try {
      const url = `https://assignment.devotel.io${endpoint}?${dependsOn}=${value}`;
      const res = await fetch(url);
      const json = await res.json();

      if (json?.states && Array.isArray(json.states)) {
        setDynamicOptionsMap((prev) => ({
          ...prev,
          [fieldId]: {
            ...(prev[fieldId] || {}),
            [value]: json.states,
          },
        }));
      }
    } catch (e) {
      console.error("❌ Failed to fetch dynamic options:", e);
    }
  };

  useEffect(() => {
    if (!formStructure) return;

    const checkAndFetch = (field: FormFieldType) => {
      if (field.type === "select" && field.dynamicOptions) {
        const { dependsOn, endpoint } = field.dynamicOptions;
        const value = watchAll?.[dependsOn];

        if (field.id === "state") {
          setValue(field.id, "");
        }

        const currentOptions = dynamicOptionsMap[field.id]?.[value];
        if (value && !currentOptions) {
          fetchDynamicOptions(field.id, endpoint, dependsOn, value);
        }
      }

      if (field.type === "group" && "fields" in field) {
        field.fields.forEach(checkAndFetch);
      }
    };

    formStructure.fields.forEach(checkAndFetch);
  }, [watchAll?.country, formStructure]);

  const renderFields = (fields: FormFieldType[]) => {
    return fields.map((field) => {
      if (field.type === "group" && "fields" in field) {
        return (
          <fieldset key={field.id} className="border p-4 my-4 rounded">
            <legend className="font-semibold">{field.label}</legend>
            {renderFields(field.fields)}
          </fieldset>
        );
      }

      return (
        <div key={field.id} className="mb-4">
          <label className="block font-medium mb-1">{field.label}</label>

          {(() => {
            switch (field.type) {
              case "text":
              case "number":
              case "date":
                return (
                  <input
                    type={field.type}
                    {...register(field.id, { required: field.required })}
                    className="border rounded p-2 w-full"
                  />
                );

              case "select": {
                const dependsOn = field.dynamicOptions?.dependsOn;
                const dependsValue = dependsOn
                  ? watchAll?.[dependsOn]
                  : undefined;

                const options =
                  dependsOn && dependsValue && field.dynamicOptions
                    ? dynamicOptionsMap[field.id]?.[dependsValue] || []
                    : field.options || [];

                const isDisabled =
                  field.id === "smoking_frequency" && watchAll?.smoker === "No";


                return (
                  <select
                    {...register(field.id, { required: field.required && !isDisabled })}
                    className="border rounded p-2 w-full"
                    disabled={isDisabled}
                    defaultValue={isDisabled ? "" : undefined}
                  >
                    <option value="">Select...</option>
                    {options.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                );
              }

              case "radio":
                return (
                  <div className="flex gap-4">
                    {field.options.map((opt) => (
                      <label key={opt} className="flex items-center gap-2">
                        <input
                          type="radio"
                          value={opt}
                          {...register(field.id, { required: field.required })}
                        />
                        {opt}
                      </label>
                    ))}
                  </div>
                );

              case "checkbox":
                return (
                  <div className="flex flex-wrap gap-4">
                    {field.options.map((opt) => (
                      <label key={opt} className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          value={opt}
                          {...register(field.id)}
                        />
                        {opt}
                      </label>
                    ))}
                  </div>
                );

              default:
                return null;
            }
          })()}

          {errors[field.id] && (
            <p className="text-red-500 text-sm">This field is required</p>
          )}
        </div>
      );
    });
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading form</div>;
  if (!formStructure || !formStructure.fields) return <div>No form found</div>;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-xl mx-auto p-6">
      <h2 className="text-xl font-bold mb-6">{formStructure.title}</h2>
      {renderFields(formStructure.fields)}
      <button
        type="submit"
        className="mt-6 px-4 py-2 bg-blue-600 text-white rounded"
      >
        Submit
      </button>
    </form>
  );
};

export default HealthForm;
