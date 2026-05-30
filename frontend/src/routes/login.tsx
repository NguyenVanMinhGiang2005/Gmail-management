import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Mail, Lock } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/login")({
  component: LoginPage,
});

async function loginAdmin(email: string, password: string) {
  const response = await fetch(
    "/auth/login",
    {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if (!response.ok) {
    throw new Error("Đăng nhập thất bại");
  }

  return response.json();
}

function LoginPage() {
  const navigate = useNavigate();
  const [error, setError] = useState("");

  async function handleSubmit(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    try {
      await loginAdmin(email, password);

      navigate({
        to: "/",
      });
    } catch {
      setError("Email hoặc mật khẩu không đúng");
    }
  }

  return (
    <div className="min-h-screen bg-black text-white flex">

      {/* LEFT SIDE */}
      <div className="hidden lg:flex w-1/2 relative items-center justify-center border-r border-white/10 bg-linear-to-br from-black via-zinc-900 to-black">

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.08),transparent_40%)]" />

        <div className="relative z-10 text-center px-10">
          <img
            src="/logo-no-bg.svg"
            alt="Logo"
            className="w-36 mx-auto mb-8 drop-shadow-2xl"
          />

          <h1 className="text-5xl font-bold tracking-tight leading-tight">
            Email
            <span className="text-zinc-400"> Management</span>
          </h1>

          <p className="mt-6 text-zinc-500 text-lg leading-relaxed">
            Hệ thống quản lý email chuyên nghiệp,
            bảo mật và tối ưu cho doanh nghiệp.
          </p>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="flex-1 flex items-center justify-center px-6">

        <div className="w-full max-w-md">

          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl">

            <div className="text-center mb-8">
              <img
                src="/logo-nbg.svg"
                alt="Logo"
                className="w-20 mx-auto mb-4 lg:hidden"
              />

              <h2 className="text-3xl font-bold">
                Đăng nhập
              </h2>

              <p className="text-zinc-400 mt-2">
                Chào mừng quay trở lại
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">

              {/* EMAIL */}
              <div>
                <label className="text-sm text-zinc-300 mb-2 block">
                  Email
                </label>

                <div className="flex items-center bg-black/40 border border-white/10 rounded-xl px-4 h-14 focus-within:border-white transition">
                  <Mail className="w-5 h-5 text-zinc-500" />

                  <input
                    name="email"
                    type="email"
                    required
                    placeholder="user@email4u.com"
                    className="bg-transparent outline-none flex-1 ml-3 text-white placeholder:text-zinc-600"
                  />
                </div>
              </div>

              {/* PASSWORD */}
              <div>
                <label className="text-sm text-zinc-300 mb-2 block">
                  Mật khẩu
                </label>

                <div className="flex items-center bg-black/40 border border-white/10 rounded-xl px-4 h-14 focus-within:border-white transition">
                  <Lock className="w-5 h-5 text-zinc-500" />

                  <input
                    name="password"
                    type="password"
                    required
                    placeholder="••••••••"
                    className="bg-transparent outline-none flex-1 ml-3 text-white placeholder:text-zinc-600"
                  />
                </div>
              </div>

              {/* ERROR */}
              {error && (
                <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-sm rounded-xl p-4">
                  {error}
                </div>
              )}

              {/* BUTTON */}
              <button
                type="submit"
                className="w-full h-14 rounded-xl bg-white text-black font-semibold hover:bg-zinc-300 transition-all duration-300"
              >
                Đăng nhập
              </button>

            </form>

            <div className="mt-6 text-center text-zinc-500 text-sm">
              Chưa có tài khoản?{" "}
              <Link
                to="/"
                className="text-white hover:underline"
              >
                Đăng ký
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}