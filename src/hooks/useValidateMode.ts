import { useDispatch } from "react-redux";
import { useSelector } from "src/store";
import { commonActions } from "src/store/common";

const useValidateMode = () => {
  const dispatch = useDispatch();
  const { validateMode } = useSelector((state) => state.common);

  const setValidateMode = (value: boolean) =>
    dispatch(commonActions.setValidateMode(value));

  return { validateMode, setValidateMode };
};

export default useValidateMode;
