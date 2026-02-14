export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-logo">
        <span className="logo-accent">NEXUS</span>GAMES
      </div>
      <p className="footer-text">
        &copy; {new Date().getFullYear()} NexusGames Studio. All rights reserved.
      </p>
    </footer>
  )
}
