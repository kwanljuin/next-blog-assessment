"use client";

import React from "react";

type ErrorCardProps = {
  errorMessage: string | null | undefined;
};

export const ErrorCard = ({ errorMessage }: ErrorCardProps) => {
  return (
    <div className="my-4 text-center border border-red-600 rounded py-2">
      <h3 className="text-red-500">Error</h3>
      <p className="text-red-500">{errorMessage}</p>
    </div>
  );
};
