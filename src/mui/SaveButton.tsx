import { Button } from "@mui/material";
import { ReactNode } from "react";
//Button created
export default function SaveButton({ children }: { children: ReactNode }) {
  return <Button variant="contained">{children}</Button>;
}
