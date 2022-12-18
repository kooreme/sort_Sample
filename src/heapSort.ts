//ローカルスコープで環境を独立させる
{
    type AllowPrimitive = number | string;

    const swap = <T extends AllowPrimitive>(
        A: Array<T>,
        i: number,
        j: number
    ) => ([A[j], A[i]] = [A[i], A[j]]);

    //要素番号基準を0とする。その場合の親、子要素の取得
    const parent = (i: number) => Math.floor((i + 1) / 2 - 1);
    const leftChild = (i: number) => (i + 1) * 2 - 1;
    const rightChild = (i: number) => (i + 1) * 2;

    function shuffle<T extends AllowPrimitive>(arr: Array<T>): Array<T> {
        const tmp: Array<T> = [];
        let t: T;
        while ((t = arr.splice(Math.floor(Math.random() * arr.length), 1)[0]))
            tmp.push(t);
        return tmp;
    }

    function unheap<T extends AllowPrimitive>(A: Array<T>, i: number): void {
        while (i > 0) {
            let m = parent(i);
            if (A[m] < A[i]) swap(A, i, m);
            else break;
            i = m;
        }
    }

    function downheap<T extends AllowPrimitive>(A: Array<T>, i: number): void {
        let m = 0;
        let tmp = 0;
        while (true) {
            let lc = leftChild(m);
            let rc = rightChild(m);

            if (lc >= i) break;
            if (A[lc] > A[tmp]) tmp = lc;
            if (rc < i && A[rc] > A[tmp]) tmp = rc;
            if (tmp === m) break;
            swap(A, m, tmp);
            m = tmp;
        }
    }

    function heapSort<T extends AllowPrimitive>(A: Array<T>): void {
        const length = A.length;
        //A[0]をルートとして、A[1]から順番にヒープ木を構築
        for (let i = 1; i < length; i++) {
            unheap(A, i);
        }
        //A[0]（木の最大値）を論理的に取り除いた後、ヒープ木を再構築。これを繰り返して整列
        for (let i = length - 1; i > 0; i--) {
            swap(A, 0, i);
            downheap(A, i);
        }
    }

    function startHeapSort<T extends AllowPrimitive>(
        A: Array<T>,
        isDesc: boolean = false
    ): Array<T> {
        heapSort(A);
        return isDesc ? A.reverse() : A;
    }

    const A = shuffle(
        Array(26)
            .fill(0)
            .map((_, i) => String.fromCharCode(i + 65))
    );

    console.log(A);
    console.time("sortTime");
    console.log(startHeapSort(A));
    console.timeEnd("sortTime");
}
