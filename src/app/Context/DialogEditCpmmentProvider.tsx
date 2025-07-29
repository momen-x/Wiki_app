import React, { useState } from "react";
import { DialogEditCpmmentContext } from "./DialogEditCpmmentContext";

export const DialogEditCpmmentProvider = ({ children }: { children: React.ReactNode }) => {
  const [open, setOpen] = useState(false);

  return (
    <DialogEditCpmmentContext.Provider value={{ open, setOpen }}>
      {children}
    </DialogEditCpmmentContext.Provider>
  );
}; 