function genPassword(list1=[], list2=[], type="simple"){
    word1=list1[Math.floor(Math.random() * list1.length)].trim().toLowerCase()
    word2=list2[Math.floor(Math.random() * list2.length)].trim().toLowerCase()
    const words = `${word1}${word2.charAt(0).toUpperCase() + word2.slice(1)}`;
    const numbers = `${Math.floor(Math.random() * 10)}${Math.floor(Math.random() * 10)}`;
  
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
  
    const letters = Object.keys(replaces).filter(letter => Array.from(words.replace('[A-Z]','')).indexOf(letter) !== -1);
    const letter = letters[Math.floor(Math.random() * letters.length)];

    if (type == "simple"){
        text = words.toLowerCase();
    }
    if (type == "middle"){
        text = words.replace(letter, replaces[letter]);
    }
    if (type == "strong"){
        text = words
        for (const [key, value] of Object.entries(replaces)) {
            text = text.replaceAll(key, value);
        }
    }
    return `${text}${numbers}`;
}
  
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function() {
        list1 = document.querySelector('.list1').textContent.trim().split('\n');
        list2 = document.querySelector('.list2').textContent.trim().split('\n');
        document.querySelector('.password').value=genPassword(list1, list2, button.id);
    });
});
