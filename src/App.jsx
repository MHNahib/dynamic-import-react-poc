import React, { Suspense, useEffect, useState } from "react";
import "./App.css";
import DynamicComponent from "./DynamicComponent";

function App() {
  return (
    <>
      <Suspense fallback={<div>Page is Loading...</div>}>
        <DynamicComponent
          attributesString={
            '[Title name="My App" name2="hello" className="my-title"]'
          }
        />
      </Suspense>
    </>
  );
}

export default App;
