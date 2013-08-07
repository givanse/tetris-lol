/**
 *
 */

test("array hasDuplicates", function() {
    var arr = [];
    ok(!hasDuplicates(arr));

    arr = ['a'];
    ok(!hasDuplicates(arr));

    arr = [0];
    ok(!hasDuplicates(arr));

    arr = ['a', 'b'];
    ok(!hasDuplicates(arr), "two different letters");

    arr = [0, 1];
    ok(!hasDuplicates(arr), "two different numbers");

    arr = ['a', 'a'];
    ok(hasDuplicates(arr), "two equal letters");

    arr = [1, 1];
    ok(hasDuplicates(arr), "two equal numbers");

    arr = ["SSHP_R", "SQUARESHP", "SSHP_R", "SSHP_L", "LSHP_R", "LSHP_L"];
    ok(hasDuplicates(arr));

    arr = ["SSHP_R", "SQUARESHP", "LSHP_L"];
    ok(!hasDuplicates(arr));
});

/* EOF */
