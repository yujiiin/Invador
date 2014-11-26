#pragma strict

var health : int = 100;
var speed : int = 5;
var dragSpeed : float = 0.03;
var collided_with : GameObject;
var laser_pref : Transform;
var fireRate : float = 0.5;
var frameTime : float;
var nextShot : float = 0.0;
var shield : boolean = false;
var shotSound : AudioClip;


function Start () {

}

function Update () {
	if(Input.touchCount>0){
		if(Input.GetTouch(0).phase == TouchPhase.Moved){
			var touchPosition : Vector2 = Input.GetTouch(0).deltaPosition;
			transform.Translate(-touchPosition.x * dragSpeed,touchPosition.y * dragSpeed,0);
		}
	}
    if(Time.time >= nextShot){
    	Instantiate(laser_pref,Vector3(transform.position.x,transform.position.y + 1,2),Quaternion.identity);
    	audio.PlayOneShot(shotSound);
		nextShot = Time.time + fireRate;
	}

/*		if(Input.GetTouch(0).phase == TouchPhase.Began){
			transform.Translate(Vector3(100,100,0));
		}
		if(Input.GetTouch(0).phase == TouchPhase.Ended){
			transform.Translate(Vector3(-100,-100,0));
		}
		*/
}

function OnCollisionEnter(col : Collision){
	collided_with = col.gameObject;
	if(col.gameObject.tag == "Enemy" || col.gameObject.tag == "BossShot" || col.gameObject.tag == "Enemy_laser"){
		Destroy(col.gameObject);
		if(shield == true){
			renderer.material.mainTextureOffset = Vector2(0.0, 0.5);
			shield = false;
			return;
		}
		Destroy(gameObject);
	}
	collided_with = col.gameObject;
	if(col.gameObject.tag == "Shield"){
		shield = true;
		Destroy(col.gameObject);
		renderer.material.mainTextureOffset = Vector2(0.0, 0.0);
	}
}

function OnCollisionExit(col : Collision){
    collided_with = null;
}