export const TOGGLE = "spec";

export type CommoditySpecsType = {
  title: string;
  list: Array<string>;
};

export type SpecCategoryType = {
  id: string;
  specs: Array<string>;
};

export type SpecStateType = {
  specList: Array<CommoditySpecsType>;
  specCombinationList: Array<SpecCategoryType>;
};

const initialState: SpecStateType = {
  specList: [
    { title: "颜色", list: ["红色", "紫色", "白色", "黑色"] },
    { title: "套餐", list: ["套餐一", "套餐二", "套餐三", "套餐四"] },
    { title: "内存", list: ["64G", "128G", "256G"] },
    { title: "年代", list: ["2019", "2018", "2017"] },

  ],
  specCombinationList: [
    { id: "1", specs: ["紫色", "套餐一", "64G",'2017'] },
    { id: "2", specs: ["红色", "套餐四", "128G",'2019'] },
    { id: "3", specs: ["白色", "套餐二", "128G",'2018'] },
    { id: "4", specs: ["黑色", "套餐三", "256G",'2017'] },

  ],
};

export default (state = initialState, action: any) => {
  switch (action.type) {
    case TOGGLE: {
      return {
        ...state,
      };
    }

    default: {
      return {
        ...state,
      };
    }
  }
};
