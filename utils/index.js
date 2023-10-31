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

export { getCurrentDate };
