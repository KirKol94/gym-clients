export type { User } from "./model/types/user";
export { userReducer, userActions } from "./model/slice/userSlice";
export { getUserData } from "./model/selectors/getUser";
export { getIsAuth } from "./model/selectors/getIsAuth";
