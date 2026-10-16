"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import {
  Menu,
  X,
  MessageSquareWarning,
  LayoutDashboard,
  PlusCircle,
  LogIn,
  UserPlus,
  LogOut,
  UserRound,
  ShieldCheck,
  ChevronDown,
  CircleHelp,
  Info,
  Settings,
} from "lucide-react";
import { authClient, useSession } from "@/lib/auth-client";

const Navbar = () => {
  const { data: sessionData, isPending } = useSession();
  const user = sessionData?.user;

  const role = (user as typeof user & { role?: string } | undefined)?.role ?? "user";

  const router = useRouter();
  const pathname = usePathname();

  const [isOpen, setIsOpen] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [logoutError, setLogoutError] = useState("");

  const profileRef = useRef<HTMLDivElement>(null);

  // Close profile popup on outside click or Escape
  useEffect(() => {
    const handlePointerDown = (event: PointerEvent) => {
      if (
        profileRef.current &&
        !profileRef.current.contains(event.target as Node)
      ) {
        setShowProfileMenu(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setShowProfileMenu(false);
        setIsOpen(false);
      }
    };

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const closeMenus = () => {
    setShowProfileMenu(false);
    setIsOpen(false);
    setLogoutError("");
  };

  const navLinks = [
    { name: "Home", href: "/", icon: MessageSquareWarning },
    { name: "About", href: "/about", icon: Info },
    { name: "Help", href: "/help", icon: CircleHelp },
    ...(user
      ? [
          {
            name: "Dashboard",
            href: role === "admin" ? "/admin/dashboard" : "/dashboard",
            icon: role === "admin" ? ShieldCheck : LayoutDashboard,
          },
        ]
      : []),
  ];

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname === href;

  const userName = user?.name || "User";
  const userEmail = user?.email || "";
  const initial = userName.trim().charAt(0).toUpperCase() || "U";

  const handleLogout = async () => {
    setIsLoggingOut(true);
    setLogoutError("");

    try {
      await authClient.signOut();
      closeMenus();
      router.replace("/");
      router.refresh();
    } catch (error) {
      console.error("Logout failed:", error);
      setLogoutError("Logout failed. Please try again.");
    } finally {
      setIsLoggingOut(false);
    }
  };

  const renderNavLinks = (mobile = false) =>
    navLinks.map((link) => {
      const Icon = link.icon;

      return (
        <Link
          key={link.href}
          href={link.href}
          onClick={closeMenus}
          className={`flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-medium transition ${
            isActive(link.href)
              ? "bg-blue-50 text-blue-700"
              : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
          } ${mobile ? "w-full" : ""}`}
        >
          <Icon size={17} />
          {link.name}
        </Link>
      );
    });

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white backdrop-blur-md">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link
          href="/"
          onClick={closeMenus}
          className="flex shrink-0 items-center gap-2.5"
        >
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white shadow-sm">
            <MessageSquareWarning size={22} />
          </span>
          <span className="text-xl font-bold tracking-tight text-slate-900">
            Complain<span className="text-blue-600">Box</span>
          </span>
        </Link>

        {/* Desktop navigation */}
        <div className="hidden items-center gap-1 lg:flex">
          {renderNavLinks()}
        </div>

        {/* Desktop authentication */}
        <div className="hidden items-center gap-3 md:flex">
          {isPending ? (
            <div className="h-10 w-24 animate-pulse rounded-lg bg-slate-100" />
          ) : user ? (
            <div ref={profileRef} className="relative">
              <button
                type="button"
                onClick={() => setShowProfileMenu((prev) => !prev)}
                aria-expanded={showProfileMenu}
                aria-haspopup="menu"
                className="flex items-center gap-2 rounded-xl border border-slate-200 p-1.5 pr-3 transition hover:bg-slate-50"
              >
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-100 text-sm font-bold text-blue-700">
                  {initial}
                </span>
                <span className="max-w-28 text-left">
                  <span className="block truncate text-sm font-semibold text-slate-800">
                    {userName}
                  </span>
                  <span className="block text-xs capitalize text-slate-500">
                    {role}
                  </span>
                </span>
                <ChevronDown
                  size={16}
                  className={`text-slate-500 transition ${
                    showProfileMenu ? "rotate-180" : ""
                  }`}
                />
              </button>

              {showProfileMenu && (
                <div
                  role="menu"
                  className="absolute right-0 top-full mt-2 w-72 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl shadow-slate-900/10"
                >
                  {/* Profile header */}
                  <div className="bg-gradient-to-br from-blue-50 to-white p-4">
                    <div className="flex items-center gap-3">
                      <span className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-600 text-lg font-bold text-white">
                        {initial}
                      </span>
                      <div className="min-w-0">
                        <p className="truncate text-sm font-bold text-slate-900">
                          {userName}
                        </p>
                        <p className="truncate text-xs text-slate-500">
                          {userEmail}
                        </p>
                        <span className="mt-1 inline-flex rounded-full bg-blue-100 px-2 py-0.5 text-xs font-medium capitalize text-blue-700">
                          {role}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="p-2">
                    <Link
                      href={
                        role === "admin"
                          ? "/admin/dashboard"
                          : "/dashboard"
                      }
                      role="menuitem"
                      onClick={closeMenus}
                      className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-slate-700 transition hover:bg-slate-50"
                    >
                      <LayoutDashboard size={17} />
                      Dashboard
                    </Link>

                    <Link
                      href="/dashboard/profile"
                      role="menuitem"
                      onClick={closeMenus}
                      className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-slate-700 transition hover:bg-slate-50"
                    >
                      <UserRound size={17} />
                      My Profile
                    </Link>

                    {role === "admin" && (
                      <Link
                        href="/admin/dashboard"
                        role="menuitem"
                        onClick={closeMenus}
                        className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-slate-700 transition hover:bg-slate-50"
                      >
                        <ShieldCheck size={17} />
                        Admin Dashboard
                      </Link>
                    )}

                    <Link
                      href="/help"
                      role="menuitem"
                      onClick={closeMenus}
                      className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-slate-700 transition hover:bg-slate-50"
                    >
                      <Settings size={17} />
                      Help & Support
                    </Link>

                    <div className="my-2 border-t border-slate-100" />

                    <button
                      type="button"
                      role="menuitem"
                      disabled={isLoggingOut}
                      onClick={handleLogout}
                      className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-red-600 transition hover:bg-red-50 disabled:opacity-50"
                    >
                      <LogOut size={17} />
                      {isLoggingOut ? "Logging out..." : "Logout"}
                    </button>

                    {logoutError && (
                      <p role="alert" className="px-3 py-2 text-xs text-red-600">
                        {logoutError}
                      </p>
                    )}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link
                href="/login"
                className="flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
              >
                <LogIn size={17} />
                Login
              </Link>
              <Link
                href="/register"
                className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
              >
                <UserPlus size={17} />
                Get Started
              </Link>
            </>
          )}
        </div>

        {/* Mobile menu button */}
        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={isOpen}
          className="rounded-lg p-2 text-slate-700 transition hover:bg-slate-100 md:hidden"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile menu */}
      {isOpen && (
        <div className="border-t border-slate-200 bg-white px-4 py-4 shadow-lg md:hidden">
          <div className="mx-auto flex max-w-7xl flex-col gap-1">
            {user && (
              <div className="mb-3 flex items-center gap-3 rounded-xl bg-slate-50 p-3">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-blue-100 font-bold text-blue-700">
                  {initial}
                </span>
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-slate-900">
                    {userName}
                  </p>
                  <p className="truncate text-xs text-slate-500">
                    {userEmail}
                  </p>
                  <p className="mt-1 text-xs capitalize text-blue-700">
                    {role}
                  </p>
                </div>
              </div>
            )}

            {renderNavLinks(true)}

            <div className="my-2 border-t border-slate-200" />

            {isPending ? (
              <div className="h-10 animate-pulse rounded-lg bg-slate-100" />
            ) : user ? (
              <>
                <Link
                  href="/dashboard/profile"
                  onClick={closeMenus}
                  className="flex items-center gap-3 rounded-lg px-3 py-3 text-sm text-slate-700 hover:bg-slate-100"
                >
                  <UserRound size={18} />
                  My Profile
                </Link>

                <Link
                  href="/help"
                  onClick={closeMenus}
                  className="flex items-center gap-3 rounded-lg px-3 py-3 text-sm text-slate-700 hover:bg-slate-100"
                >
                  <CircleHelp size={18} />
                  Help & Support
                </Link>

                <button
                  type="button"
                  disabled={isLoggingOut}
                  onClick={handleLogout}
                  className="flex w-full items-center gap-3 rounded-lg px-3 py-3 text-sm font-semibold text-red-600 hover:bg-red-50 disabled:opacity-50"
                >
                  <LogOut size={18} />
                  {isLoggingOut ? "Logging out..." : "Logout"}
                </button>

                {logoutError && (
                  <p role="alert" className="px-3 py-2 text-sm text-red-600">
                    {logoutError}
                  </p>
                )}
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  onClick={closeMenus}
                  className="flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-100"
                >
                  <LogIn size={18} />
                  Login
                </Link>
                <Link
                  href="/register"
                  onClick={closeMenus}
                  className="flex items-center gap-3 rounded-lg bg-blue-600 px-3 py-3 text-sm font-semibold text-white hover:bg-blue-700"
                >
                  <UserPlus size={18} />
                  Get Started
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
