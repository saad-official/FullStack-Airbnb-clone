'use client'
import React, { useCallback, useState } from "react";
import axios from "axios";
import { AiFillGithub } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import useRegisterModal from "@/app/hooks/useRegisterModal";
import Model from "./Model";
import Heading from "../Heading";
import Input from "../inputs/Input";

const RegisterModal = () => {
  const registerModal = useRegisterModal();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);
    axios
      .post("/api/register", data)
      .then(() => registerModal.onClose())
      .catch((error) => console.log("error", error))
      .finally(() => setIsLoading(false));
  };

    const bodyContent = (
        <div className="flex flex-col gap-4">
            <Heading title="Welcome to Airbnb" subtitle="create an acount" center />
            <Input id="email" type="email" label="Email" disabled={isLoading} errors={errors} required register={register} />
            
            <Input id="name"  label="Name" disabled={isLoading} errors={errors} required register={register} />
            
            <Input  id="password" type="password" label="Password" disabled={isLoading} errors={errors} required register={register} />
            
        </div>
    )

  return (
    <div>
      <Model
        disabled={isLoading}
        isOpen={registerModal.isOpen}
        title="Register"
        actionLabel="Continue"
        onClose={registerModal.onClose}
              onSubmit={handleSubmit(onSubmit)}
              body={bodyContent}
      />
    </div>
  );
};

export default RegisterModal;
