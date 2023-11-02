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

export {
  getCurrentDate,
  getColorNameById,
  getAreaNameById,
  getNgoNameById,
  getStatusNameById,
};
