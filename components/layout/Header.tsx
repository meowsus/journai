import Link from "next/link";

interface MenuItem {
  title: string;
  href: string;
  children?: MenuItem[];
}

const MENU_ITEMS: MenuItem[] = [
  {
    title: "Home",
    href: "/",
  },
  {
    title: "Entries",
    href: "/entries",
  },
];

export default function Header() {
  return (
    <header>
      <div className="navbar bg-base-300">
        <div className="navbar-start">
          <div className="dropdown">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-circle btn-ghost"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h7"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu dropdown-content menu-sm z-[1] mt-3 w-52 rounded-box bg-base-300 p-2 shadow"
            >
              {MENU_ITEMS.map((item) => (
                <li key={item.title}>
                  {item.children ? (
                    <details>
                      <summary>{item.title}</summary>
                      <ul className="p-2">
                        {item.children.map((child) => (
                          <li key={child.title}>
                            <Link href={child.href}>{child.title}</Link>
                          </li>
                        ))}
                      </ul>
                    </details>
                  ) : (
                    <Link href={item.href}>{item.title}</Link>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="navbar-center">
          <Link href="/" className="btn btn-ghost text-xl">
            Journai
          </Link>
        </div>
        <div className="navbar-end"></div>
      </div>
    </header>
  );
}
