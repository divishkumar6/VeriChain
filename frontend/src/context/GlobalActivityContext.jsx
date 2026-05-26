import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import { API_BASE_URL, getEventHistory } from "../services/certificateApi";

const ActivityContext = createContext(null);
const STORAGE_KEY = "verichainActivity";

const initialEvents = [
  {
    id: "boot",
    type: "system",
    title: "System Monitor Online",
    detail: "OCR, blockchain, QR and certificate services are ready.",
    status: "info",
    timestamp: new Date().toISOString(),
  },
];

function readStoredEvents() {
  try {
    const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    return stored.length ? stored : initialEvents;
  } catch (error) {
    return initialEvents;
  }
}

export function GlobalActivityProvider({ children }) {
  const [events, setEvents] = useState(readStoredEvents);

  const persist = useCallback((nextEvents) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(nextEvents.slice(0, 80)));
    window.dispatchEvent(
      new CustomEvent("verichain-activity", {
        detail: nextEvents,
      })
    );
  }, []);

  const pushEvent = useCallback(
    (event) => {
      const nextEvent = {
        id: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
        type: "system",
        status: "info",
        timestamp: new Date().toISOString(),
        ...event,
      };

      setEvents((current) => {
        const next = [nextEvent, ...current].slice(0, 80);
        persist(next);
        return next;
      });

      return nextEvent;
    },
    [persist]
  );

  const clearEvents = useCallback(() => {
    setEvents(initialEvents);
    persist(initialEvents);
  }, [persist]);

  useEffect(() => {
    const syncEvents = (event) => {
      if (event.key === STORAGE_KEY) {
        setEvents(readStoredEvents());
      }
    };

    const syncCustomEvents = (event) => {
      if (Array.isArray(event.detail)) {
        setEvents(event.detail);
      }
    };

    window.addEventListener("storage", syncEvents);
    window.addEventListener("verichain-activity", syncCustomEvents);

    return () => {
      window.removeEventListener("storage", syncEvents);
      window.removeEventListener("verichain-activity", syncCustomEvents);
    };
  }, []);

  useEffect(() => {
    let closed = false;

    getEventHistory()
      .then((res) => {
        if (!closed && Array.isArray(res.data)) {
          setEvents(res.data);
          persist(res.data);
        }
      })
      .catch(() => {});

    const source = new EventSource(`${API_BASE_URL}/events/stream`);

    source.addEventListener("snapshot", (event) => {
      try {
        const snapshot = JSON.parse(event.data);
        if (Array.isArray(snapshot)) {
          setEvents(snapshot);
          persist(snapshot);
        }
      } catch (error) {}
    });

    source.onmessage = (event) => {
      try {
        const nextEvent = JSON.parse(event.data);
        setEvents((current) => {
          if (current.some((item) => item.id === nextEvent.id)) {
            return current;
          }

          const next = [nextEvent, ...current].slice(0, 80);
          persist(next);
          return next;
        });
      } catch (error) {}
    };

    source.onerror = () => {
      source.close();
    };

    return () => {
      closed = true;
      source.close();
    };
  }, [persist]);

  const value = useMemo(
    () => ({
      events,
      pushEvent,
      clearEvents,
    }),
    [events, pushEvent, clearEvents]
  );

  return (
    <ActivityContext.Provider value={value}>
      {children}
    </ActivityContext.Provider>
  );
}

export function useActivity() {
  const context = useContext(ActivityContext);

  if (!context) {
    throw new Error("useActivity must be used inside GlobalActivityProvider");
  }

  return context;
}
