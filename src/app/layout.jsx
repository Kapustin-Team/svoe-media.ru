import '@fontsource/onest/400.css'
import '@fontsource/onest/500.css'
import '@fontsource/onest/600.css'
import './globals.css'

export const metadata = {
  title: 'СВОЁ МЕДИА — креативное агентство by Евгений Гаврилин',
  description: 'Мы создаём брендам их собственные медиа — чтобы они перестали покупать внимание и начали владеть им. Шоу, комьюнити, конференции и спецпроекты.',
  keywords: 'своё медиа, медиа-активы, бренд-медиа, шоу для брендов, Евгений Гаврилин, спецпроекты, комьюнити, медиастратегия',
  openGraph: {
    title: 'СВОЁ МЕДИА — креативное агентство',
    description: 'Мы создаём медиа-активы для брендов. Шоу, комьюнити, конференции и эксклюзивные спецпроекты.',
    type: 'website',
    url: 'https://svoe-media.ru',
    siteName: 'СВОЁ МЕДИА',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="ru">
      <body>{children}</body>
    </html>
  )
}
