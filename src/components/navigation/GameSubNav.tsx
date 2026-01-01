interface NavItem {
  id: string;
  label: string;
}

const NAV_ITEMS: NavItem[] = [
  { id: 'overview', label: 'Overview' },
  { id: 'timeline', label: 'Timeline' },
  { id: 'final-score', label: 'Final Stats' },
];

interface GameSubNavProps {
  activeSection?: string;
}

export const GameSubNav = ({ activeSection }: GameSubNavProps) => {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <nav className="game-subnav" aria-label="Game sections">
      <ul className="game-subnav__list">
        {NAV_ITEMS.map((item) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              className={`game-subnav__link ${activeSection === item.id ? 'active' : ''}`}
              onClick={(e) => handleClick(e, item.id)}
            >
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

