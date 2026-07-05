import React, { useState } from 'react';
import styled from 'styled-components';
import usePageTitle from '../hooks/usePageTitle';
import { MainLayout, InnerLayout } from '../styles/Layouts';
import Title from '../Components/Title';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import SendIcon from '@mui/icons-material/Send';
import ContactItem from '../Components/ContactItem';

function ContactPage() {
    usePageTitle('Contact');
    const phone = <PhoneIcon />;
    const email = <EmailIcon />;
    const location = <LocationOnIcon />;

    const [name, setName] = useState('');
    const [recemail, setRecEmail] = useState('');
    const [subject, setSubject] = useState('');
    const [message, setMessage] = useState('');

    const sendEmail = (e) => {
        e.preventDefault();
        const mailSubject = subject || 'Hello from your portfolio';
        const body = `Hello,\n\nI am ${name}.\n${message}\n\nFrom: ${name || recemail}`;
        const mailtoUrl = `mailto:vaibhav.bansal945@gmail.com?subject=${encodeURIComponent(mailSubject)}&body=${encodeURIComponent(body)}`;
        window.open(mailtoUrl);
    };

    return (
        <MainLayout>
            <Title title={'Contact'} span={'contact'} />
            <ContactPageStyled>
                <InnerLayout className={'contact-section'}>
                    <div className="left-content">
                        <div className="form-card">
                            <p className="term-line mono">
                                <span className="prompt">~ $</span> ./send-message <span className="flag">--to=vaibhav</span>
                            </p>
                            <form className="form" onSubmit={sendEmail}>
                                <div className="row">
                                    <div className="form-field">
                                        <label htmlFor="name" className="mono">name*</label>
                                        <input
                                            type="text"
                                            id="name"
                                            placeholder="Ada Lovelace"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            required
                                        />
                                    </div>
                                    <div className="form-field">
                                        <label htmlFor="email" className="mono">email*</label>
                                        <input
                                            type="email"
                                            id="email"
                                            placeholder="you@domain.com"
                                            value={recemail}
                                            onChange={(e) => setRecEmail(e.target.value)}
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="form-field">
                                    <label htmlFor="subject" className="mono">subject</label>
                                    <input
                                        type="text"
                                        id="subject"
                                        placeholder="Let's build something"
                                        value={subject}
                                        onChange={(e) => setSubject(e.target.value)}
                                    />
                                </div>
                                <div className="form-field">
                                    <label htmlFor="textarea" className="mono">message*</label>
                                    <textarea
                                        name="textarea"
                                        id="textarea"
                                        rows="7"
                                        placeholder="Your message..."
                                        value={message}
                                        onChange={(e) => setMessage(e.target.value)}
                                        required
                                    ></textarea>
                                </div>
                                <button type="submit" className="submit-btn">
                                    send message <SendIcon />
                                </button>
                            </form>
                        </div>
                    </div>
<<<<<<< HEAD
                    <form  className="form">
                        <div className="form-field">
                            <label htmlFor="name"  >Enter your name*</label>
                            <input type="text" id="name" value={name} onChange={e => setName(e.target.value)} required/>
                        </div>
                        <div className="form-field">
                            <label htmlFor="email"  >Enter your email*</label>
                            <input type="email" id="email" value={recemail} onChange={e => setRecEmail(e.target.value)} required/>
                        </div>
                        <div className="form-field">
                            <label htmlFor="subject"  >Enter your subject</label>
                            <input type="text" id="subject" value={subject} onChange={e => setSubject(e.target.value)}/>
                        </div>
                        <div className="form-field">
                            <label htmlFor="text-area">Enter your Message*</label>
                            <textarea name="textarea" id="textarea" cols="30" rows="10" value={message}  onChange={e => setMessage(e.target.value)}></textarea>
                        </div>
                        <div className="form-field f-button">
                            <SecondaryButton title={'Send Email'} onClick={sendEmail}/>
                        </div>
                    </form>
                </div>
                <div className="right-content">
                    <ContactItem title={'Phone'} icon={phone} cont1={'+91-9165375933'} cont2={'+1-716-866-1430'} cont3={'+1-716-907-9458'} />
                    <ContactItem title={'Email'} icon={email} cont1={'vaibhav.bansal945@gmail.com'} cont2={'vbansal6@buffalo.edu'} />
                    <ContactItem title={'Local Address'} icon={location} cont1={'41 Englewood Avenue, Buffalo, New York, 14214-1105'} cont2={'United States'} />
                    <ContactItem title={'Permanent Address'} icon={location} cont1={'21 Madhuvan Colony, Thatipur, Gwalior, Madhya Pradesh, 474011'} cont2={'India'} />
                    
                </div>
            </InnerLayout>
=======

                    <div className="right-content">
                        <ContactItem title={'Phone'} icon={phone} cont1={'+91-9165375933'} cont2={'+1-716-866-1430'} cont3={'+1-716-907-9458'} />
                        <ContactItem title={'Email'} icon={email} cont1={'vaibhav.bansal945@gmail.com'} cont2={'vbansal6@buffalo.edu'} />
                        <ContactItem title={'Local Address'} icon={location} cont1={'56 Heath St, Buffalo, New York, 14214-1105'} cont2={'United States'} />
                        <ContactItem title={'Permanent Address'} icon={location} cont1={'21 Madhuvan Colony, Thatipur, Gwalior, Madhya Pradesh, 474011'} cont2={'India'} />
                    </div>
                </InnerLayout>
>>>>>>> d92ffab (redesign)
            </ContactPageStyled>
        </MainLayout>
    );
}

const ContactPageStyled = styled.section`
    .contact-section{
        display: grid;
        grid-template-columns: 1.15fr .85fr;
        gap: 1.5rem;
        align-items: start;
        @media screen and (max-width: 978px){
            grid-template-columns: 1fr;
        }
    }

    .form-card{
        border: 1px solid var(--glass-border);
        border-radius: 20px;
        background: var(--glass-bg);
        backdrop-filter: blur(12px);
        -webkit-backdrop-filter: blur(12px);
        padding: 1.6rem;
    }

    .term-line{
        font-size: .85rem;
        color: var(--font-light-color);
        margin-bottom: 1.4rem;
        .prompt{
            color: var(--primary-color);
            font-family: var(--font-mono);
        }
        .flag{
            color: var(--accent-2);
            font-family: var(--font-mono);
        }
    }

    .form{
        .row{
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 1rem;
            @media screen and (max-width: 560px){
                grid-template-columns: 1fr;
            }
        }

        .form-field{
            margin-bottom: 1.15rem;
            width: 100%;

            label{
                display: block;
                font-size: .74rem;
                color: var(--primary-color);
                margin-bottom: .4rem;
            }

            input, textarea{
                border: 1px solid var(--glass-border);
                border-radius: 10px;
                outline: none;
                background: var(--background-dark-grey);
                padding: .75rem .95rem;
                width: 100%;
                color: var(--white-color);
                font-size: .92rem;
                transition: border-color .2s ease, box-shadow .2s ease;
                &::placeholder{
                    color: var(--font-light-color);
                    opacity: .55;
                }
                &:focus{
                    border-color: var(--primary-color);
                    box-shadow: 0 0 0 3px var(--background-light-color-2);
                }
            }

            textarea{
                resize: vertical;
                min-height: 8rem;
            }
        }

        .submit-btn{
            display: inline-flex;
            align-items: center;
            gap: .5rem;
            border: none;
            cursor: pointer;
            padding: .8rem 1.7rem;
            border-radius: 10px;
            font-size: .92rem;
            font-weight: 600;
            color: var(--on-primary);
            background: linear-gradient(120deg, var(--primary-color), var(--accent-2));
            box-shadow: 0 4px 24px var(--primary-glow);
            transition: transform .2s ease, box-shadow .25s ease;
            svg{
                font-size: 1rem;
                transition: transform .2s ease;
            }
            &:hover{
                transform: translateY(-2px);
                box-shadow: 0 10px 34px var(--primary-glow);
                svg{
                    transform: translateX(3px);
                }
            }
            &:active{
                transform: translateY(0) scale(.98);
            }
        }
    }

    .right-content{
        display: grid;
        grid-template-columns: 1fr;
        gap: 0;
    }
`;

export default ContactPage;
