/*
 * Copyright (c) 2012, Luc Yriarte
 * All rights reserved.
 * 
 * License: BSD <http://www.opensource.org/licenses/bsd-license.php>
 * 
 */

function x3d() {
	this.xmlDoc = null;
	this.scene = null;
	return this;
}

x3d.prototype.getObject3D = function(aTransformGroup) {
outLog.innerHTML += "getObject3D: " + aTransformGroup.tagName + "<br>";
	var obj = null;
	var child = aTransformGroup.firstChild;
	while(child) {
		if (child.tagName == "Shape") {
			if (!obj)
				obj = this.getShape(child);
			else
				obj.addChild(this.getShape(child));
		}
		child = child.nextSibling;
	}
	if (!obj)
		obj = new Object3D();
	var scale = null;
	for (var iatt=0; iatt < aTransformGroup.attributes.length; iatt++) {
		if (aTransformGroup.attributes.item(iatt).name == "translation") {
			obj.setPosition(this.getTranslation(aTransformGroup.attributes.item(iatt).value));
		}
		if (aTransformGroup.attributes.item(iatt).name == "rotation") {
			obj.setOrientation(this.getRotation(aTransformGroup.attributes.item(iatt).value));
		}
		if (aTransformGroup.attributes.item(iatt).name == "scale") {
			scale = this.getScale(aTransformGroup.attributes.item(iatt).value);
		}
	}
	child = aTransformGroup.firstChild;
	while(child) {
		if (child.tagName == "Transform" || child.tagName == "Group")
			obj.addChild(this.getObject3D(child));
		child = child.nextSibling;
	}
	if (scale)
		obj.transformMeshes(scale);
	return obj;
}

	
x3d.prototype.getColor = function(aShape) {
	var rgb = null;
	return rgb;
}


x3d.prototype.getShape = function(aShape) {
outLog.innerHTML += "getShape: " + aShape.tagName + "<br>";
	var obj = null;
obj= new Object3D();	
	return obj;
}


x3d.prototype.getTranslation = function(tosplit) {
outLog.innerHTML += "getTranslation: " + tosplit + "<br>";
	var xyz = tosplit.match(/\S+/g);
	var m3d = new Matrix3D().translation(parseFloat(xyz[0]),parseFloat(xyz[1]),-parseFloat(xyz[2]));
	return m3d;
}


x3d.prototype.getRotation = function(tosplit) {
outLog.innerHTML += "getRotation: " + tosplit + "<br>";
	var xyza = tosplit.match(/\S+/g);
	var fx = parseFloat(xyza[0]);
	var fy = parseFloat(xyza[1]);
	var fz = parseFloat(xyza[2]);
	var teta = parseFloat(xyza[3]);
	var m3d = new Matrix3D();	
	if (fx != 0)
		m3d = m3d.mul(new Matrix3D().rotationX(teta * fx));
	if (fy != 0)
		m3d = m3d.mul(new Matrix3D().rotationY(teta * fy));
	if (fz != 0)
		m3d = m3d.mul(new Matrix3D().rotationZ(teta * fz));
	return m3d;
}


x3d.prototype.getScale = function(tosplit) {
outLog.innerHTML += "getScale: " + tosplit + "<br>";
	var xyz = tosplit.match(/\S+/g);
	var m3d = new Matrix3D().scale(parseFloat(xyz[0]),parseFloat(xyz[1]),-parseFloat(xyz[2]));
	return m3d;
}


x3d.prototype.getScene = function(xmlDoc) {
	this.xmlDoc = xmlDoc;
	var jScene = this.xmlDoc.getElementsByTagName("Scene")[0];
outLog.innerHTML += "<hr>";
outLog.innerHTML += jScene.tagName + "<br>";
	this.scene = this.getObject3D(jScene);
	return this.scene;
}
	
 