function pow(a, b) {

    for (var c = a, d = 1; d != b; d++) {
            if (b == 0)  {
                return c = 1;
            } else if (a == 0 || b === -Infinity) {
                return c = 0;
            } else if (a === Infinity || b === Infinity) {
                return c = Infinity;
            } else if (a === -Infinity && b / 2 == Math.round(b / 2)) {
                return c = Infinity;
            } else if (a === -Infinity && b / 2 != Math.round(b / 2)) {
                return c = -Infinity;
            } else if (Math.abs(b) != b) {
                b = -b;
                return c = 1 / pow(a, b);
            } else {
                c *= a;
            }

        }

    console.log (c);

    return c;
}
