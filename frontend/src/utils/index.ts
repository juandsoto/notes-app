export const FirstLetterToUppercase = (word: string): string => {
  return word[0].toUpperCase().concat(word.slice(1));
};
