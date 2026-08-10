//Author: dlsdl v1.3
//Add format-metanum.js, fix basic operations, hyper operations and BEAF bugs
//Code snippets and templates from OmegaNum.js

;(function (globalScope) {
  "use strict";

  var MetaNum = {
    maxRows: 100,
    maxCols: 100,
    maxArrow: Number.MAX_SAFE_INTEGER,
    serializeMode: 0,
    debug: 0
  },

  external = true,

  metaNumError = "[MetaNumError] ",
  invalidArgument = metaNumError + "Invalid argument: ",

  MAX_SAFE_INTEGER = 9007199254740991,
  MAX_E = Math.log10(MAX_SAFE_INTEGER),

  P = {},
  Q = {},
  R = {};

  R.ZERO = 0;
  R.ONE = 1;
  R.NEGATIVE_ONE = -1;
  R.TWO = 2;
  R.TEN = 10;
  R.E = Math.E;
  R.LN2 = Math.LN2;
  R.LN10 = Math.LN10;
  R.LOG2E = Math.LOG2E;
  R.LOG10E = Math.LOG10E;
  R.PI = Math.PI;
  R.SQRT1_2 = Math.SQRT1_2;
  R.SQRT2 = Math.SQRT2;
  R.MAX_SAFE_INTEGER = Number.MAX_SAFE_INTEGER;
  R.MIN_SAFE_INTEGER = Number.MIN_SAFE_INTEGER;
  R.NaN = NaN;
  R.POSITIVE_INFINITY = Infinity;
  R.NEGATIVE_INFINITY = -Infinity;
  R.E_MAX_SAFE_INTEGER = "E" + MAX_SAFE_INTEGER;
  R.EE_MAX_SAFE_INTEGER = "EE" + MAX_SAFE_INTEGER;
  R.TETRATED_MAX_SAFE_INTEGER = "F" + MAX_SAFE_INTEGER;
  R.PENTATED_MAX_SAFE_INTEGER = "G" + MAX_SAFE_INTEGER;
  R.TRITRI = "[[3638334640023.7783, 7625597484984]]";
  R.GRAHAMS_NUMBER = "[[3638334640023.7783,7625597484984,0,1],[63,0,1]]";//对3↑↑↑↑3(≈GE^7625597484984 3638334640023.7783)做63次ω级运算
  R.TERR3 = "[[10],[1,374389,2],[1,374387,2],[1,374385,2],[1,374383,2],[1,374381,2],[1,374379,2],[1,374377,2],[1,374375,2],[1,374373,2],[1,374371,2]]"; //注意是TERR而不是TREE，详见https://www.bilibili.com/video/BV1X94y1n7D1
  R.QqQe308 = "QqQe308";

  function cmpArr(a, b) {
    var al = a.length;
    while (al > 0 && a[al - 1] === 0) al--;
    var bl = b.length;
    while (bl > 0 && b[bl - 1] === 0) bl--;
    if (al !== bl) return al > bl ? 1 : -1;
    for (var i = al - 1; i >= 0; i--) {
      if (a[i] > b[i]) return 1;
      if (a[i] < b[i]) return -1;
    }
    return 0;
  }

  function isZeroArr(arr) {
    if (!arr || arr.length === 0) return true;
    for (var i = 0; i < arr.length; i++) {
      if (arr[i] !== 0) return false;
    }
    return true;
  }

  function deepCloneArray(arr) {
    var result = [];
    for (var i = 0; i < arr.length; i++) {
      result[i] = arr[i].slice(0);
    }
    return result;
  }

  var debugMessageSent = false;

  var f_gamma = function (n) {
    if (!isFinite(n)) return n;
    if (n < -50) {
      if (n == Math.trunc(n)) return Number.NEGATIVE_INFINITY;
      return 0;
    }
    var scal1 = 1;
    while (n < 10) {
      scal1 = scal1 * n;
      ++n;
    }
    n -= 1;
    var l = 0.9189385332046727;
    l += (n + 0.5) * Math.log(n);
    l -= n;
    var n2 = n * n;
    var np = n;
    l += 1 / (12 * np);
    np *= n2;
    l -= 1 / (360 * np);
    np *= n2;
    l += 1 / (1260 * np);
    np *= n2;
    l -= 1 / (1680 * np);
    np *= n2;
    l += 1 / (1188 * np);
    np *= n2;
    l -= 691 / (360360 * np);
    np *= n2;
    l += 7 / (1092 * np);
    np *= n2;
    l -= 3617 / (122400 * np);
    return Math.exp(l) / scal1;
  };

  var f_logGamma = function (n) {
    if (!isFinite(n) || n <= 0) return NaN;
    var scalLog = 0;
    while (n < 10) {
      scalLog += Math.log(n);
      ++n;
    }
    n -= 1;
    var l = 0.9189385332046727;
    l += (n + 0.5) * Math.log(n);
    l -= n;
    var n2 = n * n;
    var np = n;
    l += 1 / (12 * np);
    np *= n2;
    l -= 1 / (360 * np);
    np *= n2;
    l += 1 / (1260 * np);
    np *= n2;
    l -= 1 / (1680 * np);
    np *= n2;
    l += 1 / (1188 * np);
    np *= n2;
    l -= 691 / (360360 * np);
    np *= n2;
    l += 7 / (1092 * np);
    np *= n2;
    l -= 3617 / (122400 * np);
    return (l - scalLog) / Math.LN10;
  };

  var OMEGA = 0.56714329040978387299997;

  var f_lambertw = function (z, tol, principal) {
    if (tol === undefined) tol = 1e-10;
    if (principal === undefined) principal = true;
    var w;
    if (!Number.isFinite(z)) return z;
    if (principal) {
      if (z === 0) return z;
      if (z === 1) return OMEGA;
      if (z < 10) w = 0;
      else w = Math.log(z) - Math.log(Math.log(z));
    } else {
      if (z === 0) return -Infinity;
      if (z <= -0.1) w = -2;
      else w = Math.log(-z) - Math.log(-Math.log(-z));
    }
    for (var i = 0; i < 100; ++i) {
      var wn = (z * Math.exp(-w) + w * w) / (w + 1);
      if (Math.abs(wn - w) < tol * Math.abs(wn)) return wn;
      w = wn;
    }
    throw Error("Iteration failed to converge: " + z);
  };

  var d_lambertw = function (z, tol, principal) {
    if (tol === undefined) tol = 1e-10;
    if (principal === undefined) principal = true;
    z = new MetaNum(z);
    var w;
    if (!z.isFinite()) return z;
    if (principal) {
      if (z.eq(MetaNum.ZERO)) return z;
      if (z.eq(MetaNum.ONE)) return new MetaNum(OMEGA);
      w = MetaNum.ln(z);
    } else {
      if (z.eq(MetaNum.ZERO)) return MetaNum.NEGATIVE_INFINITY.clone();
      w = MetaNum.ln(z.neg());
    }
    for (var i = 0; i < 100; ++i) {
      var ew = w.neg().exp();
      var wewz = w.sub(z.mul(ew));
      var dd = w.add(MetaNum.ONE).sub(w.add(2).mul(wewz).div(MetaNum.mul(2, w).add(2)));
      if (dd.eq(MetaNum.ZERO)) return w;
      var wn = w.sub(wewz.div(dd));
      if (MetaNum.abs(wn.sub(w)).lt(MetaNum.abs(wn).mul(tol))) return wn;
      w = wn;
    }
    throw Error("Iteration failed to converge: " + z);
  };

  var decimalPlaces = function (value, places) {
    var len = places + 1;
    var numDigits = Math.ceil(Math.log10(Math.abs(value)));
    if (numDigits < 100) numDigits = 0;
    var rounded = Math.round(value * Math.pow(10, len - numDigits)) * Math.pow(10, numDigits - len);
    return parseFloat(rounded.toFixed(Math.max(len - numDigits, 0)));
  };

  var log10PosBigInt = function (input) {
    var exp = BigInt(64);
    while (input >= BigInt(1) << exp) exp *= BigInt(2);
    var expdel = exp / BigInt(2);
    while (expdel > BigInt(0)) {
      if (input >= BigInt(1) << exp) exp += expdel;
      else exp -= expdel;
      expdel /= BigInt(2);
    }
    var cutbits = exp - BigInt(54);
    var firstbits = input >> cutbits;
    return Math.log10(Number(firstbits)) + Math.LOG10E / Math.LOG2E * Number(cutbits);
  };

  var LONG_STRING_MIN_LENGTH = 17;

  var log10LongString = function (str) {
    return Math.log10(Number(str.substring(0, LONG_STRING_MIN_LENGTH))) + (str.length - LONG_STRING_MIN_LENGTH);
  };

  P.normalize = function () {
    var b;
    var x = this;

    if (!x.array || !Array.isArray(x.array) || x.array.length === 0) {
      x.array = [[0]];
    }
    if (x.sign !== 1 && x.sign !== -1 && x.sign !== 2 && x.sign !== -2) {
      // For invalid signs, try to interpret: negative → -1, positive → 1
      var s = Number(x.sign);
      if (isNaN(s)) s = 1;
      x.sign = s < 0 ? -1 : 1;
    }
    if (typeof x.layer !== 'number' || !isFinite(x.layer) || x.layer < 0) {
      x.layer = 0;
    }
    x.layer = Math.floor(x.layer);

    for (var i = 0; i < x.array.length; i++) {
      if (!Array.isArray(x.array[i])) {
        x.array[i] = [x.array[i]];
      }
    }

    if (x.array[0] && x.array[0].length > 0) {
      if (isNaN(x.array[0][0])) {
        x.array = [[NaN]];
        x.sign = 1;
        x.layer = 0;
        return x;
      }
      if (!isFinite(x.array[0][0])) {
        x.array = [[x.array[0][0] === Infinity ? Infinity : -Infinity]];
        x.sign = 1;
        x.layer = 0;
        return x;
      }
    }

    var r0 = x.array[0];
    for (var i = 0; i < r0.length; i++) {
      if (r0[i] === null || r0[i] === undefined) {
        r0[i] = 0;
        continue;
      }
      if (i !== 0 && !Number.isInteger(r0[i])) r0[i] = Math.floor(r0[i]);
    }

    var small = isSmall(x);

    do {
      b = false;

      while (r0.length > 1 && r0[r0.length - 1] === 0) {
        r0.pop();
        b = true;
      }

      // Normalize r0[0] only for non-small values
      if (!small && x.layer === 0 && r0[0] > MAX_SAFE_INTEGER) {
        r0[1] = (r0[1] || 0) + 1;
        r0[0] = Math.log10(r0[0]);
        b = true;
      }

      while (!small && x.layer === 0 && r0.length > 1 && r0[0] < MAX_E && r0[1]) {
        r0[0] = Math.pow(10, r0[0]);
        r0[1]--;
        b = true;
      }

      // Intermediate zero compression: [base, 0, ..., n] → [1, base, ..., n-1]
      // This ensures F^n(base) = F^{n-1}(E^{base}(1)) for canonical representation
      // e.g., [10, 0, 2] → [1, 10, 1], then expands to [10^10, 8, 1]
      //       [10, 9, 1] → [10^10, 8, 1] (via E-expansion), same result
      if (!small && x.layer === 0 && r0.length > 2 && !r0[1]) {
        for (var i = 2; !r0[i]; ++i) continue;
        r0[i - 1] = r0[0];
        r0[0] = 1;
        r0[i]--;
        b = true;
      }

      for (var i = 1; i < r0.length; i++) {
        if (!small && r0[i] > MAX_SAFE_INTEGER) {
          r0[i + 1] = (r0[i + 1] || 0) + 1;
          r0[0] = r0[i] + 1;
          for (var j = 1; j <= i; j++) r0[j] = 0;
          b = true;
        }
      }

      while (x.array.length > 1 && isZeroArr(x.array[x.array.length - 1])) {
        x.array.pop();
        b = true;
      }

      if (x.array.length > MetaNum.maxRows) {
        x.array = x.array.slice(x.array.length - MetaNum.maxRows);
        b = true;
      }

      for (var i = 0; i < x.array.length; i++) {
        if (x.array[i].length > MetaNum.maxCols) {
          x.array[i] = x.array[i].slice(0, MetaNum.maxCols);
          b = true;
        }
      }

      if (x.array.length === 0) {
        x.array = [[0]];
        b = true;
      }

      for (var i = 0; i < x.array.length; i++) {
        for (var j = 0; j < x.array[i].length; j++) {
          if (x.array[i][j] === null || x.array[i][j] === undefined) {
            x.array[i][j] = 0;
            b = true;
          }
          if ((i > 0 || j > 0) && (!isFinite(x.array[i][j]) || isNaN(x.array[i][j]))) {
            x.array[i][j] = 0;
            b = true;
          }
        }
      }

      for (var i = 1; i < x.array.length; i++) {
        var row = x.array[i];
        while (row.length > 0 && row[row.length - 1] === 0) {
          row.pop();
          b = true;
        }
      }

      if (x.array.length > 2) {
        var rows2plus = x.array.slice(1);
        rows2plus.sort(function (a, b) { return cmpArr(a, b); });
        var orderChanged = false;
        for (var i = 0; i < rows2plus.length; i++) {
          if (cmpArr(rows2plus[i], x.array[i + 1]) !== 0) {
            orderChanged = true;
            break;
          }
        }
        if (orderChanged) {
          for (var i = 0; i < rows2plus.length; i++) {
            x.array[i + 1] = rows2plus[i].slice(0);
          }
          b = true;
        }
      }

      for (var i = x.array.length - 1; i > 1; i--) {
        var rowA = x.array[i];
        var rowB = x.array[i - 1];
        if (rowA.length === rowB.length && rowA.length >= 2) {
          var same = true;
          for (var k = 1; k < rowA.length; k++) {
            if (rowA[k] !== rowB[k]) { same = false; break; }
          }
          if (same) {
            rowB[0] += rowA[0];
            x.array.splice(i, 1);
            b = true;
          }
        }
      }

    } while (b);

    if (!x.array.length || !x.array[0]) {
      x.array = [[0]];
      x.sign = isSmall(x) ? 2 : 1;
    }

    // Normalize zero sign: 0 is always positive
    if (x.array.length === 1 && x.array[0].length === 1 && x.array[0][0] === 0 && (x.sign === -1 || x.sign === -2)) {
      x.sign = x.sign === -2 ? 2 : 1;
    }

    // Layer is managed explicitly by layerUp/layerDown, not computed from array.
    // Do not recompute layer here - preserve the value set by the caller/parser.

    return x;
  };

  var standardizeMessageSent = false;
  P.standardize = function () {
    if (!standardizeMessageSent) console.warn(metaNumError + "'standardize' method is being deprecated in favor of 'normalize' and will be removed in the future!"), standardizeMessageSent = true;
    return this.normalize();
  };

  P.absoluteValue = P.abs = function () {
    var x = this.clone();
    // sign=1→1, sign=-1→1, sign=2→2, sign=-2→2
    x.sign = x.sign === 2 || x.sign === -2 ? 2 : 1;
    return x;
  };
  Q.absoluteValue = Q.abs = function (x) {
    return new MetaNum(x).abs();
  };

  P.negate = P.neg = function () {
    var x = this.clone();
    // 1↔-1, 2↔-2
    x.sign = x.sign === 1 ? -1 : x.sign === -1 ? 1 : x.sign === 2 ? -2 : 2;
    return x.normalize();
  };
  Q.negate = Q.neg = function (x) {
    return new MetaNum(x).neg();
  };

  P.compareTo = P.cmp = function (other) {
    if (!(other instanceof MetaNum)) other = new MetaNum(other);

    if (this.array[0] && isNaN(this.array[0][0])) return NaN;
    if (other.array[0] && isNaN(other.array[0][0])) return NaN;

    var tInf = this.array[0] && this.array[0][0] === Infinity;
    var oInf = other.array[0] && other.array[0][0] === Infinity;

    if (tInf && !oInf) return this.sign;
    if (!tInf && oInf) return -other.sign;
    if (tInf && oInf) {
      if (this.sign !== other.sign) return this.sign;
      return 0;
    }

    var tAllZero = (this.array.length === 1 && this.array[0].length === 1 && this.array[0][0] === 0);
    var oAllZero = (other.array.length === 1 && other.array[0].length === 1 && other.array[0][0] === 0);
    if (tAllZero && oAllZero) return 0;

    // Small value comparison (similar to PowiainaNum)
    var tSmall = isSmall(this);
    var oSmall = isSmall(other);
    var tNormSign = toNormalizedSign(this.sign);
    var oNormSign = toNormalizedSign(other.sign);

    if (tNormSign !== oNormSign) return tNormSign;

    // If one is small and the other is not
    // Special case: if the non-small value is zero, the small value's sign determines the result
    if (tSmall && !oSmall) {
      if (oAllZero) return tNormSign; // small positive > 0, small negative < 0
      return tNormSign === 1 ? -1 : 1;
    }
    if (oSmall && !tSmall) {
      if (tAllZero) return -oNormSign; // 0 < small positive, 0 > small negative
      return tNormSign === 1 ? 1 : -1;
    }

    var m = tNormSign;
    // If both are small, reverse comparison
    if (tSmall && oSmall) m = -m;

    if (this.layer !== other.layer) {
      return (this.layer > other.layer ? 1 : -1) * m;
    }

    var tRows = this.array.length;
    var oRows = other.array.length;
    while (tRows > 1 && isZeroArr(this.array[tRows - 1])) tRows--;
    while (oRows > 1 && isZeroArr(other.array[oRows - 1])) oRows--;

    if (tRows !== oRows) return (tRows > oRows ? 1 : -1) * m;

    for (var i = tRows - 1; i >= 0; i--) {
      var c = cmpArr(this.array[i], other.array[i]);
      if (c !== 0) return c * m;
    }

    return 0;
  };
  Q.compare = Q.cmp = function (x, y) {
    return new MetaNum(x).cmp(y);
  };

  P.greaterThan = P.gt = function (other) {
    return this.cmp(other) > 0;
  };
  Q.greaterThan = Q.gt = function (x, y) {
    return new MetaNum(x).gt(y);
  };

  P.greaterThanOrEqualTo = P.gte = function (other) {
    return this.cmp(other) >= 0;
  };
  Q.greaterThanOrEqualTo = Q.gte = function (x, y) {
    return new MetaNum(x).gte(y);
  };

  P.lessThan = P.lt = function (other) {
    return this.cmp(other) < 0;
  };
  Q.lessThan = Q.lt = function (x, y) {
    return new MetaNum(x).lt(y);
  };

  P.lessThanOrEqualTo = P.lte = function (other) {
    return this.cmp(other) <= 0;
  };
  Q.lessThanOrEqualTo = Q.lte = function (x, y) {
    return new MetaNum(x).lte(y);
  };

  P.equalsTo = P.equal = P.eq = function (other) {
    return this.cmp(other) === 0;
  };
  Q.equalsTo = Q.equal = Q.eq = function (x, y) {
    return new MetaNum(x).eq(y);
  };

  P.notEqualsTo = P.notEqual = P.neq = function (other) {
    return this.cmp(other) !== 0;
  };
  Q.notEqualsTo = Q.notEqual = Q.neq = function (x, y) {
    return new MetaNum(x).neq(y);
  };

  P.minimum = P.min = function (other) {
    return this.lt(other) ? this.clone() : new MetaNum(other);
  };
  Q.minimum = Q.min = function (x, y) {
    return new MetaNum(x).min(y);
  };

  P.maximum = P.max = function (other) {
    return this.gt(other) ? this.clone() : new MetaNum(other);
  };
  Q.maximum = Q.max = function (x, y) {
    return new MetaNum(x).max(y);
  };

  P.compareTo_tolerance = P.cmp_tolerance = function (other, tolerance) {
    if (!(other instanceof MetaNum)) other = new MetaNum(other);
    return this.eq_tolerance(other, tolerance) ? 0 : this.cmp(other);
  };
  Q.compare_tolerance = Q.cmp_tolerance = function (x, y, tolerance) {
    return new MetaNum(x).cmp_tolerance(y, tolerance);
  };

  P.greaterThan_tolerance = P.gt_tolerance = function (other, tolerance) {
    if (!(other instanceof MetaNum)) other = new MetaNum(other);
    return !this.eq_tolerance(other, tolerance) && this.gt(other);
  };
  Q.greaterThan_tolerance = Q.gt_tolerance = function (x, y, tolerance) {
    return new MetaNum(x).gt_tolerance(y, tolerance);
  };

  P.greaterThanOrEqualTo_tolerance = P.gte_tolerance = function (other, tolerance) {
    if (!(other instanceof MetaNum)) other = new MetaNum(other);
    return this.eq_tolerance(other, tolerance) || this.gt(other);
  };
  Q.greaterThanOrEqualTo_tolerance = Q.gte_tolerance = function (x, y, tolerance) {
    return new MetaNum(x).gte_tolerance(y, tolerance);
  };

  P.lessThan_tolerance = P.lt_tolerance = function (other, tolerance) {
    if (!(other instanceof MetaNum)) other = new MetaNum(other);
    return !this.eq_tolerance(other, tolerance) && this.lt(other);
  };
  Q.lessThan_tolerance = Q.lt_tolerance = function (x, y, tolerance) {
    return new MetaNum(x).lt_tolerance(y, tolerance);
  };

  P.lessThanOrEqualTo_tolerance = P.lte_tolerance = function (other, tolerance) {
    if (!(other instanceof MetaNum)) other = new MetaNum(other);
    return this.eq_tolerance(other, tolerance) || this.lt(other);
  };
  Q.lessThanOrEqualTo_tolerance = Q.lte_tolerance = function (x, y, tolerance) {
    return new MetaNum(x).lte_tolerance(y, tolerance);
  };

  P.equalsTo_tolerance = P.equal_tolerance = P.eq_tolerance = function (other, tolerance) {
    if (!(other instanceof MetaNum)) other = new MetaNum(other);
    if (tolerance == null) tolerance = 1e-7;
    if (this.isNaN() || other.isNaN() || this.isFinite() != other.isFinite()) return false;
    if (toNormalizedSign(this.sign) !== toNormalizedSign(other.sign)) return false;
    if (this.layer !== other.layer) return false;
    var a, b, tR = this.array.length, oR = other.array.length;
    if (tR <= 1 && oR <= 1) {
      a = this.array[0] ? this.array[0][0] || 0 : 0;
      b = other.array[0] ? other.array[0][0] || 0 : 0;
      return Math.abs(a - b) <= tolerance * Math.max(Math.abs(a), Math.abs(b));
    }
    if (Math.abs(tR - oR) > 1) return false;
    for (var i = Math.max(tR, oR) - 1; i >= 0; i--) {
      var tRow = this.array[i] || [0];
      var oRow = other.array[i] || [0];
      if (cmpArr(tRow, oRow) !== 0) return false;
    }
    return true;
  };
  Q.equalsTo_tolerance = Q.equal_tolerance = Q.eq_tolerance = function (x, y, tolerance) {
    return new MetaNum(x).eq_tolerance(y, tolerance);
  };

  P.notEqualsTo_tolerance = P.notEqual_tolerance = P.neq_tolerance = function (other, tolerance) {
    return !this.eq_tolerance(other, tolerance);
  };
  Q.notEqualsTo_tolerance = Q.notEqual_tolerance = Q.neq_tolerance = function (x, y, tolerance) {
    return new MetaNum(x).neq_tolerance(y, tolerance);
  };

  P.isPositive = P.ispos = function () {
    return this.gt(MetaNum.ZERO);
  };
  Q.isPositive = Q.ispos = function (x) {
    return new MetaNum(x).ispos();
  };

  P.isNegative = P.isneg = function () {
    return this.lt(MetaNum.ZERO);
  };
  Q.isNegative = Q.isneg = function (x) {
    return new MetaNum(x).isneg();
  };

  P.isNaN = function () {
    return this.array[0] && isNaN(this.array[0][0]);
  };
  Q.isNaN = function (x) {
    return new MetaNum(x).isNaN();
  };

  P.isFinite = function () {
    if (!this.array[0]) return true;
    return isFinite(this.array[0][0]);
  };
  Q.isFinite = function (x) {
    return new MetaNum(x).isFinite();
  };

  P.isInfinite = function () {
    return this.array[0] && this.array[0][0] === Infinity;
  };
  Q.isInfinite = function (x) {
    return new MetaNum(x).isInfinite();
  };

  P.layerUp = function () {
    var x = this.clone();
    if (x.isNaN()) return x;

    var actualRows = x.array.length;
    while (actualRows > 1 && isZeroArr(x.array[actualRows - 1])) actualRows--;

    if (actualRows <= 1) return x;

    var maxRow = x.array[actualRows - 1];
    x.array[0] = maxRow.slice(0);
    x.array = [x.array[0]];
    var savedLayer = x.layer + 1;
    x.layer = savedLayer;
    x.normalize();
    x.layer = savedLayer;
    return x;
  };
  Q.layerUp = function (x) {
    return new MetaNum(x).layerUp();
  };

  P.layerDown = function () {
    var x = this.clone();
    if (x.isNaN() || x.layer <= 0) return x;

    var hasRowsAfter = false;
    for (var i = 1; i < x.array.length; i++) {
      if (!isZeroArr(x.array[i])) {
        hasRowsAfter = true;
        break;
      }
    }

    if (hasRowsAfter) return x;

    if (x.array.length < 2) x.array.push([0]);
    x.array[1] = x.array[0].slice(0);
    x.array[0] = [0];
    var savedLayer = x.layer - 1;
    x.layer = savedLayer;
    x.normalize();
    x.layer = savedLayer;
    return x;
  };
  Q.layerDown = function (x) {
    return new MetaNum(x).layerDown();
  };

  function isSimple(x) {
    return x.layer === 0 && x.array.length === 1 &&
           x.array[0].length === 1 && isFinite(x.array[0][0]) &&
           Math.abs(x.array[0][0]) <= MAX_SAFE_INTEGER;
  }

  function isSmall(x) {
    return x.sign === 2 || x.sign === -2;
  }

  function isNumeric(x) {
    return x.layer === 0 && x.array.length === 1 &&
           x.array[0].length === 1 && isFinite(x.array[0][0]);
  }

  function computeLayer(arr) {
    // Layer represents ω^ nesting level above the ordinal represented by the array.
    // For all normal ordinal operations (up to ω^(maxcols-1) level), layer is 0.
    // Layer 1 = ω^(array ordinal), layer 2 = ω^ω^(array ordinal), etc.
    // Layer is managed explicitly by layerUp/layerDown, not computed from array.
    return 0;
  }

  function toNormalizedSign(s) {
    // Map sign=2/-2 to the corresponding normal sign for the array data
    return s === 2 ? 1 : s === -2 ? -1 : s;
  }

  function hyperLevel(n, val) {
    var arr = new Array(n + 1);
    for (var i = 0; i <= n; i++) arr[i] = 0;
    arr[0] = val;
    arr[n] = 1;
    return new MetaNum([arr]);
  }

  function hyperLevelSafe(n, val) {
    var arr = new Array(n + 1);
    for (var i = 0; i <= n; i++) arr[i] = 0;
    arr[0] = val;
    arr[n] = 1;
    var oldMaxCols = MetaNum.maxCols;
    MetaNum.maxCols = Math.max(oldMaxCols, n + 1);
    var r = new MetaNum([arr]);
    MetaNum.maxCols = oldMaxCols;
    return r;
  }

  function addOrdinalRow(metaNum, count, rawLevel) {
    // Add an ordinal row [count, raw_level] to the MetaNum
    // If there's already an ordinal row with the same level, merge counts
    var x = metaNum.clone();
    if (typeof rawLevel !== 'number' || !isFinite(rawLevel) || rawLevel < 0) {
      return x;
    }
    if (count <= 0) return x;
    // Try to merge with existing row at the same level
    for (var i = 1; i < x.array.length; i++) {
      var row = x.array[i];
      if (row.length === 2 && row[1] === rawLevel) {
        row[0] += count;
        return x;
      }
    }
    if (x.array.length < MetaNum.maxRows) {
      x.array.push([count, rawLevel]);
    }
    return x;
  }

  P.plus = P.add = function (other) {
    var x = this.clone();
    other = new MetaNum(other);

    if (x.sign === -1) return x.neg().add(other.neg()).neg();
    if (x.sign === -2) return x.neg().add(other.neg()).neg();
    if (other.sign === -1) return x.sub(other.neg());
    if (other.sign === -2) return x.sub(other.neg());
    if (x.eq(MetaNum.ZERO)) return other;
    if (other.eq(MetaNum.ZERO)) return x;
    if (x.isNaN() || other.isNaN()) return MetaNum.NaN.clone();
    if (x.isInfinite() && other.isInfinite() && x.eq(other.neg())) return MetaNum.NaN.clone();
    if (x.isInfinite()) return x;
    if (other.isInfinite()) return other;

    // For simple numbers, use direct numeric addition
    if (isSimple(x) && isSimple(other)) {
      var directSum = x.toNumber() + other.toNumber();
      if (isFinite(directSum)) return new MetaNum(directSum);
    }

    var xIsSmall = isSmall(x);
    var oIsSmall = isSmall(other);

    var p = x.min(other);
    var q = x.max(other);
    var t;

    // If one is normal huge and other is small: huge dominates
    if (xIsSmall !== oIsSmall) {
      // One is small, one is normal → the normal (non-small) dominates
      return oIsSmall ? x.clone() : other.clone();
    }

    if (xIsSmall && oIsSmall) {
      // Both small: add as reciprocals, then reciprocalize result
      var xInv = x.clone(); xInv.sign = 1; // small positive → large positive
      var oInv = other.clone(); oInv.sign = 1;
      var sumInv = xInv.add(oInv);
      var result = sumInv.rec();
      return result;
    }

    // Normal (non-small) addition
    if (q.gt(MetaNum.E_MAX_SAFE_INTEGER) || q.div(p).gt(MetaNum.MAX_SAFE_INTEGER)) {
      t = q;
    } else if (!q.array[0][1]) {
      t = new MetaNum(x.toNumber() + other.toNumber());
    } else if (q.array[0][1] === 1) {
      var a = p.array[0][1] ? p.array[0][0] : Math.log10(p.array[0][0]);
      t = new MetaNum([a + Math.log10(Math.pow(10, q.array[0][0] - a) + 1), 1]);
    }

    return t;
  };
  Q.plus = Q.add = function (x, y) {
    return new MetaNum(x).add(y);
  };

  P.minus = P.sub = function (other) {
    var x = this.clone();
    other = new MetaNum(other);

    if (x.sign === -1 || x.sign === -2) return x.neg().sub(other.neg()).neg();
    if (other.sign === -1 || other.sign === -2) return x.add(other.neg());
    if (x.isNaN() || other.isNaN()) return MetaNum.NaN.clone();
    if (x.isInfinite() && other.isInfinite()) return MetaNum.NaN.clone();
    if (x.isInfinite()) return x;
    if (other.isInfinite()) return other.neg();
    if (x.eq(other)) return MetaNum.ZERO.clone();
    if (other.eq(MetaNum.ZERO)) return x;

    var p = x.min(other);
    var q = x.max(other);
    var n = other.gt(x);
    var t;

    // For very large q, subtraction of small values is negligible
    if (q.gt(MetaNum.E_MAX_SAFE_INTEGER)) {
      t = q.clone();
      t = n ? t.neg() : t;
    } else if (q.div(p).gt(MetaNum.MAX_SAFE_INTEGER)) {
      t = q.clone();
      t = n ? t.neg() : t;
    } else if (!q.array[0][1]) {
      t = new MetaNum(x.toNumber() - other.toNumber());
    } else if (q.array[0][1] === 1) {
      var a = p.array[0][1] ? p.array[0][0] : Math.log10(p.array[0][0]);
      t = new MetaNum([a + Math.log10(Math.pow(10, q.array[0][0] - a) - 1), 1]);
      t = n ? t.neg() : t;
    }

    return t;
  };
  Q.minus = Q.sub = function (x, y) {
    return new MetaNum(x).sub(y);
  };

  P.times = P.mul = function (other) {
    var x = this.clone();
    other = new MetaNum(other);

    var xNS = toNormalizedSign(x.sign);
    var oNS = toNormalizedSign(other.sign);
    var resultNormSign = xNS * oNS;

    if (resultNormSign === -1) return x.abs().mul(other.abs()).neg();
    if (x.sign === -2 || x.sign === -1) return x.abs().mul(other.abs());
    if (x.isNaN() || other.isNaN()) return MetaNum.NaN.clone();
    if (x.eq(MetaNum.ZERO) && other.isInfinite()) return MetaNum.NaN.clone();
    if (x.isInfinite() && other.eq(MetaNum.ZERO)) return MetaNum.NaN.clone();
    if (other.eq(MetaNum.ZERO)) return MetaNum.ZERO.clone();
    if (other.eq(MetaNum.ONE)) return x.clone();
    if (x.eq(MetaNum.ZERO)) return MetaNum.ZERO.clone();
    if (x.eq(MetaNum.ONE)) return other.clone();
    if (x.isInfinite()) return x;
    if (other.isInfinite()) return other;

    if (x.max(other).gt(MetaNum.EE_MAX_SAFE_INTEGER)) return x.max(other);

    if (isSimple(x) && isSimple(other) && !isSmall(x) && !isSmall(other)) {
      var nx = x.array[0][0];
      var ny = other.array[0][0];
      var n = nx * ny;
      if (isFinite(n) && n !== 0 && Math.abs(n) <= MAX_SAFE_INTEGER) {
        if (Math.abs(n) < 1) return new MetaNum(1 / Math.abs(n)).rec();
        return new MetaNum(n);
      }
    }

    // General case: result = 10^(log10(x) + log10(y))
    var logSum = x.log10().add(other.log10());
    // If logSum is negative (result < 1), compute as reciprocal of positive power
    if (logSum.sign === -1) {
      var posLog = logSum.abs();
      var posResult = MetaNum.pow(MetaNum.TEN, posLog);
      return posResult.rec();
    }
    return MetaNum.pow(MetaNum.TEN, logSum);
  };
  Q.times = Q.mul = function (x, y) {
    return new MetaNum(x).mul(y);
  };

  P.divide = P.div = function (other) {
    var x = this.clone();
    other = new MetaNum(other);

    var xNS = toNormalizedSign(x.sign);
    var oNS = toNormalizedSign(other.sign);
    var resultNormSign = xNS * oNS;

    if (resultNormSign === -1) return x.abs().div(other.abs()).neg();
    if (x.sign === -2 || x.sign === -1) return x.abs().div(other.abs());
    if (x.isNaN() || other.isNaN()) return MetaNum.NaN.clone();
    if (x.isInfinite() && other.isInfinite()) return MetaNum.NaN.clone();
    if (x.eq(MetaNum.ZERO) && other.eq(MetaNum.ZERO)) return MetaNum.NaN.clone();
    if (other.eq(MetaNum.ZERO)) return MetaNum.POSITIVE_INFINITY.clone();
    if (other.eq(MetaNum.ONE)) return x.clone();
    if (x.eq(other)) return MetaNum.ONE.clone();
    if (x.isInfinite()) return x;
    if (other.isInfinite()) return MetaNum.ZERO.clone();

    if (x.max(other).gt(MetaNum.EE_MAX_SAFE_INTEGER)) {
      // Only shortcut if the result would be dominated by one operand
      if (x.gt(other)) return x.clone();
      // Otherwise compute properly (result is a small value)
      var logDiff = x.log10().sub(other.log10());
      if (logDiff.sign === -1) {
        return MetaNum.pow(MetaNum.TEN, logDiff.abs()).rec();
      }
      return MetaNum.pow(MetaNum.TEN, logDiff);
    }

    if (x.eq(MetaNum.ZERO)) return MetaNum.ZERO.clone();
    if (isSimple(x) && isSimple(other) && !isSmall(x) && !isSmall(other)) {
      var nx = x.array[0][0];
      var ny = other.array[0][0];
      var n = nx / ny;
      if (isFinite(n) && n !== 0 && Math.abs(n) <= MAX_SAFE_INTEGER) {
        if (Math.abs(n) < 1) return new MetaNum(1 / Math.abs(n)).rec();
        return new MetaNum(n);
      }
    }

    // General case: result = 10^(log10(x) - log10(y))
    var logDiff = x.log10().sub(other.log10());
    // If logDiff is negative (result < 1), compute as reciprocal of positive power
    if (logDiff.sign === -1) {
      var posLog = logDiff.abs();
      var posResult = MetaNum.pow(MetaNum.TEN, posLog);
      return posResult.rec();
    }
    var result = MetaNum.pow(MetaNum.TEN, logDiff);
    var fp = result.floor();
    if (result.sub(fp).abs().lt(new MetaNum(1e-9))) return fp;
    return result;
  };
  Q.divide = Q.div = function (x, y) {
    return new MetaNum(x).div(y);
  };

  P.reciprocate = P.rec = function () {
    if (this.isNaN()) return MetaNum.NaN.clone();
    if (this.eq(MetaNum.ZERO)) return MetaNum.NaN.clone();
    if (this.isInfinite()) return MetaNum.ZERO.clone();
    // Handle exponential format: rec(10^m) = 10^(-m)
    if (this.layer === 0 && this.array.length === 1 && this.array[0].length > 1 && !isSmall(this)) {
      var r0 = this.array[0].slice(0);
      r0[0] = -r0[0];
      var result = new MetaNum();
      result.array = [r0];
      result.sign = this.sign;
      result.layer = 0;
      result.normalize = P.normalize;
      return result.normalize();
    }
    var x = this.clone();
    // Toggle between large and small: 1↔2, -1↔-2
    x.sign = x.sign === 1 ? 2 : x.sign === 2 ? 1 : x.sign === -1 ? -2 : -1;
    return x.normalize();
  };
  Q.reciprocate = Q.rec = function (x) {
    return new MetaNum(x).rec();
  };

  P.toPower = P.pow = function (other) {
    var x = this.clone();
    other = new MetaNum(other);
    if (x.isNaN() || other.isNaN()) return MetaNum.NaN.clone();
    if (x.sign === -1 || x.sign === -2) {
      var absPow = this.abs().pow(other);
      if (other.isint()) {
        return other.mod(2).eq(0) ? absPow : absPow.neg();
      }
      return MetaNum.NaN.clone();
    }
    if (other.eq(MetaNum.ZERO)) return MetaNum.ONE.clone();
    if (x.eq(MetaNum.ZERO)) return MetaNum.ZERO.clone();
    if (x.eq(MetaNum.ONE)) return MetaNum.ONE.clone();
    if (other.eq(MetaNum.ONE)) return x.clone();
    if (x.isInfinite() || other.isInfinite()) return x;
    if (isSimple(x) && isSimple(other)) {
      var powVal = Math.pow(x.toNumber(), other.toNumber());
      if (Number.isFinite(powVal) && Math.abs(powVal) <= MAX_SAFE_INTEGER && powVal !== 0) return new MetaNum(powVal);
    }
    if (x.eq(MetaNum.TEN) && !isSmall(other)) {
      if (other.layer > 0 || other.array.length > 1) return other;
      var newRow0 = other.array[0].slice(0);
      newRow0[1] = (newRow0[1] || 0) + 1;
      return new MetaNum(newRow0);
    }
    // For small exponents: 10^small approaches 1 from above
    if (isSimple(x) && isSimple(other) && isSmall(other)) {
      var smallPow = Math.pow(x.toNumber(), other.toNumber());
      if (Number.isFinite(smallPow)) return new MetaNum(smallPow);
    }
    // For very small exponents on 10, return approximately 1
    if (x.eq(MetaNum.TEN) && isSmall(other)) {
      // 10^(very small) ≈ 1 + small*ln(10), which rounds to 1 for our purposes
      return MetaNum.ONE.clone();
    }
    var logResult = x.log10().mul(other);
    if (logResult.sign === -1 || logResult.sign === -2) {
      var posResult = MetaNum.pow(10, logResult.neg());
      posResult.sign = posResult.sign === 1 ? 2 : posResult.sign === 2 ? 1 : posResult.sign === -1 ? -2 : -1;
      return posResult.normalize();
    }
    return MetaNum.pow(10, logResult);
  };
  Q.toPower = Q.pow = function (x, y) {
    return new MetaNum(x).pow(y);
  };

  P.exponential = P.exp = function () {
    if (this.isNaN()) return MetaNum.NaN.clone();
    if (this.sign === -1 || this.sign === -2) return this.abs().exp().rec();
    if (isSimple(this) && !isSmall(this)) {
      var ev = Math.exp(this.array[0][0]);
      if (Number.isFinite(ev)) return new MetaNum(ev);
    }
    return MetaNum.pow(Math.E, this);
  };
  Q.exponential = Q.exp = function (x) {
    return new MetaNum(x).exp();
  };

  P.squareRoot = P.sqrt = function () {
    return this.root(2);
  };
  Q.squareRoot = Q.sqrt = function (x) {
    return new MetaNum(x).sqrt();
  };

  P.cubeRoot = P.cbrt = function () {
    return this.root(3);
  };
  Q.cubeRoot = Q.cbrt = function (x) {
    return new MetaNum(x).cbrt();
  };

  P.root = function (other) {
    var x = this.clone();
    other = new MetaNum(other);
    if (x.isNaN() || other.isNaN()) return MetaNum.NaN.clone();
    if (x.isInfinite()) return x;
    if (other.eq(MetaNum.ZERO)) return MetaNum.POSITIVE_INFINITY.clone();
    if (x.sign === -1 || x.sign === -2) {
      if (other.mod(2).eq(MetaNum.ONE)) return x.abs().root(other).neg();
      return MetaNum.NaN.clone();
    }
    if (isNumeric(x) && isNumeric(other)) return new MetaNum(Math.pow(x.array[0][0], 1 / other.array[0][0]));
    // Handle E^m format (iterated exponentiation levels)
    if (x.layer === 0 && x.array.length === 1 && x.array[0].length > 1 && isNumeric(other)) {
      var r0 = x.array[0];
      var n = other.array[0][0];
      var m = r0[1]; // number of 10^ wrappings: 1=E, 2=EE, >=3=F or higher
      var newR0;
      if (m === 1) {
        // E^1: value = 10^r0[0]. root_n = 10^(r0[0]/n)
        newR0 = r0.slice(0);
        newR0[0] = r0[0] / n;
      } else if (m === 2) {
        // E^2 (EE): value = 10^(10^r0[0])
        // root_n = 10^((10^r0[0])/n)
        // If 10^r0[0] is computable as JS number, unwrap one level: E((10^r0[0])/n)
        var powVal = Math.pow(10, r0[0]);
        if (isFinite(powVal) && powVal > 0 && powVal / n > 0) {
          newR0 = [powVal / n, 1]; // drop to E-level
        } else {
          // Too large: use identity a/b = 10^(log10(a) - log10(b)) inside one 10^
          // root_n(10^(10^x)) = 10^(10^(x - log10(n)))
          newR0 = r0.slice(0);
          newR0[0] = r0[0] - Math.log10(n);
        }
      } else {
        // E^m with m >= 3 (F, G, ... level)
        // V = 10^U where U = E^(m-1)(r0[0]).  V^(1/n) = 10^(U/n)
        // U = 10^V', so U/n = 10^V'/n = 10^(V' - log10(n))  when V' is still a pure tower
        // Since m >= 3, we can subtract log10(n) from r0[0] at level m-2, but we only have
        // a flat r0; the best uniform approximation is to subtract log10(n) from the base.
        newR0 = r0.slice(0);
        newR0[0] = r0[0] - Math.log10(n);
        if (newR0[0] <= 0) {
          // subtraction would collapse the bottom: try to unwrap one level instead
          // approximate: reduce the level by 1 and replace r0[0] by (10^r0[0] / n) if computable
          // if not computable, just keep the small value (log-scale effects dominate anyway)
          var powVal2 = Math.pow(10, r0[0]);
          if (isFinite(powVal2) && powVal2 / n > 0) {
            newR0 = [powVal2 / n, m - 1];
          }
        }
      }
      var result = new MetaNum();
      result.array = [newR0];
      result.sign = 1;
      result.layer = 0;
      result.normalize = P.normalize;
      return result.normalize();
    }
    return x;
  };
  Q.root = function (x, y) {
    return new MetaNum(x).root(y);
  };

  P.generalLogarithm = P.log10 = function () {
    if (this.isNaN() || this.sign === -1 || this.sign === -2) return MetaNum.NaN.clone();
    if (this.isInfinite()) return this;
    if (isSmall(this)) {
      // Small value: log10 is negative of what it would be for the normal value
      var n = this.clone();
      n.sign = 1; // Convert to normal positive for computation
      var result = n.log10();
      // Result should be negative (because log10 of a small number is negative)
      // Need to handle this carefully - after conversion, the result is the magnitude
      // which we need to negate
      return result.neg();
    }
    if (this.eq(MetaNum.ZERO)) return MetaNum.NEGATIVE_INFINITY.clone();
    if (isNumeric(this)) {
      var lv = Math.log10(this.array[0][0]);
      if (Number.isFinite(lv)) return new MetaNum(lv);
    }
    if (this.layer === 0 && this.array.length === 1 && this.array[0].length > 1) {
      var r0 = this.array[0];
      if (r0[1] > 0) {
        var newR0 = r0.slice(0);
        newR0[1]--;
        return new MetaNum(newR0);
      }
      return this;
    }
    return this;
  };
  Q.generalLogarithm = Q.log10 = function (x) {
    return new MetaNum(x).log10();
  };

  P.logarithm = P.logBase = P.log = function (base) {
    var x = this.clone();
    if (x.isNaN() || x.sign === -1 || x.sign === -2) return MetaNum.NaN.clone();
    base = new MetaNum(base);
    if (base.isNaN() || base.eq(MetaNum.ZERO) || base.eq(MetaNum.ONE)) return MetaNum.NaN.clone();
    if (x.eq(MetaNum.ZERO)) return MetaNum.NEGATIVE_INFINITY.clone();
    if (x.eq(MetaNum.ONE)) return MetaNum.ZERO.clone();
    if (isNumeric(x) && isNumeric(base)) {
      var lv = Math.log(x.array[0][0]) / Math.log(base.array[0][0]);
      if (Number.isFinite(lv)) return new MetaNum(lv);
    }
    return x.log10().div(base.log10());
  };
  Q.logarithm = Q.logBase = Q.log = function (x, base) {
    return new MetaNum(x).logBase(base);
  };

  P.naturalLogarithm = P.ln = function () {
    if (this.isNaN() || this.sign === -1 || this.sign === -2) return MetaNum.NaN.clone();
    if (this.eq(MetaNum.ZERO)) return MetaNum.NEGATIVE_INFINITY.clone();
    if (this.isInfinite()) return this;
    if (isNumeric(this)) {
      var lv = Math.log(this.array[0][0]);
      if (Number.isFinite(lv)) return new MetaNum(lv);
    }
    return this.log10().div(new MetaNum(Math.LOG10E));
  };
  Q.naturalLogarithm = Q.ln = function (x) {
    return new MetaNum(x).ln();
  };

  P.modular = P.mod = function (other) {
    other = new MetaNum(other);
    if (other.eq(MetaNum.ZERO)) return MetaNum.ZERO.clone();
    var tNS = toNormalizedSign(this.sign);
    var oNS = toNormalizedSign(other.sign);
    if (tNS * oNS === -1) return this.abs().mod(other.abs()).neg();
    if (this.sign === -1 || this.sign === -2) return this.abs().mod(other.abs());
    // Handle exponential format: mod(10^m, n) using modular exponentiation
    if (this.layer === 0 && this.array.length === 1 && this.array[0].length > 1 && isNumeric(other)) {
      var exp = this.array[0][0];
      var modVal = other.array[0][0];
      if (Number.isInteger(exp) && Number.isInteger(modVal) && modVal > 0) {
        var result = 1;
        var base = 10 % modVal;
        var e = exp;
        while (e > 0) {
          if (e % 2 === 1) result = (result * base) % modVal;
          e = Math.floor(e / 2);
          base = (base * base) % modVal;
        }
        return new MetaNum(result);
      }
    }
    return this.sub(this.div(other).floor().mul(other));
  };
  Q.modular = Q.mod = function (x, y) {
    return new MetaNum(x).mod(y);
  };

  P.gamma = function () {
    if (this.sign === -1 || this.sign === -2) return MetaNum.NaN.clone();
    if (this.isNaN() || this.isInfinite()) return this.clone();
    if (isSimple(this)) {
      var n = this.array[0][0];
      if (Number.isInteger(n) && n >= 0 && n <= 100) {
        var f = 1;
        for (var i = 2; i < n; i++) f *= i;
        return new MetaNum(f);
      }
      var g = f_gamma(n);
      if (Number.isFinite(g) && Math.abs(g) <= MAX_SAFE_INTEGER) return new MetaNum(g);
      var logG = f_logGamma(n);
      if (Number.isFinite(logG)) {
        return MetaNum.pow(10, new MetaNum(logG));
      }
    }
    return this;
  };
  Q.gamma = function (x) {
    return new MetaNum(x).gamma();
  };

  P.factorial = P.fact = function () {
    if (this.isNaN() || this.isInfinite()) return this;
    if (this.sign === -1 || this.sign === -2) return this.abs().fact().neg();
    if (isSimple(this)) {
      var n = this.array[0][0];
      if (Number.isInteger(n) && n >= 0 && n <= 20) {
        var f = 1;
        for (var i = 2; i <= n; i++) f *= i;
        return new MetaNum(f);
      }
      var fa = f_gamma(n + 1);
      if (Number.isFinite(fa) && Math.abs(fa) <= MAX_SAFE_INTEGER) return new MetaNum(fa);
      var logFa = f_logGamma(n + 1);
      if (Number.isFinite(logFa)) {
        return MetaNum.pow(10, new MetaNum(logFa));
      }
    }
    return this;
  };
  Q.factorial = Q.fact = function (x) {
    return new MetaNum(x).fact();
  };

  P.lambertw = function (tol, principal) {
    if (tol === undefined) tol = 1e-10;
    if (principal === undefined) principal = true;
    if (this.isNaN()) return MetaNum.NaN.clone();
    if (this.isInfinite()) return this.clone();
    if (this.lt(-0.3678794411710499)) return MetaNum.NaN.clone();
    
    // Handle large values with threshold checks (like OmegaNum)
    if (principal) {
      if (this.gt(MetaNum.TETRATED_MAX_SAFE_INTEGER)) return this.clone();
      if (this.gt(MetaNum.EE_MAX_SAFE_INTEGER)) {
        var result = this.clone();
        result.array[0][1]--;
        result.normalize();
        return result;
      }
      if (this.gt(MetaNum.E_MAX_SAFE_INTEGER)) return d_lambertw(this, tol, principal);
      if (isNumeric(this)) {
        try {
          return new MetaNum(f_lambertw(this.array[0][0], tol, principal));
        } catch (e) {
          return MetaNum.NaN.clone();
        }
      }
    } else {
      if (this.sign === 1 || this.sign === 2) return MetaNum.NaN.clone();
      if (this.abs().gt(MetaNum.EE_MAX_SAFE_INTEGER)) {
        return this.abs().recip().lambertw(tol, principal).neg();
      }
      if (this.abs().gt(MetaNum.E_MAX_SAFE_INTEGER)) return d_lambertw(this, tol, principal);
      if (isNumeric(this)) {
        try {
          return new MetaNum(f_lambertw(this.sign * this.array[0][0], tol, principal));
        } catch (e) {
          return MetaNum.NaN.clone();
        }
      }
    }
    
    return d_lambertw(this, tol, principal);
  };
  Q.lambertw = function (x, tol, principal) {
    return new MetaNum(x).lambertw(tol, principal);
  };

  P.floor = function () {
    if (this.isNaN() || this.isInfinite()) return this.clone();
    if (isSmall(this)) {
      // Small positive → 0, small negative → -1
      return this.sign === 2 ? MetaNum.ZERO.clone() : MetaNum.NEGATIVE_ONE.clone();
    }
    if (this.layer > 0 || this.array.length > 1 || this.array[0].length > 1) return this.clone();
    return new MetaNum(Math.floor(this.array[0][0]));
  };
  Q.floor = function (x) {
    return new MetaNum(x).floor();
  };

  P.ceiling = P.ceil = function () {
    if (this.isNaN() || this.isInfinite()) return this.clone();
    if (isSmall(this)) {
      // Small positive → 1, small negative → 0
      return this.sign === 2 ? MetaNum.ONE.clone() : MetaNum.ZERO.clone();
    }
    if (this.layer > 0 || this.array.length > 1 || this.array[0].length > 1) return this.clone();
    return new MetaNum(Math.ceil(this.array[0][0]));
  };
  Q.ceiling = Q.ceil = function (x) {
    return new MetaNum(x).ceil();
  };

  P.round = function () {
    if (this.isNaN() || this.isInfinite()) return this.clone();
    if (isSmall(this)) return MetaNum.ZERO.clone();
    if (this.layer > 0 || this.array.length > 1 || this.array[0].length > 1) return this.clone();
    return new MetaNum(Math.round(this.array[0][0]));
  };
  Q.round = function (x) {
    return new MetaNum(x).round();
  };

  P.isInteger = P.isint = function () {
    if (this.isNaN() || this.isInfinite()) return false;
    if (isSmall(this)) return false; // Small values are between 0 and 1, not integers
    if (this.sign === -1) return this.abs().isint();
    if (this.layer > 0 || this.array.length > 1 || this.array[0].length > 1) return true;
    return Number.isInteger(this.array[0][0]);
  };
  Q.isInteger = Q.isint = function (x) {
    return new MetaNum(x).isint();
  };

  P.tetrate = P.tetr = function (other, payload) {
    if (payload === undefined) payload = MetaNum.ONE;
    var x = this.clone();
    other = new MetaNum(other);
    payload = new MetaNum(payload);
    if (payload.neq(MetaNum.ONE)) other = other.add(payload.slog(x));
    if (x.isNaN() || other.isNaN() || payload.isNaN()) return MetaNum.NaN.clone();
    if (other.sign === -1 || other.sign === -2) {
      if (other.eq(-1)) return MetaNum.ZERO.clone();
      return MetaNum.NaN.clone();
    }
    if (other.eq(MetaNum.NEGATIVE_INFINITY)) return MetaNum.ZERO.clone();
    if (other.eq(MetaNum.ZERO)) return MetaNum.ONE.clone();
    if (other.eq(MetaNum.ONE)) return x.clone();
    if (other.eq(2)) return x.pow(x);
    if (x.eq(MetaNum.ZERO)) {
      if (other.eq(MetaNum.ZERO)) return MetaNum.NaN.clone();
      if (other.mod(2).eq(MetaNum.ZERO)) return MetaNum.ONE.clone();
      return MetaNum.ZERO.clone();
    }
    if (x.eq(MetaNum.ONE)) return MetaNum.ONE.clone();
    if (x.eq(2)) {
      if (other.eq(3)) return new MetaNum(16);
      if (other.eq(4)) return new MetaNum(65536);
    }
    if (x.isInfinite() || other.isInfinite()) return x.max(other);
    var m = x.max(other);
    if (m.gt(hyperLevel(3, MAX_SAFE_INTEGER))) return m;
    if (m.gt(MetaNum.TETRATED_MAX_SAFE_INTEGER) || other.gt(MetaNum.MAX_SAFE_INTEGER)) {
      var j = x.slog(10).add(other);
      j.array[0][2] = (j.array[0][2] || 0) + 1;
      j.normalize();
      return j;
    }
    var y = other.toNumber();
    var f = Math.floor(y);
    var r = x.pow(y - f);
    for (var i = 0; f !== 0 && r.lt(MetaNum.E_MAX_SAFE_INTEGER) && i < 100; i++) {
      if (f > 0) {
        r = x.pow(r);
        f--;
      }
    }
    if (i === 100) f = 0;
    r.array[0][1] = (r.array[0][1] + f) || f;
    r.normalize();
    return r;
  };
  Q.tetrate = Q.tetr = function (x, y, payload) {
    return new MetaNum(x).tetr(y, payload);
  };

  P.iteratedexp = function (other, payload) {
    return this.tetr(other, payload);
  };
  Q.iteratedexp = function (x, y, payload) {
    return new MetaNum(x).iteratedexp(y, payload);
  };

  P.iteratedlog = function (other) {
    var x = this.clone();
    other = new MetaNum(other);
    if (other.sign === -1 || other.sign === -2) return MetaNum.POSITIVE_INFINITY.clone();
    if (other.eq(MetaNum.ZERO)) return x.clone();
    if (isSimple(x) && isSimple(other) && Number.isInteger(other.array[0][0]) && other.array[0][0] <= 4) {
      var iv = x.array[0][0];
      var ic = other.array[0][0];
      if (ic <= 0) return x.clone();
      var r = iv;
      for (var i = 0; i < ic; i++) r = Math.log10(r);
      return new MetaNum(r);
    }
    return x;
  };
  Q.iteratedlog = function (x, y) {
    return new MetaNum(x).iteratedlog(y);
  };

  P.layeradd = function (other, base) {
    if (base == null) base = 10;
    if (other == null) other = MetaNum.ONE.clone();
    var x = this.clone();
    other = new MetaNum(other);
    base = new MetaNum(base);
    if (x.isNaN() || other.isNaN() || base.isNaN()) return MetaNum.NaN.clone();
    if (other.eq(MetaNum.ZERO)) return x.clone();
    if (other.sign === -1 || other.sign === -2) return MetaNum.ZERO.clone();
    return base.tetr(x.slog(base).add(other));
  };
  Q.layeradd = function (x, y, base) {
    return new MetaNum(x).layeradd(y, base);
  };

  P.layeradd10 = function (other) {
    return this.layeradd(other, 10);
  };
  Q.layeradd10 = function (x, y) {
    return new MetaNum(x).layeradd10(y);
  };

  P.ssqrt = P.ssrt = function () {
    if (this.sign === -1 || this.sign === -2) return MetaNum.NaN.clone();
    if (this.isNaN()) return MetaNum.NaN.clone();
    if (this.eq(MetaNum.ZERO)) return MetaNum.ZERO.clone();
    if (this.eq(MetaNum.ONE)) return MetaNum.ONE.clone();
    if (isSimple(this)) {
      var v = this.array[0][0];
      if (v > 0 && v < 1) return new MetaNum(v);
      try {
        var w = f_lambertw(Math.log(v));
        if (Number.isFinite(w)) return new MetaNum(Math.exp(w));
      } catch (e) {}
    }
    var ln = this.ln();
    var w = ln.lambertw();
    return w.exp();
  };
  Q.ssqrt = Q.ssrt = function (x) {
    return new MetaNum(x).ssqrt();
  };

  P.linear_sroot = function (other) {
    var x = this.clone();
    other = new MetaNum(other);
    if (x.isNaN() || other.isNaN()) return MetaNum.NaN.clone();
    if (x.sign === -1 || x.sign === -2 || other.sign === -1 || other.sign === -2) return MetaNum.NaN.clone();
    var degreeNum = other.toNumber();
    if (degreeNum === 1) return x.clone();
    if (x.eq(MetaNum.POSITIVE_INFINITY)) return MetaNum.POSITIVE_INFINITY.clone();
    if (!x.isFinite()) return MetaNum.NaN.clone();
    if (degreeNum > 0 && degreeNum < 1) return x.root(degreeNum);
    if (degreeNum <= 0) return MetaNum.NaN.clone();
    if (other.gt(MetaNum.MAX_SAFE_INTEGER)) {
      var xNum = x.toNumber();
      if (xNum < Math.E && xNum > 1 / Math.E) return x.pow(x.rec());
      if (x.gt(MetaNum.TETRATED_MAX_SAFE_INTEGER)) return MetaNum.tetr(10, x.slog(10).sub(other));
      return MetaNum.NaN.clone();
    }
    if (x.eq(MetaNum.ONE)) return MetaNum.ONE.clone();
    if (x.lt(MetaNum.ZERO)) return MetaNum.NaN.clone();
    if (x.gt(MetaNum.ONE)) {
      // Find upper bound
      var upperBound;
      if (degreeNum <= 1) {
        upperBound = x.root(degreeNum);
      } else if (x.gte(MetaNum.tetr(10, other))) {
        upperBound = x.iteratedlog(other, Math.floor(degreeNum) - 1);
      } else {
        upperBound = new MetaNum(10);
      }
      var lower = MetaNum.ZERO.clone();
      var layer = upperBound.array[0][2] || 0;
      var upper = upperBound.iteratedlog(10, layer);
      var guess = upper.div(2);
      for (var iter = 0; iter < 200; iter++) {
        var testVal = MetaNum.iteratedexp(10, layer, guess).tetr(other);
        if (testVal.gt(x)) {
          upper = guess;
        } else {
          lower = guess;
        }
        var newguess = lower.add(upper).div(2);
        if (newguess.eq(guess)) break;
        guess = newguess;
      }
      return MetaNum.iteratedexp(10, layer, guess);
    }
    return x;
  };
  Q.linear_sroot = function (x, y) {
    return new MetaNum(x).linear_sroot(y);
  };

  P.slog = function (base) {
    if (base === undefined) base = 10;
    var x = this.clone();
    base = new MetaNum(base);
    if (x.isNaN() || base.isNaN()) return MetaNum.NaN.clone();
    if (x.sign === -1 || x.sign === -2 || base.sign === -1 || base.sign === -2) return MetaNum.NaN.clone();
    if (x.eq(MetaNum.ONE)) return MetaNum.ZERO.clone();
    if (x.eq(base)) return MetaNum.ONE.clone();
    if (x.lt(MetaNum.ONE)) return MetaNum.fromNumber(-1).add(x.slog(base));
    var m = x.max(base);
    if (m.gt(hyperLevel(3, MAX_SAFE_INTEGER))) {
      if (x.gt(base)) return x.clone();
      return MetaNum.ZERO.clone();
    }
    if (m.gt(MetaNum.TETRATED_MAX_SAFE_INTEGER)) {
      if (x.gt(base)) {
        x.array[0][2]--;
        x.normalize();
        return x.sub(x.array[0][1] || 0);
      }
      return MetaNum.ZERO.clone();
    }
    if (isSimple(x) && isSimple(base) && base.array[0][0] > 1) {
      var v = x.array[0][0];
      var b = base.array[0][0];
      if (v <= Math.pow(b, b)) {
        if (v <= 1) return MetaNum.ZERO.clone();
        var sl = 0;
        while (Math.pow(b, b) >= v && sl < 10) {
          v = Math.log(v) / Math.log(b);
          sl++;
          if (v <= 0) break;
        }
        if (sl > 0) return new MetaNum(sl + v - 1);
      }
    }
    var r = 0;
    var t = (x.array[0][1] || 0) - (base.array[0][1] || 0);
    if (t > 3) {
      var l = t - 3;
      r += l;
      x.array[0][1] = x.array[0][1] - l;
    }
    for (var i = 0; i < 100; i++) {
      if (x.lt(0)) {
        x = MetaNum.pow(base, x);
        r--;
      } else if (x.lte(1)) {
        return new MetaNum(r + x.array[0][0] - 1);
      } else {
        r++;
        x = x.logBase(base);
      }
    }
    if (x.gt(10)) return new MetaNum(r);
    return new MetaNum(r + x.array[0][0] - 1);
  };
  Q.slog = function (x, base) {
    return new MetaNum(x).slog(base);
  };

  P.pentate = P.pent = function (other) {
    return this.arrow(3)(other);
  };
  Q.pentate = Q.pent = function (x, y) {
    return MetaNum.arrow(x, 3, y);
  };

  //pentate_log和pentate_root
  P.pentate_log = P.pent_log = function (base) {
    if (base === undefined) base = 10;
    var x = this.clone();
    base = new MetaNum(base);
    if (x.isNaN() || base.isNaN()) return MetaNum.NaN.clone();
    if (x.sign === -1 || x.sign === -2 || base.sign === -1 || base.sign === -2) return MetaNum.NaN.clone();
    if (x.eq(MetaNum.ONE)) return MetaNum.ZERO.clone();
    if (x.eq(base)) return MetaNum.ONE.clone();
    if (x.lt(base)) return MetaNum.ZERO.clone();
    var m = x.max(base);
    if (m.gt(hyperLevel(4, MAX_SAFE_INTEGER))) {
      if (x.gt(base)) return x.clone();
      return MetaNum.ZERO.clone();
    }
    if (isSimple(x) && isSimple(base) && base.array[0][0] > 1) {
      var v = x.array[0][0];
      var b = base.array[0][0];
      var count = 0;
      while (v > b && count < 100) {
        var slogVal = new MetaNum(v).slog(base);
        if (slogVal.array.length <= 1 && slogVal.array[0].length <= 1) {
          v = slogVal.array[0][0];
          count++;
        } else {
          return new MetaNum(count).add(slogVal);
        }
      }
      if (count > 0) return new MetaNum(count).add(new MetaNum(v).slog(base));
    }
    var r = 0;
    for (var i = 0; i < 100; i++) {
      if (x.lte(base)) {
        if (x.lte(1)) return new MetaNum(r);
        return new MetaNum(r + x.array[0][0] / base.array[0][0]);
      } else {
        r++;
        x = x.slog(base);
      }
    }
    if (x.gt(10)) return new MetaNum(r);
    return new MetaNum(r);
  };
  Q.pentate_log = Q.pent_log = function (x, base) {
    return new MetaNum(x).pentate_log(base);
  };

  P.pentate_root = P.pent_root = function (height) {
    var x = this.clone();
    height = new MetaNum(height);
    if (x.isNaN() || height.isNaN()) return MetaNum.NaN.clone();
    if (x.sign === -1 || x.sign === -2 || height.sign === -1 || height.sign === -2) return MetaNum.NaN.clone();
    if (height.eq(MetaNum.ZERO)) {
      if (x.eq(MetaNum.ONE)) return MetaNum.NaN.clone();
      return MetaNum.NaN.clone();
    }
    if (height.eq(MetaNum.ONE)) return x.clone();
    if (height.eq(2) && isSimple(x)) {
      var v2 = x.array[0][0];
      if (v2 <= 1) return MetaNum.ONE.clone();
      var lo2 = 1;
      var hi2 = Math.max(2, v2);
      for (var i2 = 0; i2 < 50; i2++) {
        var mid2 = (lo2 + hi2) / 2;
        var val2 = MetaNum.pentate(mid2, 2);
        if (val2.eq(x)) return new MetaNum(mid2);
        if (val2.lt(x)) lo2 = mid2;
        else hi2 = mid2;
      }
      return new MetaNum((lo2 + hi2) / 2);
    }
    if (isSimple(x) && isSimple(height)) {
      var v = x.array[0][0];
      var h = height.array[0][0];
      if (h >= 2 && Number.isInteger(h)) {
        var lo = 1;
        var hi = Math.max(2, v);
        for (var i = 0; i < 50; i++) {
          var mid = (lo + hi) / 2;
          var val = MetaNum.pentate(mid, h);
          if (val.eq(x)) return new MetaNum(mid);
          if (val.lt(x)) lo = mid;
          else hi = mid;
        }
        return new MetaNum((lo + hi) / 2);
      }
    }
    if (isSimple(height) && height.array[0][0] >= 2) {
      var lo2 = new MetaNum(1);
      var hi2 = x.clone();
      for (var i = 0; i < 50; i++) {
        var mid2 = lo2.add(hi2).div(2);
        var val2 = MetaNum.pentate(mid2, height);
        if (val2.eq(x)) return mid2;
        if (val2.lt(x)) lo2 = mid2;
        else hi2 = mid2;
      }
      return lo2.add(hi2).div(2);
    }
    return x;
  };
  Q.pentate_root = Q.pent_root = function (x, height) {
    return new MetaNum(x).pentate_root(height);
  };
  

  P.arrow = function (arrows) {
    var t = this.clone();
    arrows = new MetaNum(arrows);
    if (!arrows.isint() || arrows.sign === -1 || arrows.sign === -2) return function () { return MetaNum.NaN.clone(); };
    if (arrows.eq(MetaNum.ZERO)) return function (other) { return t.mul(other); };
    if (arrows.eq(MetaNum.ONE)) return function (other) { return t.pow(other); };
    if (arrows.eq(2)) return function (other) { return t.tetr(other); };
    return function (other) {
      other = new MetaNum(other);
      if (other.sign === -1 || other.sign === -2) return MetaNum.NaN.clone();
      if (other.eq(MetaNum.ZERO)) return MetaNum.ONE.clone();
      if (other.eq(MetaNum.ONE)) return t.clone();
      if (other.eq(2)) return t.arrow(arrows.sub(MetaNum.ONE))(t);
      var arrowsNum = arrows.toNumber();
      if (!isFinite(arrowsNum)) {
        // arrows is a huge MetaNum (ω-level): result inherits the largest structure
        var j = t.max(other).max(arrows).clone();
        j.array.push([1, 0, 1]);
        j.normalize();
        return j;
      }
      if (arrows.gte(MetaNum.maxArrow)) {
        // arrows is very large but still a JS number; use approximate overflow
        var j = t.max(other).clone();
        j.array.push([1, 0, 1]);
        j.normalize();
        return j;
      }
      if (arrowsNum >= MetaNum.maxCols && t.array.length === 1 && other.array.length === 1) {
        var a = t.array[0][0];
        var b = other.array[0][0];
        if (b >= 2) {
          var count = b - 2;
          var baseResult = t.arrow(MetaNum.maxCols - 1)(other);
          if (arrowsNum === MetaNum.maxCols) {
            baseResult.array[0][MetaNum.maxCols - 1] = (baseResult.array[0][MetaNum.maxCols - 1] || 0) + count;
            baseResult.normalize();
            return baseResult;
          }
          if (arrowsNum === MetaNum.maxCols + 1) {
            baseResult.array[0][MetaNum.maxCols - 1] = (baseResult.array[0][MetaNum.maxCols - 1] || 0) + count;
            baseResult.normalize();
            baseResult = addOrdinalRow(baseResult, count, MetaNum.maxCols);
            baseResult.normalize();
            return baseResult;
          }
          var endLevel = arrowsNum - 1;
          var startLevel = MetaNum.maxCols;
          var totalOrdinal = endLevel - startLevel + 1;
          if (totalOrdinal + 1 <= MetaNum.maxRows) {
            var r = t.arrow(MetaNum.maxCols - 1)(other);
            for (var lev = startLevel; lev <= endLevel; lev++) {
              r = addOrdinalRow(r, count, lev);
            }
          } else {
            var r = new MetaNum(10);
            var keepStart = endLevel - MetaNum.maxRows + 2;
            for (var lev = keepStart; lev <= endLevel; lev++) {
              r = addOrdinalRow(r, count, lev);
            }
          }
          r.normalize();
          return r;
        }
      }
      if (arrowsNum > 1000000) {
        var j = t.max(other).clone();
        j.array.push([1, 0, 1]);
        j.normalize();
        return j;
      }
      if (t.max(other).gt(hyperLevelSafe(arrowsNum + 1, MAX_SAFE_INTEGER))) return t.max(other);
      if (t.gt(hyperLevelSafe(arrowsNum, MAX_SAFE_INTEGER)) || other.gt(MetaNum.MAX_SAFE_INTEGER)) {
        var r;
        if (t.gt(hyperLevelSafe(arrowsNum, MAX_SAFE_INTEGER))) {
          r = t.clone();
          if (arrowsNum < MetaNum.maxCols) {
            r.array[0][arrowsNum]--;
          } else {
            var lastRow = r.array[r.array.length - 1];
            if (lastRow && lastRow.length >= 2 && typeof lastRow[lastRow.length - 1] === 'number') {
              lastRow[0] = (lastRow[0] || 0) - 1;
              if (lastRow[0] <= 0) r.array.pop();
            }
          }
          r.normalize();
        } else if (t.gt(hyperLevelSafe(arrowsNum - 1, MAX_SAFE_INTEGER))) {
          if (arrowsNum - 1 < MetaNum.maxCols) {
            r = new MetaNum(t.array[0][arrowsNum - 1]);
          } else {
            r = MetaNum.ZERO.clone();
          }
        } else {
          r = MetaNum.ZERO.clone();
        }
        var j = r.add(other);
        if (arrowsNum < MetaNum.maxCols) {
          j.array[0][arrowsNum] = (j.array[0][arrowsNum] || 0) + 1;
        } else {
          j = addOrdinalRow(j, 1, arrowsNum);
        }
        j.normalize();
        return j;
      }
      var y = other.toNumber();
      if (arrowsNum >= 23 && y !== Math.floor(y)) {
        y = 10;
      }
      var f = Math.floor(y);
      var arrows_m1 = arrows.sub(MetaNum.ONE);
      var r = t.arrow(arrows_m1)(y - f);
      var initFloor = Math.floor(other.toNumber());
      for (var i = 0; f !== 0 && r.lt(hyperLevelSafe(arrowsNum - 1, MAX_SAFE_INTEGER)) && i < 100; i++) {
        if (f > 0) {
          r = t.arrow(arrows_m1)(r);
          f--;
        }
      }
      if (i === 100) f = 0;
      if (arrowsNum - 1 < MetaNum.maxCols) {
        if (f > 0) {
          r.array[0][arrowsNum - 1] = (r.array[0][arrowsNum - 1] || 0) + f;
        }
      } else {
        var count = f > 0 ? f : (i > 0 && initFloor > 0 ? initFloor - 1 : 0);
        if (count > 0) {
          r = addOrdinalRow(r, count, arrowsNum - 1);
        }
      }
      r.normalize();
      return r;
    };
  };
  P.chain = function (other, arrows) {
    return this.arrow(arrows)(other);
  };
  Q.arrow = function (x, arrows, y) {
    return new MetaNum(x).arrow(arrows)(y);
  };
  Q.chain = function (x, y, arrows) {
    return new MetaNum(x).arrow(arrows)(y);
  };

  //calc level ω = x{y}x
  P.aperiote = P.aper = P.h10 = function (y) {
    return this.arrow(y)(this);
  };
  Q.aperiote = Q.aper = Q.h10 = function (x, y) {
    return new MetaNum(x).arrow(y)(x);
  };

  P.inv_aperiote = P.i_aper = P.i10 = function (z) {
    var x = this.clone();
    z = new MetaNum(z);
    if (x.isNaN() || z.isNaN()) return MetaNum.NaN.clone();
    if (x.array.length >= 2) {
      // For ordinal y: find ordinal marker and return y
      for (var i = x.array.length - 1; i >= 1; i--) {
        var row = x.array[i];
        if (row.length >= 3 && row[1] === 0 && row[2] === 1 && row[0] > 0) {
          // This is an ordinal marker, return the ordinal y
          var result = x.clone();
          result.array.splice(i, 1);
          result.normalize();
          if (result.array.length <= 1) result.layer = 0;
          return result;
        }
      }
    }
    // For finite y: count the number of values in r0
    if (x.layer === 0 && x.array.length === 1) {
      var r0 = x.array[0];
      if (r0.length > 1) {
        // r0 = [base, v1, v2, ..., v_{y-1}]
        // y = r0.length
        return new MetaNum(r0.length);
      }
      return new MetaNum(1);
    }
    return z;
  };
  Q.inv_aperiote = Q.i_aper = Q.i10 = function (x, z) {
    return new MetaNum(x).inv_aperiote(z);
  };

  //ω+1 x{{1}}y
  P.expande = P.expa = P.h11 = function (y) {
    var x = this.clone();
    y = new MetaNum(y);
    if (x.isNaN() || y.isNaN()) return MetaNum.NaN.clone();
    if (x.eq(MetaNum.ONE)) return MetaNum.ONE.clone();
    if (y.eq(MetaNum.ONE)) return x.clone();
    if (y.lte(MetaNum.ZERO)) return MetaNum.NaN.clone();
    var base = x.aperiote(x);  // expande(x, 2) = x{x}x
    if (y.layer === 0 && y.array.length <= 1) {
      // finite y: r0 from base, [y-2, 0, 1] for ω+1 level
      var result = base.clone();
      if (y.eq(2)) return result;
      var count = y.toNumber() - 2;
      if (count > 0) {
        result.layer = 0;
        result.array = [base.array[0].slice()];
        result.array.push([count, 0, 1]);
        result.normalize();
      }
      return result;
    }
    // ordinal y: clone y, set r0, add [1, 1, 1]
    var result = y.clone();
    result.array[0] = base.array[0].slice();
    result.layer = 0;
    result.array.push([1, 1, 1]);
    result.normalize();
    return result;
  };
  Q.expande = Q.expa = Q.h11 = function (x, y) {
    return new MetaNum(x).expande(y);
  };

  P.inv_expande = P.i_expa = P.i11 = function (z) {
    var x = this.clone();
    z = new MetaNum(z);
    if (x.isNaN() || z.isNaN()) return MetaNum.NaN.clone();
    if (x.array.length >= 2) {
      // For ordinal y: find [1, 1, 1] marker and return y (the ordinal itself)
      for (var i = x.array.length - 1; i >= 1; i--) {
        var row = x.array[i];
        if (row.length >= 3 && row[1] === 1 && row[2] === 1 && row[0] === 1) {
          // This is the ordinal marker, return the ordinal y
          var result = x.clone();
          result.array.splice(i, 1);
          result.normalize();
          if (result.array.length <= 1) result.layer = 0;
          return result;
        }
      }
      // For finite y: find [count, 0, 1] and return count + 2
      for (var i = x.array.length - 1; i >= 1; i--) {
        var row = x.array[i];
        if (row.length >= 3 && row[1] === 0 && row[2] === 1 && row[0] > 0) {
          return new MetaNum(row[0] + 2);
        }
      }
    }
    return z;
  };
  Q.inv_expande = Q.i_expa = Q.i11 = function (x, z) {
    return new MetaNum(x).inv_expande(z);
  };

  //ω+2 x{{2}}y
  P.multiexpande = P.muea = P.h12 = function (y) {
    var x = this.clone();
    y = new MetaNum(y);
    if (x.isNaN() || y.isNaN()) return MetaNum.NaN.clone();
    if (x.eq(MetaNum.ONE)) return MetaNum.ONE.clone();
    if (y.eq(MetaNum.ONE)) return x.clone();
    if (y.lte(MetaNum.ZERO)) return MetaNum.NaN.clone();
    var base = x.expande(x);  // multiexpande(x, 2)
    if (y.layer === 0 && y.array.length <= 1) {
      var result = base.clone();
      if (y.eq(2)) return result;
      var count = y.toNumber() - 2;
      if (count > 0) {
        result.layer = 0;
        result.array = [base.array[0].slice()];
        result.array.push([1, 0, 1]);
        result.array.push([count, 1, 1]);
        result.normalize();
      }
      return result;
    }
    var result = y.clone();
    result.array[0] = base.array[0].slice();
    result.layer = 0;
    result.array.push([1, 2, 1]);
    result.normalize();
    return result;
  };
  Q.multiexpande = Q.muea = Q.h12 = function (x, y) {
    return new MetaNum(x).multiexpande(y);
  };

  P.inv_multiexpande = P.i_muea = P.i12 = function (z) {
    var x = this.clone();
    z = new MetaNum(z);
    if (x.isNaN() || z.isNaN()) return MetaNum.NaN.clone();
    if (x.array.length >= 2) {
      // For ordinal y: find [1, 2, 1] marker and return y (the ordinal itself)
      for (var i = x.array.length - 1; i >= 1; i--) {
        var row = x.array[i];
        if (row.length >= 3 && row[1] === 2 && row[2] === 1 && row[0] === 1) {
          // This is the ordinal marker, return the ordinal y
          var result = x.clone();
          result.array.splice(i, 1);
          result.normalize();
          if (result.array.length <= 1) result.layer = 0;
          return result;
        }
      }
      // For finite y: find [count, 1, 1] and return count + 2
      for (var i = x.array.length - 1; i >= 1; i--) {
        var row = x.array[i];
        if (row.length >= 3 && row[1] === 1 && row[2] === 1 && row[0] > 0) {
          return new MetaNum(row[0] + 2);
        }
      }
    }
    return z;
  };
  Q.inv_multiexpande = Q.i_muea = Q.i12 = function (x, z) {
    return new MetaNum(x).inv_multiexpande(z);
  };

  //ω+3 x{{3}}y
  P.powerexpande = P.poea = P.h13 = function (y) {
    var x = this.clone();
    y = new MetaNum(y);
    if (x.isNaN() || y.isNaN()) return MetaNum.NaN.clone();
    if (x.eq(MetaNum.ONE)) return MetaNum.ONE.clone();
    if (y.eq(MetaNum.ONE)) return x.clone();
    if (y.lte(MetaNum.ZERO)) return MetaNum.NaN.clone();
    var base = x.multiexpande(x);  // powerexpande(x, 2)
    if (y.layer === 0 && y.array.length <= 1) {
      var result = base.clone();
      if (y.eq(2)) return result;
      var count = y.toNumber() - 2;
      if (count > 0) {
        result.layer = 0;
        result.array = [base.array[0].slice()];
        result.array.push([1, 0, 1]);
        result.array.push([1, 1, 1]);
        result.array.push([count, 2, 1]);
        result.normalize();
      }
      return result;
    }
    var result = y.clone();
    result.array[0] = base.array[0].slice();
    result.layer = 0;
    result.array.push([1, 3, 1]);
    result.normalize();
    return result;
  };
  Q.powerexpande = Q.poea = Q.h13 = function (x, y) {
    return new MetaNum(x).powerexpande(y);
  };

  P.inv_powerexpande = P.i_poea = P.i13 = function (z) {
    var x = this.clone();
    z = new MetaNum(z);
    if (x.isNaN() || z.isNaN()) return MetaNum.NaN.clone();
    if (x.array.length >= 2) {
      // For ordinal y: find [1, 3, 1] marker and return y (the ordinal itself)
      for (var i = x.array.length - 1; i >= 1; i--) {
        var row = x.array[i];
        if (row.length >= 3 && row[1] === 3 && row[2] === 1 && row[0] === 1) {
          // This is the ordinal marker, return the ordinal y
          var result = x.clone();
          result.array.splice(i, 1);
          result.normalize();
          if (result.array.length <= 1) result.layer = 0;
          return result;
        }
      }
      // For finite y: find [count, 2, 1] and return count + 2
      for (var i = x.array.length - 1; i >= 1; i--) {
        var row = x.array[i];
        if (row.length >= 3 && row[1] === 2 && row[2] === 1 && row[0] > 0) {
          return new MetaNum(row[0] + 2);
        }
      }
    }
    return z;
  };
  Q.inv_powerexpande = Q.i_poea = Q.i13 = function (x, z) {
    return new MetaNum(x).inv_powerexpande(z);
  };

  // Helper: generic hyperoperation from ordinal level (Cantor normal form coefficients).
  // coeffs: [c0, c1, c2, ..., ck] where ordinal = ω^k*ck + ... + ω^2*c2 + ω*c1 + c0
  Q._hyperopFromOrdinal = function(x, y, coeffs) {
    x = new MetaNum(x);
    y = new MetaNum(y);
    if (x.isNaN() || y.isNaN()) return MetaNum.NaN.clone();
    if (x.eq(MetaNum.ONE)) return MetaNum.ONE.clone();
    if (y.eq(MetaNum.ONE)) return x.clone();
    if (y.lte(MetaNum.ZERO)) return MetaNum.NaN.clone();

    var xNum = x.toNumber();
    var yNum = y.toNumber();
    var maxRows = MetaNum.maxRows; // 100

    var baseArrowLevel = Math.max(Math.floor(isFinite(xNum) ? xNum : 3), 3);
    var baseResult = x.arrow(baseArrowLevel)(x);

    var rows = Q._generateOrdinalRows(coeffs,
      isFinite(xNum) ? Math.floor(xNum) : baseArrowLevel,
      isFinite(yNum) ? Math.floor(yNum) : baseArrowLevel,
      maxRows);

    var result = baseResult.clone();
    result.array = [baseResult.array[0].slice()];
    for (var i = 0; i < rows.length; i++) result.array.push(rows[i]);
    if (result.array.length > 1) result.layer = 0;
    return result;
  };

  // Helper: generic inverse hyperoperation from ordinal level.
  // Forward: op(base, arg) generates ordinal rows with count = arg - 2
  // Inverse: inv_op(result, base) should return arg
  Q._invHyperopFromOrdinal = function(x, z, coeffs) {
    x = new MetaNum(x);
    z = new MetaNum(z);
    if (x.isNaN() || z.isNaN()) return MetaNum.NaN.clone();

    // If x has no ordinal rows, return z itself
    if (x.array.length <= 1) return z;

    // Find the largest ordinal row (at the end of the array)
    var lastIdx = x.array.length - 1;
    var row = x.array[lastIdx];
    if (!row) return z;

    // The forward operation generates rows with count = arg - 2
    // So the inverse is: arg = count + 2
    var count = row[0] || 0;
    return new MetaNum(count + 2);
  };

  // ---------------------------------------------------------------------------
  // Hyperoperations from ω*2 up to ω^4, all generated from ordinal level (CNF).
  //   coeffs = [c0, c1, c2, ..., ck] where ordinal = Σ ω^i * ci
  // ---------------------------------------------------------------------------

  // aperioexpande = ω*2  →  coeffs [0,2]
  P.aperioexpande = P.apea = P.h20 = function (y) {
    return Q._hyperopFromOrdinal(this, y, [0,2]);
  };
  Q.aperioexpande = Q.apea = Q.h20 = function (x, y) {
    return Q._hyperopFromOrdinal(x, y, [0,2]);
  };
  P.inv_aperioexpande = P.i_apea = P.i20 = function (z) {
    return Q._invHyperopFromOrdinal(this, z, [0,2]);
  };
  Q.inv_aperioexpande = Q.i_apea = Q.i20 = function (x, z) {
    return Q._invHyperopFromOrdinal(x, z, [0,2]);
  };

  // explode = ω*2 + 1  →  coeffs [1,2]
  P.explode = P.expl = P.h21 = function (y) {
    return Q._hyperopFromOrdinal(this, y, [1,2]);
  };
  Q.explode = Q.expl = Q.h21 = function (x, y) {
    return Q._hyperopFromOrdinal(x, y, [1,2]);
  };
  P.inv_explode = P.i_expl = P.i21 = function (z) {
    return Q._invHyperopFromOrdinal(this, z, [1,2]);
  };
  Q.inv_explode = Q.i_expl = Q.i21 = function (x, z) {
    return Q._invHyperopFromOrdinal(x, z, [1,2]);
  };

  // multiexplode = ω*2 + 2  →  coeffs [2,2]
  P.multiexplode = P.muel = P.h22 = function (y) {
    return Q._hyperopFromOrdinal(this, y, [2,2]);
  };
  Q.multiexplode = Q.muel = Q.h22 = function (x, y) {
    return Q._hyperopFromOrdinal(x, y, [2,2]);
  };
  P.inv_multiexplode = P.i_muel = P.i22 = function (z) {
    return Q._invHyperopFromOrdinal(this, z, [2,2]);
  };
  Q.inv_multiexplode = Q.i_muel = Q.i22 = function (x, z) {
    return Q._invHyperopFromOrdinal(x, z, [2,2]);
  };

  // aperioexplode = ω*3  →  coeffs [0,3]
  P.aperioexplode = P.apel = P.h30 = function (y) {
    return Q._hyperopFromOrdinal(this, y, [0,3]);
  };
  Q.aperioexplode = Q.apel = Q.h30 = function (x, y) {
    return Q._hyperopFromOrdinal(x, y, [0,3]);
  };
  P.inv_aperioexplode = P.i_apel = P.i30 = function (z) {
    return Q._invHyperopFromOrdinal(this, z, [0,3]);
  };
  Q.inv_aperioexplode = Q.i_apel = Q.i30 = function (x, z) {
    return Q._invHyperopFromOrdinal(x, z, [0,3]);
  };

  // detonate = ω*3 + 1  →  coeffs [1,3]
  P.detonate = P.deto = P.h31 = function (y) {
    return Q._hyperopFromOrdinal(this, y, [1,3]);
  };
  Q.detonate = Q.deto = Q.h31 = function (x, y) {
    return Q._hyperopFromOrdinal(x, y, [1,3]);
  };
  P.inv_detonate = P.i_deto = P.i31 = function (z) {
    return Q._invHyperopFromOrdinal(this, z, [1,3]);
  };
  Q.inv_detonate = Q.i_deto = Q.i31 = function (x, z) {
    return Q._invHyperopFromOrdinal(x, z, [1,3]);
  };

  // aperiodetonate = ω*4  →  coeffs [0,4]
  P.aperiodetonate = P.apdt = P.h40 = function (y) {
    return Q._hyperopFromOrdinal(this, y, [0,4]);
  };
  Q.aperiodetonate = Q.apdt = Q.h40 = function (x, y) {
    return Q._hyperopFromOrdinal(x, y, [0,4]);
  };
  P.inv_aperiodetonate = P.i_apdt = P.i40 = function (z) {
    return Q._invHyperopFromOrdinal(this, z, [0,4]);
  };
  Q.inv_aperiodetonate = Q.i_apdt = Q.i40 = function (x, z) {
    return Q._invHyperopFromOrdinal(x, z, [0,4]);
  };

  // aperionate = ω²  →  coeffs [0,0,1]
  P.aperionate = P.apeo = P.h100 = function (y) {
    return Q._hyperopFromOrdinal(this, y, [0,0,1]);
  };
  Q.aperionate = Q.apeo = Q.h100 = function (x, y) {
    return Q._hyperopFromOrdinal(x, y, [0,0,1]);
  };
  P.inv_aperionate = P.i_apeo = P.i100 = function (z) {
    return Q._invHyperopFromOrdinal(this, z, [0,0,1]);
  };
  Q.inv_aperionate = Q.i_apeo = Q.i100 = function (x, z) {
    return Q._invHyperopFromOrdinal(x, z, [0,0,1]);
  };

  // megote = ω² + 1  →  coeffs [1,0,1]
  P.megote = P.mego = P.h101 = function (y) {
    return Q._hyperopFromOrdinal(this, y, [1,0,1]);
  };
  Q.megote = Q.mego = Q.h101 = function (x, y) {
    return Q._hyperopFromOrdinal(x, y, [1,0,1]);
  };
  P.inv_megote = P.i_mego = P.i101 = function (z) {
    return Q._invHyperopFromOrdinal(this, z, [1,0,1]);
  };
  Q.inv_megote = Q.i_mego = Q.i101 = function (x, z) {
    return Q._invHyperopFromOrdinal(x, z, [1,0,1]);
  };

  // multimegote = ω² + 2  →  coeffs [2,0,1]
  P.multimegote = P.mume = P.h102 = function (y) {
    return Q._hyperopFromOrdinal(this, y, [2,0,1]);
  };
  Q.multimegote = Q.mume = Q.h102 = function (x, y) {
    return Q._hyperopFromOrdinal(x, y, [2,0,1]);
  };
  P.inv_multimegote = P.i_mume = P.i102 = function (z) {
    return Q._invHyperopFromOrdinal(this, z, [2,0,1]);
  };
  Q.inv_multimegote = Q.i_mume = Q.i102 = function (x, z) {
    return Q._invHyperopFromOrdinal(x, z, [2,0,1]);
  };

  // aperimegote = ω² + ω  →  coeffs [0,1,1]
  P.aperimegote = P.apmg = P.h110 = function (y) {
    return Q._hyperopFromOrdinal(this, y, [0,1,1]);
  };
  Q.aperimegote = Q.apmg = Q.h110 = function (x, y) {
    return Q._hyperopFromOrdinal(x, y, [0,1,1]);
  };
  P.inv_aperimegote = P.i_apmg = P.i110 = function (z) {
    return Q._invHyperopFromOrdinal(this, z, [0,1,1]);
  };
  Q.inv_aperimegote = Q.i_apmg = Q.i110 = function (x, z) {
    return Q._invHyperopFromOrdinal(x, z, [0,1,1]);
  };

  // megoexpande = ω² + ω + 1  →  coeffs [1,1,1]
  P.megoexpande = P.mgea = P.h111 = function (y) {
    return Q._hyperopFromOrdinal(this, y, [1,1,1]);
  };
  Q.megoexpande = Q.mgea = Q.h111 = function (x, y) {
    return Q._hyperopFromOrdinal(x, y, [1,1,1]);
  };
  P.inv_megoexpande = P.i_mgea = P.i111 = function (z) {
    return Q._invHyperopFromOrdinal(this, z, [1,1,1]);
  };
  Q.inv_megoexpande = Q.i_mgea = Q.i111 = function (x, z) {
    return Q._invHyperopFromOrdinal(x, z, [1,1,1]);
  };

  // aperimegoexpande = ω² + ω*2  →  coeffs [0,2,1]
  P.aperimegoexpande = P.apme = P.h120 = function (y) {
    return Q._hyperopFromOrdinal(this, y, [0,2,1]);
  };
  Q.aperimegoexpande = Q.apme = Q.h120 = function (x, y) {
    return Q._hyperopFromOrdinal(x, y, [0,2,1]);
  };
  P.inv_aperimegoexpande = P.i_apme = P.i120 = function (z) {
    return Q._invHyperopFromOrdinal(this, z, [0,2,1]);
  };
  Q.inv_aperimegoexpande = Q.i_apme = Q.i120 = function (x, z) {
    return Q._invHyperopFromOrdinal(x, z, [0,2,1]);
  };

  // megoaperionate = ω²*2  →  coeffs [0,0,2]
  // (also alias megoaperionation for backwards compat; renamed per user request)
  P.megoaperionate = P.mgao = P.h200 = function (y) {
    return Q._hyperopFromOrdinal(this, y, [0,0,2]);
  };
  Q.megoaperionate = Q.mgao = Q.h200 = function (x, y) {
    return Q._hyperopFromOrdinal(x, y, [0,0,2]);
  };
  P.inv_megoaperionate = P.i_mgao = P.i200 = function (z) {
    return Q._invHyperopFromOrdinal(this, z, [0,0,2]);
  };
  Q.inv_megoaperionate = Q.i_mgao = Q.i200 = function (x, z) {
    return Q._invHyperopFromOrdinal(x, z, [0,0,2]);
  };

  // gigote = ω²*2 + 1  →  coeffs [1,0,2]
  P.gigote = P.gigo = P.h201 = function (y) {
    return Q._hyperopFromOrdinal(this, y, [1,0,2]);
  };
  Q.gigote = Q.gigo = Q.h201 = function (x, y) {
    return Q._hyperopFromOrdinal(x, y, [1,0,2]);
  };
  P.inv_gigote = P.i_gigo = P.i201 = function (z) {
    return Q._invHyperopFromOrdinal(this, z, [1,0,2]);
  };
  Q.inv_gigote = Q.i_gigo = Q.i201 = function (x, z) {
    return Q._invHyperopFromOrdinal(x, z, [1,0,2]);
  };

  // aperigigote = ω²*2 + ω  →  coeffs [0,1,2]
  P.aperigigote = P.apgg = P.h210 = function (y) {
    return Q._hyperopFromOrdinal(this, y, [0,1,2]);
  };
  Q.aperigigote = Q.apgg = Q.h210 = function (x, y) {
    return Q._hyperopFromOrdinal(x, y, [0,1,2]);
  };
  P.inv_aperigigote = P.i_apgg = P.i210 = function (z) {
    return Q._invHyperopFromOrdinal(this, z, [0,1,2]);
  };
  Q.inv_aperigigote = Q.i_apgg = Q.i210 = function (x, z) {
    return Q._invHyperopFromOrdinal(x, z, [0,1,2]);
  };

  // gigoaperionate = ω²*3  →  coeffs [0,0,3]
  P.gigoaperionate = P.ggap = P.h300 = function (y) {
    return Q._hyperopFromOrdinal(this, y, [0,0,3]);
  };
  Q.gigoaperionate = Q.ggap = Q.h300 = function (x, y) {
    return Q._hyperopFromOrdinal(x, y, [0,0,3]);
  };
  P.inv_gigoaperionate = P.i_ggap = P.i300 = function (z) {
    return Q._invHyperopFromOrdinal(this, z, [0,0,3]);
  };
  Q.inv_gigoaperionate = Q.i_ggap = Q.i300 = function (x, z) {
    return Q._invHyperopFromOrdinal(x, z, [0,0,3]);
  };

  // aperiatote = ω³  →  coeffs [0,0,0,1]
  // (also alias aperiatotion for backwards compat; renamed per user request)
  P.aperiatote = P.apat = P.h1000 = function (y) {
    return Q._hyperopFromOrdinal(this, y, [0,0,0,1]);
  };
  Q.aperiatote = Q.apat = Q.h1000 = function (x, y) {
    return Q._hyperopFromOrdinal(x, y, [0,0,0,1]);
  };
  P.inv_aperiatote = P.i_apat = P.i1000 = function (z) {
    return Q._invHyperopFromOrdinal(this, z, [0,0,0,1]);
  };
  Q.inv_aperiatote = Q.i_apat = Q.i1000 = function (x, z) {
    return Q._invHyperopFromOrdinal(x, z, [0,0,0,1]);
  };

  // powiainate = ω³ + 1  →  coeffs [1,0,0,1]
  P.powiainate = P.pwan = P.h1001 = function (y) {
    return Q._hyperopFromOrdinal(this, y, [1,0,0,1]);
  };
  Q.powiainate = Q.pwan = Q.h1001 = function (x, y) {
    return Q._hyperopFromOrdinal(x, y, [1,0,0,1]);
  };
  P.inv_powiainate = P.i_pwan = P.i1001 = function (z) {
    return Q._invHyperopFromOrdinal(this, z, [1,0,0,1]);
  };
  Q.inv_powiainate = Q.i_pwan = Q.i1001 = function (x, z) {
    return Q._invHyperopFromOrdinal(x, z, [1,0,0,1]);
  };

  // expandainate = ω³ + ω  →  coeffs [0,1,0,1]
  P.expandainate = P.epan = P.h1010 = function (y) {
    return Q._hyperopFromOrdinal(this, y, [0,1,0,1]);
  };
  Q.expandainate = Q.epan = Q.h1010 = function (x, y) {
    return Q._hyperopFromOrdinal(x, y, [0,1,0,1]);
  };
  P.inv_expandainate = P.i_epan = P.i1010 = function (z) {
    return Q._invHyperopFromOrdinal(this, z, [0,1,0,1]);
  };
  Q.inv_expandainate = Q.i_epan = Q.i1010 = function (x, z) {
    return Q._invHyperopFromOrdinal(x, z, [0,1,0,1]);
  };

  // megodainate = ω³ + ω²  →  coeffs [0,0,1,1]
  P.megodainate = P.mgan = P.h1100 = function (y) {
    return Q._hyperopFromOrdinal(this, y, [0,0,1,1]);
  };
  Q.megodainate = Q.mgan = Q.h1100 = function (x, y) {
    return Q._hyperopFromOrdinal(x, y, [0,0,1,1]);
  };
  P.inv_megodainate = P.i_mgan = P.i1100 = function (z) {
    return Q._invHyperopFromOrdinal(this, z, [0,0,1,1]);
  };
  Q.inv_megodainate = Q.i_mgan = Q.i1100 = function (x, z) {
    return Q._invHyperopFromOrdinal(x, z, [0,0,1,1]);
  };

  // powiairate = ω³*2  →  coeffs [0,0,0,2]
  P.powiairate = P.pwar = P.h2000 = function (y) {
    return Q._hyperopFromOrdinal(this, y, [0,0,0,2]);
  };
  Q.powiairate = Q.pwar = Q.h2000 = function (x, y) {
    return Q._hyperopFromOrdinal(x, y, [0,0,0,2]);
  };
  P.inv_powiairate = P.i_pwar = P.i2000 = function (z) {
    return Q._invHyperopFromOrdinal(this, z, [0,0,0,2]);
  };
  Q.inv_powiairate = Q.i_pwar = Q.i2000 = function (x, z) {
    return Q._invHyperopFromOrdinal(x, z, [0,0,0,2]);
  };

  // aperioguate = ω⁴  →  coeffs [0,0,0,0,1]
  P.aperioguate = P.apgu = P.h10000 = function (y) {
    return Q._hyperopFromOrdinal(this, y, [0,0,0,0,1]);
  };
  Q.aperioguate = Q.apgu = Q.h10000 = function (x, y) {
    return Q._hyperopFromOrdinal(x, y, [0,0,0,0,1]);
  };
  P.inv_aperioguate = P.i_apgu = P.i10000 = function (z) {
    return Q._invHyperopFromOrdinal(this, z, [0,0,0,0,1]);
  };
  Q.inv_aperioguate = Q.i_apgu = Q.i10000 = function (x, z) {
    return Q._invHyperopFromOrdinal(x, z, [0,0,0,0,1]);
  };

  // iter (ω^ω): diagonalizes ω^x operations
  // k <= maxCols-2: layer 0, multi-index; k >= maxCols-1: layer 1
  P.iteration = P.iter = P.hww = function (y) {
    var x = this.clone();
    y = new MetaNum(y);
    if (x.isNaN() || y.isNaN()) return MetaNum.NaN.clone();
    if (x.eq(MetaNum.ONE)) return MetaNum.ONE.clone();
    if (y.eq(MetaNum.ONE)) return x.clone();
    if (y.lte(MetaNum.ZERO)) return MetaNum.NaN.clone();
    
    if (y.layer === 0 && y.array.length <= 1) {
      var yn = y.toNumber();
      var maxLevel = MetaNum.maxCols - 1;
      if (yn < maxLevel) {
        // y fits within ordinal levels: create ω^y at layer 0
        // Multi-index format: [1, 0, 0, ..., 0, 1] with yn zeros
        var result = x.clone();
        var row = [1];
        for (var i = 0; i < yn; i++) row.push(0);
        row.push(1);
        result.layer = 0;
        result.array.push(row);
        result.normalize();
        return result;
      } else {
        // y >= maxLevel: promote to layer 1, compact format
        var result = x.clone();
        result.array.push([1, yn, 1]);
        result.normalize();
        return result;
      }
    }
    
    // y is ordinal: iter on ordinal
    // Promote: absorb y's ordinal rows into r0, add iter marker
    // Layer promotion consumes one level: skip the first value
    var result = y.clone();
    var newR0 = x.array[0].slice();
    // Absorb y's ordinal rows into r0 (skip count and first value)
    for (var ir = 1; ir < y.array.length; ir++) {
      var yrow = y.array[ir];
      // Start from index 2 to skip count and first ordinal value
      for (var jc = 2; jc < yrow.length; jc++) {
        newR0.push(yrow[jc]);
      }
    }
    result.array[0] = newR0;
    result.array = [newR0];
    // Add iter's own ordinal marker
    result.array.push([1, 0, 1]);
    result.layer = y.layer + 1;
    result.normalize();
    return result;
  };
  Q.iteration = Q.iter = Q.hww = function (x, y) {
    return new MetaNum(x).iteration(y);
  };

  P.inv_iteration = P.inv_iter = P.iww = function (z) {
    var x = this.clone();
    z = new MetaNum(z);
    if (x.isNaN() || z.isNaN()) return MetaNum.NaN.clone();
    if (x.array.length >= 2) {
      // For ordinal y: find [1, 0, 1] marker and return y (the ordinal itself)
      for (var i = x.array.length - 1; i >= 1; i--) {
        var row = x.array[i];
        if (row.length >= 3 && row[1] === 0 && row[2] === 1 && row[0] === 1) {
          // This is the ordinal marker, return the ordinal y
          var result = x.clone();
          result.array.splice(i, 1);
          result.normalize();
          if (result.array.length <= 1) result.layer = 0;
          return result;
        }
      }
      // For finite y >= maxLevel: find [1, yn, 1] and return yn
      for (var i = x.array.length - 1; i >= 1; i--) {
        var row = x.array[i];
        if (row.length === 3 && row[0] === 1 && row[2] === 1 && row[1] > 0) {
          return new MetaNum(row[1]);
        }
      }
      // For finite y < maxLevel: find [1, 0, 0, ..., 0, 1] and count zeros
      for (var i = x.array.length - 1; i >= 1; i--) {
        var row = x.array[i];
        if (row.length >= 3 && row[0] === 1 && row[row.length - 1] === 1) {
          // Count zeros between first and last element
          var zeros = 0;
          for (var j = 1; j < row.length - 1; j++) {
            if (row[j] === 0) zeros++;
            else break;
          }
          if (zeros > 0) {
            return new MetaNum(zeros);
          }
        }
      }
    }
    return z;
  };
  Q.inv_iteration = Q.inv_iter = Q.iww = function (x, z) {
    return new MetaNum(x).inv_iteration(z);
  };

  // itermult (ω^ω+1): iterates ω^ω level operations
  // layer=1, array=[[count], [1, yn, 1]] — count applications of ω^ω
  P.itermult = P.itmu = P.hw01 = function (y) {
    var x = this.clone();
    y = new MetaNum(y);
    if (x.isNaN() || y.isNaN()) return MetaNum.NaN.clone();
    if (x.eq(MetaNum.ONE)) return MetaNum.ONE.clone();
    if (y.eq(MetaNum.ONE)) return x.iter(x);
    if (y.lte(MetaNum.ZERO)) return MetaNum.NaN.clone();
    if (y.layer === 0 && y.array.length <= 1) {
      var yn = y.toNumber();
      var base = x.iter(x);
      if (y.eq(2)) return base;
      var result = base.clone();
      result.layer = 1;
      result.array = [base.array[0].slice()];
      result.array[0] = [yn];
      result.array.push([1, yn, 1]);
      result.normalize();
      return result;
    }
    var result = y.clone();
    result.layer = Math.max(result.layer, 1);
    var base = x.iter(x);
    result.array[0] = base.array[0].slice();
    result.normalize();
    return result;
  };
  Q.itermult = Q.itmu = Q.hw01 = function (x, y) {
    return new MetaNum(x).itermult(y);
  };

  P.inv_itermult = P.i_itmu = P.iw01 = function (z) {
    var x = this.clone();
    z = new MetaNum(z);
    if (x.isNaN() || z.isNaN()) return MetaNum.NaN.clone();
    if (x.array.length >= 2) {
      var result = x.clone();
      for (var i = result.array.length - 1; i >= 1; i--) {
        var row = result.array[i];
        if (row.length >= 3 && row[0] > 0) {
          row[0]--;
          if (row[0] <= 0) result.array.splice(i, 1);
          result.normalize();
          if (result.array.length <= 1) result.layer = 0;
          return result;
        }
      }
      return result;
    }
    return z;
  };
  Q.inv_itermult = Q.i_itmu = Q.iw01 = function (x, z) {
    return new MetaNum(x).inv_itermult(z);
  };

  // cuboiter (ω^ω*2): (ω^ω)*2 = ω^ω + ω^base
  // layer=1, array=[[1], [1, yn, 1], [1, 0, 1]]
  P.cuboiter = P.cube = P.hwx2 = function (y) {
    var x = this.clone();
    y = new MetaNum(y);
    if (x.isNaN() || y.isNaN()) return MetaNum.NaN.clone();
    if (x.eq(MetaNum.ONE)) return MetaNum.ONE.clone();
    if (y.eq(MetaNum.ONE)) return x.clone();
    if (y.lte(MetaNum.ZERO)) return MetaNum.NaN.clone();
    var base = x.itermult(x);
    if (y.layer === 0 && y.array.length <= 1) {
      var yn = y.toNumber();
      if (y.eq(2)) return base;
      var result = base.clone();
      result.layer = 1;
      result.array = [[1]];
      result.array.push([1, yn, 1]);
      result.array.push([1, 0, 1]);
      result.normalize();
      return result;
    }
    var result = y.clone();
    result.layer = 1;
    result.array[0] = base.array[0].slice();
    result.array.push([1, 0, 1]);
    result.normalize();
    return result;
  };
  Q.cuboiter = Q.cube = Q.hwx2 = function (x, y) {
    return new MetaNum(x).cuboiter(y);
  };

  P.inv_cuboiter = P.i_cube = P.iwx2 = function (z) {
    var x = this.clone();
    z = new MetaNum(z);
    if (x.isNaN() || z.isNaN()) return MetaNum.NaN.clone();
    if (x.array.length >= 2) {
      // For finite y: find [1, yn, 1] with yn > 0 and return yn
      // (skip [1, 0, 1] which is the cuboiter marker)
      for (var i = x.array.length - 1; i >= 1; i--) {
        var row = x.array[i];
        if (row.length === 3 && row[0] === 1 && row[2] === 1 && row[1] > 0) {
          return new MetaNum(row[1]);
        }
      }
      // For ordinal y: find [1, 0, 1] marker and return y
      for (var i = x.array.length - 1; i >= 1; i--) {
        var row = x.array[i];
        if (row.length >= 3 && row[1] === 0 && row[2] === 1 && row[0] === 1) {
          var result = x.clone();
          result.array.splice(i, 1);
          result.normalize();
          if (result.array.length <= 1) result.layer = 0;
          return result;
        }
      }
    }
    return z;
  };
  Q.inv_cuboiter = Q.i_cube = Q.iwx2 = function (x, z) {
    return new MetaNum(x).inv_cuboiter(z);
  };

  // expoiter (ω^(ω+1)): ω^(ω+1) = ω^ω * ω → ω^(ω*y)[y]
  // layer=1, array=[[1], [yn, 0, 1]]
  P.expoiter = P.expo = P.hwa1 = function (y) {
    var x = this.clone();
    y = new MetaNum(y);
    if (x.isNaN() || y.isNaN()) return MetaNum.NaN.clone();
    if (x.eq(MetaNum.ONE)) return MetaNum.ONE.clone();
    if (y.eq(MetaNum.ONE)) return x.iter(x);
    if (y.lte(MetaNum.ZERO)) return MetaNum.NaN.clone();
    var base = x.iter(x);
    if (y.layer === 0 && y.array.length <= 1) {
      var yn = y.toNumber();
      if (y.eq(2)) return x.cuboiter(x);
      var result = base.clone();
      result.layer = 1;
      result.array = [[1]];
      result.array.push([yn, 0, 1]);
      result.normalize();
      return result;
    }
    var result = y.clone();
    result.layer = 1;
    result.array[0] = base.array[0].slice();
    result.array.push([1, 0, 1]);
    result.normalize();
    return result;
  };
  Q.expoiter = Q.expo = Q.hwa1 = function (x, y) {
    return new MetaNum(x).expoiter(y);
  };

  P.inv_expoiter = P.i_expo = P.iwa1 = function (z) {
    var x = this.clone();
    z = new MetaNum(z);
    if (x.isNaN() || z.isNaN()) return MetaNum.NaN.clone();
    if (x.array.length >= 2) {
      // For ordinal y: find [1, 0, 1] marker and return y
      for (var i = x.array.length - 1; i >= 1; i--) {
        var row = x.array[i];
        if (row.length >= 3 && row[1] === 0 && row[2] === 1 && row[0] === 1) {
          var result = x.clone();
          result.array.splice(i, 1);
          result.normalize();
          if (result.array.length <= 1) result.layer = 0;
          return result;
        }
      }
      // For finite y: find [yn, 0, 1] and return yn
      for (var i = x.array.length - 1; i >= 1; i--) {
        var row = x.array[i];
        if (row.length === 3 && row[1] === 0 && row[2] === 1 && row[0] > 0) {
          return new MetaNum(row[0]);
        }
      }
    }
    return z;
  };
  Q.inv_expoiter = Q.i_expo = Q.iwa1 = function (x, z) {
    return new MetaNum(x).inv_expoiter(z);
  };

  // trioterate (ω^(ω*2)): ω^(ω*2) = ω^(ω+y)[y]
  // layer=1, array=[[1], [1, yn, 1]]
  P.trioterate = P.tria = P.hwm2 = function (y) {
    var x = this.clone();
    y = new MetaNum(y);
    if (x.isNaN() || y.isNaN()) return MetaNum.NaN.clone();
    if (x.eq(MetaNum.ONE)) return MetaNum.ONE.clone();
    if (y.eq(MetaNum.ONE)) return x.iter(x);
    if (y.lte(MetaNum.ZERO)) return MetaNum.NaN.clone();
    if (y.layer === 0 && y.array.length <= 1) {
      var yn = y.toNumber();
      var base = x.expoiter(x);
      if (y.eq(2)) return base;
      var result = base.clone();
      result.layer = 1;
      result.array = [[1]];
      result.array.push([1, yn, 1]);
      result.normalize();
      return result;
    }
    var result = y.clone();
    result.layer = 1;
    var base = x.iter(x);
    result.array[0] = base.array[0].slice();
    result.normalize();
    return result;
  };
  Q.trioterate = Q.tria = Q.hwm2 = function (x, y) {
    return new MetaNum(x).trioterate(y);
  };

  P.inv_trioterate = P.i_tria = P.iwm2 = function (z) {
    var x = this.clone();
    z = new MetaNum(z);
    if (x.isNaN() || z.isNaN()) return MetaNum.NaN.clone();
    if (x.array.length >= 2) {
      // For ordinal y: find [1, 0, 1] marker and return y
      for (var i = x.array.length - 1; i >= 1; i--) {
        var row = x.array[i];
        if (row.length >= 3 && row[1] === 0 && row[2] === 1 && row[0] === 1) {
          var result = x.clone();
          result.array.splice(i, 1);
          result.normalize();
          if (result.array.length <= 1) result.layer = 0;
          return result;
        }
      }
      // For finite y: find [1, yn, 1] and return yn
      for (var i = x.array.length - 1; i >= 1; i--) {
        var row = x.array[i];
        if (row.length === 3 && row[0] === 1 && row[2] === 1 && row[1] > 0) {
          return new MetaNum(row[1]);
        }
      }
    }
    return z;
  };
  Q.inv_trioterate = Q.i_tria = Q.iwm2 = function (x, z) {
    return new MetaNum(x).inv_trioterate(z);
  };

  // trixxate (ω^(ω^2)): diagonalizes ω^(ω*y) at layer 2
  // layer=2, array=[[1], [1, yn, 1]]
  P.trixxate = P.trix = P.hwp2 = function (y) {
    var x = this.clone();
    y = new MetaNum(y);
    if (x.isNaN() || y.isNaN()) return MetaNum.NaN.clone();
    if (x.eq(MetaNum.ONE)) return MetaNum.ONE.clone();
    if (y.eq(MetaNum.ONE)) return x.trioterate(x);
    if (y.lte(MetaNum.ZERO)) return MetaNum.NaN.clone();
    if (y.layer === 0 && y.array.length <= 1) {
      var yn = y.toNumber();
      var base = x.trioterate(x);
      if (y.eq(2)) return base;
      var result = base.clone();
      result.layer = 2;
      result.array = [[1]];
      result.array.push([1, yn, 1]);
      result.normalize();
      return result;
    }
    var result = y.clone();
    result.layer = 2;
    var base = x.trioterate(x);
    result.array[0] = base.array[0].slice();
    result.normalize();
    return result;
  };
  Q.trixxate = Q.trix = Q.hwp2 = function (x, y) {
    return new MetaNum(x).trixxate(y);
  };

  P.inv_trixxate = P.i_trix = P.iwp2 = function (z) {
    var x = this.clone();
    z = new MetaNum(z);
    if (x.isNaN() || z.isNaN()) return MetaNum.NaN.clone();
    if (x.array.length >= 2) {
      // For ordinal y: find [1, 0, 1] marker and return y
      for (var i = x.array.length - 1; i >= 1; i--) {
        var row = x.array[i];
        if (row.length >= 3 && row[1] === 0 && row[2] === 1 && row[0] === 1) {
          var result = x.clone();
          result.array.splice(i, 1);
          result.normalize();
          if (result.array.length <= 1) result.layer = 0;
          return result;
        }
      }
      // For finite y: find [1, yn, 1] and return yn
      for (var i = x.array.length - 1; i >= 1; i--) {
        var row = x.array[i];
        if (row.length === 3 && row[0] === 1 && row[2] === 1 && row[1] > 0) {
          return new MetaNum(row[1]);
        }
      }
    }
    return z;
  };
  Q.inv_trixxate = Q.i_trix = Q.iwp2 = function (x, z) {
    return new MetaNum(x).inv_trixxate(z);
  };

  // aperixxate (ω^(ω^ω)): diagonalizes ω^(ω^y) at layer 3
  // Repetition count negligible for layer >= 2 (defaults to 1)
  P.aperixxate = P.apix = P.hwpw = function (y) {
    var x = this.clone();
    y = new MetaNum(y);
    if (x.isNaN() || y.isNaN()) return MetaNum.NaN.clone();
    if (x.eq(MetaNum.ONE)) return MetaNum.ONE.clone();
    if (y.eq(MetaNum.ONE)) return x.trixxate(x);
    if (y.lte(MetaNum.ZERO)) return MetaNum.NaN.clone();
    if (y.layer === 0 && y.array.length <= 1) {
      var yn = y.toNumber();
      var base = x.trixxate(x);
      if (y.eq(2)) return base;
      var result = base.clone();
      result.layer = 3;
      result.array = [[1]];
      result.array.push([1, yn, 1]);
      result.normalize();
      return result;
    }
    var result = y.clone();
    result.layer = 3;
    var base = x.trixxate(x);
    result.array[0] = base.array[0].slice();
    result.normalize();
    return result;
  };
  Q.aperixxate = Q.apix = Q.hwpw = function (x, y) {
    return new MetaNum(x).aperixxate(y);
  };

  P.inv_aperixxate = P.i_apix = P.iwpw = function (z) {
    var x = this.clone();
    z = new MetaNum(z);
    if (x.isNaN() || z.isNaN()) return MetaNum.NaN.clone();
    if (x.array.length >= 2) {
      // For ordinal y: find [1, 0, 1] marker and return y
      for (var i = x.array.length - 1; i >= 1; i--) {
        var row = x.array[i];
        if (row.length >= 3 && row[1] === 0 && row[2] === 1 && row[0] === 1) {
          var result = x.clone();
          result.array.splice(i, 1);
          result.normalize();
          if (result.array.length <= 1) result.layer = 0;
          return result;
        }
      }
      // For finite y: find [1, yn, 1] and return yn
      for (var i = x.array.length - 1; i >= 1; i--) {
        var row = x.array[i];
        if (row.length === 3 && row[0] === 1 && row[2] === 1 && row[1] > 0) {
          return new MetaNum(row[1]);
        }
      }
    }
    return z;
  };
  Q.inv_aperixxate = Q.i_apix = Q.iwpw = function (x, z) {
    return new MetaNum(x).inv_aperixxate(z);
  };

  // epsilonate (ε₀ = ω↑↑ω): diagonalizes ω↑↑y
  // layer varies with y, array=[[1], [1, yn, 1]]
  P.epsilonate = P.epsl = P.hepsl = function (y) {
    var x = this.clone();
    y = new MetaNum(y);
    if (x.isNaN() || y.isNaN()) return MetaNum.NaN.clone();
    if (x.eq(MetaNum.ONE)) return MetaNum.ONE.clone();
    if (y.eq(MetaNum.ONE)) return x.aperixxate(x);
    if (y.lte(MetaNum.ZERO)) return MetaNum.NaN.clone();
    if (y.layer === 0 && y.array.length <= 1) {
      var yn = y.toNumber();
      var base = x.aperixxate(x);
      if (y.eq(2)) return base;
      var result = base.clone();
      result.layer = yn;
      result.array = [[1]];
      result.array.push([1, yn, 1]);
      result.normalize();
      return result;
    }
    var result = y.clone();
    result.layer = y.layer;
    var base = x.aperixxate(x);
    result.array[0] = base.array[0].slice();
    result.normalize();
    return result;
  };
  Q.epsilonate = Q.epsl = Q.hepsl = function (x, y) {
    return new MetaNum(x).epsilonate(y);
  };

  P.inv_epsilonate = P.i_epsl = P.iepsl = function (z) {
    var x = this.clone();
    z = new MetaNum(z);
    if (x.isNaN() || z.isNaN()) return MetaNum.NaN.clone();
    if (x.array.length >= 2) {
      // For ordinal y: find [1, 0, 1] marker and return y
      for (var i = x.array.length - 1; i >= 1; i--) {
        var row = x.array[i];
        if (row.length >= 3 && row[1] === 0 && row[2] === 1 && row[0] === 1) {
          var result = x.clone();
          result.array.splice(i, 1);
          result.normalize();
          if (result.array.length <= 1) result.layer = 0;
          return result;
        }
      }
      // For finite y: find [1, yn, 1] and return yn
      for (var i = x.array.length - 1; i >= 1; i--) {
        var row = x.array[i];
        if (row.length === 3 && row[0] === 1 && row[2] === 1 && row[1] > 0) {
          return new MetaNum(row[1]);
        }
      }
    }
    return z;
  };
  Q.inv_epsilonate = Q.i_epsl = Q.iepsl = function (x, z) {
    return new MetaNum(x).inv_epsilonate(z);
  };


  P.choose = function (other) {
    var x = this.clone();
    other = new MetaNum(other);
    if (x.isNaN() || other.isNaN()) return MetaNum.NaN.clone();
    if (x.sign === -1 || x.sign === -2 || other.sign === -1 || other.sign === -2) return MetaNum.ZERO.clone();
    if (other.eq(MetaNum.ZERO) || x.eq(other)) return MetaNum.ONE.clone();
    if (x.lt(other)) return MetaNum.ZERO.clone();
    if (isSimple(x) && isSimple(other) && Number.isInteger(x.array[0][0]) && Number.isInteger(other.array[0][0]) &&
        x.array[0][0] >= 0 && other.array[0][0] >= 0 && x.array[0][0] <= 1000 && other.array[0][0] <= 1000) {
      var n = x.array[0][0];
      var k = other.array[0][0];
      if (k > n - k) k = n - k;
      var result = 1;
      for (var i = 0; i < k; i++) result = result * (n - i) / (i + 1);
      return new MetaNum(result);
    }
    return x.fact().div(other.fact().mul(x.sub(other).fact()));
  };
  Q.choose = function (x, y) {
    return new MetaNum(x).choose(y);
  };

  P.toNumber = function () {
    if (this.sign === -1) return -this.abs().toNumber();
    if (this.sign === -2) return -this.abs().toNumber();
    if (this.isNaN()) return NaN;
    if (this.isInfinite()) return Infinity;
    if (isSmall(this)) {
      // Small value: very close to 0
      if (this.layer > 0) return 0;
      if (this.array.length > 1) return 0;
      var r0 = this.array[0];
      if (r0.length === 1) {
        // Simple small value: 1/r0[0]
        return 1 / r0[0];
      }
      return 0;
    }
    if (this.layer > 0) return Infinity;
    if (this.array.length > 1) return Infinity;
    var r0 = this.array[0];
    if (r0.length === 1) return r0[0];
    return Infinity;
  };
  Q.toNumber = function (x) {
    return new MetaNum(x).toNumber();
  };

  P.valueOf = function () {
    return this.toString();
  };

  P.toString = function () {
    function formatCount(pattern, count) {
      return count >= 4 ? pattern + "^" + count : pattern.repeat(count);
    }
    function formatFiniteOps(r0) {
      // Find the highest level
      var highest = -1;
      for (var i = r0.length - 1; i >= 1; i--) {
        if (r0[i] > 0) { highest = i; break; }
      }
      if (highest === -1) return "";

      // If highest level is 23+, use normalized Aa notation
      if (highest >= 23) {
        var coeff = r0[highest];
        var pow9 = 9;
        for (var i = highest - 1; i >= 1; i--) {
          coeff += (r0[i] || 0) / pow9;
          pow9 *= 9;
        }
        // Carry: if coeff >= 9, move to next level
        var level = highest;
        while (coeff >= 9) {
          coeff /= 9;
          level++;
        }
        // Format coefficient
        var coeffStr;
        if (Math.abs(coeff - Math.round(coeff)) < 1e-12 && Math.round(coeff) <= Number.MAX_SAFE_INTEGER) {
          coeffStr = String(Math.round(coeff));
        } else {
          coeffStr = decimalPlaces(coeff, 8);
        }
        return coeffStr + "Aa" + level;
      }

      // Letter notation for levels <= 22
      var parts = [];
      for (var i = highest; i >= 1; i--) {
        if (r0[i] > 0) {
          var letter = String.fromCharCode(68 + i);
          var token = formatCount(letter, r0[i]);
          parts.push(token);
        }
      }
      if (parts.length === 0) return "";
      var hasPower = false;
      for (var j = 0; j < parts.length; j++) {
        if (parts[j].indexOf("^") !== -1) { hasPower = true; break; }
      }
      var sep = hasPower ? " " : "";
      return parts.join(sep) + (hasPower ? " " : "");
    }
    // Helper: format a MetaNum as scientific notation (AeB)
    function formatExponent(num) {
      if (isSimple(num)) {
        var val = num.toNumber();
        if (isFinite(val) && val !== 0) {
          return val.toExponential(6).replace(/\+/g, '');
        }
      }
      if (num.layer === 0 && num.array.length === 1) {
        var r0 = num.array[0];
        if (r0.length === 2) {
          // E notation: array is [mantissa, 1], value = 10^mantissa
          var m = r0[0];
          if (Number.isInteger(m)) {
            return "1E" + m;
          }
          var mant = Math.pow(10, m % 1);
          var exp = Math.floor(m);
          return mant.toPrecision(6).replace(/0+$/, '').replace(/\.$/, '') + "E" + exp;
        }
      }
      // Fallback: use native toString
      return num.toString();
    }
    if (this.isNaN()) return "NaN";
    if (this.isInfinite()) return this.sign === -1 || this.sign === -2 ? "-Infinity" : "Infinity";

    if (this.eq(MetaNum.ZERO)) return "0";

    if (this.sign === -1 || this.sign === -2) return "-" + this.abs().toString();

    if (isSmall(this)) {
      // Three tiers of small value display
      var recip = this.clone();
      recip.sign = 1;  // Get the reciprocal (large number)
      var mag = recip.log10();  // log10(reciprocal) = magnitude exponent
      var maxSf = new MetaNum(MAX_SAFE_INTEGER);
      var eMaxSf = MetaNum.pow(MetaNum.TEN, maxSf);
      
      // Tier 1: |x| > 1e-MAX_SAFE_INTEGER → -log10(|x|) < MAX_SAFE_INTEGER → mag < MAX_SAFE_INTEGER
      if (mag.lt(maxSf)) {
        var expVal = mag.toNumber();
        if (Number.isFinite(expVal)) {
          if (Number.isInteger(expVal)) {
            return "1E-" + String(Math.round(expVal));
          }
          // Non-integer: normalize so mantissa is in [1, 10)
          var frac = expVal - Math.floor(expVal);
          var mantissa = Math.pow(10, 1 - frac);
          var intExp = Math.floor(expVal) + 1;
          var mantStr = mantissa.toPrecision(6).replace(/0+$/, '').replace(/\.$/, '');
          return mantStr + "E-" + intExp;
        }
      }
      
      // Tier 2: MAX_SAFE_INTEGER ≤ mag < 10^MAX_SAFE_INTEGER
      if (!mag.isInfinite() && mag.gte(maxSf) && mag.lt(eMaxSf)) {
        // Format mag in scientific notation for the "e-AeB" format
        var expStr = formatExponent(mag);
        return "E-" + expStr;
      }
      
      // Tier 3: mag ≥ 10^MAX_SAFE_INTEGER → display as reciprocal
      if (recip.layer === 0 && recip.array.length === 1 && recip.array[0].length === 1) {
        return recip.array[0][0] + "⁻¹";
      }
      return recip.toString() + "⁻¹";
    }

    if (this.layer > 0) {
      var LAYER_SYMBOLS = {1: '!', 2: '@', 3: '#', 4: '$', 5: '%', 6: '&', 7: '~', 8: '<', 9: '>', 10: '?'};
      var sym = this.layer <= 10 ? LAYER_SYMBOLS[this.layer] : null;
      
      // Layer >= 11: use {m}ε{n} format
      if (this.layer >= 11) {
        var epsVal;
        var epsIsSpecial = false;
        
        // Check for special case: r0 stores ordinal level directly [coeff, m] with 99 <= m <= MAX_SAFE_INTEGER
        if (this.array.length === 1 && this.array[0].length === 2 &&
            this.array[0][1] >= 99 && this.array[0][1] <= MAX_SAFE_INTEGER) {
          epsVal = this.array[0][1];
          epsIsSpecial = true;
        } else if (this.array.length >= 2) {
          // Normal case: ordinal level from last row structure
          // The ε value is the ordinal exponent (number of ordinal params = lastRow.length - 2)
          var lastRow = this.array[this.array.length - 1];
          epsVal = lastRow.length - 2;
        } else {
          epsVal = this.array[0][0] || 1;
        }
        
        if (epsIsSpecial) {
          return "{" + epsVal + "}\u03B5{" + this.layer + "}";
        }
        // Normal case: bare format mεn for simple values
        var epsStr;
        if (Number.isInteger(epsVal) && epsVal >= 1 && epsVal <= 1e15) {
          epsStr = String(epsVal);
        } else {
          epsStr = "{" + epsVal + "}";
        }
        // If there's more structure beyond the simple ε format, include array notation
        if (this.array.length > 2 || (this.array.length === 2 && this.array[0].length > 1)) {
          epsStr += " [" + this.array[0].join(",") + "]";
          for (var i = 1; i < this.array.length - 1; i++) {
            epsStr += " [" + this.array[i].join(",") + "]";
          }
        }
        return epsStr + "\u03B5" + this.layer;
      }
      
      // Layers 1-10: check for special ε compact format first
      // Special case: r0 stores ordinal level directly [coeff, m] with 99 <= m <= MAX_SAFE_INTEGER
      if (sym && this.array.length === 1 && this.array[0].length === 2 &&
          this.array[0][1] >= 99 && this.array[0][1] <= Number.MAX_SAFE_INTEGER) {
        return "{" + this.array[0][1] + "}\u03B5{" + (this.layer - 1) + "}";
      }

      // Layers 1-10: check for mεn format (ω^ε representation)
      if (sym && this.array.length === 2 && this.array[0].length === 1 && this.array[0][0] === 10) {
        var lastRow = this.array[1];
        // Check if last row is [1, 0_repeated_m, 1] pattern
        if (lastRow[0] === 1 && lastRow[lastRow.length - 1] === 1) {
          var allZeros = true;
          for (var ei = 1; ei < lastRow.length - 1; ei++) {
            if (lastRow[ei] !== 0) { allZeros = false; break; }
          }
          if (allZeros) {
            var m = lastRow.length - 2; // number of zeros
            return m + "\u03B5" + this.layer;
          }
        }
      }

      // Layers 1-10: try letter notation
      if (sym && this.array.length >= 2) {
        var ordTokens = [];
        var validLetter = true;
        
        for (var i = this.array.length - 1; i >= 1; i--) {
          var row = this.array[i];
          if (row.length < 3) { validLetter = false; break; }
          var diag = row[row.length - 1];
          var countVals = row[0];
          var vals = row.slice(1, row.length - 1);
          var n = vals.length;
          
          if (diag < 1 || diag > 26) { validLetter = false; break; }
          
          var U = String.fromCharCode(64 + diag);
          var allZero = true;
          var anyLarge = false;
          var largeVal = -1;
          for (var j = 0; j < n; j++) {
            if (vals[j] > 25) { anyLarge = true; largeVal = vals[j]; }
            if (vals[j] !== 0) allZero = false;
          }
          
          var token;
          if (allZero) {
            token = n > 26 ? U + "a" + n : U + "a".repeat(n);
          } else if (anyLarge && n === 1) {
            // Compact format: single large value
            token = U + "a" + largeVal;
          } else {
            var lower = "";
            var ok = true;
            for (var j = n - 1; j >= 0; j--) {
              if (vals[j] > 25) { ok = false; break; }
              lower += String.fromCharCode(97 + vals[j]);
            }
            if (!ok) { validLetter = false; break; }
            token = U + lower;
          }
          if (countVals > 1) {
            token = countVals >= 4 ? token + "^" + countVals : token.repeat(countVals);
          }
          ordTokens.push(token);
        }
        
        if (validLetter && ordTokens.length > 0) {
          var finOps = formatFiniteOps(this.array[0]);
          var hasAa = finOps && finOps.indexOf("Aa") !== -1;
          var baseStr = "";
          if (!hasAa) {
            if (this.array[0].length === 1) {
              baseStr = String(this.array[0][0]);
            } else if (finOps !== "" && this.array[0].length >= 1 && this.array[0][0] > 0) {
              baseStr = String(this.array[0][0]);
            }
          }
          // Always include layer symbol for layers 1-10
          if (this.layer >= 1 && finOps === "" && baseStr !== "") {
            return sym + ordTokens.join("") + baseStr;
          }
          return sym + ordTokens.join("") + (finOps ? finOps : "") + baseStr;
        }
      }
      
      // Ultimate fallback: array notation with layer symbol
      var s = (this.layer <= 10 ? LAYER_SYMBOLS[this.layer] || ("!".repeat(this.layer)) : "E" + this.layer) + " ";
      for (var i = 0; i < this.array.length; i++) {
        if (i > 0) s += " ";
        s += "[" + this.array[i].join(",") + "]";
      }
      return s;
    }

    if (this.array.length <= 1) {
      var r0 = this.array[0];

      if (r0.length === 1) return String(r0[0]);

      if (r0.length >= 24) {
        // Find highest level with non-zero value
        var highest = -1;
        for (var j = r0.length - 1; j >= 1; j--) {
          if (r0[j] && r0[j] !== 0) { highest = j; break; }
        }
        if (highest >= 23) {
          // Normalized Aa notation: absorb all lower levels into coefficient
          var coeff = r0[highest];
          var pow9 = 9;
          for (var j = highest - 1; j >= 1; j--) {
            coeff += (r0[j] || 0) / pow9;
            pow9 *= 9;
          }
          var level = highest;
          while (coeff >= 9) {
            coeff /= 9;
            level++;
          }
          var coeffStr;
          if (Math.abs(coeff - Math.round(coeff)) < 1e-12 && Math.round(coeff) <= Number.MAX_SAFE_INTEGER) {
            coeffStr = String(Math.round(coeff));
          } else {
            coeffStr = decimalPlaces(coeff, 8);
          }
          return coeffStr + "Aa" + level;
        }
        // Fallback: letter notation for all levels
        var result = "";
        for (var j = r0.length - 1; j >= 1; j--) {
          if (!r0[j] || r0[j] === 0) continue;
          var letter = String.fromCharCode(68 + j);
          if (r0[j] > 3) {
            result += letter + "^" + r0[j] + " ";
          } else {
            result += letter.repeat(r0[j]);
          }
        }
        result += decimalPlaces(r0[0], 6);
        return result;
      }

      var result = "";
      for (var j = r0.length - 1; j >= 1; j--) {
        if (!r0[j] || r0[j] === 0) continue;
        if (j <= 22) {
          var letter = String.fromCharCode(68 + j);
          if (r0[j] > 3) {
            result += letter + "^" + r0[j] + " ";
          } else {
            result += letter.repeat(r0[j]);
          }
        } else {
          result += r0[j] + "Aa" + j + " ";
        }
      }
      result += decimalPlaces(r0[0], 6);
      return result;
    }

    // Layer 0 with ordinal rows: try letter notation
    if (this.array.length > 1) {
      // Check if all ordinal rows are 2-element [count, value] (h10 ω-level format)
      var allTwoElement = true;
      for (var i = 1; i < this.array.length; i++) {
        if (this.array[i].length !== 2) { allTwoElement = false; break; }
      }
      if (allTwoElement) {
        // Check for truncation pattern: array[0] = [10] placeholder
        var isTruncated = this.array[0].length === 1 && this.array[0][0] === 10;
        if (isTruncated) {
          // Show only the last row: count Aa value
          var lastRow = this.array[this.array.length - 1];
          return lastRow[0] + "Aa" + lastRow[1];
        }
        // Non-truncated: show all rows
        var tokens = [];
        for (var i = this.array.length - 1; i >= 1; i--) {
          var row = this.array[i];
          var tok = row[0] > 1 ? row[0] + "Aa" + row[1] : "Aa" + row[1];
          tokens.push(tok);
        }
        var finOps = formatFiniteOps(this.array[0]);
        var hasAa = finOps && finOps.indexOf("Aa") !== -1;
        var baseNum = hasAa ? "" : decimalPlaces(this.array[0][0], 6);
        return tokens.join("") + (finOps ? finOps : "") + baseNum;
      }
      
      var ordTokens = [];
      var validLetter = true;
      var useExclaim = false;
      
      for (var i = this.array.length - 1; i >= 1; i--) {
        var row = this.array[i];
        if (row.length < 3) { validLetter = false; break; }
        var diag = row[row.length - 1];
        var countVals = row[0];
        var vals = row.slice(1, row.length - 1);
        var n = vals.length;
        
        if (diag < 1 || diag > 26) { validLetter = false; break; }
        
        var U = String.fromCharCode(64 + diag);
        var allZero = true;
        var anyLarge = false;
        for (var j = 0; j < n; j++) {
          if (vals[j] > 25) { anyLarge = true; }
          if (vals[j] !== 0) allZero = false;
        }
        if (anyLarge) { validLetter = false; break; }
        if (!validLetter) break;
        
        var token;
        if (allZero) {
          if (n > 26) {
            useExclaim = true;
            token = U + "a" + n;
          } else {
            token = U + "a".repeat(n);
          }
        } else {
          var lower = "";
          for (var j = n - 1; j >= 0; j--) {
            lower += String.fromCharCode(97 + vals[j]);
          }
          token = U + lower;
        }
        if (countVals > 1) {
          token = countVals >= 4 ? token + "^" + countVals : token.repeat(countVals);
        }
        ordTokens.push(token);
      }
      
      if (validLetter) {
        var finOps = formatFiniteOps(this.array[0]);
        var hasAa = finOps && finOps.indexOf("Aa") !== -1;
        var prefix = useExclaim ? "!" : "";
        var baseNum = (useExclaim || hasAa) ? "" : decimalPlaces(this.array[0][0], 6);
        return prefix + ordTokens.join("") + (finOps ? finOps : "") + baseNum;
      }
    }

    if (this.array.length === 2 &&
        this.array[0].length === 1 && this.array[0][0] === 10 &&
        this.array[1].length === 2) {
      return this.array[1][0] + "Aa" + this.array[1][1];
    }

    var multiResult = "";
    for (var i = 0; i < this.array.length; i++) {
      if (i > 0) multiResult += " ";
      multiResult += "[" + this.array[i].join(",") + "]";
    }
    return multiResult;
  };

  P.toJSON = function () {
    if (MetaNum.serializeMode === 0) {
      return {
        sign: this.sign,
        array: deepCloneArray(this.array),
        layer: this.layer
      };
    } else {
      return this.toString();
    }
  };

  P.toStringWithDecimalPlaces = function (places) {
    if (this.sign === -1 || this.sign === -2) return "-" + this.abs().toStringWithDecimalPlaces(places);
    if (this.isNaN()) return "NaN";
    if (this.isInfinite()) return "Infinity";
    if (isSimple(this)) {
      var v = decimalPlaces(this.array[0][0], places);
      if (Number.isFinite(v)) return v.toString();
    }
    return this.toString();
  };

  P.toExponential = function (places) {
    if (this.sign === -1 || this.sign === -2) return "-" + this.abs().toExponential(places);
    if (this.isNaN()) return "NaN";
    if (this.isInfinite()) return "Infinity";
    if (isSimple(this)) return this.toNumber().toExponential(places);
    return this.toString();
  };

  P.toFixed = function (places) {
    if (this.sign === -1 || this.sign === -2) return "-" + this.abs().toFixed(places);
    if (this.isNaN()) return "NaN";
    if (this.isInfinite()) return "Infinity";
    if (isSimple(this)) return this.toNumber().toFixed(places);
    return this.toString();
  };

  P.toPrecision = function (places) {
    if (this.sign === -1 || this.sign === -2) return "-" + this.abs().toPrecision(places);
    if (this.isNaN()) return "NaN";
    if (this.isInfinite()) return "Infinity";
    if (isSimple(this)) return this.toNumber().toPrecision(places);
    return this.toString();
  };

  P.toHyperE = function () {
    if (this.sign === -1 || this.sign === -2) return "-" + this.abs().toHyperE();
    if (this.isNaN()) return "NaN";
    if (this.isInfinite()) return "Infinity";
    if (isSimple(this)) {
      var v = this.array[0][0];
      if (v < 10) return String(v);
      return "E" + Math.log10(v).toFixed(6);
    }
    if (this.layer > 0) return "E" + this.layer + "#" + this.toString();
    if (this.array.length === 1 && this.array[0].length >= 2) {
      var s = "E";
      for (var i = 1; i < this.array[0].length; i++) s += "#";
      s += String(this.array[0][0]);
      return s;
    }
    return this.toString();
  };

  Q.fromNumber = function (input) {
    if (typeof input !== "number") throw Error(invalidArgument + "Expected Number");
    var x = new MetaNum();
    x.array = [[Math.abs(input)]];
    x.sign = input < 0 ? -1 : 1;
    x.layer = 0;
    return x.normalize();
  };

  Q.fromArray = function (array, sign, layer) {
    if (!Array.isArray(array)) throw Error(invalidArgument + "Expected Array");
    var x = new MetaNum();
    if (array.length > 0 && !Array.isArray(array[0])) {
      x.array = [array.slice(0)];
    } else {
      x.array = deepCloneArray(array);
    }
    if (typeof sign === "number") {
      if (sign === -2 || sign === 2) x.sign = sign;
      else x.sign = sign < 0 ? -1 : 1;
    } else x.sign = 1;
    if (typeof layer === "number" && isFinite(layer) && layer >= 0) x.layer = Math.floor(layer);
    else x.layer = computeLayer(x.array);
    return x.normalize();
  };

  Q.fromObject = function (input) {
    if (typeof input !== "object") throw Error(invalidArgument + "Expected Object");
    if (input === null) return MetaNum.ZERO.clone();
    if (Array.isArray(input)) return MetaNum.fromArray(input);
    if (input instanceof MetaNum) return new MetaNum(input);
    if (!(input.array instanceof Array)) throw Error(invalidArgument + "Expected that property 'array' exists");
    var x = new MetaNum();
    x.array = deepCloneArray(input.array);
    x.sign = typeof input.sign === "number" ?
      (input.sign === 2 || input.sign === -2 ? input.sign : (input.sign < 0 ? -1 : 1)) : 1;
    x.layer = typeof input.layer === "number" && isFinite(input.layer) && input.layer >= 0 ? Math.floor(input.layer) : 0;
    return x.normalize();
  };

  Q.fromJSON = function (input) {
    if (typeof input === "object") return MetaNum.fromObject(input);
    if (typeof input !== "string") throw Error(invalidArgument + "Expected String");
    var parsedObject;
    try {
      parsedObject = JSON.parse(input);
    } catch (e) {
      throw Error(invalidArgument + "Invalid JSON string");
    }
    return MetaNum.fromObject(parsedObject);
  };

  Q.hyper = function (n, a, b) {
    if (n === undefined) n = 2;
    n = new MetaNum(n);
    a = new MetaNum(a);
    b = new MetaNum(b);
    if (n.isNaN() || a.isNaN() || b.isNaN()) return MetaNum.NaN.clone();
    if (n.eq(MetaNum.ZERO)) return b.add(MetaNum.ONE);
    if (n.eq(MetaNum.ONE)) return a.add(b);
    if (n.eq(2)) return a.mul(b);
    if (n.eq(3)) return a.pow(b);
    if (n.eq(4)) return a.tetr(b);
    if (n.eq(5)) return a.pent(b);
    return a.arrow(b, n.sub(1));
  };

  Q.affordGeometricSeries = function (resourcesAvailable, priceStart, priceRatio, currentOwned) {
    resourcesAvailable = new MetaNum(resourcesAvailable);
    priceStart = new MetaNum(priceStart);
    priceRatio = new MetaNum(priceRatio);
    currentOwned = new MetaNum(currentOwned);
    return priceStart.eq(new MetaNum(1))
      ? resourcesAvailable.add(new MetaNum(1)).floor()
      : MetaNum.ONE;
  };

  Q.affordArithmeticSeries = function (resourcesAvailable, priceStart, priceAdd, currentOwned) {
    resourcesAvailable = new MetaNum(resourcesAvailable);
    priceStart = new MetaNum(priceStart);
    priceAdd = new MetaNum(priceAdd);
    currentOwned = new MetaNum(currentOwned);
    if (priceAdd.eq(MetaNum.ZERO)) return resourcesAvailable.div(priceStart).floor();
    var a = priceAdd;
    var b = priceStart.mul(2).sub(priceAdd);
    var c = priceStart.sub(priceAdd).sub(resourcesAvailable.mul(2)).add(a);
    return b.neg().add(b.pow(2).sub(a.mul(c).mul(4)).sqrt()).div(a.mul(2)).floor();
  };

  Q.sumGeometricSeries = function (numItems, start, ratio, numItemsStart) {
    if (numItemsStart === undefined) numItemsStart = 0;
    numItems = new MetaNum(numItems);
    start = new MetaNum(start);
    ratio = new MetaNum(ratio);
    numItemsStart = new MetaNum(numItemsStart);
    if (numItems.lt(numItemsStart)) return MetaNum.ZERO.clone();
    return start.mul(MetaNum.ONE.sub(ratio.pow(numItems.sub(numItemsStart).add(MetaNum.ONE))))
      .div(MetaNum.ONE.sub(ratio));
  };

  Q.sumArithmeticSeries = function (numItems, start, add, numItemsStart) {
    if (numItemsStart === undefined) numItemsStart = 0;
    numItems = new MetaNum(numItems);
    start = new MetaNum(start);
    add = new MetaNum(add);
    numItemsStart = new MetaNum(numItemsStart);
    if (numItems.lt(numItemsStart)) return MetaNum.ZERO.clone();
    var n = numItems.sub(numItemsStart).add(MetaNum.ONE);
    var last = start.add(add.mul(n.sub(MetaNum.ONE)));
    return n.mul(start.add(last)).div(new MetaNum(2));
  };

  Q.choose = function (x, y) {
    return new MetaNum(x).choose(y);
  };

  Q.fromBigInt = function (input) {
    if (typeof BigInt === "undefined") throw Error(metaNumError + "BigInt is not supported in current environment");
    if (typeof input === "bigint") {
      if (input >= BigInt(0) && input <= BigInt(MAX_SAFE_INTEGER)) {
        return new MetaNum(Number(input));
      }
      var inputStr = input.toString();
      var inputLen = inputStr.length;
      if (inputLen <= LONG_STRING_MIN_LENGTH) {
        return new MetaNum(Number(inputStr));
      }
      var x = new MetaNum();
      x.array = [[inputLen - 1 + log10LongString(inputStr)]];
      x.sign = 1;
      x.layer = 0;
      return x.normalize();
    } else {
      throw Error(invalidArgument + "Expected BigInt");
    }
  };

  Q.fromHyperE = function (input) {
    if (typeof input !== "string") throw Error(invalidArgument + "Expected String");
    var s = input.trim();
    var negateIt = false;
    if (s[0] === "-") {
      negateIt = true;
      s = s.substring(1).trim();
    }
    if (s === "NaN" || s === "Infinity") {
      var x = new MetaNum();
      x.array = [[s === "NaN" ? NaN : Infinity]];
      x.sign = negateIt ? -1 : 1;
      return x;
    }
    var count = 0;
    while (s[0] === "E") {
      count++;
      s = s.substring(1).trim();
      if (s[0] === "#") {
        s = s.substring(1);
      }
    }
    if (count === 0) {
      return MetaNum.fromString((negateIt ? "-" : "") + s);
    }
    var x = new MetaNum();
    if (count === 1) {
      x.array = [[Math.pow(10, Number(s))]];
    } else {
      x.array = [[Number(s)]];
      for (var i = 1; i < count; i++) x.array[0].push(i === count - 1 ? 1 : 0);
    }
    x.sign = negateIt ? -1 : 1;
    x.layer = 0;
    return x.normalize();
  };

  Q.fromString = function (input) {
    if (typeof input !== "string") throw Error(invalidArgument + "Expected String");

    try {
      var parsed = JSON.parse(input);
      if (parsed && typeof parsed === "object" && parsed.array) {
        return MetaNum.fromJSON(parsed);
      }
    } catch (e) {}

    var x = new MetaNum();
    x.array = [[0]];
    x.sign = 1;
    x.layer = 0;

    var s = input.trim();
    if (s === "" || s === "0") {
      return x;
    }

    var negateIt = false;
    if (s[0] === "-" || s[0] === "+") {
      var signMatch = s.match(/^[-\+]+/);
      var signs = signMatch[0];
      negateIt = (signs.match(/-/g) || []).length % 2 === 1;
      s = s.substring(signMatch[0].length).trim();
    }

    if (s === "NaN") {
      x.array = [[NaN]];
      return x;
    }
    if (s === "Infinity") {
      x.array = [[Infinity]];
      x.sign = negateIt ? -1 : 1;
      return x;
    }

    var layerMatch = s.match(/^\u03C9\^(\d+)\s*/);
    if (layerMatch) {
      x.layer = parseInt(layerMatch[1], 10);
      s = s.substring(layerMatch[0].length).trim();
    }

    // Parse {m}ε{n} format - new rule: layer = n, ordinal = [1, 0_repeated_m, 1], r0 defaults to 10
    // If m >= maxCols-1, row would exceed maxCols, so lift: array=[[10],[1,m]], layer=n
    var epsMatch = s.match(/^\{(\d+(?:\.\d+)?)\}\u03B5\{(\d+)\}\s*/);
    if (epsMatch) {
      var epsN = parseInt(epsMatch[2], 10);
      var epsM = Math.floor(Number(epsMatch[1]));
      s = s.substring(epsMatch[0].length).trim();
      if (epsM < 1 || epsN < 1) {
        x.array = [[0]];
        if (negateIt) x.sign = -1;
        return x;
      }
      if (epsM >= MetaNum.maxCols - 1) {
        // m >= 99: row [1, 0_m, 1] exceeds maxCols, lift one layer
        x.layer = epsN;
        x.array[0] = [10];
        x.array.push([1, epsM]);
      } else {
        x.layer = epsN;
        x.array[0] = [10];
        // Build row [1, 0_repeated_epsM, 1]
        var epsRow = [1];
        for (var ei = 0; ei < epsM; ei++) epsRow.push(0);
        epsRow.push(1);
        x.array.push(epsRow);
      }
      if (negateIt) x.sign = -1;
      // De-layer: Aa form ([*,0,1]) with small r0, reduce layer by 1
      if (x.layer > 0 && x.array.length >= 2) {
        var lastRow = x.array[x.array.length - 1];
        if (lastRow.length === 3 && lastRow[1] === 0 && lastRow[lastRow.length - 1] === 1 &&
            x.array[0].length === 1 && x.array[0][0] >= 0 && x.array[0][0] <= MetaNum.maxCols - 2) {
          var baseVal = x.array[0][0];
          lastRow = [lastRow[0]];
          for (var di = 0; di < baseVal; di++) lastRow.push(0);
          lastRow.push(1);
          x.array[x.array.length - 1] = lastRow;
          x.layer--;
        }
      }
      return x.normalize();
    }

    // Parse mεn format without braces - same rule: layer = n, ordinal = [1, 0_repeated_m, 1], r0 defaults to 10
    // If m >= maxCols-1, row would exceed maxCols, so lift: array=[[10],[1,m]], layer=n
    var epsBareMatch = s.match(/^(\d+(?:\.\d+)?)\u03B5(\d+)\s*/);
    if (epsBareMatch) {
      var epsBareN = parseInt(epsBareMatch[2], 10);
      var epsBareM = Math.floor(Number(epsBareMatch[1]));
      s = s.substring(epsBareMatch[0].length).trim();
      if (epsBareM < 1 || epsBareN < 1) {
        x.array = [[0]];
        if (negateIt) x.sign = -1;
        return x;
      }
      if (epsBareM >= MetaNum.maxCols - 1) {
        // m >= 99: row [1, 0_m, 1] exceeds maxCols, lift one layer
        x.layer = epsBareN;
        x.array[0] = [10];
        x.array.push([1, epsBareM]);
      } else {
        x.layer = epsBareN;
        x.array[0] = [10];
        // Build row [1, 0_repeated_epsBareM, 1]
        var epsBareRow = [1];
        for (var ebi = 0; ebi < epsBareM; ebi++) epsBareRow.push(0);
        epsBareRow.push(1);
        x.array.push(epsBareRow);
      }
      if (negateIt) x.sign = -1;
      // De-layer: Aa form ([*,0,1]) with small r0, reduce layer by 1
      if (x.layer > 0 && x.array.length >= 2) {
        var lastRow = x.array[x.array.length - 1];
        if (lastRow.length === 3 && lastRow[1] === 0 && lastRow[lastRow.length - 1] === 1 &&
            x.array[0].length === 1 && x.array[0][0] >= 0 && x.array[0][0] <= MetaNum.maxCols - 2) {
          var baseVal = x.array[0][0];
          lastRow = [lastRow[0]];
          for (var di = 0; di < baseVal; di++) lastRow.push(0);
          lastRow.push(1);
          x.array[x.array.length - 1] = lastRow;
          x.layer--;
        }
      }
      // Expand compact [1,m] form to full [1,0,...,0,1] form for display
      if (x.array.length >= 2) {
        var lastRow = x.array[x.array.length - 1];
        if (lastRow.length === 2 && lastRow[0] === 1) {
          var m = lastRow[1];
          var expandedRow = [1];
          for (var exi = 0; exi < m; exi++) expandedRow.push(0);
          expandedRow.push(1);
          x.array[x.array.length - 1] = expandedRow;
        }
      }
      return x.normalize();
    }

    // Parse ε{n} format (layer with no count)
    var epsSimpleMatch = s.match(/^\u03B5\{(\d+)\}\s*/);
    if (epsSimpleMatch) {
      x.layer = parseInt(epsSimpleMatch[1], 10);
      s = s.substring(epsSimpleMatch[0].length).trim();
      if (negateIt) x.sign = -1;
      return x.normalize();
    }

    // Parse layer symbol + letter pattern + {n} format
    // (simple case: just {n} after symbol, no letters)
    var symSimpleMatch = s.match(/^([!@#\$%&~<>?])\{(\d+(?:\.\d+)?)\}\s*$/);
    if (symSimpleMatch) {
      var SYMBOL_LAYERS = {'!': 1, '@': 2, '#': 3, '$': 4, '%': 5, '&': 6, '~': 7, '<': 8, '>': 9, '?': 10};
      x.layer = SYMBOL_LAYERS[symSimpleMatch[1]] || 1;
      var symSimpleVal = Number(symSimpleMatch[2]);
      if (!isNaN(symSimpleVal) && isFinite(symSimpleVal)) {
        x.array[0] = [symSimpleVal];
      }
      if (negateIt) x.sign = -1;
      return x.normalize();
    }

    // Parse symbol + full letter pattern {n} (multi-letter like !AaBa{n}, handles ^N notation)
    var symParseMatch = s.match(/^([!@#\$%&~<>?])(.*?)\{(\d+(?:\.\d+)?)\}\s*$/);
    if (symParseMatch) {
      var SYMBOL_LAYERS3 = {'!': 1, '@': 2, '#': 3, '$': 4, '%': 5, '&': 6, '~': 7, '<': 8, '>': 9, '?': 10};
      x.layer = SYMBOL_LAYERS3[symParseMatch[1]] || 1;
      var symLetters2 = symParseMatch[2].trim();
      var symBase2 = Number(symParseMatch[3]);
      
      // Parse tokens: ordinal tokens have lowercase (Aa, Abc), finite ops are single uppercase
      var symTokens2 = [];
      var symFinOps = [];  // finite ops for r0
      var symTokRegex = /([A-Z][a-z]*)(?:\^(\d+))?/g;
      var symTokM;
      while ((symTokM = symTokRegex.exec(symLetters2)) !== null) {
        var tokName = symTokM[1];
        var tokCount = symTokM[2] ? parseInt(symTokM[2], 10) : 1;
        // Single uppercase letter (no lowercase) = finite op
        if (tokName.length === 1 && tokName[0] >= 'D') {
          // Finite operations start from E (level 1 = E, level 2 = F, ...)
          var finLevel = tokName.charCodeAt(0) - 68; // 68 = 'D', E->1, F->2, ...
          if (finLevel > 0) {
            symFinOps.push({level: finLevel, count: tokCount});
          }
        } else {
          symTokens2.push({name: tokName, count: tokCount});
        }
      }
      
      if (symTokens2.length === 0) {
        x.array[0] = [symBase2];
        if (negateIt) x.sign = -1;
        return x;
      }
      
      // Group consecutive identical tokens
      var symGroups2 = [];
      for (var ti = 0; ti < symTokens2.length; ti++) {
        if (symGroups2.length > 0 && symGroups2[symGroups2.length - 1].name === symTokens2[ti].name) {
          symGroups2[symGroups2.length - 1].count += symTokens2[ti].count;
        } else {
          symGroups2.push({name: symTokens2[ti].name, count: symTokens2[ti].count});
        }
      }
      
      var symRows2 = [];
      for (var gi3 = 0; gi3 < symGroups2.length; gi3++) {
        var g3 = symGroups2[gi3];
        var gName3 = g3.name;
        var gU3 = gName3[0];
        var gUIdx3 = gU3.charCodeAt(0) - 64;
        var gLower3 = gName3.slice(1);
        var gIndices3 = [];
        for (var li3 = 0; li3 < gLower3.length; li3++) {
          gIndices3.push(gLower3.charCodeAt(li3) - 97);
        }
        var gK3 = gIndices3.length;
        var gAllZero3 = true;
        var gFirstNonZero3 = -1;
        for (var li3 = 0; li3 < gK3; li3++) {
          if (gIndices3[li3] !== 0) {
            gAllZero3 = false;
            if (gFirstNonZero3 === -1) gFirstNonZero3 = li3;
          }
        }
        var gLastIsA3 = gIndices3[gK3 - 1] === 0;
        var gRow3 = [g3.count];
        var gIsDiag3 = false;
        
        if (gAllZero3) {
          for (var li3 = 0; li3 < gK3; li3++) gRow3.push(0);
          gRow3.push(gUIdx3);
        } else if (gLastIsA3 && gFirstNonZero3 >= 0) {
          gIsDiag3 = true;
          for (var li3 = gK3 - 1; li3 >= 0; li3--) {
            gRow3.push(gIndices3[li3]);
          }
          gRow3.push(gUIdx3);
        } else {
          for (var li3 = gK3 - 1; li3 >= 0; li3--) {
            gRow3.push(gIndices3[li3]);
          }
          gRow3.push(gUIdx3);
        }
        symRows2.push({
          row: gRow3,
          isDiag: gIsDiag3,
          lowerIndices: gIndices3,
          level: gUIdx3
        });
      }
      
      symRows2.sort(function(a, b) {
        if (a.level !== b.level) return a.level - b.level;
        var maxLen = Math.max(a.lowerIndices.length, b.lowerIndices.length);
        for (var ii = 0; ii < maxLen; ii++) {
          var va = ii < a.lowerIndices.length ? a.lowerIndices[ii] : 0;
          var vb = ii < b.lowerIndices.length ? b.lowerIndices[ii] : 0;
          if (va !== vb) return va - vb;
        }
        return 0;
      });
      
      x.array = [[symBase2]];
      // Apply finite ops to r0
      for (var fi = 0; fi < symFinOps.length; fi++) {
        var fo = symFinOps[fi];
        x.array[0][fo.level] = (x.array[0][fo.level] || 0) + fo.count;
      }
      // Handle special finite ops: F and E
      // F (level 2): F^count means tetration exponent count-2
      // E (level 1): E^count means exponent count
      // Higher levels (G, H, ...) are higher hyperoperation levels
      x._oaRowData = [];
      for (var gi3 = 0; gi3 < symRows2.length; gi3++) {
        x.array.push(symRows2[gi3].row);
        x._oaRowData.push({isDiag: symRows2[gi3].isDiag});
      }
      if (negateIt) x.sign = -1;
      // De-layer: Aa form [*,0,1] with small r0, reduce layer by 1
      if (x.layer > 0 && x.array.length >= 2) {
        var lastRow = x.array[x.array.length - 1];
        if (lastRow.length === 3 && lastRow[1] === 0 && lastRow[lastRow.length - 1] === 1 &&
            x.array[0].length === 1 && x.array[0][0] >= 0 && x.array[0][0] <= MetaNum.maxCols - 2) {
          var baseVal = x.array[0][0];
          lastRow = [lastRow[0]];
          for (var di = 0; di < baseVal; di++) lastRow.push(0);
          lastRow.push(1);
          x.array[x.array.length - 1] = lastRow;
          x.layer--;
        }
      }
      return x.normalize();
    }

    var bracketPattern = /\[([^\]]*)\]/g;
    var match;
    var rowIndex = 0;

    while ((match = bracketPattern.exec(s)) !== null) {
      var nums = match[1].split(",");
      var row = [];
      for (var i = 0; i < nums.length; i++) {
        var raw = nums[i].trim();
        if (raw[0] === '[') raw = raw.substring(1);
        if (raw[raw.length - 1] === ']') raw = raw.substring(0, raw.length - 1);
        var n = Number(raw);
        if (!isNaN(n) && isFinite(n)) {
          row.push(n);
        } else {
          row.push(0);
        }
      }
      if (rowIndex === 0) {
        x.array[0] = row;
      } else {
        x.array.push(row);
      }
      rowIndex++;
      if (rowIndex >= MetaNum.maxRows) break;
    }

    if (rowIndex === 0) {
      var rem = s;

      var tetrMatch = rem.match(/^(\d+(?:\.\d+)?)\s*\^\^\s*(\d+(?:\.\d+)?)\s*$/);
      if (tetrMatch) {
        var tetrBase = Number(tetrMatch[1]);
        var tetrHeight = Number(tetrMatch[2]);
        if (!isNaN(tetrBase) && !isNaN(tetrHeight) && isFinite(tetrHeight) && tetrHeight >= 0 && tetrHeight === Math.floor(tetrHeight)) {
          if (tetrHeight === 0) {
            x.array = [[1]];
          } else if (tetrHeight === 1) {
            x.array = [[tetrBase]];
          } else {
            var tetrResult = MetaNum.pow(tetrBase, new MetaNum(tetrBase));
            for (var ti = 3; ti <= tetrHeight; ti++) {
              tetrResult = MetaNum.pow(tetrBase, tetrResult);
            }
            x.array = deepCloneArray(tetrResult.array);
            x.sign = tetrResult.sign;
            x.layer = tetrResult.layer;
          }
          if (negateIt) x.sign = -1;
          return x.normalize();
        }
      }

      var coeffEMatch = rem.match(/^(\d+(?:\.\d+)?)\s*[Ee]\s*(\d+(?:\.\d+)?)\s*$/);
      if (coeffEMatch) {
        var coeff = Number(coeffEMatch[1]);
        var exp = Number(coeffEMatch[2]);
        if (!isNaN(coeff) && !isNaN(exp) && isFinite(exp) && coeff > 0) {
          x.array[0] = [exp + Math.log10(coeff), 1];
          x.sign = negateIt ? -1 : 1;
          x.layer = 0;
          return x.normalize();
        }
      }

      var aaMatch = rem.match(/^(\d+)Aa(\d+)/i);
      if (aaMatch) {
        var aaCount = aaMatch[1] ? Number(aaMatch[1]) : 1;
        var aaN = Number(aaMatch[2]);
        if (!isNaN(aaN) && isFinite(aaN) && aaN >= 1 && aaN === Math.floor(aaN)) {
          if (aaN < MetaNum.maxCols) {
            x.array[0] = [10];
            x.array[0][aaN] = aaCount;
          } else {
            x.array = [[10], [aaCount, aaN]];
          }
          if (negateIt) x.sign = -1;
          return x.normalize();
        }
      }

      // Handle layer symbol prefix + letter pattern + optional finOps + number (e.g., !Abcd1234, !AaE16, @Bcde500)
      var symPrefixMatch = rem.match(/^([!@#\$%&~<>?])([A-Z][a-z]+(?:[A-Z][a-z]+)*)([A-Z]*)(\d+)\s*$/);
      if (symPrefixMatch) {
        var SYMBOL_LAYERS_P = {'!': 1, '@': 2, '#': 3, '$': 4, '%': 5, '&': 6, '~': 7, '<': 8, '>': 9, '?': 10};
        x.layer = SYMBOL_LAYERS_P[symPrefixMatch[1]] || 1;
        // Strip the symbol and let the rest fall through to oaMatch
        rem = symPrefixMatch[2] + (symPrefixMatch[3] || '') + symPrefixMatch[4];
      }

      var oaMatch = rem.match(/^((?:[A-Z][a-z]+)+)([A-Z]*)(\d+)/);
      if (oaMatch) {
        var oaFullPrefix = oaMatch[1];
        var oaFinOps = oaMatch[2];
        var oaN = Number(oaMatch[3]);
        if (!isNaN(oaN) && isFinite(oaN) && oaN >= 1 && oaN === Math.floor(oaN)) {
          var oaTokens = [];
          var oaTokenRegex = /[A-Z][a-z]+/g;
          var oaTm;
          while ((oaTm = oaTokenRegex.exec(oaFullPrefix)) !== null) {
            oaTokens.push(oaTm[0]);
          }

          var oaGroups = [];
          for (var ti = 0; ti < oaTokens.length; ti++) {
            if (oaGroups.length > 0 && oaGroups[oaGroups.length - 1].token === oaTokens[ti]) {
              oaGroups[oaGroups.length - 1].count++;
            } else {
              oaGroups.push({token: oaTokens[ti], count: 1});
            }
          }

          var oaRows = [];
          for (var gi = 0; gi < oaGroups.length; gi++) {
            var g = oaGroups[gi];
            var gU = g.token[0];
            var gUIdx = gU.charCodeAt(0) - 64;
            var gLower = g.token.slice(1);
            var gIndices = [];
            for (var li = 0; li < gLower.length; li++) {
              gIndices.push(gLower.charCodeAt(li) - 97);
            }
            var gK = gIndices.length;
            var gAllZero = true;
            var gFirstNonZero = -1;
            for (var li = 0; li < gK; li++) {
              if (gIndices[li] !== 0) {
                gAllZero = false;
                if (gFirstNonZero === -1) gFirstNonZero = li;
              }
            }
            var gLastIsA = gIndices[gK - 1] === 0;
            var gRow = [g.count];
            var gIsDiag = false;

            if (gAllZero) {
              for (var li = 0; li < gK; li++) gRow.push(0);
              gRow.push(gUIdx);
            } else if (gLastIsA && gFirstNonZero >= 0) {
              gIsDiag = true;
              for (var li = gK - 1; li >= 0; li--) {
                gRow.push(gIndices[li]);
              }
              gRow.push(gUIdx);
            } else {
              for (var li = gK - 1; li >= 0; li--) {
                gRow.push(gIndices[li]);
              }
              gRow.push(gUIdx);
            }
            oaRows.push({
              row: gRow,
              isDiag: gIsDiag,
              lowerIndices: gIndices,
              level: gUIdx
            });
          }

          oaRows.sort(function(a, b) {
            if (a.level !== b.level) return a.level - b.level;
            var maxLen = Math.max(a.lowerIndices.length, b.lowerIndices.length);
            for (var i = 0; i < maxLen; i++) {
              var va = i < a.lowerIndices.length ? a.lowerIndices[i] : 0;
              var vb = i < b.lowerIndices.length ? b.lowerIndices[i] : 0;
              if (va !== vb) return va - vb;
            }
            return 0;
          });

          x.array = [[oaN]];
          // Apply finite ops to r0 (single uppercase letters between ordinal tokens and number)
          if (oaFinOps) {
            for (var fi = 0; fi < oaFinOps.length; fi++) {
              var finLevel = oaFinOps.charCodeAt(fi) - 68; // E->1, F->2, G->3, ...
              if (finLevel > 0) {
                x.array[0][finLevel] = (x.array[0][finLevel] || 0) + 1;
              }
            }
          }
          x._oaRowData = [];
          for (var gi = 0; gi < oaRows.length; gi++) {
            x.array.push(oaRows[gi].row);
            x._oaRowData.push({isDiag: oaRows[gi].isDiag});
          }
          if (negateIt) x.sign = -1;
          // De-layer: Aa form [*,0,1] with small r0, reduce layer by 1
          if (x.layer > 0 && x.array.length >= 2) {
            var lastRow = x.array[x.array.length - 1];
            if (lastRow.length === 3 && lastRow[1] === 0 && lastRow[lastRow.length - 1] === 1 &&
                x.array[0].length === 1 && x.array[0][0] >= 0 && x.array[0][0] <= MetaNum.maxCols - 2) {
              var baseVal = x.array[0][0];
              lastRow = [lastRow[0]];
              for (var di = 0; di < baseVal; di++) lastRow.push(0);
              lastRow.push(1);
              x.array[x.array.length - 1] = lastRow;
              x.layer--;
            }
          }
          return x.normalize();
        }
      }

      if (/^[A-Z]+/i.test(rem)) {
        var prefixMatch = rem.match(/^([A-Z]+)/i);
        var prefix = prefixMatch[0].toUpperCase();
        rem = rem.substring(prefixMatch[0].length).trim();
        var val = Number(rem);
        if (!isNaN(val) && isFinite(val)) {
          var counts = {};
          var maxIdx = 0;
          for (var i = 0; i < prefix.length; i++) {
            var letterPos = prefix.charCodeAt(i) - 64;
            if (letterPos >= 5) {
              var idx = letterPos - 4;
              counts[idx] = (counts[idx] || 0) + 1;
              maxIdx = Math.max(maxIdx, idx);
            }
          }
          x.array[0] = [val];
          var eCount = counts[1] || 0;
          var fCount = counts[2] || 0;
          if (fCount > 0 && eCount === 0 && fCount === 1 && maxIdx === 2 && val >= 0 && val === Math.floor(val)) {
            if (val === 0) {
              x.array = [[1]];
            } else if (val === 1) {
              x.array = [[10]];
            } else {
              x.array[0] = [10000000000, val - 2];
            }
          } else if (maxIdx === 1) {
            x.array[0][1] = eCount;
          } else {
            for (var idx = 1; idx <= maxIdx; idx++) {
              x.array[0][idx] = counts[idx] || 0;
            }
          }
          if (negateIt) x.sign = -1;
          return x.normalize();
        }
      }

      var num = Number(rem);
      if (!isNaN(num) && isFinite(num)) {
        x.array[0][0] = num;
      }
    }

    if (negateIt) x.sign = -1;
    return x.normalize();
  };

  
  // ==================== BEAF Ordinal Helpers ====================
  // Build ordinal coefficient array from BEAF args
  // coeffs[i] = args[i+2] - 1, where:
  //   coeffs[0] = c-1 = a1-1 (ω^0 = constant term)
  //   coeffs[1] = d-1 = a2-1 (ω^1 coefficient)
  //   coeffs[2] = e-1 = a3-1 (ω^2 coefficient)
  //   coeffs[3] = f-1 = a4-1 (ω^3 coefficient)
  //   ...
  // Ordinal level = ...+ω^3*coeffs[3]+ω^2*coeffs[2]+ω*coeffs[1]+coeffs[0]
  Q._buildOrdinalCoeffs = function(args) {
    var coeffs = [];
    for (var i = 2; i < args.length; i++) {
      coeffs.push(args[i].toNumber() - 1);
    }
    return coeffs;
  };

  // Apply fundamental sequence ONCE to a limit ordinal.
  //
  // coeffs: [c0, c1, c2, ...] where coeffs[i] is the coefficient of ω^i
  // cardinal: the argument to the fundamental sequence
  //
  // find the SMALLEST p >= 1 such that c_p > 0 and c_0 ... c_{p-1} are ALL 0.
  // That's the lowest non-zero ω-power. Then:
  //   ω^p * q   →   ω^p * (q-1)  +  ω^{p-1} * cardinal
  Q._toSuccessorOrdinal = function(coeffs, cardinal) {
    var result = coeffs.slice();
    while (result.length > 0 && result[result.length - 1] === 0) result.pop();
    if (result.length === 0) return { coeffs: [0], isLimit: false };

    // Successor ordinal: constant term c0 > 0
    if ((result[0] || 0) > 0) {
      return { coeffs: result, isLimit: false };
    }

    // It's a limit ordinal (c0 = 0). Find p = the SMALLEST index >= 1 with c_p > 0.
    // (the rightmost / lowest ω-power with non-zero coefficient)
    var p = 1;
    while (p < result.length && (result[p] || 0) === 0) p++;
    if (p >= result.length) {
      return { coeffs: [0], isLimit: false };
    }

    var q = result[p]; // coefficient of ω^p
    // Transform: ω^p*q → ω^p*(q-1) + ω^{p-1}*cardinal
    result[p] = q - 1;
    var effCardinal = (p === 1) ? (cardinal - 1) : cardinal;
    if (p - 1 === 0) {
      result[0] = (result[0] || 0) + effCardinal;
    } else {
      var idx = p - 1;
      while (result.length <= idx) result.push(0);
      result[idx] = (result[idx] || 0) + effCardinal;
    }

    while (result.length > 0 && result[result.length - 1] === 0) result.pop();
    if (result.length === 0) result = [0];

    var isLimit = true;
    if ((result[0] || 0) > 0) {
      isLimit = false;
    } else {
      var hasOmegaTerm = false;
      for (var i = 1; i < result.length; i++) {
        if ((result[i] || 0) > 0) {
          hasOmegaTerm = true;
          break;
        }
      }
      isLimit = hasOmegaTerm;
    }

    return { coeffs: result, isLimit: isLimit };
  };

  // Convert ordinal coefficients to a row representation
  // coeffs: [c0, c1, c2, ..., cp] where cp != 0
  // Row format: [count, c0, c1, ..., c_{p-1}, cp]
  //   which represents count * (ω^p*cp + ω^{p-1}*c_{p-1} + ... + ω^1*c1 + c0)
  // count: the number of times this ordinal-level operation is repeated (i.e., b-2 in BEAF)
  Q._ordinalToRow = function(coeffs, count) {
    if (coeffs.length === 0) return null;

    // Find the highest non-zero coefficient
    var maxIdx = coeffs.length - 1;
    while (maxIdx >= 0 && (coeffs[maxIdx] || 0) === 0) maxIdx--;
    if (maxIdx < 0) return null;

    var row = [count];
    // Add coefficients from c0 (ω^0) up to c_{maxIdx-1}
    for (var i = 0; i < maxIdx; i++) {
      row.push(coeffs[i] || 0);
    }
    // Add the highest coefficient (diag)
    row.push(coeffs[maxIdx]);
    return row;
  };

  // Decrement a successor ordinal by 1 (subtract 1 from constant term)
  Q._decrementOrdinal = function(coeffs) {
    var result = coeffs.slice();
    while (result.length > 0 && result[result.length - 1] === 0) result.pop();
    if (result.length === 0) return [0];

    if ((result[0] || 0) > 0) {
      result[0]--;
    } else {
      // This should not be called on a limit ordinal, but handle it just in case
      // Find lowest non-zero coefficient and borrow
      var idx = 1;
      while (idx < result.length && (result[idx] || 0) === 0) idx++;
      if (idx < result.length) {
        result[idx]--;
        for (var i = 0; i < idx; i++) {
          result[i] = 0; // These would be filled in during subsequent expansion
        }
      }
    }

    while (result.length > 0 && result[result.length - 1] === 0) result.pop();
    if (result.length === 0) return [0];
    return result;
  };

  // Compare two ordinal coefficient arrays: returns -1 if a<b, 0 if equal, 1 if a>b
  Q._compareOrdinals = function(a, b) {
    var maxIdx = Math.max(a.length, b.length) - 1;
    for (var i = maxIdx; i >= 0; i--) {
      var av = (i < a.length) ? (a[i] || 0) : 0;
      var bv = (i < b.length) ? (b[i] || 0) : 0;
      if (av !== bv) return av - bv;
    }
    return 0;
  };

  // Generate ordinal rows for BEAF/Hyperoperation A(m, n) using the exact algorithm
  //
  // 1. If A is a successor ordinal (c0 > 0), emit row with count = n-1 for level A-1,
  //    then descend with tierCount = n-2.
  // 2. If A is a limit ordinal, apply fundamental sequence repeatedly until a successor 
  //    ordinal B is reached. Then proceed as (1) with B.
  // 3. For each subsequent tier (count = n-2, n-3, ...), repeat the full descent from
  //    B again, but with count set to the current tier value.
  //
  // For example, BEAF(5,5,1,1,2):
  //   5(ω²)5
  //   →5(ω*4+4) 4times 5                       // Step 1, count=4, max ordinal=ω*4+4
  //   →5(ω*4+4) 3times 5(ω*4+3) 3times …… 5(ω+1) 3times 5(ω) 3times 5(ω)5 // Step 2, count=3, descending levels
  //   Finally: 5(ω)5 = base row
  //
  // So rows are:
  //   [3, 4, 4],[3, 3, 4],...,[3, 0, 1],[3, 0, 1]       (cascade, count=3)
  //
  // base: m from BEAF, cardinal: n from BEAF (b in the function)
  // Generate ordinal rows for a given ordinal level (coeffs) with base m and cardinal n.
  // Returns rows sorted from smallest to largest ordinal.
  // Each row has format: [count, c0, c1, ..., c_{p-1}, cp]
  // where count = n-2 for all rows (the top row is excluded).
  //
  // For ordinal A with base m and cardinal n:
  // - rows have count = n-2.
  // - Rows are sorted from smallest to largest ordinal.
  // - Includes all limit ordinals in the expansion.
  //
  // BEAF(5,5,1,1,2) has ordinal ω², base=5, cardinal=5.
  //   topSuccessor = ω*4+4 (after FS from ω²)
  //   count = 5-2 = 3
  //   Rows: [3,0,1], [3,1,1], [3,2,1], [3,3,1], [3,4,1],  (ω, ω+1, ω+2, ω+3, ω+4)
  //         [3,0,2], [3,1,2], [3,2,2], [3,3,2], [3,4,2],  (ω*2, ω*2+1, ..., ω*2+4)
  //         [3,0,3], [3,1,3], [3,2,3], [3,3,3], [3,4,3],  (ω*3, ω*3+1, ..., ω*3+4)
  //         [3,0,4], [3,1,4], [3,2,4], [3,3,4], [3,4,4]   (ω*4, ω*4+1, ..., ω*4+4)

  Q._generateOrdinalRows = function(coeffs, base, cardinal, maxRows) {
    var rows = [];
    var m = base;
    var n = cardinal;
    
    function compareOrd(a, b) {
      var maxLen = Math.max(a.length, b.length);
      for (var i = maxLen - 1; i >= 0; i--) {
        var va = (i < a.length) ? (a[i] || 0) : 0;
        var vb = (i < b.length) ? (b[i] || 0) : 0;
        if (va < vb) return -1;
        if (va > vb) return 1;
      }
      return 0;
    }
    
    function addOrd(a, b) {
      if (!b || b.length === 0 || (b.length === 1 && b[0] === 0)) return a.slice();
      if (!a || a.length === 0 || (a.length === 1 && a[0] === 0)) return b.slice();
      var result = a.slice();
      var k = 0;
      while (k < result.length && (result[k] || 0) === 0) k++;
      if (k >= result.length) {
        return b.slice();
      } else if (k === 0) {
        result[0] = (result[0] || 0) + (b[0] || 0);
        for (var i = 1; i < b.length; i++) {
          result[i] = (result[i] || 0) + (b[i] || 0);
        }
      } else {
        result[k] = 0;
        result = result.slice(0, k);
        for (var i = 0; i < b.length; i++) {
          result.push(b[i] || 0);
        }
      }
      while (result.length > 0 && result[result.length - 1] === 0) result.pop();
      return result;
    }
    
    function isZero(ord) {
      if (!ord || ord.length === 0) return true;
      for (var i = 0; i < ord.length; i++) {
        if ((ord[i] || 0) !== 0) return false;
      }
      return true;
    }
    
    function buildRow(ord, count) {
      var maxIdx = ord.length - 1;
      while (maxIdx >= 0 && (ord[maxIdx] || 0) === 0) maxIdx--;
      if (maxIdx < 0) return null;
      var row = [count];
      for (var i = 0; i <= maxIdx - 1; i++) row.push(ord[i] || 0);
      row.push(ord[maxIdx]);
      return row;
    }
    
    // Enumerate all ordinals below ω^k with coefficients < n
    function enumBelowOmegaK(k, n) {
      if (k === 0) {
        return [[0]];
      }
      if (k === 1) {
        var result = [];
        for (var i = 0; i < n; i++) {
          result.push([i]);
        }
        return result;
      }
      var result = [];
      for (var a = 0; a < n; a++) {
        var sub = enumBelowOmegaK(k - 1, n);
        for (var i = 0; i < sub.length; i++) {
          var combined = sub[i].slice();
          while (combined.length < k) combined.push(0);
          combined[k-1] = a;
          result.push(combined);
        }
      }
      return result;
    }
    
    // Enumerate all ordinals below a given ordinal
    function enumBelow(alpha, n) {
      if (isZero(alpha)) return [];
      
      if ((alpha[0] || 0) > 0) {
        var pred = alpha.slice();
        pred[0]--;
        while (pred.length > 0 && pred[pred.length - 1] === 0) pred.pop();
        if (pred.length === 0) pred = [0];
        var result = enumBelow(pred, n);
        result.push(pred.slice());
        return result;
      }
      
      var k = alpha.length - 1;
      while (k >= 0 && (alpha[k] || 0) === 0) k--;
      if (k < 0) return [];
      
      var ck = alpha[k] || 0;
      var rest = alpha.slice(0, k);
      while (rest.length > 0 && rest[rest.length - 1] === 0) rest.pop();
      
      var result = [];
      
      for (var j = 0; j < ck; j++) {
        var sub = enumBelowOmegaK(k, n);
        for (var i = 0; i < sub.length; i++) {
          var combined = sub[i].slice();
          while (combined.length <= k) combined.push(0);
          combined[k] = j;
          result.push(combined);
        }
      }
      
      if (!isZero(rest)) {
        var restSub = enumBelow(rest, n);
        for (var i = 0; i < restSub.length; i++) {
          var combined = restSub[i].slice();
          while (combined.length <= k) combined.push(0);
          combined[k] = ck;
          result.push(combined);
        }
      }
      
      return result;
    }
    
    var count = n - 2;
    if (count < 1) return rows;
    
    var allOrdinals = enumBelow(coeffs, n);
    
    var seen = {};
    var uniqueOrdinals = [];
    for (var i = 0; i < allOrdinals.length; i++) {
      var ord = allOrdinals[i];
      if (isZero(ord)) continue;

      // Normalize: remove trailing zeros
      var normalized = ord.slice();
      while (normalized.length > 0 && normalized[normalized.length - 1] === 0) {
        normalized.pop();
      }

      // Skip ordinals below ω (finite ordinals: only constant term, length <= 1)
      if (normalized.length <= 1) continue;

      var key = normalized.join(',');
      if (seen[key]) continue;
      seen[key] = true;
      uniqueOrdinals.push(normalized);
    }
    
    uniqueOrdinals.sort(function(a, b) {
      return compareOrd(a, b);
    });
    
    var allRows = [];
    for (var i = 0; i < uniqueOrdinals.length; i++) {
      var row = buildRow(uniqueOrdinals[i], count);
      if (row) allRows.push(row);
    }
    
    var maxOrdinalRows = maxRows - 1;
    if (allRows.length > maxOrdinalRows) {
      allRows = allRows.slice(allRows.length - maxOrdinalRows);
    }
    
    for (var i = 0; i < allRows.length; i++) {
      rows.push(allRows[i]);
    }
    
    return rows;
  };

  // Ordinal BEAF computation for 3+ arguments
  // BEAF(m, n, a1, a2, a3, a4, ...)
  // Ordinal level: ...+ω^3*(a4-1)+ω^2*(a3-1)+ω*(a2-1)+(a1-1)
  // coeffs passed in are: [a1-1, a2-1, a3-1, a4-1, ...]
  Q._beafOrdinal = function(a, b, coeffs) {
    var aNum = a.toNumber();
    var bNum = b.toNumber();

    // For exactly 3 arguments: {m,n,c} (coeffs.length = 1):
    //   c < 3 means finite hyperop (1=multiplication, 2=exponentiation)
    //   c >= 3 means tetration+ which is already properly handled by arrow()
    if (coeffs.length === 1) {
      return a.arrow(coeffs[0] + 1)(b);
    }

    // Base row = innermost lowest-level (ω) result, per user: 5(ω)5 = 5 arrow 5
    // Use arrow with level exactly aNum to guarantee base row = a arrow a of level a (tetrate).
    // For a>maxArrow, use maxArrow+1 which triggers ordinal path with array length > 1.
    // But we want base row to be a pure array[0] with enough entries (length >=4).
    // Arrow level aNum gives 5 arrow 5.
    var baseArrowLevel = Math.max(aNum, 3);
    var baseResult = a.arrow(baseArrowLevel)(b);

    // Generate ordinal rows (sorted largest to smallest by generator)
    var maxRows = MetaNum.maxRows; // 100
    // _generateOrdinalRows(coeffs, base, cardinal, maxRows)
    //   where base = aNum (m) for FS, cardinal = bNum (n) for FS.
    var rows = Q._generateOrdinalRows(coeffs, aNum, bNum, maxRows);

    // Combine base result with ordinal rows. IMPORTANT: do NOT normalize because
    // normalize() re-sorts the array and destroys our largest-first ordering.
    // Instead, set array directly to [baseResult.array[0]].concat(rows).
    var result = baseResult.clone();
    result.array = [baseResult.array[0].slice()];
    for (var i = 0; i < rows.length; i++) {
      result.array.push(rows[i]);
    }
    if (result.array.length > 1) result.layer = 0;
    return result;
  };


  // ==================== BEAF Array Notation ====================
  // Bowers' Exploding Array Function: https://googology.fandom.com/wiki/Array_notation
  // Rules:
  //   1. {a} = a, {a,b} = a^b
  //   2. {a,b,c,...,n,1} = {a,b,c,...,n}
  //   3. {a,1,b,c,...,n} = a
  //   4. {a,b,1,...,1,c,d,...,n} = {a,a,a,...,{a,b-1,1,...,1,c,d,...,n},c-1,d,...,n}
  //   5. {a,b,c,d,...,n} = {a,{a,b-1,c,d,...,n},c-1,d,...,n}

  // Internal recursive BEAF computation
  Q._beafRecursive = function(args, depth) {
    if (depth === undefined) depth = 0;
    if (depth > 500) return MetaNum.NaN.clone(); // safety limit
    var len = args.length;
    if (len === 0) return MetaNum.ONE.clone();
    if (len === 1) return args[0].clone();
    if (len === 2) return args[0].pow(args[1]);

    // Remove trailing 1s (Rule 2)
    while (len > 2 && args[len - 1].eq(MetaNum.ONE)) { args.pop(); len--; }

    // After removing trailing 1s, re-check length
    if (len <= 2) {
      return len === 1 ? args[0].clone() : args[0].pow(args[1]);
    }

    // 3-entry optimization: {a, b, c} = a{c}b (use hyperoperators)
    if (len === 3) {
      var c = args[2];
      if (c.isint() && c.sign === 1) {
        var cNum = c.toNumber();
        if (isFinite(cNum) && cNum <= MetaNum.maxArrow) {
          return args[0].arrow(c)(args[1]);
        }
      }
      // Fall through to recursive computation for non-integer c
    }

    // Rule 3: {a, 1, ...} = a
    if (args[1].eq(MetaNum.ONE)) return args[0].clone();

    // 4+ arguments: use ordinal arithmetic instead of recursion
    if (len >= 4) {
      var coeffs = Q._buildOrdinalCoeffs(args);
      return Q._beafOrdinal(args[0], args[1], coeffs);
    }

    // Rule 4: {a, b, 1, ..., 1, c, d, ...}
    if (args[2].eq(MetaNum.ONE)) {
      var pilotIdx = 2;
      while (pilotIdx < len && args[pilotIdx].eq(MetaNum.ONE)) pilotIdx++;
      if (pilotIdx >= len) {
        return args[0].pow(args[1]);
      }
      var c = args[pilotIdx];
      var newArgs = [args[0].clone()];
      for (var i = 1; i < pilotIdx - 1; i++) newArgs.push(args[0].clone());
      var orig = args.map(function(x) { return x.clone(); });
      orig[1] = args[1].sub(MetaNum.ONE);
      newArgs.push(Q._beafRecursive(orig, depth + 1));
      newArgs.push(c.sub(MetaNum.ONE));
      for (var i = pilotIdx + 1; i < len; i++) newArgs.push(args[i].clone());
      return Q._beafRecursive(newArgs, depth + 1);
    }

    // Rule 5: {a, b, c, d, ...} = {a, BEAF(a, b-1, c, d, ...), c-1, d, ...}
    var orig = args.map(function(x) { return x.clone(); });
    orig[1] = args[1].sub(MetaNum.ONE);
    var newArgs = [args[0].clone(), Q._beafRecursive(orig, depth + 1), args[2].sub(MetaNum.ONE)];
    for (var i = 3; i < len; i++) newArgs.push(args[i].clone());
    return Q._beafRecursive(newArgs, depth + 1);
  };

  // Public BEAF function: MetaNum.BEAF(a, b, c, ...)
  Q.BEAF = function() {
    var args = Array.prototype.slice.call(arguments);
    if (args.length > MetaNum.maxCols) {
      throw Error(metaNumError + 'BEAF: too many arguments (max ' + MetaNum.maxCols + ')');
    }
    var metaArgs = args.map(function(a) { return new MetaNum(a); });
    return Q._beafRecursive(metaArgs);
  };

  // Parse BEAF string: {a,b,c,...}
  Q.fromBeaf = function(str) {
    if (typeof str !== 'string') return MetaNum.NaN.clone();
    var s = str.trim();
    if (s.charAt(0) !== '{' || s.charAt(s.length - 1) !== '}') {
      return MetaNum.NaN.clone();
    }
    var inner = s.slice(1, -1).trim();
    if (inner === '') return MetaNum.ONE.clone();
    var parts = inner.split(',');
    var args = [];
    for (var i = 0; i < parts.length; i++) {
      var val = Number(parts[i].trim());
      if (!isFinite(val) || val < 1) return MetaNum.NaN.clone();
      args.push(val);
    }
    return Q.BEAF.apply(null, args);
  };

  // Convert to BEAF string: {a,b,c,...}
  P.toBeaf = function() {
    var x = this.clone().normalize();
    if (x.isNaN()) return 'NaN';
    if (x.layer === 0 && x.array.length === 1) {
      if (x.eq(MetaNum.ZERO)) return '{0}';
      return '{' + decimalPlaces(x.array[0][0], 6) + '}';
    }
    if (x.layer > 0 || x.array.length > 1) {
      if (x.array.length === 2 && x.array[1].length >= 3) {
        var row = x.array[1];
        var diag = row[row.length - 1];
        if (diag === 1 && row[0] === 1) {
          var vals = row.slice(1, row.length - 1);
          var allNonNegative = true;
          for (var i = 0; i < vals.length; i++) {
            if (vals[i] < 0) { allNonNegative = false; break; }
          }
          if (allNonNegative) {
            var a = decimalPlaces(x.array[0][0], 6);
            // Reconstruct BEAF: {a, ?, c, d+1, e+1, ...} from ordinal [1, c, d, e, ..., 1]
            var beafParts = [a, '?'];
            for (var i = 0; i < vals.length - 1; i++) {
              beafParts.push(String(vals[i] + 1));
            }
            beafParts.push(String(vals[vals.length - 1] + 1));
            return '{' + beafParts.join(', ') + '}';
          }
        }
      }
    }
    return '{' + x.array.map(function(r) {
      return '[' + r.map(function(v) { return decimalPlaces(v, 6); }).join(', ') + ']';
    }).join(', ') + '}';
  };


  // other methods

  P.clone = function () {
    var x = new MetaNum();
    x.array = deepCloneArray(this.array);
    x.sign = this.sign;
    x.layer = this.layer;
    return x;
  };

  function objectCreate() {
    var x = {};
    x.array = [[0]];
    x.sign = 1;
    x.layer = 0;
    return x;
  }

  function clone(obj) {
    var i, p, ps;
    function MetaNum(input, input2, input3) {
      var x = this;
      if (!(x instanceof MetaNum)) return new MetaNum(input, input2, input3);
      x.constructor = MetaNum;

      if (input === undefined || input === null) {
        x.array = [[0]];
        x.sign = 1;
        x.layer = 0;
        return x;
      }

      var parsedObject = null;
      if (typeof input === "string" && (input[0] === "[" || input[0] === "{")) {
        try {
          parsedObject = JSON.parse(input);
        } catch (e) {}
      }

      var temp;
      if (typeof input === "number" && input2 === undefined) {
        temp = objectCreate();
        temp.array = [[Math.abs(input)]];
        temp.sign = input < 0 ? -1 : 1;
        temp.layer = 0;
        temp.normalize = P.normalize;
        temp = temp.normalize();
      } else if (parsedObject) {
        temp = Q.fromObject(parsedObject);
      } else if (typeof input === "string") {
        temp = Q.fromString(input);
      } else if (Array.isArray(input)) {
        temp = Q.fromArray(input, input2, input3);
      } else if (input instanceof MetaNum) {
        temp = input;
      } else if (typeof input === "object" && input !== null) {
        temp = Q.fromObject(input);
      } else {
        temp = objectCreate();
        var num = Number(input);
        if (!isNaN(num) && isFinite(num)) {
          temp.array = [[Math.abs(num)]];
          temp.sign = num < 0 ? -1 : 1;
          temp.layer = 0;
          temp.normalize = P.normalize;
          temp = temp.normalize();
        } else if (isNaN(num)) {
          temp.array = [[NaN]];
        } else {
          temp.array = [[Infinity]];
          temp.sign = num < 0 ? -1 : 1;
        }
      }

      x.array = deepCloneArray(temp.array);
      x.sign = temp.sign;
      x.layer = temp.layer;
      if (temp._oaIsDiag !== undefined) x._oaIsDiag = temp._oaIsDiag;
      if (temp._oaRowData !== undefined) x._oaRowData = temp._oaRowData.map(function(d) { return {isDiag: d.isDiag}; });

      return x;
    }

    MetaNum.prototype = P;

    MetaNum.JSON = 0;
    MetaNum.STRING = 1;

    MetaNum.NONE = 0;
    MetaNum.NORMAL = 1;
    MetaNum.ALL = 2;

    // expandOrdinals: Generate all Cantor normal form terms below a given ordinal level
    // cantorLevel: determines max nesting depth (diag range and numVals range)
    // maxVal: determines value range (0..maxVal) for each position
    // Returns array of ordinal rows [[1, v0, diag], [1, v0, v1, diag], ...]
    MetaNum.expandOrdinals = function (cantorLevel, maxVal) {
      var rows = [];
      var maxRows = MetaNum.maxCols - 1; // 99

      if (cantorLevel < 0) cantorLevel = 0;

      // nv (number of intermediate v's) must be bounded by cantorLevel:
      //   cantorLevel 0 → nv up to 0, rows are finite level (length 2)
      //   cantorLevel 1 → nv up to 1 (ω^1 rows, length 3)
      //   cantorLevel 2 → nv up to 2 (ω^2 rows, length 4)
      // In general: nv_max = cantorLevel (or 1 at minimum)
      var nvMax = Math.max(cantorLevel, 0);

      // Use maxVal as diag upper bound for proper cardinal expansion
      var diagMax = Math.max(maxVal, 1);

      for (var nv = 0; nv <= nvMax && rows.length < maxRows; nv++) {
        if (nv === 0) {
          // Finite level: just [count, d] where d is the finite level
          for (var d0 = diagMax; d0 >= 1 && rows.length < maxRows; d0--) {
            rows.push([1, d0]);
          }
          continue;
        }
        for (var d = 1; d <= diagMax && rows.length < maxRows; d++) {
          var total = Math.pow(maxVal + 1, nv);
          for (var ci = 0; ci < total && rows.length < maxRows; ci++) {
            var vals = [];
            var tmp = ci;
            for (var k = 0; k < nv; k++) {
              vals.push(tmp % (maxVal + 1));
              tmp = Math.floor(tmp / (maxVal + 1));
            }
            var row = [1];
            for (var k = 0; k < nv; k++) row.push(vals[k]);
            row.push(d);
            rows.push(row);
          }
        }
      }

      // Add boundary/special row only if it fits within nvMax:
      // Boundary row has nv = maxVal+1 zeros → length = maxVal+3 → ω^{maxVal+1} level.
      // To respect cantorLevel, we only add it if (maxVal+1) <= nvMax, otherwise cap at cantorLevel.
      if (rows.length < maxRows) {
        var boundaryNv = Math.min(maxVal + 1, nvMax);
        if (boundaryNv >= 0) {
          var bRow = [1];
          for (var k = 0; k < boundaryNv; k++) bRow.push(0);
          bRow.push(1);
          rows.push(bRow);
        }
      }

      return rows;
    };

    // getCantorLevel: map operation level to expandOrdinals cantorLevel
    // v0 values: 0=ω+1, 1=ω*2+1, 2=ω*3+1, 3-5=ω^ω range,
    //            6=ω^2+1, 7=ω^2+ω, 8=ω^2+ω+1, 9=ω^2*2,
    //            10=ω^3, 11=ω^3+1, ...
    MetaNum.getCantorLevel = function (levelN) {
      // For now, simple mapping based on known cases
      if (levelN <= 0) return 0;     // ω+1: expande
      if (levelN <= 2) return 1;     // ω*2+1 through ω*3+1
      if (levelN <= 5) return 1;     // ω^ω diagonalization range
      if (levelN <= 9) return 1;     // ω^2 range
      if (levelN <= 11) return 2;    // ω^3 range
      // Default: use levelN / some factor
      return Math.min(Math.floor(levelN / 5) + 1, MetaNum.maxCols);
    };

    MetaNum.clone = clone;
    MetaNum.config = MetaNum.set = config;

    for (var prop in Q) {
      if (Q.hasOwnProperty(prop)) {
        MetaNum[prop] = Q[prop];
      }
    }

    if (obj === void 0) obj = {};
    if (obj) {
      ps = ['maxRows', 'maxCols', 'maxArrow', 'serializeMode', 'debug'];
      for (i = 0; i < ps.length;) if (!obj.hasOwnProperty(p = ps[i++])) obj[p] = this[p];
    }

    MetaNum.config(obj);

    return MetaNum;
  }

  function defineConstants(obj) {
    for (var prop in R) {
      if (R.hasOwnProperty(prop)) {
        var val = R[prop];
        if (typeof val === "string") {
          obj[prop] = new MetaNum(val);
        } else if (Object.defineProperty) {
          Object.defineProperty(obj, prop, {
            configurable: false,
            enumerable: true,
            writable: false,
            value: new MetaNum(val)
          });
        } else {
          obj[prop] = new MetaNum(val);
        }
      }
    }
    return obj;
  }

  function config(obj) {
    if (!obj || typeof obj !== 'object') {
      throw Error(metaNumError + 'Object expected');
    }
    var i, p, v,
      ps = [
        'maxRows', 10, 1000,
        'maxCols', 10, 1000,
        'maxArrow', 1, Number.MAX_SAFE_INTEGER,
        'serializeMode', 0, 1,
        'debug', 0, 2
      ];
    for (i = 0; i < ps.length; i += 3) {
      if ((v = obj[p = ps[i]]) !== void 0) {
        if (Math.floor(v) === v && v >= ps[i + 1] && v <= ps[i + 2]) this[p] = v;
        else throw Error(invalidArgument + p + ': ' + v);
      }
    }
    return this;
  }

  MetaNum = clone(MetaNum);
  MetaNum = defineConstants(MetaNum);
  MetaNum['default'] = MetaNum.MetaNum = MetaNum;

  if (typeof define == 'function' && define.amd) {
    define(function () {
      return MetaNum;
    });
  } else if (typeof module != 'undefined' && module.exports) {
    module.exports = MetaNum;
  } else {
    if (!globalScope) {
      globalScope = typeof self != 'undefined' && self && self.self == self
        ? self : Function('return this')();
    }
    globalScope.MetaNum = MetaNum;
  }
})(this);