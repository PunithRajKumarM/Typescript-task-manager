import { Button } from "@mui/material";
import { ReactNode } from "react";
//Button created
export default function ButtonContained({
  children,
  submit,
}: {
  children: ReactNode;
  submit: boolean;
}) {
  if (submit) {
    return (
      <Button type="submit" variant="contained">
        {children}
      </Button>
    );
  }
  return <Button variant="contained">{children}</Button>;
}
