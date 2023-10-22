import { Redirect } from "wouter";
import { pageList } from "../utils/utils";

export const Default = () => {
  return <Redirect to={`/${pageList[0]}`} />;
};
