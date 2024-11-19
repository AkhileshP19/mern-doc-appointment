import * as React from "react";
import * as ToastPrimitive from "@radix-ui/react-toast";
import { cn } from "../../lib/utils"

export const Toast = ({ open, onOpenChange, title, description, variant }) => (
  <ToastPrimitive.Provider>
    <ToastPrimitive.Root
      open={open}
      onOpenChange={onOpenChange}
      className={cn(
        "fixed bottom-4 right-4 z-50 p-4 rounded-md shadow-lg",
        variant === "success" && "bg-green-500 text-white",
        variant === "error" && "bg-red-500 text-white",
        variant === "info" && "bg-blue-500 text-white"
      )}
    >
      <div>
        <strong className="block font-medium">{title}</strong>
        <p className="text-sm">{description}</p>
      </div>
    </ToastPrimitive.Root>
    <ToastPrimitive.Viewport />
  </ToastPrimitive.Provider>
);
