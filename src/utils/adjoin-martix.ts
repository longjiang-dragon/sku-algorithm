export type AdjoinType = Array<string>;

export default class AdjoinMatrix {
    vertex: AdjoinType; // 顶点数组(所有可选项)
    quantity: number; // 矩阵长度
    adjoinArray: Array<number>; // 矩阵数组

    constructor(vertx: AdjoinType) {
        console.log("AdjoinMatrix constructor====", vertx)
        this.vertex = vertx;
        this.quantity = this.vertex.length;
        this.adjoinArray = [];
        this.init();
    }

    // 初始化数组  长度：顶点 * 顶点
    init() {
        this.adjoinArray = Array(this.quantity * this.quantity).fill(0);
    }

    /*
     * @param id string  当前顶点
     * @param sides Array<string> 可达数组
     *  传入一个顶点，和当前顶点可达的顶点数组，将对应位置置为1
     */
    setAdjoinVertexs(id: string, sides: AdjoinType) {
        //确定当前顶点所在的行
        const pIndex = this.vertex.indexOf(id);
        sides.forEach((item) => {
            //顶点所在的列
            const index = this.vertex.indexOf(item);
            this.adjoinArray[pIndex * this.quantity + index] = 1;
        });
    }

    /*
     * @param id string
     * 传入顶点的值，获取该顶点的列
     */
    getVertexCol(id: string) {
        const index = this.vertex.indexOf(id);
        const col: Array<number> = [];
        this.vertex.forEach((item, pIndex) => {
            col.push(this.adjoinArray[index + this.quantity * pIndex]);
        });
        return col;
    }

    /*
     * @param params Array<string>
     * 传入一个顶点数组，根据顶点数组求出每个顶点的连线
     */
    getColSum(params: AdjoinType) {
        //返回的是一个数组列表
        const paramsVertex = params.map((id) => this.getVertexCol(id));
        console.log("getColSum===", paramsVertex)
        const paramsVertexSum: Array<number> = [];
        this.vertex.forEach((item, index) => {
            //求和
            const rowtotal = paramsVertex
                .map((value) => value[index])
                .reduce((total, current) => {
                    total += current || 0;
                    return total;
                }, 0);
            paramsVertexSum.push(rowtotal);
        });
        return paramsVertexSum;
    }

    /*
     *  @param params Array<string>
     * 传入一个顶点数组，求出并集
     */
    getCollection(params: AdjoinType) {
        const paramsColSum = this.getColSum(params);
        let collections: AdjoinType = [];
        paramsColSum.forEach((item, index) => {
            if (item && this.vertex[index]) collections.push(this.vertex[index]);
        });
        return collections;
    }

    /*
     *  @param params Array<string>
     * 传入一个顶点数组(当前选中的项)，求出交集
     */
    getUnions(params: AdjoinType) {
        //返回一个数组，数组是当前点的连线数量
        const paramsColSum = this.getColSum(params);
        console.log("params====", params)
        console.log("getUnions====", paramsColSum);
        let unions: AdjoinType = [];
        paramsColSum.forEach((count, index) => {
            console.log("item===", count);
            //为什么要大于params.length？这个方法是想获取符合选中项的item，所以只需要获取当前连线数量>=当前选中的点的数量就好
            if (count >= params.length && this.vertex[index]) {
                unions.push(this.vertex[index]);
            }
        });
        return unions;
    }
}
