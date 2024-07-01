import React from "react";
import ReactLoading from "react-loading";

const LoadingComponent = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <ReactLoading type="spin" color="#0f79af" height={'10%'} width={'10%'} />
    </div>
  );
};

export default LoadingComponent;