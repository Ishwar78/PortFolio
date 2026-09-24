import React from 'react';import {Link,useParams} from 'react-router-dom';
import {FiArrowLeft,
    FiExternalLink,
    FiGithub,
    FiUser,
    FiShoppingCart,
    FiCreditCard,
    FiSettings,
    FiPackage,
    FiZap,
    FiCheckCircle,
    FiCalendar,
    FiLayers
} from 'react-icons/fi';
import CTA from '../components/CTA';
import './ProjectDetail.css';
export default function ProjectDetail(){const {id}=useParams();
const title=id==='hotel-booking'?'Hotel Booking Management':id==='expense-tracker'?'Expense Tracker':'E-Commerce Shopping Cart';
return <main className="detail-page">
    <section className="detail-hero">
        <div>
            <Link className="back" to="/projects">
            <FiArrowLeft/> Back to Projects</Link>
            <small>FEATURED PROJECT</small>
            <h1>{title.split(' ')[0]}<br/><span>{title.split(' ').slice(1).join(' ')}</span></h1>
            <p>A full-featured web application built with modern frontend and backend technologies. 
                It focuses on clean UX, secure APIs, practical workflows and an easy-to-manage architecture.</p>
                <div className="detail-actions"><a href="#live">Live Demo <FiExternalLink/></a>
                <a href="https://github.com/"><FiGithub/> View Code</a>
                </div>
                </div>
                <div className="detail-device">
                    <img src="/assets/project-detail-preview.png" alt={title}/></div>
                    </section>
                    <section className="detail-stats">
                        <span><FiCalendar/><b>3+<small>Months Duration</small></b></span>
                        <span><FiLayers/><b>Full Stack<small>Project Type</small></b></span>
                        <span><FiUser/><b>Individual<small>Project Role</small></b></span>
                        <span><FiCheckCircle/><b>Live<small>Deployed</small></b></span>
                        </section>
                        <section className="detail-body"><div className="detail-main"><h2>Project Overview</h2><p>This project demonstrates a complete real-world workflow where users can interact with the application, manage data and complete key actions. The frontend is responsive and the backend is structured around secure REST APIs and database operations.</p><div className="gallery"><img src="/assets/project-detail-preview.png"/><img src="/assets/projects-preview.png"/></div><h2>Key Features</h2><div className="features">{[['User Authentication',FiUser,'Secure signup, login and protected access'],['Product Management',FiPackage,'Create, update and manage records'],['Shopping Cart',FiShoppingCart,'Add, update quantity and remove items'],['Order Management',FiPackage,'Track orders and order history'],['Payment Integration',FiCreditCard,'Payment workflow integration'],['Admin Panel',FiSettings,'Manage users, content and operations']].map(([t,I,d])=><article key={t}><I/><h3>{t}</h3><p>{d}</p></article>)}</div><h2>Challenges & Solutions</h2><div className="challenge"><article><b>Challenges</b><ul><li>Managing application state</li><li>API integration and validation</li><li>Responsive interface</li></ul></article><article><b>Solutions</b><ul><li>Component-based architecture</li><li>Reusable REST API patterns</li><li>Responsive CSS design</li></ul></article></div></div><aside className="detail-side"><div><h3>Project Information</h3><p><b>Role</b> Full Stack Developer</p><p><b>Type</b> Web Application</p><p><b>Status</b> Completed</p><p><b>Technologies</b> React, Java, Spring Boot, MySQL</p><p><b>Source Code</b> GitHub</p></div><div><h3>Tech Stack</h3><div className="stack-tags">React · Java · Spring Boot · MySQL · Git · GitHub · Postman</div></div><div><h3>What I Learned</h3><p>Improved API design, debugging, state management, responsive UI development and end-to-end full-stack delivery.</p></div></aside></section><CTA/></main>}
