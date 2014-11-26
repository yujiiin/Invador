#pragma strict

var speed : int = 5;
var manager : Manager_script;
var number : int;
var shield_powerup : Transform;
var bossScript : Boss_script;
var enemyScore : int = 1000;

function Start () {
	manager = GameObject.FindGameObjectWithTag("Manager").GetComponent(Manager_script);
}

function Update () {
	transform.Translate(Vector3(0,speed * Time.deltaTime,0));
}

function OnCollisionEnter(col : Collision){
	if(col.gameObject.tag == "Top"){
		Destroy(gameObject);
	}
	if(col.gameObject.tag == "Enemy"){
		manager.ShipKilled++;
		manager.thisScore += enemyScore * manager.level;
		number = Random.Range(1.0,5.0);
		if(number == 1){
			Instantiate(shield_powerup, transform.position,Quaternion.identity);
		}
		Destroy(col.gameObject);
		Destroy(gameObject);
	}
	if(col.gameObject.tag == "Boss"){
		if(bossScript == null){
			bossScript = GameObject.FindGameObjectWithTag("Boss").GetComponent(Boss_script);
		}
		bossScript.health -= 10;
		Destroy(gameObject);
	}
	if(col.gameObject.tag == "BossShot"){
		Destroy(gameObject);
		Destroy(col.gameObject);
	}
	if(col.gameObject.tag == "Shield"){
		Destroy(gameObject);
	}
}