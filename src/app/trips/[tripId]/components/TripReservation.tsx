"use client";

import Button from "@/components/Button";
import DatePicker from "@/components/DatePicker";
import Input from "@/components/Input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { differenceInDays } from "date-fns";
import { useRouter } from "next/navigation";
import React from "react";
import { Controller, useForm } from "react-hook-form";

interface TripReservationProps {
  tripId: string;
  tripStartDate: Date;
  tripEndDate: Date;
  maxGuests: number;
  pricePerDay: number;
}

interface TripReservationForm {
  guests: number;
  startDate: Date | null;
  endDate: Date | null;
}

const TripReservation = ({ tripId, maxGuests, tripStartDate, tripEndDate, pricePerDay }: TripReservationProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    watch,
    setError,
  } = useForm<TripReservationForm>();

  const router = useRouter();

  const onSubmit = async (data: TripReservationForm) => {
    const response = await fetch("/api/trips/check", {
      method: "POST",
      body: Buffer.from(
        JSON.stringify({
          startDate: data.startDate,
          endDate: data.endDate,
          tripId,
        })
      ),
    });

    const res = await response.json();

    if (res?.error?.code === "TRIP_ALREADY_RESERVED") {
      setError("startDate", {
        type: "manual",
        message: "Esta data já está reservada.",
      });

      return setError("endDate", {
        type: "manual",
        message: "Esta data já está reservada.",
      });
    }

    if (res?.error?.code === "INVALID_START_DATE") {
      return setError("startDate", {
        type: "manual",
        message: "Data inválida.",
      });
    }

    if (res?.error?.code === "INVALID_END_DATE") {
      return setError("endDate", {
        type: "manual",
        message: "Data inválida.",
      });
    }

    router.push(
      `/trips/${tripId}/confirmation?startDate=${data.startDate?.toISOString()}&endDate=${data.endDate?.toISOString()}&guests=${data.guests}`
    );
  };

  const startDate = watch("startDate");
  const endDate = watch("endDate");

  return (
    <Card className="py-5 border-0 shadow-none lg:min-w-[380px] lg:border lg:shadow-md lg:p-5">
      <CardContent>
        <p className="text-xl hidden text-customPurple-dark mb-4 lg:block">
          <span className="font-semibold">R${pricePerDay}</span> por dia
        </p>
        <div className="flex flex-col gap-2">
          <div className="flex gap-2">
            <Controller
              name="startDate"
              rules={{
                required: {
                  value: true,
                  message: "Data inicial é obrigatória.",
                },
              }}
              control={control}
              render={({ field }) => (
                <DatePicker
                  error={!!errors?.startDate}
                  errorMessage={errors?.startDate?.message}
                  onChange={field.onChange}
                  selected={field.value}
                  placeholderText="Data de Início"
                  className="w-full"
                  minDate={tripStartDate}
                />
              )}
            />
            <Controller
              name="endDate"
              rules={{
                required: {
                  value: true,
                  message: "Data final é obrigatória.",
                },
              }}
              control={control}
              render={({ field }) => (
                <DatePicker
                  error={!!errors?.endDate}
                  errorMessage={errors?.endDate?.message}
                  onChange={field.onChange}
                  selected={field.value}
                  placeholderText="Data Final"
                  className="w-full"
                  maxDate={tripEndDate}
                  minDate={startDate ?? tripStartDate}
                />
              )}
            />
          </div>
          <Input
            {...register("guests", {
              required: {
                value: true,
                message: "Número de hóspedes é obrigatório.",
              },
              max: {
                value: maxGuests,
                message: `Número de hóspedes não pode ser maior que ${maxGuests}.`,
              },
            })}
            placeholder={`Número de hóspedes (max: ${maxGuests})`}
            error={!!errors?.guests}
            errorMessage={errors?.guests?.message}
            type="number"
          />
        </div>
        <div className="flex justify-between my-2">
          <p className="font-medium text-sm text-customPurple-dark">Total: </p>
          <p className="font-medium text-sm text-customPurple-dark">
            {startDate && endDate ? `R$${differenceInDays(endDate, startDate) * pricePerDay}` ?? 1 : "R$0"}
          </p>
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={() => handleSubmit(onSubmit)()} className="w-full">
          Reservar agora
        </Button>
      </CardFooter>
    </Card>
  );
};

export default TripReservation;
