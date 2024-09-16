import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { UnitsEnum } from "../enums";

export const unitSwitchStore = create()(
  devtools(
    immer((set) => ({
      unit: UnitsEnum.Metric,
      setUnit: (unit) => {
        set(
          (state) => {
            state.unit = unit;
          },
          undefined,
          "unitSwitchStore/setUnit",
        );
      },
    })),
  ),
);
