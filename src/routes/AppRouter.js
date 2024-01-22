import React, { Suspense, lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

// Lazy load için fonksiyonlar
const Home = lazy(() => import('../pages/Home'));
const Sss = lazy(() => import('../pages/Sss'));
const Contact = lazy(() => import('../pages/Contact'));
const PostDetail = lazy(() => import('../pages/PostDetail'));
const ServiceDetail = lazy(() => import('../pages/ServiceDetail'));
const ApplicationForm = lazy(() => import('../pages/ApplicationForm'));
const TraineeForm = lazy(() => import('../pages/TraineeForm'));
const Dashboard = lazy(() => import('../pages/Admin/Dashboard'));
const Services = lazy(() => import('../pages/Admin/Services'));
const AdminContacts = lazy(() => import('../pages/Admin/AdminContacts'));
const AdminTeamApplications = lazy(() => import('../pages/Admin/AdminTeamApplications'));
const AdminTrainee = lazy(() => import('../pages/Admin/AdminTrainee'));
const AdminFaqs = lazy(() => import('../pages/Admin/AdminFaqs'));
const AdminSocials = lazy(() => import('../pages/Admin/AdminSocials'));
const AdminPosts = lazy(() => import('../pages/Admin/AdminPosts'));
const AdminUsers = lazy(() => import('../pages/Admin/AdminUsers'));
const Unauthorized = lazy(() => import('../pages/Unauthorized'));
const AdminLogin = lazy(() => import('../pages/Admin/AdminLogin'));
const NotFound = lazy(() => import('../pages/NotFound'));

const AppRouter = () => {
  const user = useSelector((state) => state.user.user);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/sss' element={<Sss />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/p/:slugUrl' element={<PostDetail />} />
        <Route path='/s/:slugUrl' element={<ServiceDetail />} />
        <Route path='/team-application' element={<ApplicationForm />} />
        <Route path='/trainee-application' element={<TraineeForm />} />
        <Route path='/admin' element={user ? <Dashboard /> : <Navigate to="/login" />} />
        <Route path='/admin/services' element={user ? <Services /> : <Navigate to="/login" />} />
        <Route path='/admin/contacts' element={user ? <AdminContacts /> : <Navigate to="/login" />} />
        <Route path='/admin/team-applications' element={user ? <AdminTeamApplications /> : <Navigate to="/login" />} />
        <Route path='/admin/trainee-applications' element={user ? <AdminTrainee /> : <Navigate to="/login" />} />
        <Route path='/admin/faqs' element={user ? <AdminFaqs /> : <Navigate to="/login" />} />
        <Route path='/admin/socials' element={user ? <AdminSocials /> : <Navigate to="/login" />} />
        <Route path='/admin/posts' element={user ? <AdminPosts /> : <Navigate to="/login" />} />
        <Route path='/admin/users' element={user ? <AdminUsers /> : <Navigate to="/login" />} />
        <Route path='/unauthorized' element={<Unauthorized />} />
        <Route path='/login' element={<AdminLogin />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </Suspense>
  );
};

export default AppRouter;
