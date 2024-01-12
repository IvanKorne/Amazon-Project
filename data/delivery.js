import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js";

export const deliveryOptions = [
  {
    id: "1",
    deliveryDays: 7,
    priceCents: 0,
  },
  {
    id: "2",
    deliveryDays: 3,
    priceCents: 499,
  },
  {
    id: "3",
    deliveryDays: 1,
    priceCents: 999,
  },
];

export function getDelivery(deliveryOptionId) {
  let matchOption;
  deliveryOptions.forEach((option) => {
    if (option.id === deliveryOptionId) {
      matchOption = option;
    }
  });
  return matchOption;
}

function isWeekend(date) {
  const dayOfWeek = date.format("dddd");
  return dayOfWeek === "Saturday" || dayOfWeek === "Sunday";
}

export function getDate(option) {
  let deliveryDate = dayjs();
  let remainingDays = option.deliveryDays;

  while (remainingDays > 0) {
    deliveryDate = deliveryDate.add(1, "day");
    if (!isWeekend(deliveryDate)) {
      remainingDays--;
    }
  }

  const dateString = deliveryDate.format("dddd, MMMM D");
  return dateString;
}
