
import { GetParams } from "../../lib/types";
import { apicall } from "../axios";

export const getUsers = ({
    params,
  }: GetParams) =>
    apicall({
      url: "https://jsonplaceholder.typicode.com/users",
      method: "GET",
      params,
    });


export const getUserById = (userId: string) =>
  apicall({
    url: `https://jsonplaceholder.typicode.com/users/${userId}`,
    method: "GET",
  });

