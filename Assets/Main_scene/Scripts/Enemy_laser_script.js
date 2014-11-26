#pragma strict
var speed : int = 4;


function Start () {

}

function Update () {
	transform.Translate(Vector3(0,(-1)*speed * Time.deltaTime,0));
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
		Destroy(col.gameObject);
	}
}