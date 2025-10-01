import React, { useMemo, useState } from 'react';
import {
  CheckCircle2,
  ChevronRight,
  Shield,
  Globe,
  BarChart2,
  Clock,
  Search,
  Filter,
  ArrowRight,
  ExternalLink,
  Percent,
  Moon,
  Sun
} from 'lucide-react';

/** ============================
 *  i18n — простейший словарь
 *  ============================ */
const I18N = {
  ru: {
    siteName: 'Credit24.kg',
    badge_helper: 'Не выдаём кредиты — помогаем сравнить',
    badge_lang: 'RU / KG',
    badge_transparent: 'APR/ГЭСВ прозрачно',
    hero_title: 'Подберите микрокредит за 2 минуты',
    hero_sub: 'Сравните лицензированные МФО и банки Кыргызстана по сумме, сроку и полной стоимости. Честно показываем APR и ГЭСВ.',
    cta_start: 'Начать подбор',
    cta_how: 'Как это работает',
    calc_title: 'Быстрый калькулятор',
    calc_sub: 'Оцените платёж до подачи заявки',
    amount: 'Сумма',
    term_days: 'Срок (дни)',
    online_only: 'Только 100% онлайн',
    approx_time: '~2 мин',
    est_pay: 'Оценочный платёж',
    est_note: '* Точная сумма зависит от условий кредитора (APR/ГЭСВ). Это ориентировочный расчёт.',
    list_title: 'Лицензированные организации',
    filter: 'Фильтр',
    search_placeholder: 'Поиск по названию',
    no_results: 'Нет предложений по выбранным параметрам. Попробуйте уменьшить сумму или срок.',
    feature1_t: 'Честная стоимость',
    feature1_d: 'Показываем APR и ГЭСВ — сравнивайте полную цену кредита, а не только ставку.',
    feature2_t: 'Только лицензированные',
    feature2_d: 'Каждый партнёр — с действующей лицензией НБКР и проверенными условиями.',
    feature3_t: 'Экономия времени',
    feature3_d: 'Единый каталог, фильтры и быстрый калькулятор — меньше кликов и звонков.',
    max_amount: 'Макс. сумма',
    max_term: 'Макс. срок',
    apr: 'APR',
    gesv: 'ГЭСВ',
    apply: 'Подать заявку',
    footer_blurb:
      'Сервис подбора микрокредитов. Мы помогаем сравнить условия и сделать осознанный выбор. Не выдаём кредиты. Все партнёры имеют соответствующие лицензии НБКР.',
    nav_about: 'О нас',
    nav_contacts: 'Контакты',
    nav_privacy: 'Политика конфиденциальности',
    nav_terms: 'Пользовательское соглашение',
    theme_light: 'Светлая',
    theme_dark: 'Тёмная',
  },
  ky: {
    siteName: 'Credit24.kg',
    badge_helper: 'Биз насыя бербейбиз — салыштырууга жардам беребиз',
    badge_lang: 'RU / KG',
    badge_transparent: 'APR/ЖЭСВ ачык',
    hero_title: 'Микрокредитти 2 мүнөттө тандаңыз',
    hero_sub: 'Лицензиясы бар МФУ жана банктарды сумма, мөөнөт жана толук нарк (ЖЭСВ) боюнча салыштырыңыз. APR жана ЖЭСВди чынчыл көрсөтөбүз.',
    cta_start: 'Тандоону баштоо',
    cta_how: 'Кантип иштейт',
    calc_title: 'Ыкчам калькулятор',
    calc_sub: 'Өтүнмө берүүдөн мурун төлөмдү баалаңыз',
    amount: 'Сумма',
    term_days: 'Мөөнөт (күн)',
    online_only: '100% онлайн гана',
    approx_time: '~2 мүн',
    est_pay: 'Болжолдуу төлөм',
    est_note: '* Так сумма кредитордун шарттарына (APR/ЖЭСВ) жараша болот. Бул багыттоочу эсеп.',
    list_title: 'Лицензиясы бар уюмдар',
    filter: 'Фильтр',
    search_placeholder: 'Аталышы боюнча издөө',
    no_results: 'Тандалган параметрлер боюнча сунуштар жок. Сумманы же мөөнөттү азайтып көрүңүз.',
    feature1_t: 'Ачык баа',
    feature1_d: 'APR жана ЖЭСВ көрсөтүлөт — толук наркты салыштырыңыз.',
    feature2_t: 'Лицензияланган өнөктөштөр',
    feature2_d: 'Ар бир өнөктөштө НБКРдин жарактуу лицензиясы бар.',
    feature3_t: 'Убакытты үнөмдөө',
    feature3_d: 'Бирдиктүү каталог, фильтрлер жана ыңгайлуу калькулятор.',
    max_amount: 'Макс. сумма',
    max_term: 'Макс. мөөнөт',
    apr: 'APR',
    gesv: 'ЖЭСВ',
    apply: 'Өтүнмө калтыруу',
    footer_blurb:
      'Микрокредиттерди салыштыруу кызматы. Биз шарттарды салыштырып, аң-сезимдүү тандоого жардам беребиз. Насыя бербейбиз. Бардык өнөктөштөрдө НБКР лицензиясы бар.',
    nav_about: 'Биз жөнүндө',
    nav_contacts: 'Байланыш',
    nav_privacy: 'Купуялуулук саясаты',
    nav_terms: 'Колдонуучу келишими',
    theme_light: 'Жаркын',
    theme_dark: 'Караңгы',
  },
};

function useI18n(lang) {
  const dict = I18N[lang] || I18N.ru;
  return (key) => dict[key] ?? key;
}

/** ============================
 *  Демо-данные
 *  ============================ */
const COMPANIES = [
  { id: 'bailyk', name: 'ЗАО Байлык Финанс', logo: '', apr: 30,  gesv: '36.32–38.46%', maxAmount: 150000, maxTermDays: 540,  online: true,  applyUrl: 'https://example.com/bailyk', license: 'НБКР №346 от 10.03.2011' },
  { id: 'mbulak', name: 'ОсОО М Булак',       logo: '', apr: 45,  gesv: '51–53.48%',  maxAmount: 120000, maxTermDays: 540,  online: false, applyUrl: 'https://example.com/mbulak', license: 'НБКР №29 от 14.04.2005' },
  { id: 'salym',  name: 'ОАО Салым Финанс',    logo: '', apr: 28.5,gesv: 'от 33.91%',  maxAmount: 300000, maxTermDays: 1825, online: false, applyUrl: 'https://example.com/salym',  license: 'НБКР №006 от 08.11.2007' },
  { id: 'amanat', name: 'ОсОО Аманат кредит',  logo: '', apr: 49,  gesv: '55–57.46%',  maxAmount: 15000,  maxTermDays: 180,  online: false, applyUrl: 'https://example.com/amanat', license: 'НБКР №41 от 13.01.2006' },
  { id: 'elet',   name: 'ОсОО Элет капитал',   logo: '', apr: 33,  gesv: '44.41%',     maxAmount: 15000,  maxTermDays: 180,  online: true,  applyUrl: 'https://example.com/elet',  license: 'НБКР №013/1 от 30.03.2018' },
];

/** ============================
 *  Хелперы форматирования
 *  ============================ */
const formatKGS = (v) => new Intl.NumberFormat('ru-KG', { style: 'currency', currency: 'KGS', maximumFractionDigits: 0 }).format(v);
const daysToLabel = (d, lang) => {
  if (d % 30 === 0) {
    const m = Math.round(d / 30);
    return `${m} ${lang === 'ky' ? 'ай' : 'мес.'}`;
  }
  return `${d} ${lang === 'ky' ? 'күн' : 'дн.'}`;
};

function Container({ children }) {
  return <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">{children}</div>;
}

function Pill({ children }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-gray-200 px-2.5 py-1 text-[11px] font-medium text-gray-600 dark:border-gray-700 dark:text-gray-300">
      {children}
    </span>
  );
}

function PrimaryButton({ children, onClick, href, ariaLabel, dataAttrs = {} }) {
  const base =
    'inline-flex items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold shadow-sm ring-1 ring-inset ring-black/5 ' +
    'bg-black text-white hover:bg-black/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black ' +
    'dark:bg-white dark:text-black dark:hover:bg-gray-100 dark:focus-visible:outline-white';
  if (href) {
    return (
      <a {...dataAttrs} aria-label={ariaLabel} href={href} target="_blank" rel="noopener noreferrer" className={`${base} w-full sm:w-auto`}>
        {children}
      </a>
    );
  }
  return (
    <button {...dataAttrs} aria-label={ariaLabel} onClick={onClick} className={`${base} w-full sm:w-auto`}>
      {children}
    </button>
  );
}

function SecondaryButton({ children, onClick }) {
  return (
    <button
      onClick={onClick}
      className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm font-semibold text-gray-900 shadow-sm hover:bg-gray-50
                 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100 dark:hover:bg-gray-750"
    >
      {children}
    </button>
  );
}

function FeatureItem({ icon: Icon, title, text }) {
  return (
    <li className="flex gap-3">
      <div className="mt-0.5"><Icon aria-hidden className="h-5 w-5 text-gray-700 dark:text-gray-300" /></div>
      <div>
        <h3 className="text-sm font-semibold">{title}</h3>
        <p className="text-sm text-gray-600 dark:text-gray-400">{text}</p>
      </div>
    </li>
  );
}

function CompanyCard({ c, t, lang }) {
  return (
    <div
      className="group rounded-2xl border border-gray-200 p-4 sm:p-5 shadow-sm transition hover:shadow-md
                 dark:border-gray-700 dark:bg-gray-800"
      aria-label={`Кредитор ${c.name}`}
    >
      <div className="flex items-center gap-3">
        <div className="h-10 w-10 rounded-lg bg-gray-50 ring-1 ring-gray-200 flex items-center justify-center overflow-hidden
                        dark:bg-gray-900 dark:ring-gray-700">
          {c.logo && <img alt="Логотип" src={c.logo} className="h-6 w-auto" />}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <h3 className="text-[15px] font-semibold leading-tight truncate">{c.name}</h3>
            {c.online && (
              <Pill>
                <CheckCircle2 className="h-3.5 w-3.5" /> 100% онлайн
              </Pill>
            )}
          </div>
          <p className="text-[11px] text-gray-500 truncate dark:text-gray-400">{c.license}</p>
        </div>
      </div>
      <div className="mt-4 grid grid-cols-3 gap-2 text-center">
        <div className="rounded-lg bg-gray-50 p-2.5 dark:bg-gray-900 dark:border dark:border-gray-700">
          <div className="text-[10px] uppercase tracking-wide text-gray-500 dark:text-gray-400">{t('max_amount')}</div>
          <div className="text-sm font-semibold">{formatKGS(c.maxAmount)}</div>
        </div>
        <div className="rounded-lg bg-gray-50 p-2.5 dark:bg-gray-900 dark:border dark:border-gray-700">
          <div className="text-[10px] uppercase tracking-wide text-gray-500 dark:text-gray-400">{t('max_term')}</div>
          <div className="text-sm font-semibold">{daysToLabel(c.maxTermDays, lang)}</div>
        </div>
        <div className="rounded-lg bg-gray-50 p-2.5 dark:bg-gray-900 dark:border dark:border-gray-700">
          <div className="text-[10px] uppercase tracking-wide text-gray-500 dark:text-gray-400">{t('apr')}</div>
          <div className="text-sm font-semibold">{c.apr}%</div>
        </div>
      </div>
      <div className="mt-4 flex items-center gap-3">
        <div className="text-xs text-gray-500 dark:text-gray-400">{t('gesv')}: {c.gesv}</div>
        <div className="ml-auto">
          <PrimaryButton href={c.applyUrl} ariaLabel={`${t('apply')}: ${c.name}`} dataAttrs={{ 'data-company': c.id }}>
            {t('apply')} <ExternalLink className="h-4 w-4" />
          </PrimaryButton>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const [amount, setAmount] = useState(50000);
  const [termDays, setTermDays] = useState(180);
  const [onlineOnly, setOnlineOnly] = useState(false);
  const [query, setQuery] = useState('');
  const [dark, setDark] = useState(true);     // тёмная тема по умолчанию
  const [lang, setLang] = useState('ru');     // ru | ky

  const t = useI18n(lang);

  const filtered = useMemo(() => {
    return COMPANIES.filter(
      (c) =>
        (!onlineOnly || c.online) &&
        c.maxAmount >= amount &&
        c.maxTermDays >= termDays &&
        c.name.toLowerCase().includes(query.toLowerCase())
    );
  }, [amount, termDays, onlineOnly, query]);

  const monthlyPayment = useMemo(() => {
    const apr = (filtered[0]?.apr ?? 36) / 100;
    const months = Math.max(1, Math.round(termDays / 30));
    const r = apr / 12;
    const A = (amount * r) / (1 - Math.pow(1 + r, -months));
    return isFinite(A) ? Math.round(A) : 0;
  }, [amount, termDays, filtered]);

  return (
    <div className={dark ? 'dark' : ''}>
      <div className="min-h-screen bg-white text-gray-900 dark:bg-gray-900 dark:text-gray-100">
        {/* Top bar: тема + язык */}
        <header className="border-b border-gray-200 dark:border-gray-800">
          <Container>
            <div className="flex items-center justify-between gap-3 py-3">
              <div className="text-sm font-semibold">{t('siteName')}</div>
              <div className="flex items-center gap-2">
                {/* Язык */}
                <div className="inline-flex rounded-lg border border-gray-300 dark:border-gray-700 overflow-hidden">
                  <button
                    onClick={() => setLang('ru')}
                    className={`px-3 py-2 text-sm ${lang === 'ru' ? 'bg-gray-100 dark:bg-gray-800 font-semibold' : 'bg-white dark:bg-gray-900'}`}
                    aria-label="Русский"
                  >
                    RU
                  </button>
                  <button
                    onClick={() => setLang('ky')}
                    className={`px-3 py-2 text-sm ${lang === 'ky' ? 'bg-gray-100 dark:bg-gray-800 font-semibold' : 'bg-white dark:bg-gray-900'}`}
                    aria-label="Кыргызча"
                  >
                    KG
                  </button>
                </div>
                {/* Тема */}
                <button
                  onClick={() => setDark(!dark)}
                  className="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-900 hover:bg-gray-50
                             dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100 dark:hover:bg-gray-750"
                  aria-label="Переключить тему"
                >
                  {dark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                  {dark ? t('theme_light') : t('theme_dark')}
                </button>
              </div>
            </div>
          </Container>
        </header>

        {/* HERO */}
        <section className="relative overflow-hidden border-b border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900">
          <Container>
            <div className="py-8 sm:py-12">
              <div className="mb-3 flex flex-wrap items-center gap-2">
                <Pill><Shield className="h-4 w-4" /> {t('badge_helper')}</Pill>
                <Pill><Globe className="h-4 w-4" /> {t('badge_lang')}</Pill>
                <Pill><BarChart2 className="h-4 w-4" /> {t('badge_transparent')}</Pill>
              </div>
              <div className="grid items-start gap-6 lg:grid-cols-2">
                {/* Text */}
                <div>
                  <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
                    {t('hero_title')}
                  </h1>
                  <p className="mt-2 text-[15px] text-gray-600 dark:text-gray-400">
                    {t('hero_sub')}
                  </p>
                  <div className="mt-5 flex flex-col sm:flex-row gap-3">
                    <PrimaryButton>{t('cta_start')} <ChevronRight className="h-4 w-4" /></PrimaryButton>
                    <SecondaryButton>{t('cta_how')} <ArrowRight className="h-4 w-4" /></SecondaryButton>
                  </div>
                </div>
                {/* Calculator */}
                <div>
                  <div className="rounded-2xl border border-gray-200 bg-white p-4 sm:p-5 shadow-sm dark:border-gray-800 dark:bg-gray-800">
                    <h2 className="text-sm font-semibold">{t('calc_title')}</h2>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{t('calc_sub')}</p>
                    <div className="mt-3 grid gap-3">
                      {/* Amount */}
                      <label className="text-xs font-medium">{t('amount')}</label>
                      <input
                        type="range"
                        min={5000}
                        max={300000}
                        step={5000}
                        value={amount}
                        onChange={(e) => setAmount(parseInt(e.target.value))}
                        className="w-full"
                        aria-label={t('amount')}
                      />
                      <div className="flex justify-between text-sm">
                        <span>{formatKGS(5000)}</span>
                        <span className="font-semibold">{formatKGS(amount)}</span>
                        <span>{formatKGS(300000)}</span>
                      </div>

                      {/* Term */}
                      <label className="mt-1.5 text-xs font-medium">{t('term_days')}</label>
                      <input
                        type="range"
                        min={14}
                        max={1825}
                        step={1}
                        value={termDays}
                        onChange={(e) => setTermDays(parseInt(e.target.value))}
                        className="w-full"
                        aria-label={t('term_days')}
                      />
                      <div className="flex justify-between text-sm">
                        <span>{lang === 'ky' ? '14 күн' : '14 дн.'}</span>
                        <span className="font-semibold">{daysToLabel(termDays, lang)}</span>
                        <span>{lang === 'ky' ? '60 ай' : '60 мес.'}</span>
                      </div>

                      <div className="mt-1.5 flex items-center justify-between">
                        <label className="flex items-center gap-2 text-sm">
                          <input
                            type="checkbox"
                            checked={onlineOnly}
                            onChange={(e) => setOnlineOnly(e.target.checked)}
                          />
                          {t('online_only')}
                        </label>
                        <div className="flex items-center gap-1 text-sm text-gray-600 dark:text-gray-400">
                          <Clock className="h-4 w-4" /> {t('approx_time')}
                        </div>
                      </div>

                      <div className="mt-3 rounded-xl bg-gray-50 p-4 dark:bg-gray-900 dark:border dark:border-gray-800">
                        <div className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">{t('est_pay')}</div>
                        <div className="text-xl sm:text-2xl font-bold">{formatKGS(monthlyPayment)} / {lang === 'ky' ? 'ай' : 'мес'}</div>
                        <div className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                          {t('est_note')}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </section>

        {/* LIST */}
        <section className="py-8 sm:py-10">
          <Container>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <h2 className="text-lg sm:text-xl font-bold">{t('list_title')}</h2>
              <div className="flex items-center gap-2">
                <div className="relative w-full sm:w-56">
                  <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                  <input
                    aria-label={t('search_placeholder')}
                    placeholder={t('search_placeholder')}
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="w-full rounded-xl border border-gray-300 bg-white py-2 pl-9 pr-3 text-sm shadow-sm placeholder:text-gray-400 focus:border-gray-900 focus:outline-none
                               dark:border-gray-700 dark:bg-gray-800 dark:placeholder:text-gray-500"
                  />
                </div>
                <Pill className="hidden sm:inline-flex"><Filter className="h-3 w-3" /> {t('filter')}</Pill>
              </div>
            </div>

            <div className="mt-5 grid grid-cols-1 gap-3 sm:gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((c) => (<CompanyCard key={c.id} c={c} t={t} lang={lang} />))}
            </div>

            {filtered.length === 0 && (
              <div className="mt-8 rounded-2xl border border-dashed p-8 text-center text-sm text-gray-600 dark:text-gray-400 dark:border-gray-800">
                {t('no_results')}
              </div>
            )}
          </Container>
        </section>

        {/* FEATURES */}
        <section className="border-y border-gray-200 bg-gray-50 py-8 sm:py-10 dark:border-gray-800 dark:bg-gray-900">
          <Container>
            <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <FeatureItem icon={Percent} title={t('feature1_t')} text={t('feature1_d')} />
              <FeatureItem icon={Shield}  title={t('feature2_t')} text={t('feature2_d')} />
              <FeatureItem icon={Clock}   title={t('feature3_t')} text={t('feature3_d')} />
            </ul>
          </Container>
        </section>

        {/* FOOTER */}
        <footer className="border-t border-gray-200 dark:border-gray-800">
          <Container>
            <div className="flex flex-col gap-5 py-8 sm:py-10 md:flex-row md:items-center md:justify-between">
              <div>
                <div className="text-sm font-semibold">{t('siteName')}</div>
                <p className="mt-1 max-w-xl text-xs text-gray-600 dark:text-gray-400">{t('footer_blurb')}</p>
              </div>
              <nav className="text-sm text-gray-600 dark:text-gray-400">
                <ul className="flex flex-wrap items-center gap-4">
                  <li><a className="hover:underline" href="#">{t('nav_about')}</a></li>
                  <li><a className="hover:underline" href="#">{t('nav_contacts')}</a></li>
                  <li><a className="hover:underline" href="#">{t('nav_privacy')}</a></li>
                  <li><a className="hover:underline" href="#">{t('nav_terms')}</a></li>
                </ul>
              </nav>
            </div>
          </Container>
        </footer>
      </div>
    </div>
  );
}
