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
	var obj = null;
	if (aTransformGroup.childNodes[0].tagName == "Shape") {
		obj = this.getShape(aTransformGroup.childNodes[0]);
	}
/*	obj.setPosition(getTranslation(aTransformGroup));
	obj.setOrientation(getRotation(aTransformGroup));
	Matrix3D scale = getScale(aTransformGroup);
	String[] tags = {"Transform","Group"};
	for (int s=0; s<tags.length;s++) {
		try {
			JSONArray jObjects = aTransformGroup.getJSONArray(tags[s]);
			for (int i=0; i<jObjects.length(); i++)
				obj.addChild(getObject3D(jObjects.getJSONObject(i)));
		} catch (JSONException e) { 
			try {
				obj.addChild(getObject3D(aTransformGroup.getJSONObject(tags[s])));
			} catch (JSONException e1) {
			}
		}
	}
	if (!scale.isId())
	    obj.transformMeshes(scale);
*/	return obj;
}

	
x3d.prototype.getShape = function(aShape) {
	var obj = null;
obj= new Object3D();	
	return obj;
}


x3d.prototype.getTranslation = function(aTransform) {
	var m3d = null;
m3d= new Matrix3D();	
	return m3d;
}


x3d.prototype.getRotation = function(aTransform) {
	var m3d = null;
m3d= new Matrix3D();	
	return m3d;
}


x3d.prototype.getScale = function(aTransform) {
	var m3d = null;
m3d= new Matrix3D();	
	return m3d;
}


x3d.prototype.getScene = function(xmlDoc) {
	this.xmlDoc = xmlDoc;
	var jScene = this.xmlDoc.getElementsByTagName("Scene")[0];
outLog.innerHTML += "<hr>";
outLog.innerHTML += jScene.tagName + "<br>";
	this.scene = this.getObject3D(jScene);
//	this.scene.setPosition(this.getPosition(jScene));
//	this.scene.setOrientation(this.getOrientation(jScene));
//	this.scene.reset();
	return this.scene;
}
	
 