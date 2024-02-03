"use client";
import React from "react";
import { IconType } from "react-icons";

interface CategoryInputTypes {
  onClick: (value: string) => void;
  selected?: boolean;
  label: string;
  icon: IconType;
}

const categoryInput = ({
  onClick,
  selected,
  label,
  icon: Icon,
}: CategoryInputTypes) => {
  return (
    <div
      onClick={() => onClick(label)}
      className={`rounded-xl border-2 p-4 flex flex-col gap-3 hover:border-black transition cursor-pointer ${
        selected ? "border-black" : "border-neutral-200 "
      }`}
    >
      <Icon size={30} />
      <div className="font-semibold ">{label}</div>
    </div>
  );
};

export default categoryInput;
