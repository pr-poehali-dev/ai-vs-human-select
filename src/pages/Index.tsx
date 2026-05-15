import { useState, useEffect } from "react";
import Icon from "@/components/ui/icon";

type Section = "home" | "compare" | "about" | "contact";

const NAV_ITEMS: { id: Section; label: string }[] = [
  { id: "home", label: "Главная" },
  { id: "compare", label: "Сравнение" },
  { id: "about", label: "О проекте" },
  { id: "contact", label: "Контакты" },
];

const FEATURES = [
  {
    icon: "GitCompare",
    title: "Наглядные таблицы",
    desc: "Все параметры рядом. Никаких скрытых нюансов.",
  },
  {
    icon: "Zap",
    title: "Тест прямо здесь",
    desc: "Попробуй обе опции, не покидая страницу.",
  },
  {
    icon: "BarChart3",
    title: "Объективные оценки",
    desc: "Только факты. Никакой рекламы и предвзятости.",
  },
];

const COMPARE_ROWS = [
  { label: "Скорость работы", a: "Высокая", b: "Средняя", winner: "a" },
  { label: "Цена в месяц", a: "₽990", b: "₽490", winner: "b" },
  { label: "Поддержка 24/7", a: true, b: false, winner: "a" },
  { label: "API доступ", a: true, b: true, winner: null },
  { label: "Мобильное приложение", a: true, b: false, winner: "a" },
  { label: "Пробный период", a: "14 дней", b: "7 дней", winner: "a" },
  { label: "Интеграции", a: "150+", b: "40+", winner: "a" },
  { label: "Хранилище", a: "100 ГБ", b: "Безлимит", winner: "b" },
];

const TRIAL_STEPS_A = [
  { step: "01", text: "Введите задачу в поле ниже" },
  { step: "02", text: "Нажмите «Запустить анализ»" },
  { step: "03", text: "Получите результат мгновенно" },
];

const TRIAL_STEPS_B = [
  { step: "01", text: "Загрузите файл или введите текст" },
  { step: "02", text: "Выберите режим обработки" },
  { step: "03", text: "Скачайте готовый результат" },
];

export default function Index() {
  const [activeSection, setActiveSection] = useState<Section>("home");
  const [trialInput, setTrialInput] = useState("");
  const [trialMode, setTrialMode] = useState<"a" | "b">("a");
  const [trialResult, setTrialResult] = useState<string | null>(null);
  const [isRunning, setIsRunning] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [highlightWinners, setHighlightWinners] = useState(true);

  const scrollToSection = (id: Section) => {
    setActiveSection(id);
    setMobileMenuOpen(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id as Section);
          }
        });
      },
      { threshold: 0.4 }
    );
    NAV_ITEMS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const runTrial = () => {
    if (!trialInput.trim()) return;
    setIsRunning(true);
    setTrialResult(null);
    setTimeout(() => {
      setIsRunning(false);
      setTrialResult(
        trialMode === "a"
          ? `Опция А обработала запрос за 1.2 сек. Найдено 12 совпадений, точность — 94%.`
          : `Опция Б обработала запрос за 2.8 сек. Найдено 9 совпадений, точность — 87%.`
      );
    }, 1800);
  };

  const scoreA = COMPARE_ROWS.filter((r) => r.winner === "a").length;
  const scoreB = COMPARE_ROWS.filter((r) => r.winner === "b").length;

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* NAV */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
        <nav className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <button
            onClick={() => scrollToSection("home")}
            className="flex items-center gap-2"
          >
            <span className="w-7 h-7 rounded-sm bg-foreground flex items-center justify-center">
              <Icon name="GitCompare" size={14} className="text-background" />
            </span>
            <span className="font-display text-xl font-semibold tracking-tight">
              Сравни
            </span>
          </button>

          <div className="hidden md:flex items-center gap-8">
            {NAV_ITEMS.map(({ id, label }) => (
              <button
                key={id}
                onClick={() => scrollToSection(id)}
                className={`nav-link text-sm font-body font-medium transition-colors ${
                  activeSection === id
                    ? "text-foreground active"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          <button
            className="md:hidden p-2 text-muted-foreground"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <Icon name={mobileMenuOpen ? "X" : "Menu"} size={20} />
          </button>
        </nav>

        {mobileMenuOpen && (
          <div className="md:hidden border-t border-border bg-background animate-slide-down">
            {NAV_ITEMS.map(({ id, label }) => (
              <button
                key={id}
                onClick={() => scrollToSection(id)}
                className="w-full text-left px-6 py-4 text-sm font-medium border-b border-border last:border-0 hover:bg-muted transition-colors"
              >
                {label}
              </button>
            ))}
          </div>
        )}
      </header>

      {/* HERO */}
      <section id="home" className="min-h-screen flex flex-col justify-center pt-16">
        <div className="max-w-6xl mx-auto px-6 py-24">
          <div className="max-w-3xl">
            <div className="animate-fade-in mb-6">
              <span className="inline-flex items-center gap-2 text-xs font-body font-medium uppercase tracking-widest text-muted-foreground border border-border px-3 py-1.5 rounded-sm">
                <span
                  className="w-1.5 h-1.5 rounded-full animate-pulse-accent"
                  style={{ background: "hsl(var(--accent))" }}
                />
                Объективное сравнение
              </span>
            </div>

            <h1 className="animate-fade-in delay-100 font-display text-6xl md:text-8xl font-semibold leading-none tracking-tight mb-8">
              Выбирай
              <br />
              <em className="not-italic" style={{ color: "hsl(var(--accent))" }}>
                осознанно.
              </em>
            </h1>

            <p className="animate-fade-in delay-200 font-body text-lg text-muted-foreground max-w-xl leading-relaxed mb-12">
              Проект создан по индивидуальному проекту.
            </p>

            <div className="animate-fade-in delay-300 flex flex-wrap gap-4">
              <button
                onClick={() => scrollToSection("compare")}
                className="inline-flex items-center gap-2 px-8 py-4 font-body font-semibold text-sm tracking-wide transition-all duration-200 rounded-sm hover:opacity-90 hover:-translate-y-px"
                style={{
                  background: "hsl(var(--foreground))",
                  color: "hsl(var(--primary-foreground))",
                }}
              >
                Смотреть сравнение
                <Icon name="ArrowRight" size={16} />
              </button>
              <button
                onClick={() => scrollToSection("compare")}
                className="inline-flex items-center gap-2 px-8 py-4 font-body font-medium text-sm tracking-wide border border-border rounded-sm hover:border-foreground transition-all duration-200"
              >
                Протестировать
                <Icon name="Zap" size={16} />
              </button>
            </div>
          </div>

          <div className="animate-fade-in delay-400 mt-24 grid grid-cols-3 gap-8 max-w-lg">
            {[
              { value: "40+", label: "параметров" },
              { value: "2", label: "опции рядом" },
              { value: "0₽", label: "без рекламы" },
            ].map(({ value, label }) => (
              <div key={label}>
                <div className="font-display text-4xl font-semibold">{value}</div>
                <div className="font-body text-xs text-muted-foreground mt-1 uppercase tracking-wider">
                  {label}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-6 pb-24 w-full">
          <div className="grid md:grid-cols-3 gap-px bg-border border border-border rounded-sm overflow-hidden">
            {FEATURES.map(({ icon, title, desc }, i) => (
              <div
                key={title}
                className="bg-background p-8 animate-fade-in"
                style={{ animationDelay: `${0.3 + i * 0.1}s` }}
              >
                <div
                  className="w-10 h-10 rounded-sm flex items-center justify-center mb-5"
                  style={{ background: "hsl(var(--accent) / 0.1)" }}
                >
                  <Icon
                    name={icon}
                    size={18}
                    style={{ color: "hsl(var(--accent))" }}
                  />
                </div>
                <h3 className="font-body font-semibold text-base mb-2">{title}</h3>
                <p className="font-body text-sm text-muted-foreground leading-relaxed">
                  {desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* COMPARE */}
      <section id="compare" className="py-24 bg-muted/30">
        <div className="max-w-6xl mx-auto px-6">
          <div className="mb-16">
            <span className="font-body text-xs uppercase tracking-widest text-muted-foreground">
              Детальный анализ
            </span>
            <h2 className="font-display text-5xl md:text-6xl font-semibold mt-3 mb-4">
              Таблица сравнения
            </h2>
            <p className="font-body text-muted-foreground max-w-xl">
              Каждый параметр проверен вручную. Победитель выделен цветом.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-8">
            {[
              { label: "Опция А", score: scoreA, isWinner: scoreA > scoreB },
              { label: "Опция Б", score: scoreB, isWinner: scoreB > scoreA },
            ].map(({ label, score, isWinner }) => (
              <div
                key={label}
                className="border border-border rounded-sm p-6 bg-background transition-all duration-300"
                style={
                  isWinner
                    ? {
                        borderColor: "hsl(var(--accent))",
                        boxShadow: "0 0 0 1px hsl(var(--accent))",
                      }
                    : {}
                }
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-body text-xs text-muted-foreground uppercase tracking-widest mb-1">
                      {label}
                    </div>
                    <div className="font-display text-4xl font-semibold">
                      {score}
                      <span className="text-xl text-muted-foreground">
                        /{COMPARE_ROWS.filter((r) => r.winner).length}
                      </span>
                    </div>
                  </div>
                  {isWinner && (
                    <div
                      className="flex items-center gap-1.5 text-xs font-body font-semibold px-3 py-1.5 rounded-sm"
                      style={{
                        background: "hsl(var(--accent))",
                        color: "hsl(var(--accent-foreground))",
                      }}
                    >
                      <Icon name="Trophy" size={12} />
                      Лидер
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="flex items-center gap-3 mb-6">
            <button
              onClick={() => setHighlightWinners(!highlightWinners)}
              className={`relative w-10 h-5 rounded-full transition-colors duration-200 ${
                highlightWinners ? "bg-foreground" : "bg-border"
              }`}
            >
              <span
                className={`absolute top-0.5 w-4 h-4 rounded-full bg-background transition-transform duration-200 ${
                  highlightWinners ? "translate-x-5" : "translate-x-0.5"
                }`}
              />
            </button>
            <span className="font-body text-sm text-muted-foreground">
              Подсветка победителей
            </span>
          </div>

          <div className="border border-border rounded-sm overflow-hidden bg-background">
            <div className="grid grid-cols-3 bg-foreground text-primary-foreground">
              <div className="p-4 font-body text-xs font-semibold uppercase tracking-widest">
                Параметр
              </div>
              <div className="p-4 font-body text-xs font-semibold uppercase tracking-widest border-l border-white/20">
                Опция А
              </div>
              <div className="p-4 font-body text-xs font-semibold uppercase tracking-widest border-l border-white/20">
                Опция Б
              </div>
            </div>

            {COMPARE_ROWS.map(({ label, a, b, winner }, i) => (
              <div
                key={label}
                className={`grid grid-cols-3 border-t border-border ${
                  i % 2 === 0 ? "bg-background" : "bg-muted/20"
                }`}
              >
                <div className="p-4 font-body text-sm text-muted-foreground">
                  {label}
                </div>
                <div
                  className={`p-4 border-l border-border font-body text-sm font-medium transition-colors ${
                    highlightWinners && winner === "a" ? "winner-cell" : ""
                  }`}
                >
                  {typeof a === "boolean" ? (
                    <Icon
                      name={a ? "Check" : "X"}
                      size={16}
                      className={a ? "text-emerald-600" : "text-muted-foreground"}
                    />
                  ) : (
                    <span className={highlightWinners && winner === "a" ? "font-semibold" : ""}>
                      {a}
                    </span>
                  )}
                </div>
                <div
                  className={`p-4 border-l border-border font-body text-sm font-medium transition-colors ${
                    highlightWinners && winner === "b" ? "winner-cell" : ""
                  }`}
                >
                  {typeof b === "boolean" ? (
                    <Icon
                      name={b ? "Check" : "X"}
                      size={16}
                      className={b ? "text-emerald-600" : "text-muted-foreground"}
                    />
                  ) : (
                    <span className={highlightWinners && winner === "b" ? "font-semibold" : ""}>
                      {b}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* TRIAL ZONE */}
          <div className="mt-16">
            <div className="mb-8">
              <span className="font-body text-xs uppercase tracking-widest text-muted-foreground">
                Живой тест
              </span>
              <h2 className="font-display text-4xl font-semibold mt-3 mb-2">
                Попробуй сам
              </h2>
              <p className="font-body text-muted-foreground">
                Введи запрос и посмотри, как работает каждая опция — прямо здесь.
              </p>
            </div>

            <div className="flex gap-2 mb-6">
              {(["a", "b"] as const).map((mode) => (
                <button
                  key={mode}
                  onClick={() => {
                    setTrialMode(mode);
                    setTrialResult(null);
                  }}
                  className={`px-6 py-2.5 rounded-sm font-body text-sm font-semibold transition-all duration-200 ${
                    trialMode === mode
                      ? "bg-foreground text-primary-foreground"
                      : "border border-border hover:border-foreground text-muted-foreground hover:text-foreground"
                  }`}
                >
                  Опция {mode === "a" ? "А" : "Б"}
                </button>
              ))}
            </div>

            <div className="grid md:grid-cols-3 gap-4 mb-8">
              {(trialMode === "a" ? TRIAL_STEPS_A : TRIAL_STEPS_B).map(
                ({ step, text }) => (
                  <div
                    key={step}
                    className="flex items-start gap-3 p-4 border border-border rounded-sm bg-background"
                  >
                    <span
                      className="font-display text-2xl font-semibold leading-none mt-0.5"
                      style={{ color: "hsl(var(--accent))" }}
                    >
                      {step}
                    </span>
                    <span className="font-body text-sm text-muted-foreground">
                      {text}
                    </span>
                  </div>
                )
              )}
            </div>

            <div className="flex gap-3">
              <input
                type="text"
                value={trialInput}
                onChange={(e) => setTrialInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && runTrial()}
                placeholder={
                  trialMode === "a"
                    ? "Введите запрос для Опции А..."
                    : "Введите текст для Опции Б..."
                }
                className="flex-1 px-4 py-3.5 border border-border rounded-sm font-body text-sm bg-background focus:outline-none focus:border-foreground transition-colors"
              />
              <button
                onClick={runTrial}
                disabled={isRunning || !trialInput.trim()}
                className="px-8 py-3.5 rounded-sm font-body text-sm font-semibold transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed hover:opacity-90 flex items-center gap-2"
                style={{
                  background: "hsl(var(--accent))",
                  color: "hsl(var(--accent-foreground))",
                }}
              >
                {isRunning ? (
                  <>
                    <Icon name="Loader2" size={16} className="animate-spin" />
                    Запуск...
                  </>
                ) : (
                  <>
                    <Icon name="Play" size={16} />
                    Запустить
                  </>
                )}
              </button>
            </div>

            {trialResult && (
              <div
                className="mt-4 p-5 rounded-sm border animate-fade-in"
                style={{ borderColor: "hsl(var(--accent))" }}
              >
                <div className="flex items-start gap-3">
                  <Icon
                    name="CheckCircle2"
                    size={18}
                    style={{ color: "hsl(var(--accent))" }}
                    className="mt-0.5 shrink-0"
                  />
                  <p className="font-body text-sm leading-relaxed">{trialResult}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="py-24">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-start">
            <div>
              <span className="font-body text-xs uppercase tracking-widest text-muted-foreground">
                О проекте
              </span>
              <h2 className="font-display text-5xl font-semibold mt-3 mb-6 leading-tight">
                Почему этому{" "}
                <em className="not-italic" style={{ color: "hsl(var(--accent))" }}>
                  можно
                </em>{" "}
                доверять
              </h2>
              <div className="space-y-5">
                {[
                  {
                    icon: "ShieldCheck",
                    text: "Независимые тесты. Мы не аффилированы ни с одним из сравниваемых продуктов.",
                  },
                  {
                    icon: "RefreshCw",
                    text: "Данные обновляются ежемесячно. Устаревшая информация помечается.",
                  },
                  {
                    icon: "Users",
                    text: "Методология публична. Можете проверить сами или предложить новые критерии.",
                  },
                ].map(({ icon, text }) => (
                  <div key={text} className="flex gap-4 items-start">
                    <div
                      className="w-9 h-9 rounded-sm flex items-center justify-center shrink-0 mt-0.5"
                      style={{ background: "hsl(var(--accent) / 0.1)" }}
                    >
                      <Icon
                        name={icon}
                        size={16}
                        style={{ color: "hsl(var(--accent))" }}
                      />
                    </div>
                    <p className="font-body text-sm text-muted-foreground leading-relaxed">
                      {text}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              {[
                { label: "Точность данных", value: 97 },
                { label: "Актуальность", value: 89 },
                { label: "Покрытие параметров", value: 94 },
              ].map(({ label, value }) => (
                <div key={label}>
                  <div className="flex justify-between font-body text-sm mb-2">
                    <span>{label}</span>
                    <span className="font-semibold">{value}%</span>
                  </div>
                  <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full"
                      style={{
                        width: `${value}%`,
                        background: "hsl(var(--accent))",
                      }}
                    />
                  </div>
                </div>
              ))}

              <div className="mt-8 p-6 border border-border rounded-sm bg-muted/30">
                <blockquote className="font-display text-xl italic leading-relaxed text-muted-foreground mb-4">
                  «Хорошее решение — это не самое дорогое и не самое дешёвое.
                  Это то, которое подходит именно вам.»
                </blockquote>
                <div className="font-body text-xs text-muted-foreground uppercase tracking-wider">
                  — Команда проекта
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="py-24 border-t border-border bg-muted/20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="max-w-xl">
            <span className="font-body text-xs uppercase tracking-widest text-muted-foreground">
              Обратная связь
            </span>
            <h2 className="font-display text-5xl font-semibold mt-3 mb-4">
              Напиши нам
            </h2>
            <p className="font-body text-muted-foreground mb-10">
              Есть идея, что сравнить? Нашли ошибку? Хотите добавить параметр?
              Мы читаем всё.
            </p>

            <div className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Ваше имя"
                  className="px-4 py-3.5 border border-border rounded-sm font-body text-sm bg-background focus:outline-none focus:border-foreground transition-colors w-full"
                />
                <input
                  type="email"
                  placeholder="Email адрес"
                  className="px-4 py-3.5 border border-border rounded-sm font-body text-sm bg-background focus:outline-none focus:border-foreground transition-colors w-full"
                />
              </div>
              <textarea
                rows={5}
                placeholder="Ваше сообщение..."
                className="w-full px-4 py-3.5 border border-border rounded-sm font-body text-sm bg-background focus:outline-none focus:border-foreground transition-colors resize-none"
              />
              <button
                className="w-full py-4 rounded-sm font-body text-sm font-semibold transition-all duration-200 hover:opacity-90 hover:-translate-y-px flex items-center justify-center gap-2"
                style={{
                  background: "hsl(var(--foreground))",
                  color: "hsl(var(--primary-foreground))",
                }}
              >
                <Icon name="Send" size={16} />
                Отправить сообщение
              </button>
            </div>

            <div className="mt-12 flex flex-wrap gap-6">
              {[
                { icon: "Mail", label: "hello@sravni.ru" },
                { icon: "MessageSquare", label: "Telegram" },
              ].map(({ icon, label }) => (
                <div
                  key={label}
                  className="flex items-center gap-2 font-body text-sm text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                >
                  <Icon name={icon} size={16} />
                  {label}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-border py-8">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 rounded-sm bg-foreground flex items-center justify-center">
              <Icon name="GitCompare" size={12} className="text-background" />
            </span>
            <span className="font-display text-base font-semibold">Сравни</span>
          </div>
          <p className="font-body text-xs text-muted-foreground">
            © 2026 Сравни. Независимое сравнение.
          </p>
          <div className="flex gap-6">
            {NAV_ITEMS.map(({ id, label }) => (
              <button
                key={id}
                onClick={() => scrollToSection(id)}
                className="font-body text-xs text-muted-foreground hover:text-foreground transition-colors"
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}