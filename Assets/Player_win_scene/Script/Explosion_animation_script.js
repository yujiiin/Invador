#pragma strict

var currentFrame : int = 1;
var animationSpeed : float = 0.05;
var nextFrame : float;


function Start () {
	nextFrame = Time.time + animationSpeed;
}

function Update () {
	if(Time.time > nextFrame && currentFrame != 50){
		if(currentFrame % 2 == 0){
			renderer.material.mainTextureOffset.x = 0.0;
			renderer.material.mainTextureOffset.y -= 0.04;
			nextFrame = Time.time + animationSpeed;
			currentFrame++;
			return;
		}
		if(currentFrame % 2 == 1){
			renderer.material.mainTextureOffset.x = 0.5;
			nextFrame = Time.time + animationSpeed;
			currentFrame++;
			return;
		}		
		
	}
	if(currentFrame == 39){
		Destroy(GameObject.Find("Enemy_Planet"));
	}
	if(currentFrame == 50){
		Destroy(gameObject);
		Application.LoadLevel(0);
	}
}