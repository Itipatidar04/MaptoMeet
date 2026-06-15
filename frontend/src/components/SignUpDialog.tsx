import React, { useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { User, Mail, Lock, Eye, EyeOff } from "lucide-react";

type SignUpDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: { name: string; email: string; password: string }) => void;
};

export function SignUpDialog({
  open,
  onOpenChange,
  onSubmit,
}: SignUpDialogProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    //reset previous errors
    setNameError("");
    setEmailError("");
    setPasswordError("");

    let isValid = true;

    // Name validation
    if (name.trim().length < 3) {
      setNameError("Name must be at least 3 characters");
      isValid = false;
    }

    // Email validation
    if (!email.includes("@")) {
      setEmailError("Enter a valid email");
      isValid = false;
    }

    // Password validation
    if (password.length < 8) {
      setPasswordError("Password must be at least 8 characters");
      isValid = false;
    }

    if (!isValid) return;
    // send data to LandingPage
    onSubmit({
      name,
      email,
      password,
    });
    // clear fields after submit
    setName("");
    setEmail("");
    setPassword("");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="dark sm:max-w-105 border-border bg-card text-foreground p-6 rounded-2xl shadow-panel">
        <DialogHeader className="space-y-2 text-left">
          <DialogTitle className="text-2xl font-bold tracking-tight text-text-primary">
            Create an account
          </DialogTitle>
          <DialogDescription className="text-text-secondary text-sm">
            Enter your details below to get started with MapToMeet.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 mt-4 text-left">
          <div className="space-y-2">
            <label
              className="text-xs font-medium text-text-secondary"
              htmlFor="signup-name"
            >
              Full Name
            </label>
            <div className="relative">
              <User className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-text-secondary" />
              <Input
                id="signup-name"
                type="text"
                placeholder="John Doe"
                required
                className="pl-10 h-11 border-border bg-surface placeholder:text-text-secondary text-text-primary focus-visible:ring-1 focus-visible:ring-primary focus-visible:ring-offset-0 rounded-xl"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            {nameError && <p className="text-sm text-red-500">{nameError}</p>}
          </div>

          <div className="space-y-2">
            <label
              className="text-xs font-medium text-text-secondary"
              htmlFor="signup-email"
            >
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-text-secondary" />
              <Input
                id="signup-email"
                type="email"
                placeholder="name@example.com"
                required
                className="pl-10 h-11 border-border bg-surface placeholder:text-text-secondary text-text-primary focus-visible:ring-1 focus-visible:ring-primary focus-visible:ring-offset-0 rounded-xl"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            {emailError && <p className="text-sm text-red-500">{emailError}</p>}
          </div>

          <div className="space-y-2">
            <label
              className="text-xs font-medium text-text-secondary"
              htmlFor="signup-password"
            >
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-text-secondary" />
              <Input
                id="signup-password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                required
                className="pl-10 pr-10 h-11 border-border bg-surface placeholder:text-text-secondary text-text-primary focus-visible:ring-1 focus-visible:ring-primary focus-visible:ring-offset-0 rounded-xl"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {passwordError && (
                <p className="text-sm text-red-500">{passwordError}</p>
              )}
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-text-secondary hover:text-text-primary"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            </div>
          </div>

          <Button
            type="submit"
            className="w-full h-11 mt-6 rounded-xl bg-primary hover:bg-primary/95 text-primary-foreground font-semibold transition-all shadow-[0_0_15px_rgba(59,130,246,0.2)]"
          >
            Sign up
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
