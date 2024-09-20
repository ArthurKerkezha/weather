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
            state.userLocation = location;
          },
          undefined,
          "userLocationStore/setUserLocation",
        );
      },
    })),
  ),
);
