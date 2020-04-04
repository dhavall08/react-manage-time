export const getKey = (currentData = []) => {
  // const currentKeys = currentData.map((item) => item.key);
  const newKey = Date.now();
  // if (currentKeys.includes(newKey)) {
  // getNewKey(currentData, key); generate recursive fn to create key
  // }
  return newKey;
}