import { useNavigate, Link } from 'react-router-dom';
import { useState } from 'react';
import { Button } from '@/components/ui';

const Login = () => {
  const navigate = useNavigate();
  const [password, setPassword] = useState('');

  return (
    <>
      <div>
        <input type="text" placeholder="Phone number, username or email" />
        <input type="text" placeholder="Password" />
      </div>
      <div>
        <Button>Log in</Button>
      </div>
      <div>
        <p>Don't have an account?</p>
        <Link to="/signup">Sign Up.</Link>
      </div>
    </>
  );
};

export default Login;
