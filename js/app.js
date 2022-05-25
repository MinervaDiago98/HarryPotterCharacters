let characters = []
let originalCharacters = []
var specie

fetch("./data/characters.json")
.then(response => response.json())
.then(data => {
    originalCharacters = data
    characters = originalCharacters
    listCharacters(data)
});

    window.onload = function(){
    document.getElementById("delete").addEventListener("click", function(){
        document.querySelector("#popup").classList.toggle("is-active"); 
        });
    }
document.querySelector("#all").addEventListener("click",function(){
    characters = originalCharacters
    listCharacters(characters);
});

document.querySelector("#search").addEventListener("keyup" ,function(evt){
    let selection = [ ]

    if(evt.target.value.length>=0){
        selection = characters.filter((character) => 
            character.name.toLowerCase().includes(evt.target.value.toLowerCase())
        )
        listCharacters(selection);
    }
});
document.querySelector("#wizard").addEventListener("click",function(){
    reset()
    characters = characters.filter((character) => character.wizard === true)
    listCharacters(characters);
});
document.querySelector("#human").addEventListener("click",function(){
    reset()
    characters = characters.filter((character) => character.species === 'human')
    listCharacters(characters);
});
document.querySelector("#ghost").addEventListener("click",function(){
    reset()
    characters = characters.filter((character) => character.species === 'ghost')
    listCharacters(characters);
});
document.querySelector("#half-giant").addEventListener("click",function(){
    reset()
    characters = characters.filter((character) => character.species === 'half-giant')
    listCharacters(characters);
});
document.querySelector("#werewolf").addEventListener("click",function(){
    reset()
    characters = characters.filter((character) => character.species === 'werewolf')
    listCharacters(characters);
});
document.querySelector("#cat").addEventListener("click",function(){
    reset()
    characters = characters.filter((character) => character.species === 'cat')
    listCharacters(characters);
});
document.querySelector("#male").addEventListener("click",function(){
    reset()
    characters = characters.filter((character) => character.gender === 'male')
    listCharacters(characters);
});
document.querySelector("#female").addEventListener("click",function(){
    reset()
    characters = characters.filter((character) => character.gender === 'female')
    listCharacters(characters);
});
document.querySelector("#gryffindor").addEventListener("click",function(){
    reset()
    characters = characters.filter((character) => character.house.includes('Gryffindor'))
    listCharacters(characters);
    
});
document.querySelector("#slytherin").addEventListener("click",function(){
    reset()
    characters = characters.filter((character) => character.house.includes('Slytherin'))
    listCharacters(characters);
});
document.querySelector("#hufflepuff").addEventListener("click",function(){
    reset()
    characters = characters.filter((character) => character.house.includes('Hufflepuff'))
    listCharacters(characters);
});

/*Funcion que dibuja un array de pokemones*/
function listCharacters(characters){
    document.getElementById("listado").innerHTML="";

    // for(var i=0;i<characters.length;i++) or
    characters.forEach((user, i) => {
        let div = document.createElement("div");
        div.classList.add("column",'is-3');

        let card = document.createElement("div");
        card.classList.add("card", "is-relative");
        card.dataset.name=characters[i].name;
        card.dataset.image = characters[i].image;
        card.dataset.species = characters[i].species;
        card.dataset.gender = characters[i].gender;
        card.dataset.house = characters[i].house;
        card.dataset.actor = characters[i].actor;
        card.dataset.patronus = characters[i].patronus;

        let cardImage =  document.createElement("div");
        cardImage.classList.add("card-image");

        let figure = document.createElement("figure");
        figure.classList.add("image",'is-square',"has-background-light", 'medidas');
    
        let img = document.createElement("img");
        img.setAttribute("src", srcImage(characters[i].image));
        figure.append(img);

        let cardContent= document.createElement("div");
        cardContent.classList.add("card-content","px-5","py-5");
        
        let hTitle= document.createElement("h2");
        hTitle.classList.add("fs-5", "title");
        hTitle.innerText=characters[i].name;

        // let tipoArreglo=characters[i].species;//Arreglo
        // card.dataset.species= characters[i].species;

        //   for(var j = 0 ; j<tipoArreglo.length;j++){
        //      let tSpan =  document.createElement("span");
        //      tSpan.classList.add("tag", "mr-1");
        //      tSpan.innerText=tipoArreglo[j];
        //     //  var micolor= getColor(tipoArreglo[j])
        //     //  tSpan.classList.add(micolor);
        //      cardContent.append(tSpan);
        // }       
        
        let logo = document.createElement("img");
        logo.setAttribute("src", logoSrc(characters[i].house));
        logo.setAttribute('width', 80)
        logo.classList.add('mt-1','mb-1', 'logoHouse')
        
        let p1 = document.createElement("p");
        p1.classList.add('house-name', colorHouse(characters[i].house));
        p1.innerHTML="<b> "+characters[i].house+"</b>";
        p1.classList.add('font-large');

        let p2 = document.createElement("p");
        p2.innerHTML="<b>Species:</b> "+characters[i].species;
        p2.classList.add('font-large');

        let p3 = document.createElement("p");
        //p3.innerHTML="<b>Wizard: </b> "+characters[i].wizard;
        p3.innerHTML="<b>Wizard</b> ";
        p3.classList.add('ms-4')
        p3.classList.add('font-large');

        let p4 = document.createElement("p");
        p4.innerHTML="<b>Student</b> ";
        p4.classList.add('ms-4')
        p4.classList.add('font-large');

        let iconStudent = document.createElement("img");
        iconStudent.setAttribute("src", isStudent(characters[i].hogwartsStudent));
        iconStudent.setAttribute('width', 80)
        iconStudent.classList.add('mt-1','mb-1', 'icon-student')

        let iconWizard = document.createElement("img");
        iconWizard.setAttribute("src", isWizard(characters[i].wizard));
        iconWizard.setAttribute('width', 80)
        iconWizard.classList.add('mt-1','mb-1', 'icon-wizard')

        card.append(logo);
        cardContent.append(p1);
        cardContent.append(p2);
        cardContent.append(p3);
        cardContent.append(p4);
        cardImage.append(figure);
        cardContent.append(hTitle);
        card.append(iconStudent)
        card.append(iconWizard)
        card.append(cardImage);
        card.append(cardContent);

        div.append(card);
        document.getElementById("listado").append(div);
        card.addEventListener("click", popup)
    });
}

const popup = evt =>{
    var info = evt.currentTarget.dataset

    document.querySelector("#character-name").innerHTML= info.name;
    document.querySelector("#character-img").src= info.image;
    document.querySelector("#character-species").innerHTML= info.species;
    document.querySelector("#character-gender").innerHTML= info.gender;
    document.querySelector("#character-patronus").innerHTML= info.patronus;
    document.querySelector("#character-actor").innerHTML= info.actor;
    document.querySelector("#popup").classList.toggle("is-active");
}
const reset = () => {
    characters = originalCharacters
    return listCharacters(characters)
}

const isWizard = wizard => {
    let srcIcon

    if(wizard === true){
        srcIcon = 'https://cdn-icons-png.flaticon.com/512/1632/1632596.png'
    }else{
        srcIcon = 'https://cdn-icons-png.flaticon.com/512/2919/2919590.png'
    }
    return srcIcon
}
const isStudent = student => {
    let srcIcon

    if(student === true){
        srcIcon = 'https://cdn-icons-png.flaticon.com/512/1632/1632596.png'
    }else{
        srcIcon = 'https://cdn-icons-png.flaticon.com/512/2919/2919590.png'
    }
    return srcIcon
}
const colorHouse = houseName => {
    let colorHouse

    const house ={
        Slytherin : 'slytherin',
        Gryffindor: 'gryffindor',
        Ravenclaw: 'ravenclaw',
        Hufflepuff: 'hufflepuff'
    }
    colorHouse = house[houseName]
    return colorHouse
}

const srcImage = Image => {
    let srcImage
    if(Image == ''){
        srcImage = 'https://jayz.nz/wp-content/uploads/2018/07/Prodpic7787.jpg'
    }
    else{
        srcImage = Image
    }
    return srcImage
}

const logoSrc = houseName => {
    switch (houseName) {
        case 'Gryffindor':
            srcLogo = 'https://logos-world.net/wp-content/uploads/2021/08/Gryffindor-Emblem.png'
            break;
        case 'Slytherin':
            srcLogo = 'https://logos-world.net/wp-content/uploads/2022/02/Slytherin-Symbol.png'
            break;
        case 'Ravenclaw':
            srcLogo='https://www.pngmart.com/files/12/Ravenclaw-House-PNG-Clipart.png'
            break;
        case 'Hufflepuff':
            srcLogo='http://www.newidea.com.au/media/49867/hufflepuff-harry-potter.jpg'
            break;
        default:
            srcLogo = 'https://dxmedia.net/wp-content/themes/dxmedia/img/blogsize.png'
            break;
    }
    return srcLogo
}

