import React, {useState, useMemo} from "react";
import {useSelector} from "react-redux";
import {RootState} from "../redux/reducer/root-reducer";
import SpecAdjoinMatrix from "../utils/spec-adjoin-martix";
import "./spec.css";
import {is} from "@babel/types";

const classNames = require("classnames");

const Spec: React.FC = () => {
    const {specList, specCombinationList} = useSelector((state: RootState) => state.spec);
    // 已选择的规格，长度为规格列表的长度
    //useState  相当于在state中申明了一下specsS中变量
    const [specsS, setSpecsS] = useState(Array(specList.length).fill(""));

    // 创建一个规格矩阵
    //useMemo是在变量发生变化时，会再次执行
    const specAdjoinMatrix = useMemo(() => new SpecAdjoinMatrix(specList, specCombinationList), [specList, specCombinationList]);
    // 获得可选项表
    const optionSpecs = specAdjoinMatrix.getSpecscOptions(specsS);

    const handleClick = function (bool: boolean, text: string, index: number) {
        // 排除可选规格里面没有的规格
        if (specsS[index] !== text && !bool) return;
        // 根据text判断是否已经被选中了
        specsS[index] = specsS[index] === text ? "" : text;
        console.log("test====", text);
        console.log("当前选中 ===", specsS)
        setSpecsS(specsS.slice());
    };

    return (
        <div className="container">
            {/*{console.log("与当前选中项中可选择的项=====", optionSpecs)}*/}
            {specList.map(({title, list}, index) => (
                <div key={index}>
                    <p className="title">{title}</p>
                    <div className="specBox">
                        {list.map((value, i) => {
                            const isOption = optionSpecs.includes(value); // 当前规格是否可选
                            const isActive = specsS.includes(value); // 当前规格是否被选
                            // console.log("isOption====", value + "=====" + isOption);
                            // console.log("isActive====", isActive);

                            return (
                                <span
                                    key={i}
                                    className={classNames({
                                        specOption: isOption,
                                        specAction: isActive,
                                        specDisabled: !isOption,
                                    })}
                                    onClick={() => handleClick(isOption, value, index)}
                                >
                  {value}
                </span>
                            );
                        })}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Spec;
