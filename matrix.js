/*
 * Copyright (c) 2010, Luc Yriarte
 * All rights reserved.
 * 
 * License: BSD <http://www.opensource.org/licenses/bsd-license.php>
 * 
 */
function Matrix(l, c, data)
{
	this.nLines = l || 1;
	this.nCols = c || 1;
	this.cell = data;
	if (this.cell)
		return this;
	this.cell = new Array(this.nLines);
	for (var i=0; i<this.nLines; i++)
	{
		this.cell[i] = new Array(this.nCols);
		for (var j=0; j<this.nCols; j++)
		{
			this.cell[i][j]=0;
		}
	}
	return this;
};

Matrix.prototype.isZero = function()
{
	for (var i=0; i<this.nLines; i++)
	{
		for (var j=0; j<this.nCols; j++)
		{
			if (this.cell[i][j] != 0) 
				return false;
		}
	}
	return true;
};

Matrix.prototype.toZero = function()
{
	for (var i=0; i<this.nLines; i++)
	{
		for (var j=0; j<this.nCols; j++)
		{
			this.cell[i][j]=0;
		}
	}
	return this;
};

Matrix.prototype.toId = function()
{
	if (this.nLines != this.nCols)
		return null;
	for (var i=0; i<this.nLines; i++)
	{
		for (var j=0; j<this.nCols; j++)
		{
			if (i==j)
				this.cell[i][j]=1;
			else
				this.cell[i][j]=0;
		}
	}
	return this;
};

Matrix.prototype.transpose = function()
{
	var mResult = new Matrix(this.nCols, this.nLines);
	for (var i=0; i<mResult.nLines; i++)
	{
		for (var j=0; j<mResult.nCols; j++)
		{
			mResult.cell[i][j]= this.cell[j][i];
		}
	}
	return mResult;
};

Matrix.prototype.det = function()
{
	if (this.nLines != this.nCols)
		return null;
	if (this.nLines == 2)
		return this.cell[0][0]*this.cell[1][1]-this.cell[0][1]*this.cell[1][0];
	if (this.nLines == 1)
		return this.cell[0][0];
	var minorIJ;
	var detIJ;
	var determinant = 0;
	var sign=1;
	for (var j=0; j<this.nCols; j++)
	{
		minorIJ = this.minor(0,j);
		detIJ = minorIJ.det();
		determinant += sign * detIJ * this.cell[0][j];
		sign = -sign;
	}
	return determinant;
};

Matrix.prototype.cofactors = function()
{
	if (this.nLines != this.nCols)
		return null;
	if (this.nLines == 1)
		return this;
	var minorIJ;
	var detIJ;
	var determinant = 0;
	var sign=1;
	var mResult=new Matrix(this.nCols, this.nLines);
	for (var i=0; i<mResult.nLines; i++)
	{
		for (var j=0; j<mResult.nCols; j++)
		{
			minorIJ = this.minor(i,j);
			detIJ = minorIJ.det();
			mResult.cell[i][j]= detIJ * Math.pow(-1,i+j);
		}
	}
	return mResult;
};

Matrix.prototype.inv = function()
{
	var determinant = this.det();
	var mResult = this.cofactors();
	mResult = mResult.transpose();
	mResult = mResult.mulNum(1/determinant);
	return mResult;
};

Matrix.prototype.minor = function(iM, jM)
{
	if (this.nLines != this.nCols || this.nCols < 2)
		return null;
	var i,j;
	var mResult = new Matrix(this.nLines -1, this.nCols-1);
	for (i=0; i<iM; i++)
	{
		for (j=0; j<jM; j++)
		{
			mResult.cell[i][j]= this.cell[i][j];
		}
		for (j=jM+1; j<this.nCols; j++)
		{
			mResult.cell[i][j-1]= this.cell[i][j];
		}
	}
	for (i=iM+1; i<this.nLines; i++)
	{
		for (j=0; j<jM; j++)
		{
			mResult.cell[i-1][j]= this.cell[i][j];
		}
		for (j=jM+1; j<this.nCols; j++)
		{
			mResult.cell[i-1][j-1]= this.cell[i][j];
		}
	}
	return mResult;
};

Matrix.prototype.mulNum = function(aNumber)
{
	var mResult = new Matrix(this.nLines, this.nCols);
	for (var i=0; i<mResult.nLines; i++)
	{
		for (var j=0; j<mResult.nCols; j++)
		{
			mResult.cell[i][j]= this.cell[i][j] * aNumber;
		}
	}
	return mResult;
};

Matrix.prototype.addNum = function(aNumber)
{
	var mResult = new Matrix(this.nLines, this.nCols);
	for (var i=0; i<mResult.nLines; i++)
	{
		for (var j=0; j<mResult.nCols; j++)
		{
			mResult.cell[i][j]= this.cell[i][j] + aNumber;
		}
	}
	return mResult;
};

Matrix.prototype.mul = function(aMatrix)
{
	if (aMatrix.nLines != this.nCols)
		return null;
	var mResult = new Matrix(this.nLines, aMatrix.nCols);
	for (var i=0; i<mResult.nLines; i++)
	{
		for (var j=0; j<mResult.nCols; j++)
		{
			mResult.cell[i][j]=0;
			for (var k=0; k<this.nCols; k++)
			{
				mResult.cell[i][j] += this.cell[i][k] * aMatrix.cell[k][j];
			}
		}
	}
	return mResult;
};

Matrix.prototype.add = function(aMatrix)
{
	if (aMatrix.nLines != this.nLines || aMatrix.nCols != this.nCols)
		return null;
	var mResult = new Matrix(this.nLines, this.nCols);
	for (var i=0; i<mResult.nLines; i++)
	{
		for (var j=0; j<mResult.nCols; j++)
		{
			mResult.cell[i][j]= this.cell[i][j] + aMatrix.cell[i][j];
		}
	}
	return mResult;
};


