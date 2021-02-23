import { useDispatch } from "react-redux";
import { useSelector } from "src/store";
import { searchRoomActions } from "src/store/searchRoom";
import { format } from "date-fns";

const useSearchRoomDate = () => {
  const checkInDate = useSelector((state) => state.searchRoom.checkInDate);
  const checkOutDate = useSelector((state) => state.searchRoom.checkOutDate);
  const dispatch = useDispatch();

  const setCheckInDate = (date: Date) => {
    dispatch(searchRoomActions.setCheckInDate(format(date, "yyyy-MM-dd")));
  };

  const setCheckOutDate = (date: Date) => {
    dispatch(searchRoomActions.setCheckOutDate(format(date, "yyyy-MM-dd")));
  };

  return {
    setCheckInDate,
    setCheckOutDate,
    checkInDate: checkInDate ? new Date(checkInDate) : null,
    checkOutDate: checkOutDate ? new Date(checkOutDate) : null,
  };
};

export default useSearchRoomDate;
