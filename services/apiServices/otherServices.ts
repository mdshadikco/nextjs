import { apicall } from "../axios";

export const getquote = ({}) =>
  apicall({
    url: "https://api.api-ninjas.com/v1/quotes",
    method: "GET",
  });

export const getPosts = () =>
  apicall({
    url: "https://jsonplaceholder.typicode.com/posts?_limit=10",
    method: "GET",
  });

export const getWorldTime = () =>
  apicall({
    url: "https://api.api-ninjas.com/v1/worldtime?city=london",
    method: "GET",
  });
