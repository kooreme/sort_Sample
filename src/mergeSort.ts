//ローカルスコープで環境を独立させる
{   
    type AllowPrimitive = number | string;

    function shuffle<T extends AllowPrimitive>(arr: Array<T>): Array<T> {
        const tmp: Array<T> = [];
        let t: T
        while (t = arr.splice(Math.floor(Math.random() * arr.length), 1)[0]) tmp.push(t);
        return tmp;
    }

    function mergeSort<T extends AllowPrimitive>(left: Array<T>, right: Array<T>): Array<T> {
        let m: Array<T> = [];
        if (left.length > 1 || right.length > 1) {
            const newLeft = left.splice(0, Math.floor(left.length / 2));
            left = mergeSort(newLeft, left);
            const newRight = right.splice(0, Math.floor(right.length / 2));
            right = mergeSort(newRight, right);
        }
        m = merge(left, right);
        return m;
    }

    function merge<T extends AllowPrimitive>(left: Array<T>, right: Array<T>): Array<T> {
        let merge: Array<T> = [];
        for (let i = 0, j = 0; i < left.length || j < right.length;) {
            const leftElem = left[i], rightElem = right[j];
            //左要素の勝ち
            if ((leftElem && !rightElem) || leftElem <= rightElem) {
                merge.push(leftElem);
                i++;
            }
            //右要素の勝ち
            else {
                merge.push(rightElem);
                j++;
            }
        }
        return merge;
    }

    function startMergeSort<T extends AllowPrimitive>(arr: Array<T>, isDesc : boolean = false): Array<T> {
        let left = arr.splice(0, Math.floor(arr.length / 2));
        return isDesc ? mergeSort(left, arr).reverse() : mergeSort(left, arr);
    }
    //const A : Array<number> = shuffle(Array(100).fill(0).map((_, i) => i+1));
    const A: Array<number> = shuffle(Array(100).fill(0).map((_1, _2, a) => Math.floor(Math.random() * a.length) + 1));

    console.log(A);

    console.time("sortTime");
    console.log(startMergeSort(A));
    console.timeEnd("sortTime");
}