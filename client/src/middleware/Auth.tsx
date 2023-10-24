// import { useUser } from "@clerk/clerk-react";

import { createContext, useContext } from "react";

export const findUser = async (id: string) => {
  try {
    const res = await fetch(`http://localhost:3000/api/users/${id}`);
    if (res.status === 200) {
      const data = await res.json();
      return data;
    }
  } catch (error) {
    console.error("Error in fetch:", error);
  }
};

export const createNewUser = async (authId: string, email: string) => {
  console.log("?");
  const res = await fetch("http://localhost:3000/api/users", {
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
