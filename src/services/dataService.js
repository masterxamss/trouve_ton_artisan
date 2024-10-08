export const getData = async () => {
  
  const ambience =
    import.meta.env.MODE === "production"
      ? "/trouve_ton_artisan/assets/datas.json" 
      : "src/assets/datas.json"; 
  try {
    const response = await fetch(ambience);
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

// GET DATA FILTERED BY PARAMS
export const fetchFilteredData = async (
  name,
  specialty,
  locationParam,
  category
) => {
  try {
    const data = await getData();

    const filtered = data.filter((item) => {
      const matchesName =
        !name || item.name.toLowerCase().includes(name.toLowerCase());
      const matchesSpecialty = !specialty || item.specialty === specialty;
      const matchesLocation = !locationParam || item.location === locationParam;
      const matchesCategory = !category || item.category === category;

      return (
        matchesName && matchesSpecialty && matchesLocation && matchesCategory
      );
    });

    return filtered;
  } catch (error) {
    console.error("Error fetching or filtering data:", error);
    throw error;
  }
};

// GET DATA FILTERED BY CLASSIFICATION
export const fetchTopData = async () => {
  try {
    const data = await getData();
    const top = data.filter((item) => item.top === true);
    return top;
  } catch (error) {
    console.error("Error fetching or filtering data:", error);
    throw error;
  }
};
