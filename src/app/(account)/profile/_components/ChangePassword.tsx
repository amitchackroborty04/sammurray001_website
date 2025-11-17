"use client";

import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

interface Passwords {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

interface ShowPassword {
  current: boolean;
  new: boolean;
  confirm: boolean;
}

const ChangePassword: React.FC = () => {
  const [passwords, setPasswords] = useState<Passwords>({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState<ShowPassword>({
    current: false,
    new: false,
    confirm: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswords((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const togglePasswordVisibility = (field: keyof ShowPassword) => {
    setShowPassword((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const handleSubmit = () => {
    console.log("Password change submitted:", passwords);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white p-8">
      <div className="max-w-2xl mx-auto">
        {/* Card */}
        <div className="bg-slate-800/50 rounded-2xl p-8 backdrop-blur-sm border border-slate-700">
          {/* Header */}
          <h2 className="text-3xl font-bold mb-8">Change Password</h2>

          {/* Form Fields */}
          <div className="space-y-6">
            {/* Current Password */}
            <div>
              <label className="block text-sm font-medium mb-2 text-slate-300">
                Current Password
              </label>
              <div className="relative">
                <input
                  type={showPassword.current ? "text" : "password"}
                  name="currentPassword"
                  value={passwords.currentPassword}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-3 pr-12 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent placeholder:text-slate-500"
                />
                <button
                  type="button"
                  onClick={() => togglePasswordVisibility("current")}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white transition-colors"
                >
                  {showPassword.current ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            {/* New Password and Confirm Password */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* New Password */}
              <div>
                <label className="block text-sm font-medium mb-2 text-slate-300">
                  New Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword.new ? "text" : "password"}
                    name="newPassword"
                    value={passwords.newPassword}
                    onChange={handleChange}
                    placeholder="••••••••"
                    className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-3 pr-12 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent placeholder:text-slate-500"
                  />
                  <button
                    type="button"
                    onClick={() => togglePasswordVisibility("new")}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white transition-colors"
                  >
                    {showPassword.new ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>

              {/* Confirm New Password */}
              <div>
                <label className="block text-sm font-medium mb-2 text-slate-300">
                  Confirm New Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword.confirm ? "text" : "password"}
                    name="confirmPassword"
                    value={passwords.confirmPassword}
                    onChange={handleChange}
                    placeholder="••••••••"
                    className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-3 pr-12 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent placeholder:text-slate-500"
                  />
                  <button
                    type="button"
                    onClick={() => togglePasswordVisibility("confirm")}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white transition-colors"
                  >
                    {showPassword.confirm ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <button
                onClick={handleSubmit}
                className="bg-cyan-500 hover:bg-cyan-600 text-white font-medium px-6 py-3 rounded-lg transition-colors"
              >
                Update Password
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
