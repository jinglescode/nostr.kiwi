import Link from 'next/link'

import { Container } from './Container'

export function Header() {
  return (
    <header>
      <nav>
        <Container className="relative z-50 flex justify-between py-8">
          <div className="relative z-10 flex items-center gap-16">
            <Link href="/" aria-label="Home">
              {/* <Logo className="h-10 w-auto" /> */}
              <img src="/images/logo/rounded-512.png" className="h-16 w-auto" />
            </Link>
            
          </div>
          <div className="flex items-center gap-6">
            
          </div>
        </Container>
      </nav>
    </header>
  )
}
