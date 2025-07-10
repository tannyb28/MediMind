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
    <div className="max-w-md mx-auto mt-10 p-6 border rounded">
      <h1 className="text-2xl mb-4">Login</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block mb-1">Username</label>
          <input {...register("username")} className="w-full border p-2 rounded" />
          {errors.username && <p className="text-red-500">{errors.username.message}</p>}
        </div>
        <div>
          <label className="block mb-1">Password</label>
          <input type="password" {...register("password")} className="w-full border p-2 rounded" />
          {errors.password && <p className="text-red-500">{errors.password.message}</p>}
        </div>
        <button type="submit" disabled={isSubmitting} className="w-full bg-blue-500 text-white px-4 py-2 rounded">
          {isSubmitting ? "Logging in…" : "Login"}
        </button>
      </form>
    </div>
  );
}