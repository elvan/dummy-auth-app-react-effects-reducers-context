import React, {
  useContext,
  useEffect,
  useReducer,
  useRef,
  useState
} from 'react';
import AuthContext from '../../store/auth-context';
import Button from '../UI/Button/Button';
import Card from '../UI/Card/Card';
import Input from '../UI/Input/Input';
import classes from './Login.module.css';

const emailReducer = (state, action) => {
  if (action.type === 'USER_INPUT') {
    return {
      value: action.value,
      isValid: action.value.includes('@')
    };
  }

  if (action.type === 'INPUT_BLUR') {
    return {
      value: state.value,
      isValid: state.value.includes('@')
    };
  }

  return { value: '', isValid: false };
};

const passwordReducer = (state, action) => {
  if (action.type === 'USER_INPUT') {
    return {
      value: action.value,
      isValid: action.value.length >= 6
    };
  }

  if (action.type === 'INPUT_BLUR') {
    return {
      value: state.value,
      isValid: state.value.length >= 6
    };
  }

  return { value: '', isValid: false };
};

const Login = (props) => {
  const [formIsValid, setFormIsValid] = useState(false);

  const [emailState, dispatchEmail] = useReducer(emailReducer, {
    value: '',
    isValid: false
  });

  const [passwordState, dispatchPassword] = useReducer(passwordReducer, {
    value: '',
    isValid: false
  });

  const { onLogin } = useContext(AuthContext);

  const { isValid: emailIsValid } = emailState;
  const { isValid: passwordIsValid } = passwordState;

  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  useEffect(() => {
    const timer = setTimeout(() => {
      console.log('Check form validity');
      setFormIsValid(emailIsValid && passwordIsValid);
    }, 500);

    return () => {
      console.log('Clear timer');
      clearTimeout(timer);
    };
  }, [emailIsValid, passwordIsValid]);

  const emailChangeHandler = (event) => {
    dispatchEmail({ type: 'USER_INPUT', value: event.target.value });

    setFormIsValid(
      event.target.value.includes('@') && passwordState.value.trim().length >= 6
    );
  };

  const passwordChangeHandler = (event) => {
    dispatchPassword({ type: 'USER_INPUT', value: event.target.value });

    setFormIsValid(emailIsValid && event.target.value.trim().length >= 6);
  };

  const validateEmailHandler = () => {
    dispatchEmail({ type: 'INPUT_BLUR' });
  };

  const validatePasswordHandler = () => {
    dispatchPassword({ type: 'INPUT_BLUR' });
  };

  const submitHandler = (event) => {
    event.preventDefault();

    if (formIsValid) {
      onLogin(emailState.value, passwordState.value);
    } else if (!emailIsValid) {
      emailInputRef.current.focus();
    } else if (!passwordIsValid) {
      passwordInputRef.current.focus();
    }
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <Input
          ref={emailInputRef}
          id='email'
          label='Email'
          type='email'
          isValid={emailState.isValid}
          value={emailState.value}
          onChange={emailChangeHandler}
          onBlur={validateEmailHandler}
        />
        <Input
          ref={passwordInputRef}
          id='password'
          label='Password'
          type='password'
          isValid={passwordState.isValid}
          value={passwordState.value}
          onChange={passwordChangeHandler}
          onBlur={validatePasswordHandler}
        />
        <div className={classes.actions}>
          <Button type='submit' className={classes.btn}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
