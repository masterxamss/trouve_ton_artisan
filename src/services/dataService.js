export const getData = async () => {
  try {
    const response = await fetch("/datas.json");
    if (!response.ok) {
      throw new Error("Error loading JSON file");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error loading data", error);
    throw error;
  }
};
