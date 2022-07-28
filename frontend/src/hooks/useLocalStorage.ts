import React from "react";

interface Helpers {
  clearValue: () => void;
}

const useLocalStorage = <T>(keyName: string, initial: T): [T, React.Dispatch<React.SetStateAction<T>>, Helpers] => {
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

  const clearValue = () => {
    localStorage.removeItem(keyName);
    setValue(initial);
  };

  React.useEffect(() => {
    const stringifiedValue = JSON.stringify(value);
    localStorage.setItem(keyName, stringifiedValue);
  }, [value]);

  return [value, setValue, { clearValue }];
};

export default useLocalStorage;
