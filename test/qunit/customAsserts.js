
/**
 *
 */
var compareSqrArrays = function(arrA, arrE) {
    if (arrE === null) {
        return arrA === null ? true : false;
    }
    if (arrA.length !== arrE.length) {
        return false;
    }

    for (var i = 0; i < arrE.length; i++) {
        var sqrA = arrA[i];
        var sqrE = arrE[i];

        if (sqrE === null) {
            if (sqrA === null) {
                continue;
            } else {
                return false;
            }
        }

        if ( ! sqrE.isEqual( sqrA ) ) {
            return false;
        }
    }
    return true;
};

/**
 * Assummes that if the first element of the Array is an Array, 
 * then every subsequent element is an Array too.
 */
var compareNestedSqrArrays = function(arrA, arrE) {
    if (arrE === null) {
        return arrA === null ? true : false;
    }
    if (arrA.length !== arrE.length) {
        return false;
    }

    /* the elements of the array are not arrays */
    if ( ! tlol.util.isArray( arrE[0] ) ) {
            return compareSqrArrays(arrA, arrE); 
    }

    for (var i = 0; i < arrE.length; i++) {
        var elemA = arrA[i];
        var elemE = arrE[i];
        if ( ! compareNestedSqrArrays(elemA, elemE) ) {
            return false;
        }
    }

    return true;
};

QUnit.extend(QUnit.assert, {
    equalSqrArr: function(arrSqrsAct, arrSqrsExp, message) {

        var result = compareNestedSqrArrays(arrSqrsAct, arrSqrsExp);

        QUnit.push(result, arrSqrsAct, arrSqrsExp, message);
    },

    /**
     * Just the opposite of the assertion above (equalSqrArr()).
     */
    notEqualSqrArr: function(arrSqrsAct, arrSqrsExp, message) {

        var result = compareNestedSqrArrays(arrSqrsAct, arrSqrsExp);

        QUnit.push(result === false, arrSqrsAct, arrSqrsExp, message);
    }
});

/*EOF*/
