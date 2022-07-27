import React from "react";

const useLocalStorage = <T>(keyName: string, initial: T): [T, React.Dispatch<React.SetStateAction<T>>] => {
  const [value, setValue] = React.useState<T>(() => {
    const storedValue = localStorage.getItem(keyName);
    try {
      const parsedValue = JSON.parse(storedValue as string);
      if (!parsedValue) throw new Error("No value stored");
      return parsedValue;
    } catch (error) {
      return initial;
    }
  });

  React.useEffect(() => {
    const stringifiedValue = JSON.stringify(value);
    localStorage.setItem(keyName, stringifiedValue);
  }, [value]);

  return [value, setValue];
};

export default useLocalStorage;
