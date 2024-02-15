
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import LanguageSwitcher from './LanguageSwitcher';
import { getPosts } from '@/lib/api';

export default async function NavNar({ lang }: { lang: Locale }) {
  const [navigation] = await getPosts(lang);
  console.log(navigation);

  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-end items-center">
        {/* <div className="flex gap-4">
          {navigation.map((item, index) => (
            <Link key={index} href={item.href}>{item.label}</Link>
          ))}
        </div> */}
        <LanguageSwitcher />
      </div>
    </nav>
  );
};

