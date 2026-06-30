"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import {
  AddressDraft,
  Branch,
  CartLine,
  DemoOrder,
  DELIVERY_FEE,
  LocationPoint,
  MenuItem,
  ORDER_STATUS_FLOW,
  OrderStatus,
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
  updateOrderStatus: (orderId: string, status: OrderStatus) => void;
  advanceOrderStatus: (orderId: string) => void;
  deleteOrder: (orderId: string) => void;
  clearAllOrders: () => void;
  reorderItems: (items: CartLine[]) => void;
  cartOpen: boolean;
  setCartOpen: (open: boolean) => void;
  closeCartDrawer: () => void;
  chatbotOpen: boolean;
  setChatbotOpen: (open: boolean) => void;
  randomizerOpen: boolean;
  setRandomizerOpen: (open: boolean) => void;
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

function generateOrderId(): string {
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `BS-${timestamp}-${random}`;
}

export function StorefrontProvider({ children }: { children: React.ReactNode }) {
  const [hydrated, setHydrated] = useState(false);
  const [cart, setCart] = useState<CartLine[]>([]);
  const [wishlist, setWishlist] = useState<MenuItem[]>([]);
  const [orders, setOrders] = useState<DemoOrder[]>([]);
  const [checkout, setCheckout] = useState<CheckoutDraft>(defaultCheckout);
  
  const [cartOpen, setCartOpen] = useState(false);
  const [chatbotOpen, setChatbotOpen] = useState(false);
  const [randomizerOpen, setRandomizerOpen] = useState(false);
  
  function closeCartDrawer() {
    setCartOpen(false);
  }

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
        setCheckout({
          ...defaultCheckout,
          ...parsed.checkout,
          address: { ...defaultAddress, ...parsed.checkout?.address },
        });
      } catch {
        window.localStorage.removeItem(storageKey);
      }
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    window.localStorage.setItem(
      storageKey,
      JSON.stringify({ cart, wishlist, orders, checkout })
    );
  }, [cart, checkout, hydrated, orders, wishlist]);

  const subtotal = useMemo(
    () => cart.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [cart]
  );
  const cartCount = useMemo(
    () => cart.reduce((sum, item) => sum + item.quantity, 0),
    [cart]
  );

  function addToCart(item: MenuItem, options: string[] = []) {
    setCart((current) => {
      const key = lineKey({ id: item.id, options });
      const existing = current.find((l) => lineKey(l) === key);
      if (existing) {
        return current.map((l) =>
          lineKey(l) === key ? { ...l, quantity: l.quantity + 1 } : l
        );
      }
      return [...current, { ...item, quantity: 1, options }];
    });
  }

  function updateQuantity(key: string, delta: number) {
    setCart((current) =>
      current
        .map((l) => (lineKey(l) === key ? { ...l, quantity: l.quantity + delta } : l))
        .filter((l) => l.quantity > 0)
    );
  }

  function removeFromCart(key: string) {
    setCart((current) => current.filter((l) => lineKey(l) !== key));
  }

  function clearCart() {
    setCart([]);
  }

  function toggleWishlist(item: MenuItem) {
    setWishlist((current) => {
      const exists = current.some((i) => i.id === item.id);
      return exists ? current.filter((i) => i.id !== item.id) : [...current, item];
    });
  }

  function updateCheckout(patch: Partial<CheckoutDraft>) {
    setCheckout((c) => ({ ...c, ...patch }));
  }

  function updateAddress(patch: Partial<AddressDraft>) {
    setCheckout((c) => ({ ...c, address: { ...c.address, ...patch } }));
  }

  function setLocation(location: LocationPoint | null) {
    setCheckout((c) => ({ ...c, location }));
  }

  function submitOrder(): DemoOrder {
    const selectedBranch = branches.find((b) => b.id === checkout.branchId);
    const deliveryFee = checkout.orderType === "delivery" ? DELIVERY_FEE : 0;
    const total = subtotal + deliveryFee;

    const order: DemoOrder = {
      id: generateOrderId(),
      createdAt: new Date().toISOString(),
      status: "new",
      customer: { name: checkout.name, phone: checkout.phone },
      orderType: checkout.orderType,
      paymentMethod: "cash",
      address: checkout.orderType === "delivery" ? checkout.address : undefined,
      location: checkout.location ?? undefined,
      branch: selectedBranch,
      notes: checkout.notes,
      items: [...cart],
      subtotal,
      deliveryFee,
      total,
      estimatedMinutes: checkout.orderType === "delivery" ? 45 : 20,
    };

    setOrders((current) => [order, ...current]);
    clearCart();
    setCheckout(defaultCheckout);
    return order;
  }

  function updateOrderStatus(orderId: string, status: OrderStatus) {
    setOrders((current) =>
      current.map((o) => (o.id === orderId ? { ...o, status } : o))
    );
  }

  function advanceOrderStatus(orderId: string) {
    setOrders((current) =>
      current.map((o) => {
        if (o.id !== orderId) return o;
        const currentIndex = ORDER_STATUS_FLOW.indexOf(o.status);
        if (currentIndex === -1 || currentIndex === ORDER_STATUS_FLOW.length - 1) return o;
        return { ...o, status: ORDER_STATUS_FLOW[currentIndex + 1] };
      })
    );
  }

  function deleteOrder(orderId: string) {
    setOrders((current) => current.filter((o) => o.id !== orderId));
  }

  function clearAllOrders() {
    setOrders([]);
  }

  function reorderItems(items: CartLine[]) {
    setCart((current) => [...current, ...items]);
    setCartOpen(true);
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
    updateOrderStatus,
    advanceOrderStatus,
    deleteOrder,
    clearAllOrders,
    reorderItems,
    cartOpen,
    setCartOpen,
    closeCartDrawer,
    chatbotOpen,
    setChatbotOpen,
    randomizerOpen,
    setRandomizerOpen,
  };

  return (
    <StorefrontContext.Provider value={value}>
      {children}
    </StorefrontContext.Provider>
  );
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