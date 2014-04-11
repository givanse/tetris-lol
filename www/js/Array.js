/**
 * Unit tests:
 * test/js/ArrayTest.js
 */

/**
 * Search for duplicate value.
 * - Shallow search
 * - Compares primitives only
 *
 * return - True if this array has duplicated values.
 */
Array.prototype.hasDuplicates = function() {
    for (var i = 0; i < this.length; i++) {

        var currentVal = this[i];
        for (var j = 0; j < this.length; j++) {

            if(i === j) continue; /* Same object, ignore it. */

            var val = this[j];
            if (currentVal === val) {
                return true;
            }
        }
    }
    return false;
}

/**
 * Test if a value is already contained in the array.
 * - Shallow search
 * - Compares primitives only
 *
 * return - True if the passed value is a already contained within the array,
 *          False otherwise.
 */
Array.prototype.isDuplicate = function(val) {
    for (var i = 0; i < this.length; i++) {
        var currentVal = this[i];
        if (currentVal === val) {
            return true;
        }
    }
    return false;
}

/* EOF */
