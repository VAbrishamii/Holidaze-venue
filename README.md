# 🌍 Holidaze — Accommodation Booking Platform

**Holidaze** is a modern, full-stack web application that allows customers to search and book holiday venues, and enables venue managers to create and manage their listings.

Built with the latest technologies including **Next.js 13+ (App Router)**, **TypeScript**, **Tailwind CSS**, **React Query**, and **Zod**, it provides a seamless, responsive, and accessible user experience.

---

## 🚀 Features

| User Role         | Feature                                                                 |
|------------------|-------------------------------------------------------------------------|
| **All Users**    | 🔎 Browse all venues with image galleries and ratings                   |
|                  | 🌍 Search by location, date range, and number of guests                 |
|                  | 📅 View venue availability on calendar                                  |
|                  | 🆕 Register with a `stud.noroff.no` email address                       |                  |
| **Customers**    | 🔐 Log in / Log out                                                     |
|                  | 🧾 Book venues with live price calculation                              |
|                  | 🗓️ View and manage upcoming bookings                                    |
|                  | 🖼️ Update profile picture (avatar)                                     |
| **Venue Managers** | 🔐 Log in / Log out                                                  |
|                  | 🏨 Create, edit, and delete venues                                      |
|                  | 📷 Upload venue banners and image galleries                             |
|                  | 📆 View bookings made to owned venues                                   |
|                  | 🖼️ Update profile avatar                                               |

---
## 🧰 Tech Stack

| Tool                      | Description                                   |
| ------------------------- | --------------------------------------------- |
| **Next.js 13+**           | App Router, SSR, file-based routing           |
| **TypeScript**            | Type safety across components and APIs        |
| **Tailwind CSS**          | Utility-first responsive styling              |
| **React Hook Form + Zod** | Form validation and schema enforcement        |
| **React Query**           | Data fetching, caching, and mutation handling |
| **Cloudinary**            | Image uploading and CDN delivery              |
| **React Hot Toast**       | Feedback notifications                        |
| **ESLint + Prettier**     | Code quality and formatting                   |

---

## 🛠 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/holidaze.git
   cd holidaze
   ```
2.**Install dependencies**
   ```bash
   npm install
   ```
3. **Create `.env.local` file**
   ```env
   NEXT_PUBLIC_API_BASE=https://v2.api.noroff.dev
   NEXT_PUBLIC_API_KEY='947683bf-e4cb-414e-b5f9-f0f2747a8d76'




