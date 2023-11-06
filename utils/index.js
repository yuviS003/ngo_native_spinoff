const getColorNameById = (colorList, colorId) => {
  return colorList.filter((color) => color.id === colorId)[0]?.ColorName;
};

const getAreaNameById = (areaList, areaId) => {
  return areaList.filter((area) => area.id === areaId)[0]?.AreaName;
};

const getNgoNameById = (ngoList, ngoId) => {
  return ngoList.filter((ngo) => ngo.id === ngoId)[0]?.NgoName;
};

const getStatusNameById = (statusList, statusId) => {
  return statusList.filter((status) => status.id === statusId)[0]?.StatusName;
};

const getCurrentDate = () => {
  const today = new Date();

  // Get the day, month, and year components
  const day = String(today.getDate()).padStart(2, "0"); // Add leading zero if needed
  const month = String(today.getMonth() + 1).padStart(2, "0"); // Months are zero-indexed
  const year = today.getFullYear();

  // Create the date string in "dd-mm-yyyy" format
  const formattedDate = `${day}-${month}-${year}`;

  return formattedDate;
};

const sortArrayByUpdatedAt = (array) => {
  if (!array.length) return [];

  // Use the sort method to compare updatedAt values and sort the array
  return array.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
};

const searchDogStrlCases = (array, query) => {
  // Convert the query to lowercase for case-insensitive search
  query = query.toLowerCase();

  // Define the fields you want to search in
  const searchableFields = [
    "FILENO",
    "Comment",
    "Landmark",
    "CaseNo",
    "AreaName",
    "gender",
    "StatusName",
    "ColorName",
    "NgoName",
  ];

  // Filter the array to find matches
  const matches = array.filter((item) => {
    for (const field of searchableFields) {
      if (item[field] && item[field].toLowerCase().includes(query)) {
        return true;
      }
    }
    return false;
  });

  return matches;
};

export {
  getCurrentDate,
  getColorNameById,
  getAreaNameById,
  getNgoNameById,
  getStatusNameById,
  sortArrayByUpdatedAt,
  searchDogStrlCases,
};
