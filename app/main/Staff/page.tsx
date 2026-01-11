"use client";

import { useEffect, useRef, useState } from "react";
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
  address: string;
  preferredLanguage: string;
  nationality: string;
  emergencyContact: string;
  religion: string;
};

export default function Page() {
  const {
    register,
    watch,
    setValue,
    formState: { errors, isDirty },
  } = useForm<FormValues>({
    defaultValues: { gender: "" },
  });

  const [isTyping, setIsTyping] = useState(false);

  const clientIdRef = useRef(
    typeof crypto !== "undefined" ? crypto.randomUUID() : Math.random().toString()
  );

  const isRemoteUpdateRef = useRef(false);
  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const watchedValues = watch();

  const { send } = useWebSocket(
    process.env.NEXT_PUBLIC_WS_URL!,
    (data) => {
      if (
        data?.type === "PATIENT_TYPING" &&
        data?.stage === "PERSONAL_DETAIL"
      ) {
        setIsTyping(true);
        if (typingTimeoutRef.current) {
          clearTimeout(typingTimeoutRef.current);
        }
        typingTimeoutRef.current = setTimeout(() => {
          setIsTyping(false);
        }, 1000);
      }

      if (
        data?.type === "FORM_STAGE_UPDATE" &&
        data?.stage === "PERSONAL_DETAIL" &&
        data?.clientId !== clientIdRef.current
      ) {
        isRemoteUpdateRef.current = true;

        Object.entries(data.payload ?? {}).forEach(([key, value]) => {
          const current = watch(key as keyof FormValues);

          if (current !== value && typeof value === "string") {
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
    }
  );

  useEffect(() => {
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
        source: "STAFF",
        clientId: clientIdRef.current,
        payload: watchedValues,
      });
    }, 300);

    return () => clearTimeout(t);
  }, [watchedValues, isDirty, send]);

  return (
    <div className="m-5 grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-12">
      <div className="lg:col-span-12 flex items-center justify-between">
        <h2 className="text-lg text-gray-500 uppercase">
          Personal detail (Staff)
        </h2>
        {isTyping && <TypingIndicator />}
      </div>

      <div className="lg:col-span-4">
        <FormInput label="First Name" {...register("firstName")} />
      </div>

      <div className="lg:col-span-4">
        <FormInput label="Middle Name" {...register("middleName")} />
      </div>

      <div className="lg:col-span-4">
        <FormInput label="Last Name" {...register("lastName")} />
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
        <FormInput label="Phone Number" {...register("phone")} />
      </div>

      <div className="lg:col-span-6">
        <FormInput label="Email" {...register("email")} />
      </div>

      <div className="lg:col-span-12">
        <FormInput label="Address" {...register("address")} />
      </div>

      <div className="lg:col-span-4">
        <FormInput
          label="Preferred Language"
          {...register("preferredLanguage")}
        />
      </div>

      <div className="lg:col-span-4">
        <FormInput label="Nationality" {...register("nationality")} />
      </div>

      <div className="lg:col-span-4">
        <FormInput
          label="Emergency Contact"
          {...register("emergencyContact")}
        />
      </div>

      <div className="lg:col-span-4">
        <FormInput label="Religion" {...register("religion")} />
      </div>
    </div>
  );
}

function TypingIndicator() {
  return (
    <div className="flex items-center gap-2 text-sm text-gray-400">
      <span>Patient is typing</span>
      <span className="flex gap-1">
        <Dot delay="0ms" />
        <Dot delay="150ms" />
        <Dot delay="300ms" />
      </span>
    </div>
  );
}

function Dot({ delay }: { delay: string }) {
  return (
    <span
      className="h-1.5 w-1.5 rounded-full bg-gray-400 animate-bounce"
      style={{ animationDelay: delay }}
    />
  );
}
