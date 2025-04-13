import { useAppDispatch } from "./hooks"
import { toggleStatus } from "../store/taskListSlice"

export const useToggleStatus = () => {

  const dispatch = useAppDispatch();

  const onStatusChange = (id: string): void => {
    dispatch(toggleStatus(id));
  }

  return onStatusChange;
}