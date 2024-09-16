import { devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { create } from "zustand";

export const userLocationStore = create()(
  devtools(
    immer((set) => ({
      userLocation: null,
      setUserLocation: (location) => {
        set(
          (state) => {
            console.log(location);
            state.userLocation = location;
          },
          undefined,
          "userLocationStore/setUserLocation",
        );
      },
    })),
  ),
);
