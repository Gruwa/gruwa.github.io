function pow(a, b) {
    for (var c = a, d = 1; d != b; d++) {
            c *= a;
        }

    console.log (c);
    
    return c;
}
