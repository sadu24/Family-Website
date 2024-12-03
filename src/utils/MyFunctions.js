function formatBDTTime(timestamp) {
    // Create a new Date object from the timestamp (milliseconds)
    const date = new Date(parseInt(timestamp));

    // Create a DateTimeFormat object for BDT (Bangladesh Standard Time)
    const options = {
        weekday: 'short', // 'Mon'
        day: '2-digit',   // '02'
        month: 'short',   // 'Dec'
        year: 'numeric',  // '2024'
        hour: '2-digit',  // '06'
        minute: '2-digit',// '32'
        second: '2-digit',// '33'
        hour12: true,     // Use 12-hour format (AM/PM)
    };

    // Use Intl.DateTimeFormat to get the formatted time
    const formatter = new Intl.DateTimeFormat('en-GB', options);
    const formattedDate = formatter.format(date);

    // Append the timezone (BDT)
    return `${formattedDate} BDT`;
}

export { formatBDTTime }