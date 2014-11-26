#pragma strict

var TotalShips : int;
var ShipKilled : int;
var enemyShip : Transform;
var playerShip : Transform;
var playerLives : int = 4;
var player : GameObject;
var level : int = 1;
var shipTexture : Texture;
var spawner : GameObject;
var started : boolean = false;
var highScore : int = 0;
var thisScore : int = 0;
var userName : String;
var highScoreName : String = "___";

function Start () {
		highScore = PlayerPrefs.GetInt("Highscore");
		highScoreName = PlayerPrefs.GetString("HighScoreName");
		spawner.GetComponent(Enemy_spawn_script).isOn = false;
}

function Update () {
	if(player == null && playerLives >= 1 && started){
		playerLives--;
		Instantiate(playerShip,Vector3(0,-4.5,2), Quaternion.identity);
		player = GameObject.FindGameObjectWithTag("Player");
	}

}

function ShipCounter(){
	TotalShips++;
	if(TotalShips % 5 == 0){
		level++;
	}
	return (level);
}

function HighScore(){
	if(thisScore > highScore){
		highScore = thisScore;
		highScoreName = userName;
		PlayerPrefs.SetString("HighScoreName",highScoreName);
		PlayerPrefs.SetInt("Highscore",highScore);
	}

}

function OnGUI(){
	if(started){
		GUI.Button(Rect(Screen.width - 150,0,150,65),"Name: " + userName + "\n" +
													 "Score " + thisScore + "\n" +
													 "Ship Killed " + ShipKilled + "\n" +
													 "Level " + level);
		GUI.Button(Rect(0,Screen.height - 20,200,20),"Name: " + highScoreName + "  Highscore: " + highScore);
													 
													 
													 
		if(playerLives > -1){
			for(var x =0; x < playerLives; x++){
				GUI.DrawTexture(Rect(x * 18,0,18,23),shipTexture, ScaleMode.ScaleToFit, true, 0);
			}
		}
		if(playerLives == 0 && player == null){
			GUI.Box(Rect(0,0,Screen.width,Screen.height),"Game Over");
			spawner.GetComponent(Enemy_spawn_script).isOn = false;			
			HighScore();
			//reset value
			if(GUI.Button(Rect(Screen.width/2 - 50,Screen.height/2,100,50),"Back to menu")){
				started = false;
				playerLives = 4;
				level = 1;
				TotalShips = 0;
				ShipKilled = 0;
				thisScore = 0;
			}
			
		}
	}
	if(!started){
		if(GUI.Button(Rect(Screen.width / 2 - 50, Screen.height / 2 - 25,100,50),"Start Game")){
			started = true;
			spawner.GetComponent(Enemy_spawn_script).isOn = true;
			//PlayerPrefs.SetString("Name",userName);
		}
		userName = GUI.TextArea(Rect(Screen.width / 2 - 50, Screen.height /2 + 50,100,30),userName); 

	} 
}

