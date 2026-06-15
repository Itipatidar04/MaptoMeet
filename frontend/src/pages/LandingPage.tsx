import { useState } from "react";
import { Button } from "@/components/ui/button";
import { MapPin } from "lucide-react";
import { SignUpDialog } from "@/components/SignUpDialog";
import { LoginDialog } from "@/components/auth/LoginDialog";
import { toast } from "sonner";
//useNavigate is a React Router hook that allows us to change pages programmatically from code.
import { useNavigate } from "react-router-dom";

function LandingPage() {
  const [isSignUpOpen, setIsSignUpOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  const navigate = useNavigate();

  const handleSignUpSubmit = async (data: {
    name: string;
    email: string;
    password: string;
  }) => {
    try {
      //send signup data to FastApi backend
      const response = await fetch("http://localhost:8000/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        //convert JS object ito Json string
        body: JSON.stringify(data),
      });

      //convert backend response into JS object
      const result = await response.json();

      if (response.ok) {
        toast.success("Account created successfully!");
        setIsSignUpOpen(false);
      } else {
        toast.error(result.detail || "Registration failed");
      }
      //view response in browser console
      console.log("Backend Response:", result);
    } catch (error) {
      //handle network or server errors
      console.error("Signup Error:", error);
    }
  };

  const handleLoginSubmit = async (data: {
    email: string;
    password: string;
  }) => {
    try {
      //sends login request to backend
      const response = await fetch("http://localhost:8000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        //covert js objectinto JSON
        body: JSON.stringify(data),
      });

      //convert backend response into JS object
      const result = await response.json();

      if (response.ok) {
        // Save JWT token
        localStorage.setItem("access_token", result.access_token);

        toast.success("Login successful!");
        setIsLoginOpen(false);

        //Go to map page
        navigate("/app");
      } else {
        toast.error(result.detail || "Login failed");
      }

      console.log(result);
    } catch (error) {
      //runs if request fails
      toast.error("Something went wrong");
      console.error("Login Error:", error);
    }
  };

  return (
    <div className="dark relative flex min-h-screen flex-col overflow-hidden bg-background font-sans text-foreground antialiased selection:bg-primary/30">
      {/* Background Decorative Gradients */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/10 via-background to-background" />
      <div className="absolute top-1/4 left-1/4 -z-10 h-80 w-80 rounded-full bg-primary/10 blur-[120px] animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 -z-10 h-80 w-80 rounded-full bg-indigo-500/5 blur-[120px]" />

      {/* Grid Pattern */}
      <div className="absolute inset-0 -z-10 opacity-[0.03] bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:24px_24px]" />

      {/* Header */}
      <header className="flex items-center justify-between px-6 py-5 sm:px-10 z-10">
        <div className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary shadow-[0_0_15px_rgba(59,130,246,0.2)] border border-primary/20">
            <MapPin className="h-5 w-5" />
          </div>
          <span className="text-xl font-bold tracking-tight text-foreground bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text">
            MapToMeet
          </span>
        </div>
      </header>

      {/* Main Hero Container */}
      <main className="grid flex-1 items-center gap-12 px-6 py-12 sm:px-10 lg:grid-cols-2 lg:py-20 max-w-7xl mx-auto w-full z-10">
        {/* Left Column (Content) */}
        <div className="flex flex-col items-start text-left space-y-6 lg:max-w-lg">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-xs font-medium text-primary shadow-[0_0_15px_rgba(59,130,246,0.1)]">
            <span className="flex h-1.5 w-1.5 rounded-full bg-primary" />✨
            Smart Midpoint Planner
          </div>

          <h1 className="text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl lg:text-6xl leading-[1.1]">
            Find the perfect place to{" "}
            <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-500 bg-clip-text text-transparent">
              meet
            </span>
          </h1>

          <p className="text-base text-muted-foreground sm:text-lg leading-relaxed">
            Coordinate routes, discover optimal midpoints, and meet up smarter.
            MapToMeet calculates travel times to find the absolute best spot for
            everyone.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-4 w-full sm:w-auto">
            <Button
              type="button"
              onClick={() => setIsLoginOpen(true)}
              className="w-full sm:w-37.5 h-12 rounded-xl border-border bg-background hover:bg-surface/50 text-foreground transition-all duration-200"
            >
              Log in
            </Button>
            <Button
              type="button"
              //used to open sign up page
              onClick={() => setIsSignUpOpen(true)}
              className="w-full sm:w-37.5 h-12 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground font-semibold transition-all duration-200 shadow-[0_0_20px_rgba(59,130,246,0.3)] hover:shadow-[0_0_25px_rgba(59,130,246,0.4)]"
            >
              Sign up
            </Button>
          </div>
        </div>

        {/* Right Column (3D Spline Canvas) */}
        <div className="relative hidden lg:flex items-center justify-center h-125 w-full rounded-2xl border border-border/30 bg-surface/20 backdrop-blur-[4px] overflow-hidden shadow-panel">
          {/* Subtle Ambient glow behind spline */}
          <div className="absolute inset-0 bg-radial-gradient from-indigo-500/10 via-transparent to-transparent -z-10" />

          <div className="absolute inset-0">
            {/*here i have embeeded code to change 3-d image from spline */}
            <iframe
              src="https://my.spline.design/cascadeinteractivemap-2PMqKFWhqr4Hb7fozWy83ikn/"
              frameBorder="0"
              width="100%"
              height="100%"
            ></iframe>
          </div>
        </div>
      </main>

      <SignUpDialog
        open={isSignUpOpen}
        onOpenChange={setIsSignUpOpen}
        onSubmit={handleSignUpSubmit}
      />
      <LoginDialog
        open={isLoginOpen}
        onOpenChange={setIsLoginOpen}
        onSubmit={handleLoginSubmit}
      />
    </div>
  );
}

export default LandingPage;
