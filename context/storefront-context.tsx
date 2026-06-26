"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import {
  AddressDraft,
  Branch,
  CartLine,
  DemoOrder,
  LocationPoint,
  MenuItem,
  OrderType,
  branches,
  defaultAddress,
} from "../data/storefront";

type CheckoutDraft = {
  name: string;
  phone: string;
  orderType: OrderType;
  address: AddressDraft;
  location: LocationPoint | null;
  branchId: string;
  notes: string;
};

type StorefrontContextValue = {
  cart: CartLine[];
  wishlist: MenuItem[];
  orders: DemoOrder[];
  checkout: CheckoutDraft;
  cartCount: number;
  subtotal: number;
  addToCart: (item: MenuItem, options?: string[]) => void;
  updateQuantity: (lineKey: string, delta: number) => void;
  removeFromCart: (lineKey: string) => void;
  clearCart: () => void;
  toggleWishlist: (item: MenuItem) => void;
  updateCheckout: (patch: Partial<CheckoutDraft>) => void;
  updateAddress: (patch: Partial<AddressDraft>) => void;
  setLocation: (location: LocationPoint | null) => void;
  submitOrder: () => DemoOrder;
};

const storageKey = "big-shawerma-storefront-v1";

const defaultCheckout: CheckoutDraft = {
  name: "",
  phone: "",
  orderType: "delivery",
  address: defaultAddress,
  location: null,
  branchId: branches[0].id,
  notes: "",
};

const StorefrontContext = createContext<StorefrontContextValue | null>(null);

function lineKey(line: Pick<CartLine, "id" | "options">) {
  return `${line.id}:${line.options.join("|")}`;
}

export function StorefrontProvider({ children }: { children: React.ReactNode }) {
  const [hydrated, setHydrated] = useState(false);
  const [cart, setCart] = useState<CartLine[]>([]);
  const [wishlist, setWishlist] = useState<MenuItem[]>([]);
  const [orders, setOrders] = useState<DemoOrder[]>([]);
  const [checkout, setCheckout] = useState<CheckoutDraft>(defaultCheckout);

  useEffect(() => {
    const raw = window.localStorage.getItem(storageKey);
    if (raw) {
      try {
        const parsed = JSON.parse(raw) as Partial<{
          cart: CartLine[];
          wishlist: MenuItem[];
          orders: DemoOrder[];
          checkout: CheckoutDraft;
        }>;
        setCart(parsed.cart ?? []);
        setWishlist(parsed.wishlist ?? []);
        setOrders(parsed.orders ?? []);
        setCheckout({ ...defaultCheckout, ...parsed.checkout, address: { ...defaultAddress, ...parsed.checkout?.address } });
      } catch {
        window.localStorage.removeItem(storageKey);
      }
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    window.localStorage.setItem(storageKey, JSON.stringify({ cart, wishlist, orders, checkout }));
  }, [cart, checkout, hydrated, orders, wishlist]);

  const subtotal = useMemo(() => cart.reduce((sum, item) => sum + item.price * item.quantity, 0), [cart]);
  const cartCount = useMemo(() => cart.reduce((sum, item) => sum + item.quantity, 0), [cart]);

  function addToCart(item: MenuItem, options: string[] = []) {
    setCart((current) => {
      const key = lineKey({ id: item.id, options });
      const existing = current.find((line) => lineKey(line) === key);
      if (existing) {
        return current.map((line) => (lineKey(line) === key ? { ...line, quantity: line.quantity + 1 } : line));
      }
      return [...current, { ...item, quantity: 1, options }];
    });
  }

  function updateQuantity(key: string, delta: number) {
    setCart((current) =>
      current
        .map((line) => (lineKey(line) === key ? { ...line, quantity: Math.max(0, line.quantity + delta) } : line))
        .filter((line) => line.quantity > 0),
    );
  }

  function removeFromCart(key: string) {
    setCart((current) => current.filter((line) => lineKey(line) !== key));
  }

  function clearCart() {
    setCart([]);
  }

  function toggleWishlist(item: MenuItem) {
    setWishlist((current) => (current.some((entry) => entry.id === item.id) ? current.filter((entry) => entry.id !== item.id) : [...current, item]));
  }

  function updateCheckout(patch: Partial<CheckoutDraft>) {
    setCheckout((current) => ({ ...current, ...patch }));
  }

  function updateAddress(patch: Partial<AddressDraft>) {
    setCheckout((current) => ({ ...current, address: { ...current.address, ...patch } }));
  }

  function setLocation(location: LocationPoint | null) {
    setCheckout((current) => ({ ...current, location }));
  }

  function submitOrder() {
    const selectedBranch = branches.find((branch) => branch.id === checkout.branchId) as Branch | undefined;
    const order: DemoOrder = {
      id: `BS-${Date.now().toString(36).toUpperCase()}`,
      createdAt: new Date().toISOString(),
      status: "new",
      customer: { name: checkout.name.trim(), phone: checkout.phone.trim() },
      orderType: checkout.orderType,
      paymentMethod: "cash",
      address: checkout.orderType === "delivery" ? checkout.address : undefined,
      location: checkout.orderType === "delivery" ? checkout.location ?? undefined : undefined,
      branch: checkout.orderType === "pickup" ? selectedBranch : undefined,
      notes: checkout.notes.trim(),
      items: cart,
      subtotal,
    };
    setOrders((current) => [order, ...current]);
    setCart([]);
    setCheckout((current) => ({ ...defaultCheckout, name: current.name, phone: current.phone }));
    return order;
  }

  const value: StorefrontContextValue = {
    cart,
    wishlist,
    orders,
    checkout,
    cartCount,
    subtotal,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    toggleWishlist,
    updateCheckout,
    updateAddress,
    setLocation,
    submitOrder,
  };

  return <StorefrontContext.Provider value={value}>{children}</StorefrontContext.Provider>;
}

export function useStorefront() {
  const context = useContext(StorefrontContext);
  if (!context) {
    throw new Error("useStorefront must be used inside StorefrontProvider");
  }
  return context;
}

export function getCartLineKey(line: Pick<CartLine, "id" | "options">) {
  return lineKey(line);
}
