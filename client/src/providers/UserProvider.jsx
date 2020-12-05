import React, { useState, useEffect, createContext } from "react";
import { auth, generateUserDocument } from "../firebase";

export const UserContext = createContext({ user: null });

function UserProvider() {
  const [state, setState] = {
    user: null,
  };

  useEffect(() => {
    auth.onAuthStateChanged(async (userAuth) => {
      const user = await generateUserDocument(userAuth);
      setState({ user });
    });
  }, []);

  return (
    <UserContext.Provider value={state.user}>
      {this.props.children}
    </UserContext.Provider>
  );
}

export default UserProvider;
