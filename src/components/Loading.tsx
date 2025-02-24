import { Loader2 } from "lucide-react";
import React from "react";

const Loading = () => {
  return (
    <div
      data-testid="loading-spinner"
      className="fixed inset-0 flex gap-2 items-center justify-center bg-gray-50"
    >
      <Loader2 className="w-6 h-6 animate-spin text-[#0500ff]" />
      <span className="text-sm font-medium text-[#0500ff]">Carregando...</span>
    </div>
  );
};

export default Loading;
