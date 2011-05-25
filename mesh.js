function Mesh(nV, nE, v, e) 
{
	this.nVertex = nV;
	this.nEdge = nE;
	this.vertex = v;
	this.edge = e;
	this.scrX = new Array(this.nVertex);
	this.scrY = new Array(this.nVertex);
	this.lines = new Array(this.nEdge);		
	for (var i = 0; i < this.nEdge; i++)
		this.lines[i] = new Array(5);
	return this;
};

Mesh.prototype.transform = function(trans) {
	if (this.nVertex == 0)
		return this;
	var i;
	var transVertex = new Array(this.nVertex);
	for (i = 0; i < this.nVertex; i++) {
		transVertex[i] = trans.mul(this.vertex[i]);
	}
	return new Mesh(this.nVertex, this.nEdge, transVertex, this.edge);
};

Mesh.prototype.transformThis = function(trans) {
	if (this.nVertex == 0)
		return this;
	var i;
	for (i = 0; i < this.nVertex; i++) {
		this.vertex[i].transformThis(trans);
	}
	return this;
};

Mesh.prototype.updateWireframe = function(foc, sX, sY) {
	if (this.nEdge == 0)
		return null;
	var i, x0, y0, z;
	this.focal = foc;
	this.screenX = sX;
	this.screenY = sY;
	// screen center
	x0 = this.screenX / 2;
	y0 = this.screenY / 2;
	// Translate vertices to screen coordinates
	for (i = 0; i < this.nVertex; i++) {
		z = this.vertex[i].cell[2][0] > 0 ? this.vertex[i].cell[2][0] : 0.001;
		this.scrX[i] = Math.floor(x0 + this.vertex[i].cell[0][0] * this.focal / z);
		this.scrY[i] = Math.floor(y0 - this.vertex[i].cell[1][0] * this.focal / z);
	}
	// Create lines from mesh edges
	for (i = 0; i < this.nEdge; i++) {
		this.lines[i][0] = this.scrX[this.edge[i][0]];
		this.lines[i][1] = this.scrY[this.edge[i][0]];
		this.lines[i][2] = this.scrX[this.edge[i][1]];
		this.lines[i][3] = this.scrY[this.edge[i][1]];
		// z is the middle of this edge's ends on the z-axis
		this.lines[i][4] = (this.vertex[this.edge[i][0]].cell[2][0] + this.vertex[this.edge[i][1]].cell[2][0]) / 2;
	}
	return this;
};

Mesh.prototype.setWireframe = function(aMesh) 
{
	this.screenX = aMesh.screenX;
	this.screenY = aMesh.screenY;
	this.focal = aMesh.focal;
	this.scrX = aMesh.scrX;
	this.scrY = aMesh.scrY;
	this.lines = aMesh.lines;
	return this;
};

Mesh.prototype.drawWireframe = function(gc, color)
{
	var i;
	gc.beginPath();
	for (i = 0; i < this.nEdge; i++) {
		gc.moveTo(this.lines[i][0], this.lines[i][1]);
		if (this.lines[i][4] >= 0)
			gc.lineTo(this.lines[i][2], this.lines[i][3]);
	}
	gc.strokeStyle = color;
	gc.stroke();
	gc.closePath();
	return this;
};

