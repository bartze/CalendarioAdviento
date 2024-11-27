const familyMembers = ["Madre", "Padre", "Hijo1", "Hijo2", "Hijor3"];
const daysInDecember = 24;

const assignments = {
  Madre: {
    recipients: ["Hijo1", "Hijo1", "Hijo2", "Hijo2", "Hijo3", "Hijo3"],
    prepared: [],
  },
  Padre: {
    recipients: ["Hijo1", "Hijo1", "Hijo2", "Hijo2", "Hijo3", "Hijo3"],
    prepared: [],
  },
  Hijo1: { recipients: ["Madre", "Padre", "Hijo2", "Hijo3"], prepared: [] },
  Hijo2: { recipients: ["Madre", "Padre", "Hijo1", "Hijo3"], prepared: [] },
  hijo3: { recipients: ["Madre", "Padre", "Hijo1", "Hijo2"], prepared: [] },
};

const calendar = Array.from({ length: daysInDecember }, (_, i) => ({
  day: i + 1,
  preparer: null,
  recipient: null,
}));

const getValidDay = (preparedDays, maxDay) => {
  const possibleDays = Array.from({ length: maxDay }, (_, i) => i + 1).filter(
    (day) =>
      !preparedDays.includes(day) &&
      !preparedDays.includes(day - 1) &&
      !preparedDays.includes(day + 1)
  );
  return possibleDays[Math.floor(Math.random() * possibleDays.length)];
};

const distributeEnvelopes = () => {
  for (const [preparer, data] of Object.entries(assignments)) {
    for (const recipient of data.recipients) {
      let day;
      do {
        day = getValidDay(data.prepared, daysInDecember);
      } while (calendar[day - 1].preparer || calendar[day - 1].recipient);
      calendar[day - 1] = { day, preparer, recipient };
      data.prepared.push(day);
    }
  }
};

const generateOutput = () => {
  const calendarContainer = document.getElementById("calendar");
  calendar.forEach((entry) => {
    const div = document.createElement("div");
    div.classList.add("calendar-item");
    div.innerHTML = `<span><span class="destacado">${entry.day} diciembre:</span> ${entry.preparer} prepara a <span class="destacado">${entry.recipient}</span></span>`;
    calendarContainer.appendChild(div);
  });
};

distributeEnvelopes();
generateOutput();
