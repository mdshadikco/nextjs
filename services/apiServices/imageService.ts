import { apicall } from "../axios";
import { GetParams } from "@/lib/types";

export const getImage = ({
    params
  }: GetParams) =>
    apicall({
      endpoint: `/v2/list`,
      method: "GET",
      params,
    });