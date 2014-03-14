/**
 *
 */

test("Array hasDuplicates", function() {
    var arr = [];
    ok(!arr.hasDuplicates());

    arr = ['a'];
    ok(!arr.hasDuplicates());

    arr = [0];
    ok(!arr.hasDuplicates());

    arr = ['a', 'b'];
    ok(!arr.hasDuplicates(), "two different letters");

    arr = [0, 1];
    ok(!arr.hasDuplicates(), "two different numbers");

    arr = ['a', 'a'];
    ok(arr.hasDuplicates(), "two equal letters");

    arr = [1, 1];
    ok(arr.hasDuplicates(), "two equal numbers");

    arr = ["SSHP_R", "SQUARESHP", "SSHP_R", "SSHP_L", "LSHP_R", "LSHP_L"];
    ok(arr.hasDuplicates());

    arr = ["SSHP_R", "SQUARESHP", "LSHP_L"];
    ok(!arr.hasDuplicates());
});

test("Array isDuplicate", function() {
    var arr = [];
    ok(!arr.isDuplicate(-1));

    arr = [];
    ok(!arr.isDuplicate(null));

    arr = [];
    ok(!arr.isDuplicate(0));

    arr = [];
    ok(!arr.isDuplicate(1));

    arr = [1];
    ok(arr.isDuplicate(1));

    arr = [33, 44, 55];
    ok(!arr.isDuplicate(3));

    arr = [33, 44, 55];
    ok(arr.isDuplicate(33));

    arr = [33, 44, 55];
    ok(arr.isDuplicate(44));

    arr = [33, 44, 55];
    ok(arr.isDuplicate(55));
});

/* EOF */
