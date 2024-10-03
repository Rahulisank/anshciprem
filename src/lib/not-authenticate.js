import { AUTH_ID_KEY } from "@/constants";
import { updateModalState } from "@/redux/slices/ModalSlice";
import { useDispatch } from "react-redux";
import Cookies from "js-cookie";

const useHandleAuthenticationAndModal = () => {
  const dispatch = useDispatch();

  return (modalType) => {
    const userId = Cookies.get(AUTH_ID_KEY);

    if (!userId) {
      // If the user is not authenticated, open the login modal
      dispatch(updateModalState("openLoginModal"));
    } else {
      // If the user is authenticated, open the requested modal
      dispatch(updateModalState(modalType));
    }
  };
};

export default useHandleAuthenticationAndModal;
