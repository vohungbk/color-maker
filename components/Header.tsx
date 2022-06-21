import Link from 'next/link'
import { FC } from 'react'
import classnames from 'classnames'

import { Tab } from '../shared/types'

interface HeaderProps {
  selectedTab: Tab
  setSelectedTab: (tab: Tab) => void
}

const Header: FC<HeaderProps> = ({ selectedTab, setSelectedTab }) => {
  return (
    <header>
      <nav className="nav">
        <div className="nav__inner">
          <section className="nav__section nav__section--logo">
            <Link href="/">
              <a className="nav__logo">Color Maker</a>
            </Link>
          </section>
          <section className="nav__section nav__section--menu">
            <div className="nav__menu">
              <span
                className={classnames('nav__item', {
                  'nav__item--active': selectedTab == 'gradients',
                })}
                onClick={() => setSelectedTab('gradients')}
              >
                Gradients
              </span>
              <span
                className={classnames('nav__item', {
                  'nav__item--active': selectedTab == 'colors',
                })}
                onClick={() => setSelectedTab('colors')}
              >
                Colors
              </span>
            </div>
          </section>
          <section className="nav__section nav__section--switch">
            <div className="nav_switch"></div>
          </section>
        </div>
      </nav>
    </header>
  )
}

export default Header
