import { type FC } from 'react'
import style from './style.module.scss'
import { FooterLogo } from '../../icons/footer-logo'

export const Footer: FC = async () => {
  const DATA = {
    navigation: [
      {
        title: 'Shop',
        links: [
          { title: 'Pick a Bundle', href: '#kits' },
          { title: 'Build Your Own Kit', href: '#products' }
        ]
      },
      {
        title: 'Contact Info',
        links: [
          { title: '440-468-7669', href: 'tel:4404687669' },
          { title: 'info@snoweffects.com', href: 'mailto:info@snoweffects.com' }
        ]
      },
      {
        title: 'Snow Effects',
        links: [
          { title: 'Privacy Policy', href: 'https://www.snoweffects.com/privacy' },
          { title: '©2025 All rights reserved', href: null }
        ]
      }
    ]
  }

  return (
    <footer className={style.Footer}>
      <div className={style.Footer__content}>
        <div>
          <FooterLogo />
        </div>

        <nav className={style.Footer__navigation}>
          {DATA.navigation.map((section) => {
            return (
              <ul key={section.title}>
                <li className={style.Footer__navigation__title}>
                  {section.title}
                </li>
                {section.links.map((link) => {
                  return (
                    <li key={link.title}>
                      {link.href ? (
                        <a
                          className={style.Footer__navigation__link}
                          href={link.href}
                        >
                          {link.title}
                        </a>
                      ) : (
                        <span>
                          {link.title}
                        </span>
                      )}
                    </li>
                  )
                })}
              </ul>
            )
          })}
        </nav>
      </div>
    </footer>
  )
}
