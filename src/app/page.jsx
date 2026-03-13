'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import SplitText from '../components/SplitText'
import { ScrollReveal, ScrollScale } from '../components/ScrollReveal'
import './page.sass'

/* Floating blob that drifts slowly */
function FloatingBlob({ className }) {
  return <div className={`blob ${className}`} aria-hidden="true" />
}

/* Grain overlay */
function Grain() {
  return (
    <svg className="grain" aria-hidden="true">
      <filter id="grain-filter">
        <feTurbulence type="fractalNoise" baseFrequency="0.7" numOctaves="4" stitchTiles="stitch" />
      </filter>
      <rect width="100%" height="100%" filter="url(#grain-filter)" />
    </svg>
  )
}

export default function Page() {
  const [formState, setFormState] = useState('idle')
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  async function handleSubmit(e) {
    e.preventDefault()
    setFormState('loading')
    const data = Object.fromEntries(new FormData(e.target))
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (!res.ok) throw new Error()
      setFormState('success')
      e.target.reset()
    } catch {
      setFormState('error')
    }
  }

  const navLinks = [
    { href: '#directions', label: 'Направления' },
    { href: '#founder', label: 'Основатель' },
    { href: '#letter', label: 'Манифест' },
    { href: '#contact', label: 'Контакт' },
  ]

  return (
    <div className="svoe-page">
      <Grain />
      <FloatingBlob className="blob--1" />
      <FloatingBlob className="blob--2" />
      <FloatingBlob className="blob--3" />

      <div className="page-wrapper">
        {/* Header */}
        <header className={`site-header ${scrolled ? 'site-header--scrolled' : ''}`}>
          <div className="header-inner">
            <Link href="#top" className="header-logo">СВОЁ МЕДИА</Link>
            <nav className={`header-nav ${menuOpen ? 'header-nav--open' : ''}`}>
              {navLinks.map(l => (
                <Link key={l.href} href={l.href} className="header-nav-link" onClick={() => setMenuOpen(false)}>{l.label}</Link>
              ))}
              <Link className="btn btn--sm" href="#contact" onClick={() => setMenuOpen(false)}>Обсудить проект</Link>
            </nav>
            <button className={`burger ${menuOpen ? 'burger--open' : ''}`} onClick={() => setMenuOpen(!menuOpen)} aria-label="Меню">
              <span /><span /><span />
            </button>
          </div>
        </header>

        {/* ===== HERO ===== */}
        <section id="top" className="hero">
          <div className="hero-photo">
            <Image src="/gavrilin.jpg" alt="Евгений Гаврилин" fill sizes="100vw" priority style={{ objectFit: 'cover', objectPosition: 'center 20%' }} />
            <div className="hero-photo-fade" />
          </div>
          <div className="hero-text">
            <SplitText className="hero-title" delay={0.3}>СВОЁ МЕДИА</SplitText>
            <ScrollReveal>
              <p className="hero-sub">
                Мы создаём брендам их собственные медиа —<br/>
                чтобы они перестали покупать внимание и начали владеть им
              </p>
            </ScrollReveal>
            <ScrollReveal>
              <Link className="btn" href="#contact">Обсудить проект</Link>
            </ScrollReveal>
            <ScrollReveal>
              <p className="hero-by">by Евгений Гаврилин</p>
            </ScrollReveal>
          </div>
        </section>

        {/* ===== QUOTE ===== */}
        <section className="quote-section">
          <div className="container">
            <ScrollScale>
              <p className="quote">
                <em>«Кто владеет вниманием —<br/>владеет рынком»</em>
              </p>
            </ScrollScale>
          </div>
        </section>

        {/* ===== DIRECTIONS ===== */}
        <section id="directions" className="directions">
          <div className="container">
            <ScrollReveal><span className="label">Направления</span></ScrollReveal>
            <ScrollReveal><h2>Что мы создаём</h2></ScrollReveal>

            <div className="dir-grid">
              {[
                { img: '/dir-show.png', title: 'Своё шоу', desc: 'Продюсирование авторских шоу и форматов для брендов и медийных личностей' },
                { img: '/dir-community.png', title: 'Своё комьюнити', desc: 'Создание и развитие сообществ вокруг бренда — от идеи до масштабирования' },
                { img: '/dir-conference.png', title: 'Своя конференция', desc: 'Организация и продюсирование конференций и деловых событий' },
                { img: '/dir-special.png', title: 'Спецпроекты', desc: 'Уникальные медиа-проекты под задачи бренда — без шаблонов' },
              ].map((item) => (
                <ScrollReveal key={item.title}>
                  <div className="dir-card">
                    <div className="dir-card-img">
                      <Image src={item.img} alt={item.title} width={160} height={160} />
                    </div>
                    <h3>{item.title}</h3>
                    <p>{item.desc}</p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* ===== FOUNDER ===== */}
        <section id="founder" className="founder">
          <div className="container">
            <ScrollReveal><span className="label">Основатель</span></ScrollReveal>
            <ScrollReveal><h2>Евгений Гаврилин</h2></ScrollReveal>
            <ScrollReveal><p className="section-sub">Медиастратег · Продюсер · Предприниматель</p></ScrollReveal>

            <ScrollScale>
              <div className="founder-photo-wrap">
                <Image src="/gavrilin.jpg" alt="Евгений Гаврилин" width={1080} height={600} className="founder-photo" style={{ objectFit: 'cover', objectPosition: 'center 15%' }} />
              </div>
            </ScrollScale>

            <div className="founder-facts">
              {[
                { num: '01', title: 'Digital-агентство Nectarin', desc: 'Основатель одного из крупнейших digital-агентств России' },
                { num: '02', title: 'Boomstarter', desc: 'Первая краудфандинговая платформа в России' },
                { num: '03', title: 'Первый бизнес-блогер', desc: '150 000 подписчиков за первые сутки' },
                { num: '04', title: '20+ стартапов', desc: 'В digital и медиа — от идеи до выхода' },
                { num: '05', title: '4 сообщества', desc: 'Профессиональных комьюнити с нуля' },
              ].map((f) => (
                <ScrollReveal key={f.num}>
                  <div className="founder-fact">
                    <span className="founder-fact-num">{f.num}</span>
                    <div>
                      <h3>{f.title}</h3>
                      <p>{f.desc}</p>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* ===== LETTER ===== */}
        <section id="letter" className="letter">
          <div className="container">
            <ScrollReveal><span className="label">Манифест</span></ScrollReveal>
            <ScrollReveal><h2>Письмо основателя</h2></ScrollReveal>
            <ScrollReveal>
              <div className="letter-card">
                <div className="letter-body">
                  <p>Коллеги, рекламный рынок изменился навсегда. Баннерная слепота, блокировщики рекламы, скипы на YouTube — аудитория научилась игнорировать всё, что пахнет продажей.</p>
                  <p>Но есть то, что люди никогда не перестанут потреблять — <strong>это контент</strong>. Шоу, подкасты, интервью, комьюнити-события.</p>
                  <p>Когда бренд создаёт собственное медиа, он перестаёт арендовать чужое внимание и начинает <strong>владеть своим</strong>.</p>
                  <p>Своё шоу — это не расход. Это инвестиция в актив, который растёт в цене. Каждый выпуск — контакт с аудиторией. Каждый сезон — рост доверия.</p>
                  <p>Мы прошли этот путь сами. Мы знаем, как создавать форматы, которые смотрят, обсуждают и пересматривают.</p>
                </div>
                <div className="letter-sign">
                  <div className="letter-sign-line" />
                  <p className="letter-sign-name">Евгений Гаврилин</p>
                  <p className="letter-sign-role">Основатель СВОЁ МЕДИА</p>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* ===== CTA ===== */}
        <section className="cta">
          <div className="container">
            <div className="cta-card">
              <ScrollReveal><h2>Давайте создадим<br/>ваше медиа</h2></ScrollReveal>
              <ScrollReveal><p className="cta-sub">От идеи до первого выпуска — за 30 дней</p></ScrollReveal>
              <ScrollReveal><Link className="btn btn--white" href="#contact">Обсудить проект</Link></ScrollReveal>
            </div>
          </div>
        </section>

        {/* ===== CONTACT ===== */}
        <section id="contact" className="contact">
          <div className="container">
            <ScrollReveal><span className="label">Контакт</span></ScrollReveal>
            <ScrollReveal><h2>Расскажите о задаче</h2></ScrollReveal>
            <ScrollReveal><p className="section-sub">Обсудим ваш проект и предложим формат, который будет работать на ваш бренд</p></ScrollReveal>

            <ScrollReveal>
              <form className="contact-form" onSubmit={handleSubmit}>
                <div className="form-row">
                  <input type="text" name="name" placeholder="Имя" required />
                  <input type="text" name="contact" placeholder="Телеграм / WhatsApp" required />
                </div>
                <input type="text" name="business" placeholder="Бизнес / бренд" />
                <textarea name="task" placeholder="Кратко, какая задача" rows="4" />
                <button type="submit" className="btn" disabled={formState === 'loading'}>
                  {formState === 'loading' ? 'Отправка...' : 'Обсудить проект'}
                </button>
              </form>
            </ScrollReveal>

            {formState === 'success' && <div className="form-msg form-msg--ok">Спасибо! Мы свяжемся с вами.</div>}
            {formState === 'error' && <div className="form-msg form-msg--err">Ошибка. Напишите на info@svoe-media.ru</div>}

            <ScrollReveal>
              <p className="contact-direct">Или напишите напрямую: <Link href="mailto:info@svoe-media.ru"><strong>info@svoe-media.ru</strong></Link></p>
            </ScrollReveal>
          </div>
        </section>

        {/* Footer */}
        <footer className="footer">
          <div className="container">
            <p className="footer-brand">СВОЁ МЕДИА</p>
            <p className="footer-tagline">Медиа-активы для брендов</p>
            <div className="footer-row">
              <span>© {new Date().getFullYear()}</span>
              <Link href="mailto:info@svoe-media.ru">info@svoe-media.ru</Link>
              <span>Москва</span>
            </div>
          </div>
        </footer>
      </div>
    </div>
  )
}
