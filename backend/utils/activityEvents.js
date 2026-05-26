const listeners = new Set();
const events = [
  {
    id: "boot",
    type: "SYSTEM",
    status: "info",
    title: "System Monitor Online",
    detail: "OCR, blockchain, QR and certificate services are ready.",
    timestamp: new Date().toISOString(),
  },
];

function publishEvent(event) {
  const nextEvent = {
    id: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
    status: "info",
    timestamp: new Date().toISOString(),
    ...event,
  };

  events.unshift(nextEvent);
  events.splice(80);

  listeners.forEach((listener) => {
    listener(nextEvent);
  });

  return nextEvent;
}

function getEvents() {
  return events;
}

function addEventListener(listener) {
  listeners.add(listener);

  return () => {
    listeners.delete(listener);
  };
}

module.exports = {
  addEventListener,
  getEvents,
  publishEvent,
};
