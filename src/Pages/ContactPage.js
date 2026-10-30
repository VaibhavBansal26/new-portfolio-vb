import React, { useState } from 'react';
import styled from 'styled-components';
import usePageTitle from '../hooks/usePageTitle';
import SendRoundedIcon from '@mui/icons-material/SendRounded';
import ArrowOutwardRoundedIcon from '@mui/icons-material/ArrowOutwardRounded';

function ContactPage() {
  usePageTitle('Contact');
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const update = event => setForm({ ...form, [event.target.name]: event.target.value });
  const submit = event => { event.preventDefault(); const subject = form.subject || 'Portfolio enquiry'; const body = `Hi Vaibhav,\n\n${form.message}\n\n${form.name}\n${form.email}`; window.location.href = `mailto:vaibhav.bansal945@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`; };
  return (
    <ContactStyled className="page-shell compact">
      <header className="page-hero"><p className="kicker">07 / contact</p><h1>Have a useful problem?<br /><span>Let’s talk.</span></h1><p className="lead">I’m open to AI engineering, software product, and data platform opportunities—especially where clear thinking and practical delivery matter.</p></header>
      <section className="contact-grid">
        <form onSubmit={submit}>
          <div className="field-grid"><label>Name<input required name="name" value={form.name} onChange={update} placeholder="Your name" /></label><label>Email<input required type="email" name="email" value={form.email} onChange={update} placeholder="you@company.com" /></label></div>
          <label>Subject<input name="subject" value={form.subject} onChange={update} placeholder="What would you like to build?" /></label>
          <label>Message<textarea required name="message" value={form.message} onChange={update} rows="7" placeholder="Tell me about the opportunity or problem…" /></label>
          <button className="btn primary" type="submit">Send message <SendRoundedIcon /></button>
        </form>
        <aside>
          <div className="availability"><i /><div><span className="mono">Availability</span><h3>Open to meaningful work</h3><p>Full-time roles and selected collaborations.</p></div></div>
          <div className="contact-row"><span className="mono">Email</span><a href="mailto:vaibhav.bansal945@gmail.com">vaibhav.bansal945@gmail.com <ArrowOutwardRoundedIcon /></a></div>
          <div className="contact-row"><span className="mono">Location</span><p>Buffalo, New York · available worldwide</p></div>
          <div className="contact-row"><span className="mono">LinkedIn</span><a href="https://www.linkedin.com/in/vaibhavbansal-profile/" target="_blank" rel="noreferrer">Connect professionally <ArrowOutwardRoundedIcon /></a></div>
          <p className="hand note">Good work starts with<br />a clear conversation.</p>
        </aside>
      </section>
    </ContactStyled>
  );
}

const ContactStyled = styled.div`
  .contact-grid { display: grid; grid-template-columns: 1.15fr .85fr; gap: 70px; padding: 72px 0; }
  form { padding: 34px; background: var(--paper-strong); border: 1px solid var(--soft-line); }
  .field-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px; }
  label { display: block; margin-bottom: 18px; font-family: var(--mono); color: #5f646d; font-size: 10px; letter-spacing: .08em; text-transform: uppercase; }
  input, textarea { width: 100%; margin-top: 8px; padding: 14px 0; border: 0; border-bottom: 1px solid var(--line); outline: 0; resize: vertical; background: transparent; color: var(--ink); font-size: 15px; text-transform: none; letter-spacing: 0; }
  input:focus, textarea:focus { border-bottom-color: var(--blue); box-shadow: 0 2px 0 var(--blue); }
  aside { padding-top: 6px; }
  .availability { display: flex; gap: 16px; padding-bottom: 30px; border-bottom: 1px solid var(--line); }
  .availability i { width: 12px; height: 12px; margin-top: 6px; border-radius: 50%; background: var(--mint-strong); box-shadow: 0 0 0 6px var(--mint); }
  aside span { color: var(--blue); font-size: 10px; text-transform: uppercase; }
  aside h3 { margin-top: 8px; font-size: 20px; }
  aside p { margin-top: 4px; color: var(--muted); }
  .contact-row { padding: 22px 0; border-bottom: 1px solid var(--line); }
  .contact-row a, .contact-row p { display: flex; align-items: center; gap: 7px; margin-top: 8px; font-weight: 600; }
  .contact-row svg { font-size: 16px; }
  .note { margin-top: 40px; color: var(--blue); font-size: 32px; line-height: 1; transform: rotate(-3deg); }
  @media (max-width: 800px) { .contact-grid { grid-template-columns: 1fr; } }
  @media (max-width: 560px) { .field-grid { grid-template-columns: 1fr; } form { padding: 22px; } }
`;
export default ContactPage;
