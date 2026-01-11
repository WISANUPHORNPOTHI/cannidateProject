"use client";

import { useForm } from "react-hook-form";
import { useEffect } from "react";

import { FormInput } from "@/app/components/form/formInput";
import { FormDateTime } from "@/app/components/form/formDateTime";
import { FormDropdown } from "@/app/components/form/formDropdown";
import { useWebSocket } from "@/app/hooks/realTime/useWebSocket";

type FormValues = {
  firstName: string;
  middleName: string;
  lastName: string;
  appointmentDate: string;
  gender: string;
  phone: string;
  email: string;
  address: string;
  preferredLanguage: string;
  nationality: string;
  emergencyContact: string;
  religion: string;
};

export default function Page() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      gender: "",
    },
  });

  const { send, isReady } = useWebSocket(
    "ws://localhost:3001",
    (data) => {
    }
  );


  const watchedValues = watch();

  const onSubmit = (data: FormValues) => {
    console.log("FORM DATA:", data);
  };

  useEffect(() => {
    if (!isReady) return;
    if (!watchedValues) return;

    const hasAnyValue = Object.values(watchedValues).some(
      (v) => v !== "" && v !== undefined
    );
    if (!hasAnyValue) return;

    const t = setTimeout(() => {
      send({
        type: "FORM_STAGE_UPDATE",
        stage: "PERSONAL_DETAIL",
        payload: watchedValues,
      });
    }, 300);

    return () => clearTimeout(t);
  }, [watchedValues, send, isReady]);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="
        m-5 grid gap-4
        grid-cols-1
        md:grid-cols-2
        lg:grid-cols-12
      "
    >
      <div className="lg:col-span-12 text-lg text-gray-500 uppercase">
        Personal detail
      </div>

      <div className="lg:col-span-4">
        <FormInput
          label="First Name"
          {...register("firstName", {
            required: "กรุณากรอกชื่อ",
          })}
          error={errors.firstName?.message}
        />
      </div>

      <div className="lg:col-span-4">
        <FormInput
          label="Middle Name (optional)"
          {...register("middleName")}
        />
      </div>

      <div className="lg:col-span-4">
        <FormInput
          label="Last Name"
          {...register("lastName", {
            required: "กรุณากรอกนามสกุล",
          })}
          error={errors.lastName?.message}
        />
      </div>

      <div className="lg:col-span-4">
        <FormDateTime
          label="Appointment Date"
          {...register("appointmentDate")}
        />
      </div>

      <div className="lg:col-span-4">
        <FormDropdown
          label="Gender"
          options={[
            { label: "Male", value: "male" },
            { label: "Female", value: "female" },
          ]}
          {...register("gender")}
        />
      </div>

      <div className="lg:col-span-4">
        <FormInput
          label="Phone Number"
          {...register("phone")}
        />
      </div>

      <div className="lg:col-span-6">
        <FormInput
          label="Email"
          {...register("email")}
        />
      </div>

      <div className="lg:col-span-12">
        <FormInput
          label="Address"
          {...register("address")}
        />
      </div>

      <div className="lg:col-span-4">
        <FormInput
          label="Preferred Language"
          {...register("preferredLanguage")}
        />
      </div>

      <div className="lg:col-span-4">
        <FormInput
          label="Nationality"
          {...register("nationality")}
        />
      </div>

      <div className="lg:col-span-4">
        <FormInput
          label="Emergency Contact"
          {...register("emergencyContact")}
        />
      </div>

      <div className="lg:col-span-4">
        <FormInput
          label="Religion (optional)"
          {...register("religion")}
        />
      </div>

      <div className="lg:col-span-12 flex justify-end">
        <button
          type="submit"
          className="
            rounded-lg
            bg-blue-500
            px-4 py-2
            text-sm
            text-white
            hover:bg-blue-600
            transition
          "
        >
          Submit
        </button>
      </div>
    </form>
  );
}
