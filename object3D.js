function Object3D()
{
	this.color = "#7F7F7F";
	
	this.mesh = new Mesh(0,0,null,null);
	this.position = new Matrix3D();
	this.orientation = new Matrix3D();
	this.transformation = new Matrix3D();
	this.updatedTransform = null;
	
	this.nChild = 0;
	this.nFacet = 0;
	this.nFacetTotal = 0;
	
	this.child = new Array();
	this.parent = null;
	this.facet = new Array();
	this.facetTotal = new Array();
	return this;
};

Object3D.prototype.reset = function(trnX, trnY, trnZ, trn0X, trn0Y, trn0Z,
		rotX, rotY, rotZ, rot0X, rot0Y, rot0Z) 
{
	if (rot0X)
		this.mesh = this.mesh.transform(new Matrix3D().rotationX(rot0X));
	if (rot0Y)
		this.mesh = this.mesh.transform(new Matrix3D().rotationY(rot0Y));
	if (rot0Z)
		this.mesh = this.mesh.transform(new Matrix3D().rotationZ(rot0Z));
	if (trn0X || trn0Y || trn0Z)
		this.mesh = this.mesh.transform(new Matrix3D().translation(trn0X, trn0Y, trn0Z));
	if (rotX)
		this.orientation = this.orientation.mul(new Matrix3D().rotationX(rotX));
	if (rotY)
		this.orientation = this.orientation.mul(new Matrix3D().rotationY(rotY));
	if (rotZ)
		this.orientation = this.orientation.mul(new Matrix3D().rotationZ(rotZ));
	if (trnX || trnY || trnZ)
		this.position = this.position.mul(new Matrix3D().translation(trnX, trnY, trnZ));
	this.transformation = this.position.mul(this.orientation);
	this.updatedTransform = null;
	for (var i = 0; i < this.nChild; i++) {
		this.child[i].reset();
	}
	return this;
};

Object3D.prototype.resetScale = function(scaleX, scaleY, scaleZ) 
{
	if (scaleX != 1 || scaleY != 1 || scaleZ != 1)
		this.mesh.transformThis(new Matrix3D().scale(scaleX, scaleY, scaleZ));
	return this;
};

Object3D.prototype.setOrientation = function(o) 
{
	this.orientation = o;
	this.transformation = this.position.mul(this.orientation);
	this.updatedTransform = null;
	return this;
};

Object3D.prototype.setPosition = function(p) 
{
	this.position = p;
	this.transformation = this.position.mul(this.orientation);
	this.updatedTransform = null;
	return this;
};

Object3D.prototype.transform = function(trans) 
{
	this.transformation = this.transformation.mul(trans);
	this.updatedTransform = null;
	return this;
};

Object3D.prototype.transformMesh = function(trans) 
{
	this.mesh.transformThis(trans);
	return this;
};

Object3D.prototype.transformMeshes = function(trans) 
{
    var i;
    this.transformMesh(trans);
	for (i = 0; i < this.nChild; i++) {
		this.child[i].transformMeshes(trans);
	}
	return this;
};

Object3D.prototype.addChild = function(obj)
{
	obj.parent = this;
	this.child.push(obj);
	this.nChild++;
	return this;
};

Object3D.prototype.getChild = function(i) {
	if (this.nChild == 0)
		return null;
	return this.child[i];
};

Object3D.prototype.update = function(focal, screenX, screenY) 
{
	var i, nEdge;
	nEdge = 0;
	if (this.parent != null && this.parent.updatedTransform != null)
		this.updatedTransform = this.parent.updatedTransform.mul(this.transformation);
	else
		this.updatedTransform = this.transformation;
	for (i = 0; i < this.nChild; i++) {
		nEdge += this.child[i].update(focal, screenX, screenY);
	}
	if (this.mesh.nEdge > 0) {
		var transMesh = this.mesh.transform(this.updatedTransform);
		this.mesh.setWireframe(transMesh.updateWireframe(focal, screenX, screenY));
	}
	return nEdge + this.mesh.nEdge;
};

Object3D.prototype.paint = function(gc) 
{
	var i;
	for (i = 0; i < this.nChild; i++) {
		this.child[i].paint(gc);
	}
	this.mesh.drawWireframe(gc,this.color);
};

