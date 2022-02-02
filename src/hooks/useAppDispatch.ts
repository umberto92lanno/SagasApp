import { useDispatch } from "react-redux";
import {AppDispatch} from "../store/rootStore";

export const useAppDispatch = () => useDispatch<AppDispatch>();
