import React, { useEffect, useState } from "react";

const DynamicComponent = ({ attributesString }) => {
  const [Component, setComponent] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [props, setProps] = useState({});

  useEffect(() => {
    const importComponent = async () => {
      const attributeRegex = /(\w+)\s*=\s*("[^"]*")/g;
      let match;
      const props = {};

      while ((match = attributeRegex.exec(attributesString)) !== null) {
        const attributeName = match[1];
        const attributeValue = match[2].replace(/"/g, "");

        // Store the attribute as a prop
        props[attributeName] = attributeValue;
      }

      console.log(props);
      setProps(props);

      const componentName = attributesString.substring(
        1,
        attributesString.indexOf(" ")
      );

      if (componentName) {
        try {
          const { default: DynamicComponent } = await import(
            `./component/${componentName}`
          );
          setComponent(() => DynamicComponent);
        } catch (error) {
          console.error(
            `Failed to dynamically import component: ${componentName}`,
            error
          );
        } finally {
          setIsLoading(false);
        }
      } else {
        setIsLoading(false);
      }
    };

    importComponent();
  }, [attributesString]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!Component) {
    return <div>Failed to load component</div>;
  }

  return <Component {...props} />;
};

export default DynamicComponent;
