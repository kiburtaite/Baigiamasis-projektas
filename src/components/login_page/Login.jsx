import { useNavigate } from 'react-router-dom';

const Login = () => {

    const navigate = useNavigate();

    const loginUser = e => {
        e.preventDefault();
        const loginData = {
            email: e.target.elements.email.value,
            password: e.target.elements.password.value 
        };
        fetch('http://localhost:5000/users/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body : JSON.stringify(loginData)
            })
        .then(res => {
            if (res.ok){
                alert("Sėkmingai prisijungėte");
                navigate('/')
            } else if (res.status === 401){
                alert("Klaidingas vartotojo vardas arba slaptažodis")
            }
        })
    };

    return (
      <div>
        <h3>Prisijungti</h3>
        <form onSubmit={loginUser}>
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
            type="submit"
            value="Prisijungti"
            />
        </form>
      </div>
    );
  }
  
  export default Login