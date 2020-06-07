import React from "react";
import Page from "./Page";
import { useRouter } from "../Router";

const NotFound = () => {
  const { location } = useRouter();
  return <Page>{`Sorry, no page exists at **${location.pathname}**.`}</Page>;
};

export default NotFound;
