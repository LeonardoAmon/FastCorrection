const apiUrl = "http://localhost:3001";

export const saveRecord = async (record) => {
  const response = await fetch(`${apiUrl}/records`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(record),
  });
  return response.json();
};

export const getRecords = async () => {
  const response = await fetch(`${apiUrl}/records`);
  return response.json();
};
