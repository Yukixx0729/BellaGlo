const API_URL = import.meta.env.VITE_REACT_APP_API_URL;

export const findUser = async (id: string) => {
  try {
    const res = await fetch(`${API_URL}/api/users/${id}`);
    if (res.status === 200) {
      const data = await res.json();
      return data;
    }
  } catch (error) {
    console.error("Error in fetch:", error);
  }
};

export const createNewUser = async (authId: string, email: string) => {
  const res = await fetch(`${API_URL}/api/users`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      authId: authId,
      email: email,
    }),
  });
  if (res.status === 201) {
    return await res.json();
  } else {
    console.log("something goes wrong, try later");
  }
};
