import React from "react";

const Notify = ({ errorMessage }) => {
  if (!errorMessage) return null;

  return (
    <div style={{ color: "red", position: "0", with: "100%" }}>
      {errorMessage}
    </div>
  );
};

export default Notify;
