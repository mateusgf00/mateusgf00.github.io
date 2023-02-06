import Logo from './Logo'

export default function() {
  return (
    <nav className="navbar bg-body-tertiary">
      <div className="container-lg" style={{justifyContent: 'center'}}>
        <Logo />
      </div>
    </nav>
  )
}