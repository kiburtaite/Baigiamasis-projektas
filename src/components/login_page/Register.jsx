import { useNavigate } from 'react-router-dom';

const Register = () => {

    const navigate = useNavigate();

    const addUser = e => {
        e.preventDefault();  
        if(
            e.target.elements.username.value !== '' &&
            e.target.elements.email.value !== '' &&
            e.target.elements.email.value.includes('.') &&
            /[a-z]/.test(e.target.elements.password.value) &&
            /[0-9]/.test(e.target.elements.password.value) &&
            e.target.elements.password.value.length >= 8 &&
            e.target.elements.password.value === e.target.elements.passwordRepeat.value
        ){
            const newUser = {
                username: e.target.elements.username.value,
                email: e.target.elements.email.value,
                password: e.target.elements.password.value
            };
            fetch('http://localhost:5000/users/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body : JSON.stringify(newUser)
            })
            .then(res => {
                if (res.ok){
                    alert("Sėkmingai prisiregistavote");
                    (navigate('/login'))
                } else if (res.status === 409){
                    alert("Nurodytas vartotojas jau egzistuoja")
                }
            })
        } else {alert("Vartotojo vardas bei el. paštas negali būti tušti. Slaptažodis privalo turėti bent 8 simbolius ir būti sudarytas iš raidžių ir skaičių.")}
    };

    return (
      <div>
        <h3>Registruotis</h3>
        <form onSubmit={addUser}>
            <input 
            type="text"
            name="username"
            placeholder="Susikurkite vartotojo vardą"
            />
            <input
            type="email"
            name="email"
            placeholder="Įveskite el. paštą"
            />
            <input 
            type="password"
            name="password"
            placeholder="Įveskite slaptažodį"
            />
            <input 
            type="password"
            name="passwordRepeat"
            placeholder="Pakartokite slaptažodį"
            />
            <input 
            type="submit"
            value="Registruotis"
            />
        </form>
      </div>
    );
  }
  
  export default Register