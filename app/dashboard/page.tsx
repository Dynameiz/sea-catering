"use client";
import { useSession } from 'next-auth/react';
import Spinner from '@/components/ui/Spinner';
import { AnimatePresence } from 'framer-motion';
import AdminDashboard from './_dashboard-page/AdminDashboard';
import UserDashboard from './_dashboard-page/UserDashboard';

export default function Dashboard() {
    const { data: session, status } = useSession();

    if (status === 'loading') {
        return <AnimatePresence><Spinner /></AnimatePresence>;
    } else {
        return (session?.user.role === 'ADMIN' ? <AdminDashboard /> : <UserDashboard />);
    }
}
