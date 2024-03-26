import React from "react";
import CallbackAdditionButton from "./CallbackAdditionButton";

const BelowTable = ({
  editMode,
  children,
  setChangeCommit,
  isValid,
}: {
  editMode: boolean;
  setChangeCommit: React.Dispatch<React.SetStateAction<boolean>>;
  isValid?: boolean;
} & React.PropsWithChildren) => {
  return (
    <>
      {editMode && <CallbackAdditionButton>{children}</CallbackAdditionButton>}
    </>
  );
};

export default BelowTable;
