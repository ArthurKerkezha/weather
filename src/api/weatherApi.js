import { axiosCancellationInterceptor } from "./utils";

export const weatherInstance = axiosCancellationInterceptor({
  baseURL: "https://api.openweathermap.org/",
});
