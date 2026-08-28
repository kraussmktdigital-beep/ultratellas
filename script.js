// Time zones configuration
const timeZones = {
    newYork: {
        id: 'newYork',
        timezone: 'America/New_York',
        offset: -5
    },
    london: {
        id: 'london',
        timezone: 'Europe/London',
        offset: 0
    },
    paris: {
        id: 'paris',
        timezone: 'Europe/Paris',
        offset: 1
    },
    dubai: {
        id: 'dubai',
        timezone: 'Asia/Dubai',
        offset: 4
    },
    tokyo: {
        id: 'tokyo',
        timezone: 'Asia/Tokyo',
        offset: 9
    },
    sydney: {
        id: 'sydney',
        timezone: 'Australia/Sydney',
        offset: 10
    },
    losAngeles: {
        id: 'losAngeles',
        timezone: 'America/Los_Angeles',
        offset: -8
    },
    singapore: {
        id: 'singapore',
        timezone: 'Asia/Singapore',
        offset: 8
    },
    saoPaulo: {
        id: 'saoPaulo',
        timezone: 'America/Sao_Paulo',
        offset: -3
    },
    mumbai: {
        id: 'mumbai',
        timezone: 'Asia/Kolkata',
        offset: 5.5
    },
    hongKong: {
        id: 'hongKong',
        timezone: 'Asia/Hong_Kong',
        offset: 8
    },
    moscow: {
        id: 'moscow',
        timezone: 'Europe/Moscow',
        offset: 3
    }
};

/**
 * Format time with leading zeros
 * @param {number} num - Number to format
 * @returns {string} - Formatted number with leading zero
 */
function padZero(num) {
    return num < 10 ? '0' + num : num;
}

/**
 * Update clock display for a specific time zone
 * @param {string} clockId - ID of the clock element
 * @param {string} timezone - Timezone string (e.g., 'America/New_York')
 * @param {string} dateId - ID of the date element
 */
function updateClock(clockId, timezone, dateId) {
    try {
        // Get current time in the specified timezone
        const now = new Date();
        const timeString = now.toLocaleString('en-US', {
            timeZone: timezone,
            hour12: false,
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        });

        const dateString = now.toLocaleString('en-US', {
            timeZone: timezone,
            weekday: 'short',
            month: 'short',
            day: '2-digit',
            year: 'numeric'
        });

        // Update the clock display
        const clockElement = document.getElementById(clockId);
        const dateElement = document.getElementById(dateId);

        if (clockElement) {
            clockElement.textContent = timeString;
        }

        if (dateElement) {
            dateElement.textContent = dateString;
        }
    } catch (error) {
        console.error(`Error updating clock for ${timezone}:`, error);
    }
}

/**
 * Update all clocks
 */
function updateAllClocks() {
    // Update local time
    const now = new Date();
    const localTimeString = `${padZero(now.getHours())}:${padZero(now.getMinutes())}:${padZero(now.getSeconds())}`;
    const localDateString = now.toLocaleDateString('en-US', {
        weekday: 'short',
        month: 'short',
        day: '2-digit',
        year: 'numeric'
    });

    const localTimeElement = document.getElementById('localTime');
    const localDateElement = document.getElementById('dateLocal');

    if (localTimeElement) {
        localTimeElement.textContent = localTimeString;
    }

    if (localDateElement) {
        localDateElement.textContent = localDateString;
    }

    // Update all timezone clocks
    Object.values(timeZones).forEach(zone => {
        updateClock(zone.id, zone.timezone, `date${zone.id.charAt(0).toUpperCase() + zone.id.slice(1)}`);
    });
}

/**
 * Initialize and start the clock updates
 */
function initializeClock() {
    // Initial update
    updateAllClocks();

    // Update every second
    setInterval(updateAllClocks, 1000);

    // Log initialization
    console.log('Digital Clock initialized with', Object.keys(timeZones).length, 'time zones');
}

// Start the clock when DOM is loaded
document.addEventListener('DOMContentLoaded', initializeClock);

// Also start immediately if script loads after DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeClock);
} else {
    initializeClock();
}
