import { authService } from "fbase";
import { useState } from "react";


const AuthForm = () =>  {
    const [email, setEmail] = useState("");     // eslint-disable-line no-unused-vars
    const [password, setPassword] = useState("");       // eslint-disable-line no-unused-vars
    const [newAccount, setNewAccount] = useState(true);       // eslint-disable-line no-unused-vars
    const [error ,setError] = useState("");     // eslint-disable-line no-unused-vars


    const onChange = (event) =>{
        
           const{
            target : {name ,value},

           } =event;
           if (name ==="email"){
            setEmail(value);
           }else if (name ==="password"){
            setPassword(value);
           }
        
        
    };

    const onSubmit = async(event) =>{
     event.preventDefault();
     try {
        let data;
     if(newAccount){
        //create newAccount
        data = await authService.createUserWithEmailAndPassword(email,password);
     }
     else {
        //log in
        data = await authService.signInwithEmailAndPassword(email, password);
     }
    } catch (error) {  
         setError(error.message);
    }
    };
    

    const toggleAccount = () => setNewAccount((prev) => !prev);



    return (
        <>
        
            <form onSubmit={onSubmit} className ="container">
                <input name ="email" type="text" placeholder ="Email" required 
                value={email} onChange={onChange} className="authInput"/>
                <input name ="password" type="password" placeholder ="Password" required 
                autoComplete="current-password" value={password} onChange={onChange} className="authInput"/>
                <input type="submit" value = {newAccount ? "Create Account " :"Log In"}
                className ="authInput authSubmit" />  
                {error && <span className="authError">{error}</span>} 
            </form>
            <span onClick={toggleAccount} className="authSwitch">
                {newAccount ? "Sign In" : "Create Account"}
            </span>
        </>
    );
};

export default AuthForm;