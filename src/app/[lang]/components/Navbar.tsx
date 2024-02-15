
import LanguageSwitcher from './LanguageSwitcher';
import { getPosts } from '@/lib/api';
import { Locale } from '../../../../i18.config';

export default async function NavNar({ lang }: { lang: Locale }) {
  const [navigation] = await getPosts(lang);
  console.log(navigation);

  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-end items-center">
        <LanguageSwitcher />
      </div>
    </nav>
  );
};

