//LARGE alphabets 26
//SMALL alphabets 26
//digits 10
//symbols 29
const characters = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9","~","`","!","@","#","$","%","^","&","*","(",")","_","-","+","=","{","[","}","]",",","|",":",";","<",">",".","?",
"/"]

let passwordLength = 12
let numPasswords = 7

let digitsAllowed = true
let symbolsAllowed = true

const generatedRandomPasswords = []

const generatePasswordsButton = document.getElementById("password-gen-btn")
const passwordBoxesContainer = document.querySelector(".password-boxes-wrapper")

const passwordLengthInput = document.getElementById("pwd-len")
const passwordCountInput = document.getElementById("pwd-cnt")
const digitsAllowedCheckbox = document.getElementById("digits-allowed")
const symbolsAllowedCheckbox = document.getElementById("symbols-allowed")

document.body.addEventListener("click", () => {
    Array.from(passwordBoxesContainer.children).forEach(child => {
        child.textContent = child.classList[1]
        child.style.color = "#5DEF92"
    })
})

function insertPasswordIntoDOM(pwdText)
{
    const passwordBox = document.createElement('span')
    passwordBox.classList.add('password-box')
    passwordBox.classList.add(pwdText)
    passwordBox.textContent = pwdText
    
    passwordBox.onmouseover = () => {
        passwordBox.style.color = "white"
        passwordBox.textContent = "Click to copy!"
    }
    
    passwordBox.onmouseout = () => {
        if(passwordBox.textContent !== "Copied!")
        {
            passwordBox.style.color = "#5DEF92"
            passwordBox.textContent = pwdText
        }
    }
    
    passwordBox.onclick = (evt) => {
            evt.stopPropagation()
            navigator.clipboard.writeText(pwdText).then(() => {
            passwordBox.textContent = "Copied!"
            passwordBox.style.color = "white"
        })
    }
    
    passwordBoxesContainer.appendChild(passwordBox)
}

function insertAllPasswordsIntoDOM()
{
    generatedRandomPasswords.forEach(pwd => insertPasswordIntoDOM(pwd))
}

function clearPasswordsFromDOM()
{
    while(passwordBoxesContainer.lastChild)
    passwordBoxesContainer.removeChild(passwordBoxesContainer.lastChild)
}

function generateRandomPassword()
{
    const largeAlphabets = characters.slice(0, 26)
    const smallAlphabets = characters.slice(26, 52)
    
    const alphabets = [...largeAlphabets, ...smallAlphabets]
    const digits = characters.slice(52, 62)
    const symbols = characters.slice(62)
    
    const passwordCharSet = [...alphabets]
    
    if(digitsAllowed)
    passwordCharSet.push(...digits)
    
    if(symbolsAllowed)
    passwordCharSet.push(...symbols)
    
    let password = ""
    
    for(let i = 1; i <= passwordLength; i++)
    password += passwordCharSet[Math.floor(Math.random() * passwordCharSet.length)]
    
    return password
}

function fillRandomPasswordsArray()
{
    for(let i = 1; i <= numPasswords; i++)
    generatedRandomPasswords.push(generateRandomPassword())
}

function clearRandomPasswordsArray()
{
    const numElems = generatedRandomPasswords.length
    
    for(let i = 0; i < numElems; i++)
    generatedRandomPasswords.pop()
}

generatePasswordsButton.addEventListener("click", () => {
    passwordLength = passwordLengthInput.value
    numPasswords = passwordCountInput.value
    digitsAllowed = digitsAllowedCheckbox.checked
    symbolsAllowed = symbolsAllowedCheckbox.checked
    if(passwordBoxesContainer.lastChild)
    clearPasswordsFromDOM()
    fillRandomPasswordsArray()
    insertAllPasswordsIntoDOM()
    clearRandomPasswordsArray()
})

generatePasswordsButton.click()
