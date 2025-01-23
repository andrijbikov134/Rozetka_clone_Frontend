import { createContext } from "react";

// Звертатися на backend
export const EventsContext = createContext(
  JSON.parse(localStorage.getItem("events")) || []);
export const SelectedDateContext = createContext(new Date());
