import { formatDistance, formatDistanceToNow } from "date-fns";

export function calculateTimeLeft(epochTimestamp: bigint): string {
  if (epochTimestamp === undefined) {
    return "N/A"; // Handle undefined case
  }
  // Convert the bigint epoch timestamp to a Date object
  const date = new Date(Number(epochTimestamp) * 1000); // Convert seconds to milliseconds

  if (isNaN(date.getTime())) {
    return "N/A"; // Handle invalid timestamp
  }

  // Calculate the time difference using date-fns
  const timeLeft = formatDistanceToNow(date, { addSuffix: true });

  return timeLeft;
}

export function calculateNotDetailedTimeLeft(epochTimestamp: bigint): string {
  if (epochTimestamp === undefined) {
    return "N/A"; // Handle undefined case
  }

  // Convert the bigint epoch timestamp to a Date object
  const targetDate = new Date(Number(epochTimestamp) * 1000); // Convert seconds to milliseconds

  if (isNaN(targetDate.getTime())) {
    return "N/A"; // Handle invalid timestamp
  }

  // Get the current date
  const currentDate = new Date();

  // Calculate the time difference
  const timeLeft = formatDistance(targetDate, currentDate, {
    addSuffix: true,
  });

  return timeLeft;
}

export function calculateDetailedTimeLeft(epochTimestamp: bigint): string {
  console.log("datos bloque 2:", epochTimestamp);
  if (epochTimestamp === undefined) {
    return "N/A"; // Handle undefined case
  }

  // Convert the bigint epoch timestamp to a Date object
  const targetDate = new Date(Number(epochTimestamp) * 1000); // Convert seconds to milliseconds
  console.log("datos bloque 3:", targetDate);

  if (isNaN(targetDate.getTime())) {
    return "N/A"; // Handle invalid timestamp
  }

  // Get the current date
  const currentDate = new Date();

  // Calculate the time difference in milliseconds
  const timeDifference = targetDate.getTime() - currentDate.getTime();
  console.log("datos bloque 4:", timeDifference);

  if (timeDifference <= 0) {
    return "N/A"; // Target date is in the past
  }

  // Calculate hours, minutes, and seconds
  const hours = Math.floor(timeDifference / (1000 * 60 * 60));
  const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

  // Format the result
  return `in ${hours} hours, ${minutes} minutes, and ${seconds} seconds`;
}

export function formatEpochTimestamp(epochTimestamp: bigint): string {
  if (epochTimestamp === undefined) {
    return "N/A"; // Handle undefined case
  }

  // Convert the bigint epoch timestamp to a number (seconds since epoch)
  const epochTimestampNumber = Number(epochTimestamp);

  // Check if epochTimestampNumber is NaN
  if (isNaN(epochTimestampNumber)) {
    return "N/A"; // Handle invalid timestamp
  }

  // Create a Date object from the epoch timestamp in milliseconds
  const date = new Date(epochTimestampNumber * 1000);

  // Format the date to a human-readable string (adjust the format as needed)
  const formattedDate = date.toLocaleString(); // You can customize the format here

  return formattedDate;
}
