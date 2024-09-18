import { axiosCancellationInterceptor } from "./utils";

export const imagesInstance = axiosCancellationInterceptor({
  baseURL: "https://google.serper.dev/",
  headers: {
    "Content-Type": "application/json",
    "X-API-KEY": process.env.REACT_APP_PLACES_API,
  },
});
