import { createContext, useState } from "react";
import PropTypes from "prop-types";

export const UserContext = createContext({});

export function UserContextProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <UserContext.Provider value={{ user, setUser, isOpen, setIsOpen }}>
      {children}
    </UserContext.Provider>
  );
}

UserContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
