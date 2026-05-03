import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './lib/auth';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Courses from './pages/Courses';
import CourseDetail from './pages/CourseDetail';
import AdminLogin from './pages/admin/Login';
import AdminLayout from './pages/admin/Layout';
import AdminDashboard from './pages/admin/Dashboard';
import { AdminCoursesList, AdminCourseForm } from './pages/admin/AdminCourses';
import { AdminCategoriesList, AdminCategoryForm } from './pages/admin/AdminCategories';
import { AdminTeamList, AdminTeamForm } from './pages/admin/AdminTeam';
import { AdminTestimonialsList, AdminTestimonialForm } from './pages/admin/AdminTestimonials';
import { AdminPagesList, AdminPageEditor } from './pages/admin/AdminPages';
import { AdminEnquiriesList, AdminEnquiryView, AdminEnquiryConvert } from './pages/admin/AdminEnquiries';
import { AdminContactsList, AdminContactForm } from './pages/admin/AdminContacts';
import NotFound from './pages/NotFound';

function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<PublicLayout><Home /></PublicLayout>} />
          <Route path="/about" element={<PublicLayout><About /></PublicLayout>} />
          <Route path="/contact" element={<PublicLayout><Contact /></PublicLayout>} />
          <Route path="/courses" element={<PublicLayout><Courses /></PublicLayout>} />
          <Route path="/courses/:slug" element={<PublicLayout><CourseDetail /></PublicLayout>} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="courses" element={<AdminCoursesList />} />
            <Route path="courses/new" element={<AdminCourseForm />} />
            <Route path="courses/:id/edit" element={<AdminCourseForm />} />
            <Route path="categories" element={<AdminCategoriesList />} />
            <Route path="categories/new" element={<AdminCategoryForm />} />
            <Route path="categories/:id/edit" element={<AdminCategoryForm />} />
            <Route path="team" element={<AdminTeamList />} />
            <Route path="team/new" element={<AdminTeamForm />} />
            <Route path="team/:id/edit" element={<AdminTeamForm />} />
            <Route path="testimonials" element={<AdminTestimonialsList />} />
            <Route path="testimonials/new" element={<AdminTestimonialForm />} />
            <Route path="testimonials/:id/edit" element={<AdminTestimonialForm />} />
            <Route path="pages" element={<AdminPagesList />} />
            <Route path="pages/:id/edit" element={<AdminPageEditor />} />
            <Route path="enquiries" element={<AdminEnquiriesList />} />
            <Route path="enquiries/:id" element={<AdminEnquiryView />} />
            <Route path="enquiries/:id/convert" element={<AdminEnquiryConvert />} />
            <Route path="contacts" element={<AdminContactsList />} />
            <Route path="contacts/new" element={<AdminContactForm />} />
            <Route path="contacts/:id/edit" element={<AdminContactForm />} />
          </Route>
          <Route path="*" element={<PublicLayout><NotFound /></PublicLayout>} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}
