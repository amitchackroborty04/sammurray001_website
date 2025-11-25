// // "use client";

// // import React, { useState, useEffect, ChangeEvent } from "react";
// // import { Edit } from "lucide-react";
// // import { useQuery, useMutation } from "@tanstack/react-query";
// // import { useSession } from "next-auth/react";
// // import { toast } from "sonner";

// // interface ApiResponse {
// //   statusCode: number;
// //   success: boolean;
// //   message: string;
// //   data: {
// //     _id: string;
// //     fullName: string;
// //     email: string;
// //     phone: string;
// //     bio: string;
// //   };
// // }

// // interface UpdatePayload {
// //   fullName: string;
// //   email: string;
// //   phone: string;
// //   bio: string;
// // }

// // function ProfilePage() {
// //   const { data: session } = useSession();
// //   const TOKEN = session?.user?.accessToken;

// //   // ===================== FORM STATE ========================
// //   const [formData, setFormData] = useState<UpdatePayload>({
// //     fullName: "",
// //     email: "",
// //     phone: "",
// //     bio: "",
// //   });

// //   // ===================== GET USER DATA ========================
// //   const { data: userData, isLoading } = useQuery<ApiResponse>({
// //     queryKey: ["user-data"],
// //     queryFn: async () => {
// //       const res = await fetch(
// //         `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/user/profile`,
// //         {
// //           method: "GET",
// //           headers: {
// //             "Content-Type": "application/json",
// //             Authorization: `Bearer ${TOKEN}`,
// //           },
// //         }
// //       );
// //       if (!res.ok) throw new Error("Failed to fetch user profile");
// //       return res.json();
// //     },
// //     enabled: !!TOKEN,
// //   });
// //   console.log(userData, "userData");

// //   // ===================== PREFILL FORM ========================
// //   // useEffect(() => {
// //   //   if (userData?.data) {
// //   //     setFormData({
// //   //       fullName: userData.data.fullName || "",
// //   //       email: userData.data.email || "",
// //   //       phone: userData.data.phone || "",
// //   //       bio: userData.data.bio || "",
// //   //     });
// //   //   }
// //   // }, [userData]);
// //   useEffect(() => {
// //   if (userData?.data?.result) {
// //     setFormData({
// //       fullName: userData.data.result.fullName || "",
// //       email: userData.data.result.email || "",
// //       phone: userData.data.result.phone || "",
// //       bio: userData.data.result.bio || "",
// //     });
// //   }
// // }, [userData]);


// //   // ===================== UPDATE MUTATION ========================
// //   const updateMutation = useMutation({
// //     mutationFn: async (bodyData: UpdatePayload) => {
// //       const res = await fetch(
// //         `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/user/profile`,
// //         {
// //           method: "PUT",
// //           headers: {
// //             "Content-Type": "application/json",
// //             Authorization: `Bearer ${TOKEN}`,
// //           },
// //           body: JSON.stringify(bodyData),
// //         }
// //       );
// //       if (!res.ok) throw new Error("Failed to update profile");
// //       return res.json();
// //     },
// //     onSuccess: (res) => {
// //       toast.success("Profile updated successfully!");
// //       // Update form with returned data
// //       setFormData({
// //         fullName: res.data.fullName,
// //         email: res.data.email,
// //         phone: res.data.phone,
// //         bio: res.data.bio,
// //       });
// //     },
// //     onError: () => {
// //       toast.error("Something went wrong. Try again!");
// //     },
// //   });

// //   // ===================== INPUT HANDLER ========================
// //   const handleChange = (
// //     e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
// //   ) => {
// //     setFormData((prev) => ({
// //       ...prev,
// //       [e.target.name]: e.target.value,
// //     }));
// //   };

// //   // ===================== FORM SUBMIT ========================
// //   const handleSubmit = (e: React.FormEvent) => {
// //     e.preventDefault();
// //     updateMutation.mutate(formData);
// //   };

// //   if (isLoading) return <p>Loading...</p>;

// //   return (
// //     <div className="min-h-screen text-white">
// //       <div className="max-w-4xl mx-auto">
// //         {/* Personal Information Card */}
// //         <div className="rounded-2xl p-8 border border-slate-700">
// //           {/* Card Header */}
// //           <div className="flex items-center justify-between mb-8">
// //             <h2 className="text-2xl font-bold">Personal Information</h2>
// //             <button
// //               onClick={handleSubmit}
// //               className="flex items-center gap-2 bg-cyan-500 hover:bg-cyan-600 text-white px-4 py-2 rounded-lg transition-colors"
// //             >
// //               <Edit className="w-4 h-4" />
// //               <span className="font-medium">Edit</span>
// //             </button>
// //           </div>

// //           {/* Form */}
// //           <form className="space-y-6">
// //             {/* Full Name */}
// //             <div>
// //               <label className="block text-sm font-medium mb-2 text-slate-300">
// //                 Full Name
// //               </label>
// //               <input
// //                 type="text"
// //                 name="fullName"
// //                 value={formData.fullName}
// //                 onChange={handleChange}
// //                 className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
// //               />
// //             </div>

// //             {/* Email */}
// //             <div>
// //               <label className="block text-sm font-medium mb-2 text-slate-300">
// //                 Email Address
// //               </label>
// //               <input
// //                 type="email"
// //                 disabled
// //                 readOnly
// //                 name="email"
// //                 value={formData.email}
// //                 onChange={handleChange}
// //                 className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
// //               />
// //             </div>

// //             {/* Phone */}
// //             <div>
// //               <label className="block text-sm font-medium mb-2 text-slate-300">
// //                 Phone
// //               </label>
// //               <input
// //                 type="tel"
// //                 name="phone"
// //                 value={formData.phone}
// //                 onChange={handleChange}
// //                 className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
// //               />
// //             </div>

// //             {/* Bio */}
// //             <div>
// //               <label className="block text-sm font-medium mb-2 text-slate-300">
// //                 Bio
// //               </label>
// //               <textarea
// //                 name="bio"
// //                 value={formData.bio}
// //                 onChange={handleChange}
// //                 rows={3}
// //                 className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent resize-none"
// //               />
// //             </div>
// //           </form>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }

// // export default ProfilePage;


// "use client";

// import React, { useState, useEffect, ChangeEvent } from "react";
// import { Edit } from "lucide-react";
// import { useQuery, useMutation } from "@tanstack/react-query";
// import { useSession } from "next-auth/react";
// import { toast } from "sonner";

// interface UserResult {
//   _id: string;
//   fullName: string;
//   email: string;
//   phone: string;
//   bio: string;
//   role: string;
//   profileImage?: string;
//   location?: string;
//   verified?: boolean;
//   isSubscription?: boolean;
//   [key: string]: any; // to allow other optional fields
// }

// interface Supplier {
//   _id: string;
//   agentId: string[];
//   supplierId: UserResult;
//   [key: string]: any;
// }

// interface ApiResponse {
//   statusCode: number;
//   success: boolean;
//   message: string;
//   data: {
//     result: UserResult;
//     supplier: Supplier[];
//   };
// }

// interface UpdatePayload {
//   fullName: string;
//   email: string;
//   phone: string;
//   bio: string;
// }

// function ProfilePage() {
//   const { data: session } = useSession();
//   const TOKEN = session?.user?.accessToken;

//   // ===================== FORM STATE ========================
//   const [formData, setFormData] = useState<UpdatePayload>({
//     fullName: "",
//     email: "",
//     phone: "",
//     bio: "",
//   });

//   // ===================== GET USER DATA ========================
//   const { data: userData, isLoading } = useQuery<ApiResponse>({
//     queryKey: ["user-data"],
//     queryFn: async () => {
//       const res = await fetch(
//         `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/user/profile`,
//         {
//           method: "GET",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${TOKEN}`,
//           },
//         }
//       );
//       if (!res.ok) throw new Error("Failed to fetch user profile");
//       return res.json();
//     },
//     enabled: !!TOKEN,
//   });

//   // ===================== PREFILL FORM ========================
//   useEffect(() => {
//     if (userData?.data?.result) {
//       setFormData({
//         fullName: userData.data.result.fullName || "",
//         email: userData.data.result.email || "",
//         phone: userData.data.result.phone || "",
//         bio: userData.data.result.bio || "",
//       });
//     }
//   }, [userData]);

//   // ===================== UPDATE MUTATION ========================
//   const updateMutation = useMutation({
//     mutationFn: async (bodyData: UpdatePayload) => {
//       const res = await fetch(
//         `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/user/profile`,
//         {
//           method: "PUT",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${TOKEN}`,
//           },
//           body: JSON.stringify(bodyData),
//         }
//       );
//       if (!res.ok) throw new Error("Failed to update profile");
//       return res.json();
//     },
//     onSuccess: (res: { data: UserResult }) => {
//       toast.success("Profile updated successfully!");
//       setFormData({
//         fullName: res.data.fullName,
//         email: res.data.email,
//         phone: res.data.phone,
//         bio: res.data.bio,
//       });
//     },
//     onError: () => {
//       toast.error("Something went wrong. Try again!");
//     },
//   });

//   // ===================== INPUT HANDLER ========================
//   const handleChange = (
//     e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
//   ) => {
//     setFormData((prev) => ({
//       ...prev,
//       [e.target.name]: e.target.value,
//     }));
//   };

//   // ===================== FORM SUBMIT ========================
//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     updateMutation.mutate(formData);
//   };

//   if (isLoading) return <p>Loading...</p>;

//   return (
//     <div className="min-h-screen text-white">
//       <div className="max-w-4xl mx-auto">
//         {/* Personal Information Card */}
//         <div className="rounded-2xl p-8 border border-slate-700">
//           {/* Card Header */}
//           <div className="flex items-center justify-between mb-8">
//             <h2 className="text-2xl font-bold">Personal Information</h2>
//             <button
//               onClick={handleSubmit}
//               className="flex items-center gap-2 bg-cyan-500 hover:bg-cyan-600 text-white px-4 py-2 rounded-lg transition-colors"
//             >
//               <Edit className="w-4 h-4" />
//               <span className="font-medium">Edit</span>
//             </button>
//           </div>

//           {/* Form */}
//           <form className="space-y-6">
//             {/* Full Name */}
//             <div>
//               <label className="block text-sm font-medium mb-2 text-slate-300">
//                 Full Name
//               </label>
//               <input
//                 type="text"
//                 name="fullName"
//                 value={formData.fullName}
//                 onChange={handleChange}
//                 className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
//               />
//             </div>

//             {/* Email */}
//             <div>
//               <label className="block text-sm font-medium mb-2 text-slate-300">
//                 Email Address
//               </label>
//               <input
//                 type="email"
//                 disabled
//                 readOnly
//                 name="email"
//                 value={formData.email}
//                 className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
//               />
//             </div>

//             {/* Phone */}
//             <div>
//               <label className="block text-sm font-medium mb-2 text-slate-300">
//                 Phone
//               </label>
//               <input
//                 type="tel"
//                 name="phone"
//                 value={formData.phone}
//                 onChange={handleChange}
//                 className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
//               />
//             </div>

//             {/* Bio */}
//             <div>
//               <label className="block text-sm font-medium mb-2 text-slate-300">
//                 Bio
//               </label>
//               <textarea
//                 name="bio"
//                 value={formData.bio}
//                 onChange={handleChange}
//                 rows={3}
//                 className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent resize-none"
//               />
//             </div>
//           </form>
//         </div>

        
//       </div>
//     </div>
//   );
// }

// export default ProfilePage;


"use client";

import React, { useState, useEffect, ChangeEvent } from "react";
import { Edit } from "lucide-react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { toast } from "sonner";

interface UserResult {
  _id: string;
  fullName: string;
  email: string;
  phone: string;
  bio: string;
  role: string;
  profileImage?: string;
  location?: string;
  verified?: boolean;
  isSubscription?: boolean;
  [key: string]: any; 
}

interface Supplier {
  _id: string;
  agentId: string[];
  supplierId: UserResult;
  [key: string]: any;
}

interface ApiResponse {
  statusCode: number;
  success: boolean;
  message: string;
  data: {
    result?: UserResult;
    supplier?: Supplier[];
    [key: string]: any; 
  };
}

interface UpdatePayload {
  fullName: string;
  email: string;
  phone: string;
  bio: string;
}

function ProfilePage() {
  const { data: session } = useSession();
  const TOKEN = session?.user?.accessToken;

  const [formData, setFormData] = useState<UpdatePayload>({
    fullName: "",
    email: "",
    phone: "",
    bio: "",
  });

  // ===================== GET USER DATA ========================
  const { data: userData, isLoading } = useQuery<ApiResponse>({
    queryKey: ["user-data"],
    queryFn: async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/user/profile`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${TOKEN}`,
          },
        }
      );
      if (!res.ok) throw new Error("Failed to fetch user profile");
      return res.json();
    },
    enabled: !!TOKEN,
  });

  // ===================== PREFILL FORM ========================
  useEffect(() => {
    if (userData?.data) {
      const user = userData.data.result || userData.data; // result thakle oikhane, na thakle direct data
      setFormData({
        fullName: user.fullName || "",
        email: user.email || "",
        phone: user.phone || "",
        bio: user.bio || "",
      });
    }
  }, [userData]);

  // ===================== UPDATE MUTATION ========================
  const updateMutation = useMutation({
    mutationFn: async (bodyData: UpdatePayload) => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/user/profile`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${TOKEN}`,
          },
          body: JSON.stringify(bodyData),
        }
      );
      if (!res.ok) throw new Error("Failed to update profile");
      return res.json();
    },
    onSuccess: (res: { data: UserResult }) => {
      toast.success("Profile updated successfully!");
      setFormData({
        fullName: res.data.fullName,
        email: res.data.email,
        phone: res.data.phone,
        bio: res.data.bio,
      });
    },
    onError: () => {
      toast.error("Something went wrong. Try again!");
    },
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateMutation.mutate(formData);
  };

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="min-h-screen text-white">
      <div className="max-w-4xl mx-auto">
        {/* Personal Information Card */}
        <div className="rounded-2xl p-8 border border-slate-700">
          {/* Card Header */}
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold">Personal Information</h2>
            <button
              onClick={handleSubmit}
              className="flex items-center gap-2 bg-cyan-500 hover:bg-cyan-600 text-white px-4 py-2 rounded-lg transition-colors"
            >
              <Edit className="w-4 h-4" />
              <span className="font-medium">Edit</span>
            </button>
          </div>

          {/* Form */}
          <form className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2 text-slate-300">
                Full Name
              </label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 text-slate-300">
                Email Address
              </label>
              <input
                type="email"
                disabled
                readOnly
                name="email"
                value={formData.email}
                className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 text-slate-300">
                Phone
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 text-slate-300">
                Bio
              </label>
              <textarea
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                rows={3}
                className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent resize-none"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
