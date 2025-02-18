import { createContext } from "react";

// Звертатися на backend
export const CurrentUserContext = createContext({
currentUser : JSON.parse(sessionStorage.getItem("user_petrushka_style")) || JSON.parse(localStorage.getItem("user_petrushka_style")) || [],
updateUser: () => {} 
});
  
//export const SelectedDateContext = createContext(new Date());



// function initUser() {
//   const user = localStorage.getItem('user_petrushka_style') || sessionStorage.getItem('user_petrushka_style');
//   return user ? JSON.parse(user) : [];
// }

// export const NoteProvider = props => {
//   const [user, setUser] = useState(initUser)

//   useEffect(() => {
//     localStorage.setItem('user_petrushka_style', JSON.stringify(user))
//   }, [user])
// }