interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default async function Layout({ children }: DashboardLayoutProps) {
  return (
    <main className="flex flex-col items-center justify-center h-screen">
      {children}
      <div className="absolute bottom-10 right-[50%] translate-x-[50%]">
        <h1>Menu</h1>
      </div>
    </main>
  );
}
