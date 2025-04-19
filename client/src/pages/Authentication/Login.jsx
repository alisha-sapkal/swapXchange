import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import signUp from '../../assets/signUp.png';
import signUpBG from '../../assets/signUpBG.png';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";

const LoginSignup = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullname: '',
    username: '',
    password: '',
    confirmPassword: '',
    rememberMe: false
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('http://localhost:3000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: formData.username,
          password: formData.password
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Login failed');
      }

      localStorage.setItem('token', data.token);
      if (formData.rememberMe) {
        localStorage.setItem('username', formData.username);
      }
      
      toast.success('Login successful!');
      navigate('/home');
    } catch (error) {
      toast.error(error.message || 'An error occurred during login');
    } finally {
      setLoading(false);
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('http://localhost:3000/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.fullname,
          username: formData.username,
          password: formData.password
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Signup failed');
      }

      toast.success('Account created successfully!');
      setIsLogin(true);
    } catch (error) {
      toast.error(error.message || 'An error occurred during signup');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen">
      <div className="w-1/2 bg-blue-900 text-white flex flex-col justify-center items-center p-10">
        <h2 className="text-3xl font-bold mb-4 text-center">Secure, Seamless Ticket Transfers</h2>
        <p className="text-center max-w-md">
          Effortlessly manage and transfer tickets — from physical goods to digital vouchers, event passes, in-game items, and more. Built for resellers, freelancers, and enthusiasts, our platform ensures every transaction is fast, safe, and verifiable.
        </p>
        <img src={signUp} alt="Support" className="w-3/4 mt-10" />
      </div>

      <div className="w-1/2 flex items-center justify-center bg-cover bg-center" style={{ backgroundImage: `url(${signUpBG})` }}>
        <div className="w-full max-w-md p-8 shadow-xl rounded-xl bg-white bg-opacity-90">
          <h3 className="text-2xl font-semibold mb-6">
            {isLogin ? 'Welcome Back' : 'Create an Account'}
          </h3>
          <form onSubmit={isLogin ? handleLogin : handleSignup}>
            {!isLogin && (
              <div className="mb-4">
                <Label htmlFor="fullname">Full Name</Label>
                <Input
                  type="text"
                  id="fullname"
                  name="fullname"
                  placeholder="Full Name"
                  value={formData.fullname}
                  onChange={handleChange}
                  required
                />
              </div>
            )}
            <div className="mb-4">
              <Label htmlFor="username">User Name</Label>
              <Input
                type="text"
                id="username"
                name="username"
                placeholder="User Name"
                value={formData.username}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-4">
              <Label htmlFor="password">Password</Label>
              <Input
                type="password"
                id="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
            {!isLogin && (
              <div className="mb-4">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                />
              </div>
            )}
            {isLogin && (
              <div className="flex justify-between items-center mb-4">
                <Label className="flex items-center gap-2 text-sm">
                  <Checkbox
                    id="remember"
                    name="rememberMe"
                    checked={formData.rememberMe}
                    onCheckedChange={(checked) => setFormData(prev => ({ ...prev, rememberMe: checked }))}
                  />
                  Remember Me
                </Label>
                <a href="#" className="text-blue-700 text-sm hover:underline">Forgot Password?</a>
              </div>
            )}
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Please wait
                </>
              ) : (
                isLogin ? 'Login' : 'Sign Up'
              )}
            </Button>
            <p className="text-sm text-center mt-4">
              {isLogin ? (
                <>
                  New user?{' '}
                  <button
                    type="button"
                    onClick={() => setIsLogin(false)}
                    className="text-blue-600 font-medium hover:underline"
                  >
                    Sign Up
                  </button>
                </>
              ) : (
                <>
                  Already have an account?{' '}
                  <button
                    type="button"
                    onClick={() => setIsLogin(true)}
                    className="text-blue-600 font-medium hover:underline"
                  >
                    Login
                  </button>
                </>
              )}
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginSignup;