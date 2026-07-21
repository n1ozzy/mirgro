"use client";

import { createContext, useCallback, useContext, useMemo, useRef, useState } from "react";
import { scrollToSection } from "@/lib/scroll";
import { useReducedMotionSafe } from "@/hooks/useReducedMotionSafe";
import type { ServiceOptionId } from "@/types/content";

export interface ServiceRequest {
  id: ServiceOptionId;
  /** Increases with every CTA click, so repeated requests re-apply. */
  token: number;
}

interface ServiceRequestValue {
  /** Latest "Zapytaj o tę usługę" request, if any. */
  requestedService: ServiceRequest | null;
  /** Preselects the service in the contact form and scrolls to the contact section. */
  requestService: (id: ServiceOptionId) => void;
}

const ServiceRequestContext = createContext<ServiceRequestValue | null>(null);

export function ServiceRequestProvider({ children }: { children: React.ReactNode }) {
  const [requestedService, setRequestedService] = useState<ServiceRequest | null>(null);
  const tokenRef = useRef(0);
  const reducedMotion = useReducedMotionSafe();

  const requestService = useCallback(
    (id: ServiceOptionId) => {
      tokenRef.current += 1;
      setRequestedService({ id, token: tokenRef.current });
      scrollToSection("kontakt", reducedMotion);
    },
    [reducedMotion],
  );

  const value = useMemo(
    () => ({ requestedService, requestService }),
    [requestedService, requestService],
  );

  return (
    <ServiceRequestContext.Provider value={value}>
      {children}
    </ServiceRequestContext.Provider>
  );
}

export function useServiceRequest(): ServiceRequestValue {
  const ctx = useContext(ServiceRequestContext);
  if (!ctx) {
    throw new Error("useServiceRequest must be used within ServiceRequestProvider");
  }
  return ctx;
}
