
Matrix3D.prototype = new Matrix;

function Matrix3D() {
	Matrix.call(this,4,4);
	this.toId();
	return this;
};

Matrix3D.prototype.translation = function(x, y, z)
{
	var result = new Matrix3D();
	result.cell[0][3] = x;
	result.cell[1][3] = y;
	result.cell[2][3] = z;
	return result;
};

Matrix3D.prototype.scale = function(x, y, z)
{
	var result = new Matrix3D();
	result.cell[0][0] = x;
	result.cell[1][1] = y;
	result.cell[2][2] = z;
	return result;
};

Matrix3D.prototype.rotationX = function(teta)
{
	var result = new Matrix3D();
	result.cell[1][1] = Math.cos(teta);
	result.cell[1][2] = Math.sin(teta);
	result.cell[2][1] = -1 * Math.sin(teta);
	result.cell[2][2] = Math.cos(teta);
	return result;
};

Matrix3D.prototype.rotationY = function(teta)
{
	var result = new Matrix3D();
	result.cell[0][0] = Math.cos(teta);
	result.cell[0][2] = -1 * Math.sin(teta);
	result.cell[2][0] = Math.sin(teta);
	result.cell[2][2] = Math.cos(teta);
	return result;
};

Matrix3D.prototype.rotationZ = function(teta)
{
	var result = new Matrix3D();
	result.cell[0][0] = Math.cos(teta);
	result.cell[0][1] = Math.sin(teta);
	result.cell[1][0] = -1 * Math.sin(teta);
	result.cell[1][1] = Math.cos(teta);
	return result;
};

