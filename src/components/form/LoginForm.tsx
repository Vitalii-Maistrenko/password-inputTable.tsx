import './LoginForm.css';
import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { MyForm } from '../types';

interface LoginFormProps {
  onLogin: (data: MyForm) => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onLogin }) => {
  const { 
    register, 
    handleSubmit, 
    formState: { errors, isSubmitting } 
  } = useForm<MyForm>({ defaultValues: {} });

  const submit: SubmitHandler<MyForm> = async (data) => {
    onLogin(data);
  };

  return (
    <form onSubmit={handleSubmit(submit)}>
      <input
        type="text"
        {...register('login', { required: 'Login is required' })}
        className={`input-field ${errors.login ? 'error' : ''}`}
        placeholder="Login"
      />
      {errors.login && <span className="error-message">{errors.login.message}</span>}
      
      <input
        type="password"
        {...register('parol', { required: 'Password is required' })}
        className={`input-field ${errors.parol ? 'error' : ''}`}
        placeholder="Password"
      />
      {errors.parol && <span className="error-message">{errors.parol.message}</span>}

      <button className="button" disabled={isSubmitting}>
        {isSubmitting ? 'Logging in...' : 'Login'}
      </button>
    </form>
  );
};

export default LoginForm;

