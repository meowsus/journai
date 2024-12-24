interface HeroProps {
  title: string;
  subtitle: string;
  children: React.ReactNode;
}

export default function Hero({ title, subtitle, children }: HeroProps) {
  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content text-center">
        <div className="max-w-lg">
          <h1 className="text-5xl font-bold">{title}</h1>
          <p className="py-6">{subtitle}</p>
          {children}
        </div>
      </div>
    </div>
  );
}
