import { Palette } from 'lucide-react';
import { useEffect, useState } from 'react';
import { THEMES } from '../constants';

const ThemeSelector = () => {
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'forest');

  const handleThemeChange = newTheme => {
    setTheme(newTheme);
  };

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  // We mount the component to ensure access to document
  // but for SSR safety or general best practice, this is fine in client-side React.

  return (
    <div className="dropdown  mx-auto">
      {/* Trigger Button */}
      <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
        <Palette className="size-5" />
      </div>

      {/* Dropdown Content */}
      <div
        tabIndex={0}
        className="dropdown-content mt-3 z-[1] p-2 shadow-2xl bg-base-300 rounded-box w-52 max-h-96 overflow-y-auto"
      >
        <div className="grid grid-cols-1 gap-2 p-2">
          {THEMES.map(t => (
            <button
              key={t.name}
              className={`flex items-center gap-2 p-2 rounded-lg transition-colors hover:bg-base-100/50
                ${theme === t.name ? 'bg-base-100 border-2 border-primary' : ''}
               `}
              onClick={() => handleThemeChange(t.name)}
            >
              <div className="flex-1 text-left text-sm font-medium capitalize">
                {t.name}
              </div>
              <div className="flex gap-1">
                {t.colors.map((c, i) => (
                  <div
                    key={i}
                    className="h-4 w-2 rounded-full ring-1 ring-base-content/10"
                    style={{ backgroundColor: c }}
                  />
                ))}
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
export default ThemeSelector;
