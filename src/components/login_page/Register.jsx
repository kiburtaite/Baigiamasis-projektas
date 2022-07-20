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
                body: JSON.stringify(newUser)
            })
            .then(res => {
                if (res.ok){
                    alert("Sėkmingai prisiregistavote");
                    (navigate('/login', { replace: true }))
                } else if (res.status === 409){
                    alert("Nurodytas vartotojas jau egzistuoja")
                }
            })
        } else {alert("Vartotojo vardas bei el. paštas negali būti tušti. Slaptažodis privalo turėti bent 8 simbolius ir būti sudarytas iš raidžių ir skaičių.")}
    };

    return (
      <div className="mainForm">
        <h3>Registruotis</h3>
        <form onSubmit={addUser}>
            <input 
            type="text"
            name="username"
            placeholder="Susikurkite vartotojo vardą"
            /><br/>
            <input
            type="email"
            name="email"
            placeholder="Įveskite el. paštą"
            /><br/>
            <input 
            type="password"
            name="password"
            placeholder="Įveskite slaptažodį"
            /><br/>
            <input 
            type="password"
            name="passwordRepeat"
            placeholder="Pakartokite slaptažodį"
            /><br/>
            <input 
            type="submit"
            value="Registruotis"
            />
        </form>
      </div>
    );
  }
  
  export default Register