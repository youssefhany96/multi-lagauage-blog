"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { i18n } from "../../../../i18.config";

// Use the `use client` directive to mark this as a Client Component
const LanguageSwitcher = () => {
  const pathName = usePathname();

  const redirectedPathName = (locale: string) => {
    if (!pathName) return "/";
    const segments = pathName.split("/");
    segments[1] = locale;
    return segments.join("/");
  };

  return (
    <ul className="flex space-x-4 flex-end">
      {i18n.locales.map((locale) => {
        return (
          <li key={locale}>
            <Link
              href={redirectedPathName(locale)}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-300"
            >
              {locale}
            </Link>
          </li>
        );
      })}
    </ul>
  );
};

export default LanguageSwitcher;
