![Banner](https://github.com/user-attachments/assets/13228ed4-b9e5-4462-8a9f-f67c591f10eb)

<h2 align="center"><b>SEA Catering: Healthy Meals, Anytime, Anywhere</b></h2>

<p align="center">Sea Catering is a personalized meal subscription service built with <b>Next.js 15</b>, <b>Prisma ORM</b>, <b>PostgreSQL</b>, and <b>NextAuth v5</b>. It allows users to browse meal plans, customize subscriptions, and securely manage their account.</p>

---

<p align="center"><b>Visit Our Website:</b></p>
<a href="https://sea-catering-hn.vercel.app/" align="center">

![Button](https://github.com/user-attachments/assets/1c54fd7a-aa40-4597-9336-28a486c8e2cb)
  
</a>

---

## ❗ Problem

SEA Catering has recently gained a lot of attention for providing customizable healthy meals that can be delivered to cities across Indonesia. What started as a small business has now gone viral, leading to a huge increase in orders from customers all over the country.

Managing this growth manually has led to inefficiencies, increased errors in orders, and a lack of personalization in meal selection and delivery logistics. Customers also lack a clear way to track or update their subscriptions.

## ✨ Solution

To address this, SEA Catering is investing in a modern web platform. This app streamlines the ordering process, allows customers to customize their meals, see detailed nutritional information, and manage their subscriptions seamlessly. It also enables better backend management for scaling operations and handling more users.

This project helps SEA Catering meet demand and makes eating healthy more accessible to everyone in Indonesia.


---

## 🚀 Features

* 🌱 User registration with secure password hashing using bcrypt
* 🔐 Authentication with NextAuth (credentials-based)
* 📦 Meal plan selection with detailed modal views
* 🍽️ Subscription with customizable delivery days and allergy preferences
* 🧾 Testimonials section with user feedback
* 🧑‍💼 Admin-ready structure (with role-based access control)

---

## 🧠 Tech Stack

* **Frontend**: Next.js 15 (App Router)
* **Database**: PostgreSQL (hosted on Supabase)
* **ORM**: Prisma
* **Authentication**: NextAuth.js v5 (JWT strategy)
* **Validation**: Zod
* **Styling**: Tailwind CSS
* **Deployment**: Vercel

---

## 📦 Installation

1. **Clone the repository**

```bash
git clone https://github.com/your-username/sea-catering.git
cd sea-catering
```

2. **Install dependencies**

```bash
npm install
```

3. **Setup environment variables** Create a `.env` file and fill in:

```env
DATABASE_URL=your_supabase_pooler_connection_url  # Use the pooled connection
AUTH_SECRET=your_nextauth_secret
NEXTAUTH_URL=http://localhost:3000
```

4. **Generate Prisma client**

```bash
npx prisma generate
```

5. **Run database migrations (optional if you already pushed)**

```bash
npx prisma db push
```

6. **Seed the database with sample data**

```bash
npx prisma db seed
```

7. **Start the dev server**

```bash
npm run dev
```

---

## 📄 License

This project is for academic/non-commercial purposes only. All rights reserved by the creator.

---

## 🙋‍♂️ Author

Hans William Christianto Wijaya
