function capitalize(word){
    return word.charAt(0).toUpperCase() + word.slice(1);
}
function gen(type,adjective=[],noun=[]){
    type=type.replace('{','').replace('}','');
    resp="";
    if(type){
        if(type == "цифра"){
            resp=Math.floor(Math.random() * 10);
        }else{
            const replaces = {
                'a': '@',
                'c': '(',
                'd': ')',
                'e': '3',
                'f': '=',
                'i': '!',
                'k': '<',
                's': '$',
                't': '+',
                'z': '2'
            };
            args="";
            c=false;
            if(type.includes("Іменник") || type.includes("Прикметник")){
                c=true;
            }
            if(type.includes("прикметник") || type.includes("Прикметник")){
                list=adjective;
                args=type.replace("прикметник","");
            }
            if(type.includes("іменник") || type.includes("Іменник")){
                list=noun;
                args=type.replace("іменник","");
            }
            resp=list[Math.floor(Math.random() * list.length)].trim().toLowerCase();

            if(c){resp=capitalize(resp);}

            if(args.includes("-середній")){
                const letters = Object.keys(replaces).filter(letter => Array.from(resp.replace('[A-Z]','')).indexOf(letter) !== -1);
                const letter = letters[Math.floor(Math.random() * letters.length)];
                resp = resp.replace(letter, replaces[letter]);
            }
            if(args.includes("-складний")){
                const letters = Object.keys(replaces).filter(letter => Array.from(resp.replace('[A-Z]','')).indexOf(letter) !== -1);
                const letter = letters[Math.floor(Math.random() * letters.length)];
                for (const [key, value] of Object.entries(replaces)) {
                    resp = resp.replaceAll(key, value);
                }
            }
        }
    }
    return resp;
}

function genPassword(adjective=[], noun=[], mask="{прикметник}{іменник}{цифра}{цифра}"){
    resp="";

    mask.split('}{').forEach((element) => {
        resp+=gen(element,adjective,noun);
    });

    return resp;
}
  
document.querySelectorAll('a.mask').forEach(button => {
    button.addEventListener('click', function() {
        document.querySelector('input.mask').value=button.getAttribute('mask');
    });
});

document.querySelector('.generate').addEventListener('click', function() {
    list1 = document.querySelector('.list1').textContent.trim().split('\n');
    list2 = document.querySelector('.list2').textContent.trim().split('\n');
    document.querySelector('.password').value=genPassword(list1, list2,document.querySelector('input.mask').value);
});