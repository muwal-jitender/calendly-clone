# Smart Event Scheduler

## Project Overview

**Smart Event Scheduler** is a modern, user-friendly scheduling application inspired by **Calendly**. It simplifies scheduling by allowing users to define their availability, create events, and share booking links with others. Designed with time zone intelligence and seamless calendar integration, it ensures effortless and error-free scheduling across the globe.

---

## Key Features

- **Event Management**:  
  Create and manage events with custom durations, descriptions, and settings.
- **Availability Scheduling**:  
  Define weekly availability slots (e.g., Mon-Fri, 9:00 AM–5:00 PM) and avoid conflicts with overlapping events.
- **Time Zone Flexibility**:  
  Automatic time zone detection for invitees with an option to manually select a preferred time zone.
- **Real-Time Booking**:  
  Share booking links with clients or colleagues, allowing them to book events within your defined availability.
- **Google Calendar Integration**:  
  Sync events directly to Google Calendar, ensuring all meetings are organized and accessible.
- **Responsive Design**:  
  Optimized for both desktop and mobile devices for a seamless user experience.

---

## How It Works

1. **Set Availability**: Define your weekly availability, specifying the days and times you’re free for meetings.
2. **Create Events**: Create personalized event types with custom durations (e.g., 30-minute meeting, interview).
3. **Share Booking Links**: Share event links via email or messaging platforms with clients or invitees.
4. **Book and Confirm**: Invitees book meetings based on your availability, with automatic time zone adjustments.
5. **Stay Organized**: Scheduled events are synced with your Google calendar, and both parties receive reminders.

---

## Tech Stack

- **Frontend**: React, Next.js, Tailwind CSS
- **Backend**: Powered by Next.js, utilizing API Routes and Server-Side Rendering (SSR) for efficient and seamless backend functionality.

- **Database**: Neon PostgreSQL, a cloud-native PostgreSQL solution for scalable and reliable database management with Drizzle ORM
- **Calendar Integration**: Google Calendar API
- **Time Zone Handling**: date-fns, date-fns-tz
- **Authentication**: Clerk for user management

---

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

Environment variables configured in a `.env` file. The complete list of of them can be found in `.env.sample` file in the repository.

```env
NEXT_PUBLIC_GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
DATABASE_URL=
```

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Install a new UI component

npx shadcn@latest add form

## License

This project is licensed under the MIT License. See the LICENSE file for details.
