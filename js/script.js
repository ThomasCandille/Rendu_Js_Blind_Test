//declaration de toutes les variables que l'on utilisera
const chansonGood = ["freed-from-desire","l'amour toujours", "i gotta feeling","one more time","partenaire particulier","never gonna give you up","don't stop me now","what you won't do love","rasputin","star walkin"]
const chansonBad = ["set it off", "gilded lily", "rubber duck","squares","people you know","padoru","ghost town","bleed","engravings","fallen kingdom","oh my","fire to the fuse","mr sunshine","empty house","bad boy","golden hour","why do i"," xenogenesis","the ballet girl","on and on"," miss you","BOW","those eyes","sick of u","feel something"]
//recupération de tout le contenu musqiue et visuel
const audio = document.getElementsByClassName("musique")
const image = document.getElementsByClassName("image")
//on récupere les différents élément html dont on va se servir
const answer1 = document.querySelector(".answer1")
const answer2 = document.querySelector(".answer2")
const answer3 = document.querySelector(".answer3")
const answer4 = document.querySelector(".answer4")
const button = document.querySelector(".lebouton")
const scored = document.querySelector(".score")
const tictac = document.querySelector(".timer")
//definition de variable utilisé durant le programme
//propositions : permettra de mettre les propositions dans un ordre aléatoir 
let propositions =[]
//i : numero de la chanson a deviner 
let i = -1
//y : nombre de guess effectué
let y = 0
//score : score total
let score = 0
//date1 et date2 : permettent de calculer le score
let date1 = undefined
let date2 = undefined
// temps, timer, count_on et perdu : servent tout les 4 a calculer le timer
let temps = 30
let timer 
let count_on = 0
let perdu = 0

//message pour presenter le site
alert("Bienvenue sur ce Blind Test ! Tu auras 30s pour retrouver le titre de chacune de ces 10 musiques. Appuie sur pret entre chaque chanson pour lancer le timer ! BONNE CHANCE !")

//fonction qui permet de faire tourner le timer
const compteur = () =>{
    tictac.innerHTML = `<p>temps restant : 00 : ${temps} </p>`
    temps = temps -1
    if (temps === -2){
        perdu = 1
        count_on = 0
        fct()
        return
    }
    timer = setTimeout(compteur, 1000)
}

//fonction qui met à jour le score
const updateScore = () => {
    date2 = Date.now()
    score = score + (31000-(date2-date1))
    return score 
}

//fonction qui permet de reagir aprees un evenement
const fct = (event) =>{

    //met en pause le timer et la chanson puis le reinitialise pour la prochaine chanson 
    clearTimeout(timer)
    temps = 30
    audio[i].pause()
    //vérification de si la chanson est la bonne réponse ou pas et ajoute la classe correspondante : correct si bon et wrong si mauvais
    answer1.innerHTML === `<p> ${chansonGood[i]} </p>` ? answer1.classList.add("correct") : answer1.classList.add("wrong")
    answer2.innerHTML === `<p> ${chansonGood[i]} </p>` ? answer2.classList.add("correct") : answer2.classList.add("wrong")
    answer3.innerHTML === `<p> ${chansonGood[i]} </p>` ? answer3.classList.add("correct") : answer3.classList.add("wrong")
    answer4.innerHTML === `<p> ${chansonGood[i]} </p>` ? answer4.classList.add("correct") : answer4.classList.add("wrong")
    //revele la cover de la chanson 
    image[i].classList.remove("blur")
    image[i].classList.add("noblur")
    //attribution des points ou non en vérifiant : le nombre de guess par rapport au numero de la chanson, si le temps est écoulé, si la chanson deviné est la bonne
    if(y===i){
        if(perdu === 0 && event.target.classList.contains("correct")){
            //previens le joueur de la bonne réponse et met a jour le score
            alert("BONNE REPONSE !")
            score = (+updateScore())
            console.log(score)
            scored.innerHTML = `<p> score total : ${score} pts </p>`
            
        }
        else{
            alert("MAUVAISE REPONSE :(")
        }
        //reset le timer et ajoute un au nombre de guess
        count_on = 0
        y = y + 1
    }
    perdu = 0
    button.classList.remove("hiddenbutton")
    //si arriver a la derniere chanson : alors c'est la fin du blind test
    if (i == 9){
        button.classList.add("hiddenbutton")
        alert(`Bravo ! C'est la fin de ce BlindTest ! Tu as réussi à faire un score de ${score} !`)
    }

}

//fonction qui permet de mettre les propositons dans un ordre aléatoire
const getSongs = () =>{
    let liSong = []
    let song = undefined
    //ajout a la liste de la bonne chanson
    liSong.push(chansonGood[i])
    //ajoute a la liste 3 chanson dans la liste des chansons mauvaises
    for(let x = 0; x <=2; x++){
        song = chansonBad[Math.floor(Math.random()*chansonBad.length)]
        //si la chanson est deja entrée dans la liste 
        if(liSong.includes(song)){
            x = x-1 
        }
        else{
            liSong.push(song)
        }
    }
    //melange de la liste contenant les chansons
    liSong = liSong.sort(() => Math.random() - 0.5)
    console.log(liSong)
    return liSong
}

//fonciton qui agit au debut de chaque tour du blind test
const start =() => {
    //demarre le timer
    if (count_on === 0){
        count_on = 1
        compteur()
    }
    //retire les classes correct et wrong aux propositions
    answer1.classList.remove("correct" , "wrong")
    answer2.classList.remove("correct" , "wrong")
    answer3.classList.remove("correct" , "wrong")
    answer4.classList.remove("correct" , "wrong")
    //passe a la chanson a deviner suivante
    i = i + 1
    //recupere la liste des chansons qui serviront de propsoitions
    propositions = getSongs()
    answer1.innerHTML = `<p> ${propositions[1]} </p>`
    answer2.innerHTML = `<p> ${propositions[2]} </p>`
    answer3.innerHTML = `<p> ${propositions[3]} </p>`
    answer4.innerHTML = `<p> ${propositions[0]} </p>`
    //cache le bouton qui permet de passer a la chanson suivante
    button.classList.add("hiddenbutton")
    //evite que le site bug avant l'aparition de la premiere chanson et cache la cover de celle qui vient d'etre deviné
    if(i>0){
        image[i-1].classList.add("hidden")
    }
    //fait apparaitre la cover de la chanson a deviner
    image[i].classList.remove("hidden")
    //lance le son de la musique
    audio[i].play()
    //enregistre le moment de debut du tour pour le score
    date1 = Date.now()
}

//preparation aux evenements sur ordinateur
button.addEventListener('click', start)
answer1.addEventListener('click', fct)
answer2.addEventListener('click', fct)
answer3.addEventListener('click', fct)
answer4.addEventListener('click', fct)

//preparation aux evenements sur telephone
answer1.addEventListener('touchend', fct)
answer2.addEventListener('touchend', fct)
answer3.addEventListener('touchend', fct)
answer4.addEventListener('touchend', fct)