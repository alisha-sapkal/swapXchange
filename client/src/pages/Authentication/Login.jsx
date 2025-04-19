import React, { useState } from 'react';
import signUp from '../../assets/signUp.png';
import signUpBG from '../../assets/signUpBG.png';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

export default function LoginSignup() {
  const [isLogin, setIsLogin] = useState(true);

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
          <form>
            {!isLogin && (
              <div className="mb-4">
                <Label htmlFor="fullname">Full Name</Label>
                <Input type="text" id="fullname" placeholder="Full Name" />
              </div>
            )}
            <div className="mb-4">
              <Label htmlFor="username">User Name</Label>
              <Input type="text" id="username" placeholder="User Name" />
            </div>
            <div className="mb-4">
              <Label htmlFor="password">Password</Label>
              <Input type="password" id="password" placeholder="Password" />
            </div>
            {!isLogin && (
              <div className="mb-4">
                <Label htmlFor="confirm-password">Confirm Password</Label>
                <Input type="password" id="confirm-password" placeholder="Confirm Password" />
              </div>
            )}
            {isLogin && (
              <div className="flex justify-between items-center mb-4">
                <Label className="flex items-center gap-2 text-sm">
                  <Checkbox id="remember" /> Remember Me
                </Label>
                <a href="#" className="text-blue-700 text-sm hover:underline">Forgot Password?</a>
              </div>
            )}
            <Button type="submit" className="w-full">
              {isLogin ? 'Login' : 'Sign Up'}
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
}
