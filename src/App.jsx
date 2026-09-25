import React, { useEffect, useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import Navbar from './components/Navbar';
import Footer from './components/Footer';

import Home from './pages/Home';
import About from './pages/About';
import Skills from './pages/Skills';
import Projects from './pages/Projects';
import ProjectDetail from './pages/ProjectDetail';
import Experience from './pages/Experience';
import Contact from './pages/Contact';

import AdminLogin from './admin/AdminLogin';
import AdminLayout from './admin/AdminLayout';
import AdminDashboard from './admin/AdminDashboard';
import AdminHome from './admin/AdminHome';
import AdminAbout from './admin/AdminAbout';
import AdminSkills from './admin/AdminSkills';
import AdminProjects from './admin/AdminProjects';
import AdminExperience from './admin/AdminExperience';
import AdminContact from './admin/AdminContact';
import AdminInquiry from './admin/AdminInquiry';
import AdminChatbotQA from './admin/AdminChatbotQA';
import AdminBotLeads from './admin/AdminBotLeads';
import AdminBlog from './admin/AdminBlog';
import Blog from './pages/Blog'
import BlogDetail from './pages/BlogDetail';


import IshwarChatbot from './components/IshwarChatbot';
import CursorFollower from './components/CursorFollower';


export default function App() {

  const [dark, setDark] = useState(
    () => localStorage.getItem('portfolio-theme') !== 'light'
  );

  useEffect(() => {

    localStorage.setItem(
      'portfolio-theme',
      dark ? 'dark' : 'light'
    );

    document.documentElement.dataset.theme =
      dark ? 'dark' : 'light';

    document.body.style.margin = '0';

    document.body.style.fontFamily =
      'Montserrat, Arial, sans-serif';

    document.body.style.background =
      dark ? '#050b14' : '#f4f7fb';

    document.body.style.color =
      dark ? '#f7fbff' : '#101828';

  }, [dark]);


  return (
    <div className={dark ? 'app-shell dark' : 'app-shell light'}>

      <Routes>

        {/* =========================================
            ADMIN LOGIN
        ========================================= */}

        <Route
          path="/admin/login"
          element={<AdminLogin />}
        />


        {/* =========================================
            ADMIN PANEL
        ========================================= */}

        <Route
          path="/admin"
          element={<AdminLayout />}
        >

          <Route
            index
            element={<AdminDashboard />}
          />

          <Route
            path="home"
            element={<AdminHome />}
          />

          <Route
            path="about"
            element={<AdminAbout />}
          />

          <Route
            path="skills"
            element={<AdminSkills />}
          />

          <Route
            path="projects"
            element={<AdminProjects />}
          />

          <Route
            path="experience"
            element={<AdminExperience />}
          />

          <Route
            path="contact"
            element={<AdminContact />}
          />

          <Route
            path="chatbot"
            element={<AdminChatbotQA />}
          />

          <Route
            path="bot-inquiries"
            element={<AdminBotLeads />}
          />

          <Route
            path="blogs"
            element={<AdminBlog />}
          />

          <Route
            path="inquiries"
            element={<AdminInquiry />}
          />

        </Route>


        {/* =========================================
            PUBLIC WEBSITE
        ========================================= */}

        <Route
          path="*"
          element={
            <PublicLayout
              dark={dark}
              setDark={setDark}
            />
          }
        />

      </Routes>

    </div>
  );
}


/* =====================================================
   PUBLIC WEBSITE LAYOUT
===================================================== */

function PublicLayout({ dark, setDark }) {

  return (
    <>

      {/* =========================================
          CUSTOM CURSOR
          Only public portfolio
      ========================================= */}

      <CursorFollower text="ISHWAR" />


      {/* =========================================
          NAVBAR
      ========================================= */}

      <Navbar
        dark={dark}
        setDark={setDark}
      />


      {/* =========================================
          PUBLIC ROUTES
      ========================================= */}

      <Routes>

        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/about"
          element={<About />}
        />

        <Route
          path="/skills"
          element={<Skills />}
        />

        <Route
          path="/projects"
          element={<Projects />}
        />

        <Route
          path="/projects/:id"
          element={<ProjectDetail />}
        />

        <Route
          path="/experience"
          element={<Experience />}
        />

        <Route
          path="/contact"
          element={<Contact />}
        />

        {/* Chatbot Page */}

        <Route
          path="/chatboat"
          element={<IshwarChatbot />}
        />
<Route path="/blog" element={<Blog />} />
<Route path="/blog/:slug" element={<BlogDetail />} />


        <Route
          path="*"
          element={
            <Navigate
              to="/"
              replace
            />
          }
        />

      </Routes>


      {/* =========================================
          FOOTER
      ========================================= */}

      <Footer />

    </>
  );
}