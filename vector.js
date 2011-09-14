/*
 * Copyright (c) 2010, Luc Yriarte
 * All rights reserved.
 * 
 * License: BSD <http://www.opensource.org/licenses/bsd-license.php>
 * 
 */
Vector.prototype = new Matrix;

function Vector(l) {
	Matrix.call(this,l,1);
	return this;
};

Vector.prototype.norm = function()
{
	var n = 0;
	for (var i=0; i<this.nLines; i++)
	{
		n += this.cell[i][0] * this.cell[i][0];
	}
	n = Math.sqrt(n);
	return n;
};

Vector.prototype.scalProd = function(aVector)
{
	if (aVector.nLines != this.nLines)
		return null;
	var mResult = this.transpose();
	mResult = mResult.mul(aVector);
	return mResult.cell[0][0];
};

Vector.prototype.unitVector = function() 
{
	var n = this.norm();
	var i;
	var vResult = new Vector(nLines);
	if (n != 0) {
		for (i = 0; i < nLines; i++) {
			vResult.cell[i][0] = this.cell[i][0] / n;
		}
	}
	return vResult;
};

Vector.prototype.vectAngle = function(aVector) 
{
	var prodNorm, prodScalar;
	prodScalar = this.scalProd(aVector);
	prodNorm = this.norm() * aVector.norm();
	return Math.acos(prodScalar/prodNorm);
};

Vector.prototype.vectProd = function(aVector)
{
	if (aVector.nLines != this.nLines)
		return null;
	var vResult = new Vector(aVector.nLines);
	var i,ia,ib;
	for (i = 0; i < nLines; i++) {
		ia = (i + 1) % nLines;
		ib = (ia+ 1) % nLines;
		vResult.cell[i][0] = this.cell[ia][0] * aVector.cell[ib][0] - this.cell[ib][0] * aVector.cell[ia][0];
	}
	return vResult;
};

Vector.prototype.vectDiv = function(aVector)
{
	if (aVector.nLines != this.nLines)
		return null;
	var vResult = new Vector(this.nLines);
	if (this.isZero()) {
		if (aVector.isZero())
			return vResult;
		else
			return null;
	}
	var norma = this.norm();
	vResult = aVector.vectProd(this);
	vResult = vResult.mulNum(1/(norma*norma));
	return vResult;
};

