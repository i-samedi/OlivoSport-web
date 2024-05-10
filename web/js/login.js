const loginUser = document.getElementById('saveLogin');

loginUser.addEventListener('submit', (event) => {
    event.preventDefault(); // Prevent form from submitting
    let rut = document.getElementById('rut').value;
    let password = document.getElementById('password').value;
    let loginData = {rut: rut, password: password};
    let loginDataJson = JSON.stringify(loginData);
    console.log(loginDataJson);
});

//     fetch('http://localhost:3000/prueba', {
//         method: 'Post',
//         body: loginDataJson
//     })
//         .then(x => console.log("hola"))
// });
