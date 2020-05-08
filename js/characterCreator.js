//Objects --------------------------------------------------
function Character() {
    this.playerName = "Alan Smithee";
    this.playerGender = "M";
    this.playerAge = 20;
    this.playerSprite = "placeholder";
    this.health = 100;
    this.mental = 100;
    this.wealth = 100;
    this.supplies = 100;
    this.familySize = 0;
    this.status = "pleaceholder"; //State of Health i.e. health, sick, terminal
    this.familyMembers = [];
}

function family(name, gender, relation, age) {
    this.name = name;
    this.gender = gender;
    this.relation = relation;
    this.age = age;
    this.status = "placeholder";
}
//Runtime------------------------------------------------------
let player;

function createCharacter() {
    document.getElementById("create").value = "Next Character";
    let famSize = genNum(0, 4);
    generateProfile();
    player.familySize = famSize;
    drawCharacter();
    addFamily(famSize);
    drawFamily(famSize);
}
//Creates main character
function generateProfile() {
    player = new Character();
    player.playerName = genName();
    player.playerGender = getGender();
    player.playerAge = genNum(25, 55);
}
//Puts main character info onto html
function drawCharacter() {
    document.getElementById("name").innerHTML = "Name: " + player.playerName;
    document.getElementById("gender").innerHTML = "Gender: " + player.playerGender;
    document.getElementById("age").innerHTML = "Age: " + player.playerAge;
    document.getElementById("family").innerHTML = "Family Size: " + player.familySize;
    document.getElementById("familyLabel").innerHTML = "Family Members:";
    document.getElementById("seeFamily").style = "display: block";
}
//Generates famil members
function createFamily() {
    let name = genName();
    let age = genNum(0, 80);
    let relate = genRelation(age, player.playerAge);
    let gender = genFamilyGender();
    console.log(age + "/" + relate + "/" + gender);
    player.familyMembers.push(new family(
        name, gender, relate, age
    ));
}
//Runs for as many times as there are family members
function addFamily(size) {
    console.log("-----")
    for (let i = 0; i < size; i++) {
        createFamily();
    }
}
//Renders famil members onto the page
function drawFamily(size) {
    document.getElementById("familyDisplay").innerHTML = "";
    console.log(player.familyMembers)
    for (let i = 0; i < size; i++) {
        document.getElementById("familyDisplay").innerHTML += "<br>Name: " + player.familyMembers[i].name + "<br>";
        document.getElementById("familyDisplay").innerHTML += "Gender: " + player.familyMembers[i].gender + "<br>";
        document.getElementById("familyDisplay").innerHTML += "Relation: " + player.familyMembers[i].relation + "<br>";
        document.getElementById("familyDisplay").innerHTML += "Age: " + player.familyMembers[i].age + "<br>";
        document.getElementById("familyDisplay").innerHTML += " ";
    }
}

let displayFlag = true;
function seeNext() {
    if(displayFlag) {
        displayFlag = !displayFlag;
        document.getElementById("familyDisplay").style = "display: block";
    } else {
        displayFlag = !displayFlag;
        document.getElementById("familyDisplay").style = "display: none";
    }

}

function placeHolder() {
    console.log("Goes somewhere");
    console.log(player);
}

//Informtion Generation---------------------------------------------------------------
function genNum(base, range) {
    return Math.round(Math.random() * range + base);
}
//Variable used to check family member's gender based on relationship
let genderCheck = 0;

function genRelation(familyAge, playersAge) {
    let sameAge = [
        "Brother", "Sister", "Cousin", "Spouse",
    ];
    let parents = [
        "Father", "Mother",
    ]
    let grandParents = [
        "Grandfather", "Grandmother",
    ]
    let children = [
        "Son", "Daughter"
    ]
    let grandChildren = [
        "Grandson", "GrandDaughter"
    ]
    let getRelate = 0;
    let relate = ""
    if (playersAge >= (familyAge - 18) && playersAge <= (familyAge + 18)) {
        //Within 18 years of range
        getRelate = Math.round(Math.random() * (sameAge.length - 1));
        relate = sameAge[getRelate];
    } else if (playersAge <= (familyAge - 19) && playersAge >= (familyAge - 38)) {
        //Younger by 18, but not by 38
        getRelate = Math.round(Math.random() * (parents.length - 1));
        relate = parents[getRelate];
    } else if (playersAge <= (familyAge - 39)) {
        //Checks if player is younger by 39 years of age.
        getRelate = Math.round(Math.random() * (grandParents.length - 1));
        relate = grandParents[getRelate];
    } else if (playersAge >= (familyAge + 19) && playersAge <= (familyAge + 38)) {
        //checks if player is older by at least 19, but not by 39
        getRelate = Math.round(Math.random() * (children.length - 1));
        relate = children[getRelate];
    } else if (playersAge >= (familyAge + 39)) {
        //checks if player is older by 39
        getRelate = Math.round(Math.random() * (grandChildren.length - 1));
        relate = grandChildren[getRelate];
    }
    genderCheck = getRelate;
    return relate;
}

function getGender() {
    let gender = "";
    if (Math.round(Math.random()) == 0) {
        gender = "M";
    } else {
        gender = "F";
    }
    return gender;
}

function genFamilyGender() {
    let gender = "";
    let check = player.playerGender;
    if (genderCheck == 0) { //Always a male gender
        gender = "M";
    } else if (genderCheck == 1) { //Always a female gender
        gender = "F";
    } else if (genderCheck == 2) { //Cousin can be either
        if (Math.round(Math.random()) == 0) {
            gender = "M";
        } else {
            gender = "F";
        }
    } else if (genderCheck == 3) { //Spouse is the same gender at 10% chance
        if (Math.round(Math.random()) < 0.1) {
            gender = check;
        } else if (Math.round(Math.random()) > 0.1 && check == "M") {
            gender = "F";
        } else {
            gender = "M";
        }
    }
    return gender;
}

function genName() {
    let searchFirst = Math.round(Math.random() * nameList.length);
    let searchSecond = Math.round(Math.random() * nameList.length);
    return nameList[searchFirst] + " " + nameList[searchSecond];
}
//--------------- TEMP ---------------------------------------------
let nameList = [
    "Adam", "Alex", "Aaron", "Ben", "Carl", "Dan", "David", 
    "Edward", "Fred", "Frank", "George", "Hal", "Hank", "Ike", 
    "John", "Jack", "Joe", "Larry", "Monte", "Matthew", "Mark", 
    "Nathan", "Otto", "Paul", "Peter", "Roger", "Roger", "Steve", 
    "Thomas", "Tim", "Ty", "Victor", "Walter", "Haise", "Hayato",
    "Ren", "Seyren", "Windsor", "Sakura", "Masamune", "Yukinari",
    "Luciela", "Len", "Fortuna", "Kotowari", "Rinne", "Seiran", "Yakumo",
    "FengHua", "Kazehana", "Lin", "Wang", "Huang", "Ling", "Wong", "Tang",
    "San", "Ichi", "Itou", "Tanaka", "Yumesaki", "Miyano", "Mamoru",
    "Sugita", "Tomokazu", "Matt", "Mullholland", "Yukihime", "Yuki",
    "Lycoris", "Hana", "Megumi", "Toyota", "Niisan", "Honda", "Hyundai",
    "Kang", "Lee", "Hyuk", "So", "Hyung", "Zarathustra", "Reinhardt",
    "Tristan", "Eugen", "Heydrich", "Valerian", "Trifa", "Ryan", "Liu",
    "Setsuna f Seisei", "Minato Aqua", "Hoshimachi", "Suisei", "Kaisei",
    "Ting Yu", "GN001 Exia", "ZGMF-X10A Freedom", "Eva Unit-01", "RX-0 Unicorn",
    "RX-93 v Gundam", "Feng", "Tokiyomi", "Kusunoki", "Loki", "Odin", "Amaterasu",
    "Izanagi", "Izanami", "Silverio Vendetta", "Mercurius", "Amakasu", "Masahiko",
    "Hiiragi", "Yoshiya", "Nakiri", "Kuubou", "Paradise", "Hajun", "Nobunaga",
    "Nobuhime", "Oda", "Kaziklu Bey", "Lloyd", "Matsunaga", "Tsubame",
    "Anderson", "Ashwoon", "Aikin", "Bateman", "Bongard",
    "Bowers", "Boyd", "Cannon", "Cast", "Deitz", "Dewalt",
    "Ebner", "Frick", "Hancock", "Haworth", "Hesch", "Hoffman",
    "Kassing", "Knutson", "Lawless", "Lawicki", "Mccord",
    "McCormack", "Miller", "Myers", "Nugent", "Ortiz", "Orwig",
    "Ory", "Paiser", "Pak", "Pettigrew", "Quinn", "Quizoz",
    "Ramachandran", "Resnick", "Sagar", "Schickowski",
    "Schiebel", "Sellon", "Severson", "Shaffer", "Solberg",
    "Soloman", "Sonderling", "Soukup", "Soulis", "Stahl",
    "Sweeney", "Tandy", "Trebil", "Trusela", "Trussel", "Turco",
    "Uddin", "Uflan", "Ulrich", "Upson", "Vader", "Vail", "Valente",
    "Van Zandt", "Vanderpoel", "Ventotla", "Vogal", "Wagle", "Wagner",
    "Wakefield", "Weinstein", "Weiss", "Woo", "Yang", "Yates", "Yocum",
    "Zeaser", "Zeller", "Ziegler", "Bauer", "Baxster", "Casal", "Cataldi",
    "Caswell", "Celedon", "Chambers", "Chapman", "Christensen", "Darnell",
    "Davidson", "Davis", "DeLorenzo", "Dinkins", "Doran", "Dugelman", "Dugan",
    "Duffman", "Eastman", "Ferro", "Ferry", "Fletcher", "Fietzer", "Hylan",
    "Hydinger", "Illingsworth", "Ingram", "Irwin", "Jagtap", "Jenson",
    "Johnson", "Johnsen", "Jones", "Jurgenson", "Kalleg", "Kaskel",
    "Keller", "Leisinger", "LePage", "Lewis", "Linde", "Lulloff",
    "Maki", "Martin", "McGinnis", "Mills", "Moody", "Moore", "Napier",
    "Nelson", "Norquist", "Nuttle", "Olson", "Ostrander", "Reamer",
    "Reardon", "Reyes", "Rice", "Ripka", "Roberts", "Rogers",
    "Root", "Sandstrom", "Sawyer", "Schlicht", "Schmitt", "Schwager",
    "Schutz", "Schuster", "Tapia", "Thompson", "Tiernan", "Tisler"
];