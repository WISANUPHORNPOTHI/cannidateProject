"use client";

import { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { useWebSocket } from "@/app/hooks/realTime/useWebSocket";

import { FormInput } from "@/app/components/form/formInput";
import { FormDateTime } from "@/app/components/form/formDateTime";
import { FormDropdown } from "@/app/components/form/formDropdown";

type FormValues = {
  firstName: string;
  middleName: string;
  lastName: string;
  appointmentDate: string;
  gender: string;
  phone: string;
  email: string;
  dateOfBirth: Date;
  address: string;
  preferredLanguage: string;
  nationality: string;
  emergencyContact: string;
  religion: string;
};

export default function PatientPage() {
  const {
    register,
    watch,
    setValue,
    handleSubmit,
    formState: { errors, isDirty },
  } = useForm<FormValues>({
    defaultValues: {
      gender: "",
    },
  });

  const clientIdRef = useRef<string>(
    typeof crypto !== "undefined" ? crypto.randomUUID() : Math.random().toString()
  );

  const isRemoteUpdateRef = useRef(false);

  const watchedValues = watch();

  const { send, isReady } = useWebSocket(
    process.env.NEXT_PUBLIC_WS_URL!,
    (data) => {
      if (
        data?.type !== "FORM_STAGE_UPDATE" ||
        data?.stage !== "PERSONAL_DETAIL" ||
        data?.source !== "STAFF" ||
        data?.clientId === clientIdRef.current
      ) {
        return;
      }

      isRemoteUpdateRef.current = true;

      Object.entries(data.payload ?? {}).forEach(([key, value]) => {
        const currentValue = watch(key as keyof FormValues);

        if (currentValue !== value && typeof value === "string") {
          setValue(key as keyof FormValues, value, {
            shouldDirty: false,
            shouldTouch: false,
            shouldValidate: false,
          });
        }
      });

      queueMicrotask(() => {
        isRemoteUpdateRef.current = false;
      });
    }
  );

  useEffect(() => {
    if (!isReady) return;
    if (!isDirty) return;
    if (isRemoteUpdateRef.current) return;

    const hasAnyValue = Object.values(watchedValues).some(
      (v) => v !== "" && v !== undefined
    );
    if (!hasAnyValue) return;

    const t = setTimeout(() => {
      send({
        type: "FORM_STAGE_UPDATE",
        stage: "PERSONAL_DETAIL",
        source: "PATIENT",
        clientId: clientIdRef.current,
        payload: watchedValues,
      });

      send({
        type: "PATIENT_TYPING",
        stage: "PERSONAL_DETAIL",
        clientId: clientIdRef.current,
      });
    }, 300);

    return () => clearTimeout(t);
  }, [watchedValues, isReady, isDirty, send]);

  return (
    <form
      onSubmit={handleSubmit((data) => {
        console.log("SUBMIT DATA:", data);
      })}
      className="
        m-5 grid gap-4
        grid-cols-1
        md:grid-cols-2
        lg:grid-cols-12
      "
    >
      <div className="lg:col-span-12 text-lg text-gray-500 uppercase">
        Patient – Personal Detail
      </div>

      <div className="lg:col-span-4">
        <FormInput
          label="First Name"
          {...register("firstName", { required: "กรุณากรอกชื่อ" })}
          error={errors.firstName?.message}
        />
      </div>

      <div className="lg:col-span-4">
        <FormInput label="Middle Name (optional)" {...register("middleName")} />
      </div>

      <div className="lg:col-span-4">
        <FormInput
          label="Last Name"
          {...register("lastName", { required: "กรุณากรอกนามสกุล" })}
          error={errors.lastName?.message}
        />
      </div>

      <div className="lg:col-span-4">
        <FormDateTime
          label="Date Of Birth"
          {...register("dateOfBirth", { required: "กรุณากรอกวันเกิด" })}
          error={errors.dateOfBirth?.message}
        />
      </div>

      <div className="lg:col-span-4">
        <FormDropdown
          label="Gender"
          options={[
            { label: "Male", value: "male" },
            { label: "Female", value: "female" },
          ]}
          {...register("gender", { required: "กรุณาเลือกเพศ" })}
          error={errors.gender?.message}
        />
      </div>

      <div className="lg:col-span-4">
        <FormInput
          label="Phone Number"
          inputMode="numeric"
          {...register("phone", {
            required: "กรุณากรอกหมายเลขโทรศัพท์",
            pattern: {
              value: /^[0-9]+$/,
              message: "กรุณากรอกเฉพาะตัวเลข",
            },
            setValueAs: (v: string) => v.replace(/\D/g, ""),
          })}
          error={errors.phone?.message}
        />


      </div>

      <div className="lg:col-span-6">
        <FormInput
          label="Email"
          type="email"
          {...register("email", {
            required: "กรุณากรอก Email",
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "รูปแบบ Email ไม่ถูกต้อง",
            },
          })}
          error={errors.email?.message}
        />

      </div>

      <div className="lg:col-span-12">
        <FormInput
          label="Address"
          {...register("address", { required: "กรุณากรอกที่อยู่" })}
          error={errors.address?.message}
        />
      </div>

      <div className="lg:col-span-4">
        <FormInput
          label="Preferred Language"
          {...register("preferredLanguage", {
            required: "กรุณากรอก Preferred Language",
          })}
          error={errors.preferredLanguage?.message}
        />
      </div>

      <div className="lg:col-span-4">
        <FormInput
          label="Nationality"
          {...register("nationality", { required: "กรุณากรอกสัญชาติ" })}
          error={errors.nationality?.message}
        />
      </div>

      <div className="lg:col-span-4">
        <FormInput
          label="Emergency Contact"
          inputMode="numeric"
          {...register("emergencyContact", {
            required: "กรุณากรอกเบอร์โทรศัพท์ฉุกเฉิน",
            pattern: {
              value: /^[0-9]+$/,
              message: "กรุณากรอกเฉพาะตัวเลข",
            },
            setValueAs: (v: string) => v.replace(/\D/g, ""),
          })}
          error={errors.emergencyContact?.message}
        />

      </div>

      <div className="lg:col-span-4">
        <FormInput label="Religion (optional)" {...register("religion")} />
      </div>

      <div className="lg:col-span-12 flex justify-end mt-4">
        <button
          type="submit"
          className="
            rounded-lg bg-blue-500 px-6 py-2 text-sm font-medium
            text-white hover:bg-blue-600 active:scale-95 transition
          "
        >
          Submit
        </button>
      </div>
    </form>
  );
}
