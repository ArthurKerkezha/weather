import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { UnitsEnum } from "../enums";

export const unitSwitchStore = create()(
  devtools(
    immer((set) => ({
      units: UnitsEnum.Metric,
      setUnits: (units) => {
        set(
          (state) => {
            state.units = units;
          },
          undefined,
          "unitSwitchStore/setUnit",
        );
      },
    })),
  ),
);
