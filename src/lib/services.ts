import { Code2, Palette, Rocket, Layers, Sparkles, Target } from 'lucide-react';

export const services = [
  {
    slug: 'brand',
    title: 'Брендинг',
    subtitle: 'Идентичность, которую запомнят',
    description: 'Создаём систему визуальной и вербальной идентичности. От логотипа до полного брендбука.',
    icon: Sparkles,
    deliverables: ['Логотип и знак', 'Фирменный стиль', 'Брендбук', 'Гайдлайны'],
  },
  {
    slug: 'design',
    title: 'UI/UX дизайн',
    subtitle: 'Интерфейсы, которые работают',
    description: 'Продуктовый дизайн — от исследований до готовых макетов с системой компонентов.',
    icon: Palette,
    deliverables: ['Исследования', 'Wireframes', 'UI-система', 'Прототипы'],
  },
  {
    slug: 'web',
    title: 'Веб-разработка',
    subtitle: 'Сайты и сервисы нового уровня',
    description: 'Современный веб-стек: Next.js, React, TypeScript. Скорость, SEO и анимации.',
    icon: Code2,
    deliverables: ['Лендинги', 'Корпоративные сайты', 'Веб-приложения', 'CMS'],
  },
  {
    slug: 'product',
    title: 'Продуктовая разработка',
    subtitle: 'Приложения от идеи до релиза',
    description: 'Полный цикл создания цифрового продукта — от MVP до стабильного релиза.',
    icon: Layers,
    deliverables: ['Дискавери', 'MVP', 'Разработка', 'Поддержка'],
  },
  {
    slug: 'marketing',
    title: 'Перформанс',
    subtitle: 'Рост, который можно измерить',
    description: 'Разгоняем маркетинг через аналитику, A/B и оптимизацию воронок.',
    icon: Target,
    deliverables: ['Аналитика', 'A/B-тесты', 'Email-воронки', 'Перформанс'],
  },
  {
    slug: 'launch',
    title: 'Запуск и поддержка',
    subtitle: 'Первые пользователи и стабильность',
    description: 'Сопровождаем запуск, держим SLA, развиваем продукт по данным.',
    icon: Rocket,
    deliverables: ['Деплой', 'SLA-поддержка', 'Мониторинг', 'Итерации'],
  },
];

export type Service = (typeof services)[number];
