import React from "react";

const Title = ({ name, name2, className }) => {
  return (
    <>
      <h1 className={className}>{name}</h1>
      <h1>{name2}</h1>
      <h1>hello world</h1>
    </>
  );
};

export default Title;
