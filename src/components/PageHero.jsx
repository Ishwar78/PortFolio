import React from 'react';
import './PageHero.css';
export default function PageHero({eyebrow,title,accent,description,children}){return <section className="page-hero"><div className="page-hero-copy"><span>{eyebrow}</span><h1>{title} <em>{accent}</em></h1><p>{description}</p>{children}</div><div className="page-hero-glow"/></section>}
