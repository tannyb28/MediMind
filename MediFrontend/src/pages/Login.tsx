import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const loginSchema = z.object({
  username: z.string().min(1, "Required"),
  password: z.string().min(1, "Required"),
});
type LoginForm = z.infer<typeof loginSchema>;

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginForm) => {
    try {
      await login(data.username, data.password);
      navigate("/dashboard");
    } catch {
      alert("Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-purple-50 to-purple-100">
      <div className="w-full max-w-md bg-white/90 shadow-xl rounded-2xl p-8 border border-gray-200">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">Login</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div>
            <label className="block mb-1 text-gray-700 font-medium">Username</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                {/* Person Icon */}
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#64748b" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.5 20.25v-1.5A2.25 2.25 0 016.75 16.5h10.5a2.25 2.25 0 012.25 2.25v1.5" />
                </svg>
              </span>
              <input {...register("username")} className={`w-full border p-2 rounded pl-10 focus:outline-none focus:ring-2 focus:ring-blue-400 transition ${errors.username ? 'border-red-400' : 'border-gray-300'}`} placeholder="Enter your username" />
            </div>
            {errors.username && <p className="text-red-500 text-xs mt-1">{errors.username.message}</p>}
          </div>
          <div>
            <label className="block mb-1 text-gray-700 font-medium">Password</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                {/* Lock Icon */}
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#64748b" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V7.5a4.5 4.5 0 10-9 0v3m12 0A2.25 2.25 0 0119.5 12.75v6A2.25 2.25 0 0117.25 21H6.75A2.25 2.25 0 014.5 18.75v-6A2.25 2.25 0 016.75 10.5h10.5z" />
                </svg>
              </span>
              <input type="password" {...register("password")} className={`w-full border p-2 rounded pl-10 focus:outline-none focus:ring-2 focus:ring-blue-400 transition ${errors.password ? 'border-red-400' : 'border-gray-300'}`} placeholder="Enter your password" />
            </div>
            {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
          </div>
          <button type="submit" disabled={isSubmitting} className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-2 rounded-lg font-semibold shadow-md hover:from-blue-600 hover:to-purple-600 transition disabled:opacity-60">
            {isSubmitting ? "Logging in…" : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}