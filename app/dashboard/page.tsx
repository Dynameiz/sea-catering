"use client";
import { useSession } from 'next-auth/react';
import UserDashboard from './(user)/user-dashboard/page';
import AdminDashboard from './(admin)/admin-dashboard/page';
import { useRouter } from 'next/navigation';
import Spinner from '@/components/ui/Spinner';
import { AnimatePresence } from 'framer-motion';

export default function Dashboard() {
    const { data: session, status } = useSession();
    const router = useRouter();

    if (status === 'loading') {
        return <AnimatePresence><Spinner /></AnimatePresence>;
    }
    if (status !== 'authenticated') {
        router.push('/login');
        return null;
    } else {
        return (
            <div className='flex flex-col items-center justify-center w-full min-h-screen bg-light-beige'>
            {session.user.role === 'ADMIN' ? (
                <AdminDashboard />
            ) : (
                <UserDashboard />
            )}
            </div>
        );
    }
}
