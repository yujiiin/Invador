#pragma strict

var nextFrameTime : float;
var animationSpeed : float = 0.2;
var frameOffset : float;
var speed : int = 3;

function Start () {
	transform.eulerAngles.z = Random.Range(135,225);
}

function Update () {
	frameOffset = renderer.material.mainTextureOffset.y;
	if(Time.time > nextFrameTime){
		frameOffset -= 0.25;
		if(frameOffset < 0){
			frameOffset = 0.75;
		}
		nextFrameTime = Time.time + animationSpeed;
		renderer.material.mainTextureOffset.y = frameOffset;
	}
	
	transform.Translate(Vector3(0,speed * Time.deltaTime,0));

	
}

function OnCollisionEnter(col : Collision){
	if(col.gameObject.tag == "Right"){
		Destroy(gameObject);
	}
	if(col.gameObject.tag == "Left"){
		Destroy(gameObject);
	}
	if(col.gameObject.tag == "Bottom"){
		Destroy(gameObject);
	}
	if(col.gameObject.tag == "Player"){
		Destroy(gameObject);
	}
}